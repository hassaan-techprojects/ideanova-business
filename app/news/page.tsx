
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type NewsArticle = {
  title: string;
  url: string;
  source: string;
  seenAt: string;
  category: string;
};

const categories = [
  "All News",
  "Business",
  "Finance",
  "Marketing",
  "Human Resources",
  "Startups",
  "Business Strategy",
];

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export default function BusinessNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const loadNews = useCallback(async () => {
    setError("");
    setRefreshing(true);

    try {
      const response = await fetch("/api/news");

      if (!response.ok) {
        throw new Error("Unable to load news right now.");
      }

      const data = await response.json();

      if (!Array.isArray(data.articles)) {
        throw new Error("Invalid news response.");
      }

      setArticles(data.articles);
      setUpdatedAt(data.updatedAt || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading news."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All News" ||
        article.category === selectedCategory;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        article.title.toLowerCase().includes(searchText) ||
        article.source.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, search]);

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <main className="news-page">
      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <Image
              src="/ideanova-logo.jpeg"
              alt="IDEANOVA"
              width={200}
              height={90}
              priority
              className="h-[58px] w-auto object-contain"
            />
          </Link>

          <nav className="main-navigation">
            <Link href="/" className="nav-link">
              About Club
            </Link>
            <Link href="/news" className="nav-link active">
              Business News
            </Link>
            <Link href="/quiz" className="nav-link">
              Business Quiz
            </Link>
          </nav>

          <Link href="/quiz" className="header-cta">
            PLAY QUIZ →
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="news-hero">
        <div className="news-container news-hero-inner">
          <span className="news-kicker">
            IDEANOVA · INDIAN BUSINESS DESK
          </span>

          <h1>
            Business
            <br />
            <span>Beyond</span>
            <br />
            Headlines.
          </h1>

          <p>
            Stay updated with real business developments from across India.
            Explore markets, finance, startups, marketing and the changing
            world of business.
          </p>

          <div className="news-hero-bottom">
            <span>INDIA BUSINESS COVERAGE</span>
            <span>NEWS SOURCE: GDELT PROJECT</span>
            <span>IDEANOVA BUSINESS DESK</span>
          </div>
        </div>
      </section>

      {/* NEWS TOOLBAR */}
      <section className="news-toolbar">
        <div className="news-container news-toolbar-inner">
          <label className="news-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search headlines or publishers..."
              aria-label="Search business news"
            />
          </label>

          <button
            type="button"
            className="news-refresh"
            onClick={loadNews}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh News"}
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="news-categories-section">
        <div className="news-container">
          <div className="news-section-heading">
            <div>
              <span className="news-section-label">
                EXPLORE BY INTEREST
              </span>
              <h2>News Categories</h2>
            </div>
          </div>

          <div className="news-categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`news-category ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      <section className="news-content">
        <div className="news-container">
          <div className="news-section-heading">
            <div>
              <span className="news-section-label">
                LATEST FROM INDIA
              </span>
              <h2>Featured Story</h2>
              <p>Selected from the latest available business headlines.</p>
            </div>

            <span className="section-index">
              {loading ? "LOADING" : `${filteredArticles.length} ARTICLES`}
            </span>
          </div>

          {loading ? (
            <div className="news-skeleton">
              <div className="news-skeleton-image" />
              <div className="news-skeleton-line" />
              <div className="news-skeleton-line short" />
            </div>
          ) : featuredArticle ? (
            <article className="news-featured">
              <div className="news-featured-content">
                <span className="news-featured-tag">
                  {featuredArticle.category}
                </span>

                <h3>{featuredArticle.title}</h3>

                <div className="news-featured-meta">
                  <span>{featuredArticle.source}</span>
                  <span>{formatDate(featuredArticle.seenAt)}</span>
                </div>

                <a
                  href={featuredArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Original Article <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ) : (
            <div className="news-status">
              <h3>No featured news available</h3>
              <p>Try refreshing or selecting another category.</p>
            </div>
          )}

          {/* LATEST ARTICLES */}
          <div className="news-section-heading mt-16">
            <div>
              <span className="news-section-label">STAY INFORMED</span>
              <h2>Latest Business News</h2>
              <p>Business headlines collected from external publishers.</p>
            </div>

            {updatedAt && (
              <span className="section-index">
                UPDATED {formatDate(updatedAt)}
              </span>
            )}
          </div>

          {error && (
            <div className="news-status mb-8">
              <h3>News could not be loaded</h3>
              <p>{error}</p>
              <button
                type="button"
                className="news-refresh mt-5"
                onClick={loadNews}
                disabled={refreshing}
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="news-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className="news-skeleton" key={item}>
                  <div className="news-skeleton-image" />
                  <div className="news-skeleton-line" />
                  <div className="news-skeleton-line short" />
                </div>
              ))}
            </div>
          ) : remainingArticles.length > 0 ? (
            <div className="news-grid">
              {remainingArticles.map((article, index) => (
                <article className="news-card" key={article.url}>
                  <div className="news-card-top">
                    <span className="news-card-symbol">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="news-card-body">
                    <span className="news-card-category">
                      {article.category}
                    </span>

                    <h3>{article.title}</h3>

                    <div className="news-card-meta">
                      <span className="news-card-source">
                        {article.source}
                      </span>
                      <span>{formatDate(article.seenAt)}</span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-card-link"
                    >
                      Read Original Article
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="news-status">
                <h3>
                  {error ? "News unavailable" : "No matching articles"}
                </h3>
                <p>
                  {error
                    ? "Please try again later."
                    : "Try another category or search term."}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* QUIZ PROMO */}
      <section className="news-container pb-20">
        <div className="news-promo">
          <span className="news-section-label">
            THINK. LEARN. COMPETE.
          </span>

          <h2 className="mt-4">
            How Strong Is Your
            <br />
            <span>Business Knowledge?</span>
          </h2>

          <p>
            Challenge yourself with questions on finance, marketing,
            human resources and business strategy.
          </p>

          <Link href="/quiz">
            Enter Quiz Arena →
          </Link>
        </div>
      </section>

      
    </main>
  );
}
