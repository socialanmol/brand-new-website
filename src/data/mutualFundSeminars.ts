import type { SeminarTopic } from "./personalFinanceSeminars";

const frames = [
  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
];

function slides(index: number) {
  return [0, 1, 2].map((offset) => frames[(index + offset) % frames.length]);
}

export type MutualFundListing = {
  pageId: string;
  title: string;
  recurrence: string;
  audience: string;
  image: string;
};

const topics: Array<Omit<SeminarTopic, "images"> & { recurrence: string; audience: string }> = [
  {
    pageId: "mutual-funds-101",
    title: "Mutual Funds 101: Everything a beginner needs to know",
    recurrence: "Monthly",
    audience: "First-time investors",
    description: "A beginner session on what a mutual fund is, how units and NAV work, and the difference between equity, debt, and hybrid schemes.",
    benefits: "A plain map of fund types, the costs worth reading on a factsheet, and a first question list to use before investing.",
    pollQuestion: "Where are you with mutual funds today?",
    pollOptions: [
      "I have not invested yet",
      "I started a SIP and want the basics",
      "Someone else chose my funds",
      "I want to understand costs and risk first",
    ],
    testimonials: [
      { quote: "The factsheet walkthrough made NAV, expense ratio, and exit load usable, not theoretical.", name: "Asha Menon", role: "First-time investor" },
      { quote: "I left knowing which questions to ask before starting a SIP.", name: "Rohit Jain", role: "Analyst" },
      { quote: "Clear about what a mutual fund is, and what it is not.", name: "Neelam Shah", role: "Teacher" },
    ],
  },
  {
    pageId: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum: Which is better and when?",
    recurrence: "Once a quarter",
    audience: "Existing and new investors",
    description: "A session on when a monthly SIP fits, when a lump sum can be spread out, and how a windfall is different from a salary surplus.",
    benefits: "A way to match the investment method to the money you actually have, instead of treating SIP and lump sum as opposites.",
    pollQuestion: "What money are you deciding how to invest?",
    pollOptions: [
      "A monthly salary surplus",
      "A bonus or one-time amount",
      "Both a SIP and a lump sum",
      "I am not sure which method fits",
    ],
    testimonials: [
      { quote: "The bonus example was the useful part. A lump sum does not have to go in on one day.", name: "Karan Desai", role: "Consultant" },
      { quote: "I stopped treating SIP as the only correct answer.", name: "Meera Iyer", role: "Designer" },
      { quote: "Practical rules for money that arrives once, versus money that arrives every month.", name: "Adil Khan", role: "Engineer" },
    ],
  },
  {
    pageId: "power-of-compounding",
    title: "The Power of Compounding: Why starting early matters",
    recurrence: "Once a quarter",
    audience: "Young professionals",
    description: "A session on how time in the market changes a monthly amount, and why waiting for a perfect start date costs more than a small early SIP.",
    benefits: "A simple picture of time, contribution, and interruption, plus a starting amount you can actually keep.",
    pollQuestion: "What is holding the first SIP back?",
    pollOptions: [
      "I want to wait for a better market",
      "The amount I can start with feels too small",
      "I have started and keep pausing",
      "I want to see how time changes the result",
    ],
    testimonials: [
      { quote: "The pause in the SIP was the lesson. Starting early only works if the instalments continue.", name: "Tanvi Rao", role: "Product Manager" },
      { quote: "A small amount with a long horizon made more sense than waiting for a large one.", name: "Harsh Vardhan", role: "Analyst" },
      { quote: "No promise of a number. Just the arithmetic of time.", name: "Sana Qureshi", role: "Teacher" },
    ],
  },
  {
    pageId: "build-1-crore-portfolio",
    title: "How to build a ₹1 crore portfolio",
    recurrence: "Once a quarter",
    audience: "Salaried individuals",
    description: "A session on turning a ₹1 crore goal into a time horizon, a monthly amount, and an asset mix a salaried household can review.",
    benefits: "A target date, a contribution to test against your salary, and a check that the goal is not only equity.",
    pollQuestion: "How are you approaching a ₹1 crore goal?",
    pollOptions: [
      "I have the number but not a monthly amount",
      "I invest, but it is not tied to this goal",
      "I want to see what the timeline implies",
      "Debt or other goals come first",
    ],
    testimonials: [
      { quote: "The goal became a monthly figure instead of a round number on a poster.", name: "Nikhil Kapoor", role: "Sales Manager" },
      { quote: "Useful to see the goal beside the emergency fund, not instead of it.", name: "Divya Nair", role: "HR Professional" },
      { quote: "The timeline was honest. A crore is a horizon, not a product.", name: "Arjun Reddy", role: "Engineer" },
    ],
  },
  {
    pageId: "build-5-crore-retirement",
    title: "How to build a ₹5 crore retirement corpus",
    recurrence: "Once a quarter",
    audience: "35–50 age group",
    description: "A session for mid-career households on estimating a retirement corpus, the savings rate that supports it, and the role of equity, debt, and existing EPF or NPS.",
    benefits: "A retirement spending check, a gap against what you already hold, and a contribution you can review each year.",
    pollQuestion: "What does your retirement money look like today?",
    pollOptions: [
      "Mostly EPF or NPS",
      "A mix of EPF and mutual funds",
      "I have not put a number on retirement spending",
      "I am within 15 years of the date and want a gap check",
    ],
    testimonials: [
      { quote: "We started from spending, not from a round crore number.", name: "Anil Sharma", role: "Engineering Manager" },
      { quote: "EPF was counted properly instead of being ignored or double-counted.", name: "Kavita Joshi", role: "Doctor" },
      { quote: "Clear that the next ten years of contributions matter more than a late catch-up.", name: "Ramesh Iyer", role: "Business Owner" },
    ],
  },
  {
    pageId: "sips-during-corrections",
    title: "SIPs during market corrections: What should investors do?",
    recurrence: "Monthly / market-triggered",
    audience: "Existing investors",
    description: "A session on what a market fall does to an existing SIP, when continuing is the plan, and when a fall is a reason to review the goal rather than the headline.",
    benefits: "A rule for instalments during a fall, a check for money needed soon, and fewer decisions made from a red portfolio screen.",
    pollQuestion: "What do you usually do when markets fall?",
    pollOptions: [
      "I stop the SIP",
      "I continue and feel uneasy",
      "I add more without a rule",
      "I want a rule before the next fall",
    ],
    testimonials: [
      { quote: "The distinction between money needed this year and money for ten years was the whole session.", name: "Farhan Ali", role: "Consultant" },
      { quote: "I had been pausing SIPs exactly when the instalment bought more units.", name: "Pooja Menon", role: "Marketing Manager" },
      { quote: "No drama. A checklist for the next correction.", name: "Vikram Malhotra", role: "Operations Manager" },
    ],
  },
  {
    pageId: "select-the-right-mutual-fund",
    title: "How to select the right mutual fund",
    recurrence: "Once a quarter",
    audience: "DIY investors",
    description: "A session on choosing a scheme from the goal and the time horizon first, then reading category, cost, and consistency instead of last year's return.",
    benefits: "A short selection order, the factsheet lines that matter, and a reason to ignore a one-year ranking.",
    pollQuestion: "How do you choose a fund today?",
    pollOptions: [
      "Last year's highest return",
      "A friend's recommendation",
      "The category, then the fund",
      "I want a repeatable checklist",
    ],
    testimonials: [
      { quote: "Starting from the category, not the top-return list, changed the shortlist.", name: "Siddharth Jain", role: "Software Engineer" },
      { quote: "Expense ratio and exit load finally sat next to the return chart.", name: "Ritika Bose", role: "Research Associate" },
      { quote: "A checklist I can use without a new app.", name: "Aditya Kulkarni", role: "DIY investor" },
    ],
  },
  {
    pageId: "mutual-fund-portfolio-review",
    title: "Mutual Fund Portfolio Review: What should you look for?",
    recurrence: "Monthly",
    audience: "Existing MF investors",
    description: "A session on reading a portfolio you already hold: overlap, too many schemes, goal fit, and what a review is for besides chasing last year's winner.",
    benefits: "A review agenda, a way to spot duplicate funds, and a shorter list tied back to goals.",
    pollQuestion: "What does your current mutual fund list look like?",
    pollOptions: [
      "A few schemes with a clear goal",
      "Many schemes added over the years",
      "I am not sure what I hold",
      "I review only when the market falls",
    ],
    testimonials: [
      { quote: "Overlap was the surprise. Three funds were the same large-cap exposure.", name: "Neha Kulkarni", role: "Architect" },
      { quote: "The review had a purpose other than selling the loser and buying the winner.", name: "Joseph Mathew", role: "Teacher" },
      { quote: "I left with fewer schemes and a reason for each one that stayed.", name: "Ananya Pillai", role: "Designer" },
    ],
  },
  {
    pageId: "asset-allocation",
    title: "Asset Allocation: The secret behind a balanced portfolio",
    recurrence: "Once a quarter",
    audience: "Serious investors",
    description: "A session on dividing money across equity, debt, and cash for the goals you actually have, and on rebalancing when one part runs ahead.",
    benefits: "An allocation you can write down, a rebalance trigger, and a reason the mix matters more than a single fund.",
    pollQuestion: "How is your money divided today?",
    pollOptions: [
      "Almost all equity",
      "Mostly deposits and debt",
      "A mix I have not reviewed",
      "I want a written allocation",
    ],
    testimonials: [
      { quote: "Rebalancing had a number. I no longer wait for a feeling.", name: "Manish Agarwal", role: "Founder" },
      { quote: "The mix was tied to goals with different dates, which I had treated as one pile.", name: "Tara D'Souza", role: "Lawyer" },
      { quote: "Useful after the fund-selection session. Allocation comes first.", name: "Imran Sheikh", role: "Civil Engineer" },
    ],
  },
  {
    pageId: "cap-categories",
    title: "Small Cap, Mid Cap and Large Cap: Understanding the differences",
    recurrence: "Once a quarter",
    audience: "MF investors",
    description: "A session on how large, mid, and small companies differ in a mutual fund portfolio, including the swings an investor has to be able to sit through.",
    benefits: "A plain difference between the three categories, a sense of the fall you are signing up for, and a place for each in an allocation.",
    pollQuestion: "Which category are you unsure about?",
    pollOptions: [
      "Large cap",
      "Mid cap",
      "Small cap",
      "How much of each belongs in one portfolio",
    ],
    testimonials: [
      { quote: "Small cap stopped being a return slogan and became a volatility decision.", name: "Kunal Desai", role: "Business Analyst" },
      { quote: "I could finally explain the three categories without a chart of last year's winners.", name: "Shreya Gupta", role: "Pharmacist" },
      { quote: "The session put a cap on how much small cap a goal with a short date can hold.", name: "Nandini Rao", role: "HR Business Partner" },
    ],
  },
  {
    pageId: "beyond-mutual-funds",
    title: "Why your portfolio needs more than just good mutual funds",
    recurrence: "Once a quarter",
    audience: "Existing investors",
    description: "A session on the pieces around a mutual fund portfolio: emergency cash, insurance, debt, EPF, and the goals that should not sit in equity.",
    benefits: "A household balance sheet, not only a fund list, and a check that protection and near-term money are in place.",
    pollQuestion: "What sits outside your mutual funds?",
    pollOptions: [
      "An emergency fund and term cover",
      "Mostly the mutual funds themselves",
      "EPF, property, or deposits I have not counted",
      "I want one view of the whole household",
    ],
    testimonials: [
      { quote: "The good fund was not the missing piece. The emergency fund was.", name: "Deepa Nair", role: "Project Manager" },
      { quote: "Term cover and the SIP were finally in the same conversation.", name: "Arvind Rao", role: "Banker" },
      { quote: "A wider list than the CAS statement, which is what a review needed.", name: "Sneha Iyer", role: "Teacher" },
    ],
  },
  {
    pageId: "risk-volatility-behaviour",
    title: "Understanding risk, volatility and investor behaviour",
    recurrence: "Once a quarter",
    audience: "All investors",
    description: "A session on the difference between a temporary fall and a loss you lock in, and on the habits that make investors leave a suitable plan.",
    benefits: "A personal risk check, a vocabulary for volatility, and a pause before acting on a headline or a neighbour's return.",
    pollQuestion: "What usually changes your investment plan?",
    pollOptions: [
      "A sharp market fall",
      "Someone else's recent return",
      "A news headline",
      "I want to notice the habit before it costs me",
    ],
    testimonials: [
      { quote: "Volatility and risk were separated. I had been using them as the same word.", name: "Fatima Noor", role: "Researcher" },
      { quote: "The neighbour's fund story was called out without mocking it.", name: "Ishaan Verma", role: "Analyst" },
      { quote: "A useful pause between the screen turning red and the redemption.", name: "Maya Krishnan", role: "Doctor" },
    ],
  },
  {
    pageId: "second-income",
    title: "How to create a second income through investments",
    recurrence: "Once a quarter",
    audience: "Professionals",
    description: "A session on what a second income from investments requires: a corpus, a withdrawal rate, and the tax and stability difference between growth and income.",
    benefits: "A distinction between building the corpus and drawing from it, and a reason not to chase yield before the base is in place.",
    pollQuestion: "What do you mean by a second income?",
    pollOptions: [
      "A monthly amount from investments now",
      "Income I want in a few years",
      "Dividends or interest I already receive",
      "I am still building the corpus",
    ],
    testimonials: [
      { quote: "Yield was put after the corpus, which reversed the way I had been searching for funds.", name: "Priyanka Das", role: "Architect" },
      { quote: "The withdrawal conversation was calmer than a dividend screen.", name: "Mohammed Irfan", role: "Entrepreneur" },
      { quote: "Clear that a second income is a later stage, not a substitute for saving.", name: "Lakshmi Nair", role: "Nurse" },
    ],
  },
  {
    pageId: "sip-5000-freedom",
    title: "From ₹5,000 SIP to financial freedom: The long-term journey",
    recurrence: "Once a quarter",
    audience: "Young earners",
    description: "A session for young earners on starting with ₹5,000, raising the SIP as income grows, and defining financial freedom as a spending number rather than a slogan.",
    benefits: "A starting SIP, a step-up habit, and a freedom target written as monthly spending instead of a vague finish line.",
    pollQuestion: "Where is your SIP today?",
    pollOptions: [
      "I can start around ₹5,000",
      "I invest less and want to step up",
      "I invest more and have no step-up rule",
      "Financial freedom is still an undefined number",
    ],
    testimonials: [
      { quote: "The step-up, not the first ₹5,000, was the part that changed the horizon.", name: "Aisha Khan", role: "Analyst" },
      { quote: "Freedom was defined as spending, which made the SIP amount less magical and more useful.", name: "Varun Shah", role: "Engineer" },
      { quote: "Encouraging without pretending ₹5,000 alone finishes the job.", name: "Harsh Patel", role: "Designer" },
    ],
  },
];

export const MUTUAL_FUND_SEMINARS: SeminarTopic[] = topics.map((topic, index) => ({
  pageId: topic.pageId,
  title: topic.title,
  description: topic.description,
  benefits: topic.benefits,
  images: slides(index),
  pollQuestion: topic.pollQuestion,
  pollOptions: topic.pollOptions,
  testimonials: topic.testimonials,
}));

export const MUTUAL_FUND_LISTINGS: MutualFundListing[] = topics.map((topic, index) => ({
  pageId: topic.pageId,
  title: topic.title,
  recurrence: topic.recurrence,
  audience: topic.audience,
  image: frames[index % frames.length],
}));
