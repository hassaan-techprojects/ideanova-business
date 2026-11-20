
import { NextResponse } from "next/server";

export const revalidate = 600;

const GNEWS_URL = "https://gnews.io/api/v4/top-headlines";

const categoryRules: Record<string, RegExp> = {
  Finance:
    /\b(finance|financial|bank|banking|rbi|reserve bank|stock|stocks|share market|nifty|sensex|investment|investor|mutual fund|insurance|loan|credit|budget|tax|rupee|forex)\b/i,

  Marketing:
    /\b(marketing|advertising|advertisement|brand|branding|campaign|consumer|retail|e-commerce|digital marketing|social media)\b/i,

  "Human Resources":
    /\b(human resources|hr|hiring|recruitment|workforce|employee|employees|employment|layoff|layoffs|salary|workplace|jobs|job market|talent)\b/i,

  Startups:
    /\b(startup|startups|founder|founders|venture capital|funding|unicorn|entrepreneur|entrepreneurship|seed round|series a|series b)\b/i,

  "Business Strategy":
    /\b(strategy|strategic|merger|acquisition|acquire|expansion|partnership|corporate|leadership|ceo|board|business model|competition)\b/i,
};

function getCategory(title: string, description = "") {
  const text = `${title} ${description}`;

  for (const [category, pattern] of Object.entries(categoryRules)) {
    if (pattern.test(text)) {
      return category;
    }
  }

  return "Business";
}

type GNewsArticle = {
  title?: string;
  description?: string | null;
  url?: string;
  image?: string | null;
  publishedAt?: string;
  source?: {
    name?: string;
    url?: string;
  };
};

export async function GET() {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      console.error("GNEWS_API_KEY is missing from environment variables.");

      return NextResponse.json(
        { error: "News service is not configured." },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      category: "business",
      lang: "en",
      country: "in",
      max: "10",
      nullable: "description,image",
      apikey: apiKey,
    });

    const response = await fetch(`${GNEWS_URL}?${params.toString()}`, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 600,
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("GNews API returned status:", response.status);

      return NextResponse.json(
        {
          error:
            response.status === 401 || response.status === 403
              ? "The news API key is invalid or does not have access."
              : response.status === 429
                ? "The news API request limit has been reached. Please try again later."
                : "The news provider is temporarily unavailable.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!Array.isArray(data.articles)) {
      return NextResponse.json(
        { error: "No valid news results were returned." },
        { status: 502 }
      );
    }

    const seenUrls = new Set<string>();

    const articles = data.articles
      .map((article: GNewsArticle) => {
        const title =
          typeof article.title === "string"
            ? article.title.trim()
            : "";

        if (!title || !article.url || !article.publishedAt) {
          return null;
        }

        let parsedUrl: URL;

        try {
          parsedUrl = new URL(article.url);
        } catch {
          return null;
        }

        if (parsedUrl.protocol !== "https:") {
          return null;
        }

        const url = parsedUrl.toString();

        if (seenUrls.has(url)) {
          return null;
        }

        seenUrls.add(url);

        const publishedAt = new Date(article.publishedAt);

        if (Number.isNaN(publishedAt.getTime())) {
          return null;
        }

        let image: string | null = null;

        if (article.image) {
          try {
            const parsedImage = new URL(article.image);

            if (parsedImage.protocol === "https:") {
              image = parsedImage.toString();
            }
          } catch {
            image = null;
          }
        }

        const description =
          typeof article.description === "string"
            ? article.description.trim()
            : "";

        return {
          title: title.slice(0, 400),
          description: description.slice(0, 600),
          url,
          image,
          source:
            article.source?.name?.trim() ||
            parsedUrl.hostname.replace(/^www\./, ""),
          seenAt: publishedAt.toISOString(),
          category: getCategory(title, description),
        };
      })
     .filter((article) => article !== null);

    return NextResponse.json(
      {
        articles,
        updatedAt: new Date().toISOString(),
        provider: "GNews",
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  } catch (error) {
    console.error("IDEANOVA GNews API error:", error);

    return NextResponse.json(
      { error: "Unable to load business news. Please try again later." },
      { status: 503 }
    );
  }
}

function mapArticle(article: GNewsArticle) {
  return article;
}
