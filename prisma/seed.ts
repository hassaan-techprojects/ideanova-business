
import "dotenv/config";
import { PrismaClient, QuizCategory } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const questions = [
  // FINANCE — 13 QUESTIONS
  {
    category: QuizCategory.FINANCE,
    question: "A company has a current ratio of 2.0 and a quick ratio of 1.2. Current liabilities are ₹10 lakh. What is the value of inventory?",
    options: ["₹8 lakh", "₹12 lakh", "₹10 lakh", "₹6 lakh"],
    correctAnswer: 0,
    explanation: "Current assets = ₹20 lakh. Quick assets = ₹12 lakh. Inventory = ₹20 lakh − ₹12 lakh = ₹8 lakh.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A project requires ₹10 lakh initially and generates ₹4 lakh at the end of each of the next three years. At a 10% discount rate, using PV factors 0.909, 0.826 and 0.751, what is its approximate NPV?",
    options: ["−₹5,600", "₹5,600", "−₹1 lakh", "₹1 lakh"],
    correctAnswer: 0,
    explanation: "PV of inflows = ₹4 lakh × (0.909 + 0.826 + 0.751) = ₹9.944 lakh. NPV = ₹9.944 − ₹10 = −₹5,600.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A firm has sales of ₹50 lakh, variable costs of ₹30 lakh and fixed costs of ₹12 lakh. If sales increase by 10%, with costs behaving consistently, what is the new operating profit?",
    options: ["₹10 lakh", "₹9 lakh", "₹8 lakh", "₹11 lakh"],
    correctAnswer: 0,
    explanation: "New sales = ₹55 lakh. Variable costs = ₹33 lakh. Operating profit = ₹55 − ₹33 − ₹12 = ₹10 lakh.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company finances itself with 60% equity costing 15% and 40% debt costing 8%. Its corporate tax rate is 25%. What is its WACC?",
    options: ["11.4%", "12.2%", "13.0%", "10.8%"],
    correctAnswer: 0,
    explanation: "WACC = (0.60 × 15%) + (0.40 × 8% × 0.75) = 11.4%.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company reports rising profits but consistently negative operating cash flow. Which explanation should an analyst investigate first?",
    options: ["Revenue recognised before cash collection", "A reduction in depreciation expense", "An increase in share capital", "A fall in the market price of its shares"],
    correctAnswer: 0,
    explanation: "Accrual revenue can increase reported profit without generating cash when receivables rise. The analyst should investigate working-capital movements.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A business sells a product for ₹500. Variable cost is ₹300 per unit and total fixed costs are ₹4 lakh. How many units must it sell to break even?",
    options: ["2,000", "1,500", "2,500", "1,000"],
    correctAnswer: 0,
    explanation: "Contribution per unit = ₹200. Break-even volume = ₹4,00,000 / ₹200 = 2,000 units.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company has an inventory turnover of 6 times and an average inventory of ₹15 lakh. What is its annual cost of goods sold?",
    options: ["₹90 lakh", "₹60 lakh", "₹75 lakh", "₹120 lakh"],
    correctAnswer: 0,
    explanation: "COGS = Inventory turnover × Average inventory = 6 × ₹15 lakh = ₹90 lakh.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A firm is evaluating two mutually exclusive projects with different initial investments and different lifespans. Which method is generally most appropriate when the projects provide repeatable annual benefits?",
    options: ["Equivalent annual annuity", "Simple payback period", "Accounting rate of return", "Gross profit margin"],
    correctAnswer: 0,
    explanation: "Equivalent annual annuity converts each project's NPV into an annual equivalent, allowing comparison across different project lives under repeatability assumptions.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company has EBIT of ₹12 lakh, interest expense of ₹3 lakh and a tax rate of 30%. What is its interest coverage ratio?",
    options: ["4 times", "3 times", "2.5 times", "5 times"],
    correctAnswer: 0,
    explanation: "Interest coverage = EBIT / Interest expense = 12 / 3 = 4 times.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A business has a contribution margin ratio of 40%. Fixed costs are ₹8 lakh. What sales revenue is required to earn an operating profit of ₹4 lakh?",
    options: ["₹30 lakh", "₹20 lakh", "₹24 lakh", "₹32 lakh"],
    correctAnswer: 0,
    explanation: "Required sales = (Fixed costs + Target profit) / Contribution margin ratio = 12 / 0.40 = ₹30 lakh.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A firm offers customers 2/10, net 30 credit terms. A customer does not take the discount and pays on day 30. What is the approximate annualised cost of foregoing the discount using a 360-day year?",
    options: ["36.73%", "24.00%", "20.00%", "12.00%"],
    correctAnswer: 0,
    explanation: "Cost = (2 / 98) × (360 / 20) = approximately 36.73%.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company has 100,000 shares outstanding at ₹50 each. It earns ₹20 lakh and distributes ₹5 lakh as dividends. What is its dividend payout ratio?",
    options: ["25%", "20%", "40%", "50%"],
    correctAnswer: 0,
    explanation: "Dividend payout ratio = Total dividends / Net income = 5 / 20 = 25%.",
  },
  {
    category: QuizCategory.FINANCE,
    question: "A company has debt of ₹60 lakh and equity of ₹40 lakh. What is its debt-to-equity ratio?",
    options: ["1.5", "0.67", "2.0", "1.0"],
    correctAnswer: 0,
    explanation: "Debt-to-equity ratio = Total debt / Total equity = 60 / 40 = 1.5.",
  },

  // MARKETING — 13 QUESTIONS
  {
    category: QuizCategory.MARKETING,
    question: "A brand has 40% market share. Its customers purchase the category twice as frequently as the average category buyer. Which interpretation is most relevant?",
    options: ["Its share may be supported by high purchase frequency among existing buyers", "It necessarily has the highest customer acquisition rate", "Its distribution coverage must be 40%", "Its customer retention is exactly 80%"],
    correctAnswer: 0,
    explanation: "Higher purchase frequency among existing buyers can contribute significantly to market share. It does not establish acquisition, distribution or retention rates.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A campaign generates 10,000 clicks at ₹5 per click. Two percent of visitors purchase, with an average contribution of ₹400 per purchase. What is campaign contribution before advertising costs?",
    options: ["₹80,000", "₹40,000", "₹1,00,000", "₹20,000"],
    correctAnswer: 0,
    explanation: "Purchases = 10,000 × 2% = 200. Contribution = 200 × ₹400 = ₹80,000. After ₹50,000 ad spend, net contribution is ₹30,000.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A premium brand cuts its price by 25%, and unit sales rise by 10%. Assuming constant unit variable cost, what is the most immediate strategic concern?",
    options: ["Revenue per unit falls and the sales increase may not offset the price reduction", "Brand awareness automatically increases", "Customer lifetime value necessarily doubles", "Market share must decline"],
    correctAnswer: 0,
    explanation: "Revenue index becomes 0.75 × 1.10 = 0.825, representing a 17.5% decline in revenue.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A company wants to determine whether loyalty emails cause higher spending. Which method provides the strongest evidence?",
    options: ["Randomised controlled experiment", "Compare only the highest-spending email recipients", "Ask the sales team for an opinion", "Compare this year's sales with the previous year's sales"],
    correctAnswer: 0,
    explanation: "Random assignment to treatment and control groups helps isolate the causal effect of emails from customer selection and other confounding factors.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A product has high awareness but low consideration. Which investigation should marketing prioritise?",
    options: ["Perceived relevance, differentiation and purchase barriers", "Increasing awareness without changing the message", "Reducing customer support availability", "Expanding the product portfolio immediately"],
    correctAnswer: 0,
    explanation: "The awareness-to-consideration gap suggests people know the product but do not see enough value, relevance or differentiation.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A subscription business has monthly churn of 5%. Assuming a constant churn rate and no discounting, what is the approximate expected customer lifetime in months?",
    options: ["20", "5", "10", "25"],
    correctAnswer: 0,
    explanation: "Expected lifetime approximation = 1 / monthly churn = 1 / 0.05 = 20 months.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A retailer's online conversion rate increases after it removes a checkout step, but average order value decreases. Which metric combination best evaluates the change?",
    options: ["Revenue and contribution per visitor", "Website traffic alone", "Social media followers alone", "Number of checkout page views alone"],
    correctAnswer: 0,
    explanation: "Revenue and contribution per visitor capture both conversion and order economics.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A competitor launches a lower-priced product targeting the same segment. Which response best reflects a differentiation strategy?",
    options: ["Reinforce a defensible value proposition and validate willingness to pay", "Immediately match every price reduction", "Stop communicating with existing customers", "Remove all product features to cut costs"],
    correctAnswer: 0,
    explanation: "Differentiation competes through distinctive customer value. The firm should validate whether the segment values those benefits enough to sustain its positioning.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A campaign spends ₹2 lakh and acquires 500 customers. Each customer generates ₹600 contribution per month and remains for an average of 8 months. Ignoring discounting, what is the contribution-to-CAC ratio?",
    options: ["12:1", "8:1", "6:1", "4:1"],
    correctAnswer: 0,
    explanation: "CAC = ₹2,00,000 / 500 = ₹400. Lifetime contribution = ₹600 × 8 = ₹4,800. Ratio = 4,800 / 400 = 12:1.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A company increases its advertising spend by 50%, but incremental sales increase by only 10%. Which conclusion is most defensible?",
    options: ["The marginal return on advertising may be declining", "Advertising effectiveness has definitely doubled", "The campaign has achieved perfect market saturation", "Customer retention must have increased"],
    correctAnswer: 0,
    explanation: "Spending is growing faster than incremental sales, suggesting potentially diminishing marginal returns. Further analysis is needed to establish causality.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A product's price rises from ₹100 to ₹110, while demand falls from 1,000 units to 900 units. Using the percentage-change-on-original-base method, what is the price elasticity of demand?",
    options: ["−1.0", "−0.5", "−2.0", "−1.5"],
    correctAnswer: 0,
    explanation: "Quantity changes by −10%; price changes by +10%. Elasticity = −10% / 10% = −1.0.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A company discovers that its most profitable customer segment represents only 15% of customers but 55% of contribution. What should it do before scaling acquisition?",
    options: ["Identify the segment's needs and test whether its economics can be replicated", "Target every customer segment with identical messaging", "Discontinue the profitable segment", "Optimise only for total customer registrations"],
    correctAnswer: 0,
    explanation: "Understanding the drivers of segment profitability helps determine whether acquisition can be scaled without weakening unit economics.",
  },
  {
    category: QuizCategory.MARKETING,
    question: "A company uses a penetration pricing strategy when entering a competitive market. What is its primary objective?",
    options: ["Build market adoption rapidly through a relatively low initial price", "Maximise initial margins through a premium launch price", "Restrict the product to a small exclusive customer group", "Avoid competing on market share"],
    correctAnswer: 0,
    explanation: "Penetration pricing uses a relatively low initial price to encourage adoption and gain market share.",
  },

  // HR — 12 QUESTIONS
  {
    category: QuizCategory.HR,
    question: "A company has high employee engagement scores but rising voluntary attrition among top performers. What should HR investigate first?",
    options: ["Career progression, reward fairness and external opportunity differences", "Only the average office attendance", "The company's social media reach", "Whether all employees use the same software"],
    correctAnswer: 0,
    explanation: "Engagement averages can conceal problems affecting critical talent. Career prospects, perceived fairness and competing offers can drive attrition.",
  },
  {
    category: QuizCategory.HR,
    question: "Two departments have identical average performance ratings, but one has much greater variation between employees. What should HR examine?",
    options: ["Rating distributions and manager-level calibration", "Only the organisation-wide average", "The number of office chairs", "The company's advertising expenditure"],
    correctAnswer: 0,
    explanation: "Identical averages can hide different rating distributions. Calibration helps identify inconsistent standards or manager-level rating bias.",
  },
  {
    category: QuizCategory.HR,
    question: "A firm wants to determine whether a training programme improves performance. Which design provides the strongest evidence?",
    options: ["Compare a treatment group with a suitable control group using pre- and post-training measures", "Ask only participants whether they enjoyed training", "Count training hours without measuring outcomes", "Compare employees from unrelated departments after training"],
    correctAnswer: 0,
    explanation: "A suitable comparison group and baseline measures help distinguish training effects from pre-existing differences and broader changes.",
  },
  {
    category: QuizCategory.HR,
    question: "A manager consistently hires candidates who resemble their own educational and social background. Which selection risk is most evident?",
    options: ["Similarity bias", "Recency bias", "Sunk-cost bias", "Anchoring on market prices"],
    correctAnswer: 0,
    explanation: "Similarity bias occurs when decision-makers favour candidates who share characteristics or backgrounds with themselves.",
  },
  {
    category: QuizCategory.HR,
    question: "An organisation promotes its best individual contributor into management, but team performance falls. Which explanation is most plausible?",
    options: ["Technical excellence does not automatically establish people-management capability", "Individual performance always predicts team performance", "The team must have become overstaffed", "The promotion necessarily reduced employee salaries"],
    correctAnswer: 0,
    explanation: "Managing requires delegation, coaching, communication and coordination skills beyond individual technical performance.",
  },
  {
    category: QuizCategory.HR,
    question: "A business has a 20% annual turnover rate and an average workforce of 250 employees. Approximately how many employees left during the year?",
    options: ["50", "25", "40", "75"],
    correctAnswer: 0,
    explanation: "Departures = 250 × 20% = 50 employees.",
  },
  {
    category: QuizCategory.HR,
    question: "A company wants to reduce bias in performance reviews. Which intervention is most directly aligned with that objective?",
    options: ["Structured criteria, behavioural evidence and calibration", "Allowing managers to use unrestricted personal impressions", "Removing all performance documentation", "Ranking employees solely by tenure"],
    correctAnswer: 0,
    explanation: "Structured criteria and evidence make assessments more consistent, while calibration can identify differences in manager standards.",
  },
  {
    category: QuizCategory.HR,
    question: "A critical role has only one employee with the required expertise. Which HR practice best reduces continuity risk?",
    options: ["Succession planning and knowledge transfer", "Increasing the employee's meeting schedule", "Removing role documentation", "Delaying all internal development"],
    correctAnswer: 0,
    explanation: "Succession planning and knowledge transfer reduce dependence on a single individual and improve organisational resilience.",
  },
  {
    category: QuizCategory.HR,
    question: "An organisation's absenteeism falls after introducing strict attendance penalties, but employee turnover rises. What is the most important management concern?",
    options: ["The intervention may improve attendance while damaging retention and employee relations", "The policy has necessarily improved productivity", "Lower absenteeism proves higher engagement", "Turnover has no relationship with workplace policy"],
    correctAnswer: 0,
    explanation: "A single metric can improve while broader workforce outcomes deteriorate. HR should assess retention, morale and unintended consequences.",
  },
  {
    category: QuizCategory.HR,
    question: "A company uses forced ranking to classify employees, even when most employees meet performance expectations. What is a major potential weakness?",
    options: ["It can create artificial distinctions and undermine collaboration", "It guarantees objective performance measurement", "It eliminates manager bias", "It ensures every team has identical productivity"],
    correctAnswer: 0,
    explanation: "Forced ranking imposes a distribution regardless of actual performance differences and can encourage unhealthy internal competition.",
  },
  {
    category: QuizCategory.HR,
    question: "A company has 40 employees in a critical department. Eight employees leave during the year, while average headcount remains 40. What is the annual turnover rate?",
    options: ["20%", "10%", "15%", "25%"],
    correctAnswer: 0,
    explanation: "Turnover rate = 8 / 40 × 100 = 20%.",
  },
  {
    category: QuizCategory.HR,
    question: "A leadership development programme improves participant scores, but their teams show no measurable improvement after six months. What should HR evaluate?",
    options: ["Transfer of learning into workplace behaviour and organisational conditions", "Only the number of training sessions delivered", "The colour and design of training materials", "Whether participants enjoyed the venue"],
    correctAnswer: 0,
    explanation: "Learning gains do not automatically translate into workplace results. Application opportunities, manager support and behavioural change need evaluation.",
  },

  // BUSINESS STRATEGY — 12 QUESTIONS
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A company has strong capabilities in logistics but weak product innovation. Which diversification move is most consistent with a related diversification strategy?",
    options: ["Enter an adjacent market where its logistics capability creates an advantage", "Acquire an unrelated business with no transferable capability", "Exit every market it currently serves", "Invest only in unrelated financial instruments"],
    correctAnswer: 0,
    explanation: "Related diversification uses transferable capabilities or resources to create strategic fit in an adjacent market.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "An industry has high fixed costs, low product differentiation and slow market growth. Which competitive pressure is likely to be especially intense?",
    options: ["Rivalry among existing competitors", "Supplier power is necessarily zero", "Threat of substitutes is impossible", "Buyer power is necessarily absent"],
    correctAnswer: 0,
    explanation: "High fixed costs, low differentiation and slow growth can intensify price and market-share rivalry.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A firm has valuable and rare resources, but competitors can easily imitate them. Under the VRIO framework, what is the likely outcome?",
    options: ["Temporary competitive advantage", "Sustained competitive advantage", "Permanent monopoly", "Competitive disadvantage in every market"],
    correctAnswer: 0,
    explanation: "Valuable and rare resources can create an advantage, but easy imitation makes that advantage temporary.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A company lowers prices to gain market share, but competitors can match the reduction and have lower costs. What is the central strategic risk?",
    options: ["A price war that weakens the firm's profitability", "Guaranteed long-term differentiation", "Automatic improvement in customer loyalty", "Elimination of competitive rivalry"],
    correctAnswer: 0,
    explanation: "A lower-cost competitor can sustain price reductions more easily. Matching prices without a cost advantage can erode margins.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A firm reports strong growth in a new market, but its customer acquisition cost exceeds customer lifetime value. What should management prioritise?",
    options: ["Repair unit economics before accelerating acquisition", "Increase acquisition spending without limits", "Ignore retention and contribution margins", "Measure success only through website visits"],
    correctAnswer: 0,
    explanation: "When acquisition cost exceeds lifetime value, growth can destroy value. Management should improve acquisition efficiency, retention or customer economics.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A company faces uncertain regulation and rapidly changing technology. Which planning approach is most suitable?",
    options: ["Scenario planning with strategic options and trigger points", "A fixed ten-year forecast with no revisions", "Ignore external changes until competitors respond", "Commit all resources to one irreversible scenario"],
    correctAnswer: 0,
    explanation: "Scenario planning prepares the organisation for multiple plausible futures and identifies signals that should trigger strategic adjustments.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A business unit has high market growth but low relative market share in the BCG matrix. How is it classified?",
    options: ["Question mark", "Star", "Cash cow", "Dog"],
    correctAnswer: 0,
    explanation: "The BCG matrix classifies high-growth, low-relative-share businesses as question marks.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A manufacturer acquires its key raw-material supplier. Which strategic move does this represent?",
    options: ["Backward vertical integration", "Forward vertical integration", "Horizontal integration", "Unrelated diversification"],
    correctAnswer: 0,
    explanation: "Acquiring a supplier moves the manufacturer upstream in its value chain: backward vertical integration.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A firm has a strong brand and distribution network but faces declining returns because its industry is becoming commoditised. Which strategic response deserves investigation?",
    options: ["Reconfigure its value proposition and capabilities toward less commoditised customer needs", "Continue competing only through undifferentiated price cuts", "Ignore changes in customer preferences", "Increase capacity without testing demand"],
    correctAnswer: 0,
    explanation: "The firm should seek new sources of differentiation and value rather than rely on advantages that commoditisation is eroding.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A company acquires a competitor operating at the same stage of the value chain. What type of integration is this?",
    options: ["Horizontal integration", "Backward vertical integration", "Forward vertical integration", "Conglomerate diversification"],
    correctAnswer: 0,
    explanation: "Horizontal integration involves combining with or acquiring a competitor at the same stage of the value chain.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A startup has limited cash runway but strong customer demand. Which decision best reflects strategic resource prioritisation?",
    options: ["Focus spending on the activities with the strongest validated path to sustainable revenue", "Expand into every available market simultaneously", "Increase fixed costs before validating demand", "Prioritise vanity metrics over cash generation"],
    correctAnswer: 0,
    explanation: "With limited runway, the startup should prioritise validated revenue drivers, preserve cash and avoid spreading resources across unproven opportunities.",
  },
  {
    category: QuizCategory.BUSINESS_STRATEGY,
    question: "A diversified company discovers that two business units share technology, suppliers and customer channels. Which corporate-level concept could create value from this relationship?",
    options: ["Economies of scope", "Diseconomies of scale", "Market cannibalisation only", "Unrelated diversification"],
    correctAnswer: 0,
    explanation: "Economies of scope arise when shared resources or capabilities allow multiple business activities to operate more efficiently together.",
  },
];

async function main() {
  console.log("Starting IDEANOVA question bank seed...");

  const categories = Object.values(QuizCategory);

  for (const item of questions) {
    if (
      item.options.length !== 4 ||
      item.correctAnswer < 0 ||
      item.correctAnswer >= item.options.length
    ) {
      throw new Error(`Invalid question: ${item.question}`);
    }

    const existing = await prisma.question.findFirst({
      where: { question: item.question },
    });

    if (!existing) {
      await prisma.question.create({
        data: {
          category: item.category,
          question: item.question,
          options: item.options,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation,
          difficulty: 5,
          isActive: true,
        },
      });
    }
  }

  console.log("\nQuestion bank totals:");

  let total = 0;

  for (const category of categories) {
    const count = await prisma.question.count({
      where: { category, isActive: true },
    });

    total += count;
    console.log(`${category}: ${count}`);
  }

  console.log(`\nTotal active questions: ${total}`);

  if (total < 50) {
    throw new Error(`Expected at least 50 questions, found ${total}.`);
  }

  console.log("\nIDEANOVA question bank seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Question bank seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
