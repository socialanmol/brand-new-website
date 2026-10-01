export interface Book {
  slug: string;
  title: string;
  author: string;
  yearOrTag: string;
  coverTitle: string;
  coverGradient: string;
  shortDesc: string;
  summaryParagraphs: string[];
  pdfUrl?: string;
  disclaimer?: string;
}

export const BOOKS: Book[] = [
  {
    slug: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki and Sharon Lechter, 1997",
    yearOrTag: "1997",
    coverTitle: "Rich Dad\nPoor Dad",
    coverGradient: "linear-gradient(160deg, #1A3B9F 0%, #091540 100%)",
    shortDesc: "1997 book by Robert Kiyosaki and Sharon Lechter on mindset, assets, and liabilities.",
    pdfUrl: "https://drive.google.com/file/d/16HWB639GJfPRCqyWY90j2KW9Cpbarkw5/view?usp=sharing",
    summaryParagraphs: [
      "Robert Kiyosaki structures this book around two father figures from his own life: his biological father, a highly educated government employee he calls his \"poor dad,\" and his best friend's father, a school-dropout-turned-entrepreneur he calls his \"rich dad.\" The book contrasts how each man thought and talked about money, and argues that this mindset — not income, credentials, or luck — is what actually separates people who build wealth from people who don't.",
      "The central idea most readers remember is the distinction between assets and liabilities. Kiyosaki defines an asset simply as something that puts money in your pocket, and a liability as something that takes money out. His pointed argument is that many things the middle class is taught to call assets — most obviously, the home you live in — are often liabilities in this strict sense, because they cost money every month rather than generating it.",
      "From there, the book builds a broader case for financial literacy: understanding accounting, investing, markets, and law well enough to make informed decisions rather than outsourcing every financial choice. Kiyosaki is critical of the traditional advice to \"go to school, get a good job, work hard\" as a complete strategy, arguing it teaches people to work for money without ever learning how to make money work for them.",
      "Whether or not every specific claim holds up to scrutiny, the book's lasting contribution is cultural: it popularised the idea that financial education is a skill that can be learned, and that building passive income streams — rather than simply earning a higher salary — is the more reliable path to financial independence.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "cashflow-quadrant",
    title: "Rich Dad's CASHFLOW Quadrant",
    author: "Robert Kiyosaki",
    yearOrTag: "Rich Dad Series",
    coverTitle: "CASHFLOW\nQuadrant",
    coverGradient: "linear-gradient(160deg, #0D1E52 0%, #1A3B9F 100%)",
    shortDesc: "Rich Dad's Guide to Financial Freedom and moving from active income to owning systems.",
    pdfUrl: "https://drive.google.com/file/d/1zdZ7-lOxBKa_BaPx0JA8TOiB8elyoR2Y/view?usp=sharing",
    summaryParagraphs: [
      "This follow-up to Rich Dad Poor Dad introduces a simple framework Kiyosaki calls the CASHFLOW Quadrant, split into four ways people earn income: E (Employee), S (Self-Employed or Small Business Owner), B (Business Owner), and I (Investor). The letters aren't meant to describe job titles so much as different relationships with money, risk, and time.",
      "The book's core argument is that the left side of the quadrant — E and S — generally involves trading your own time and effort directly for income. Move to the right side — B and I — and the goal shifts to owning systems and assets that generate income whether or not you personally show up. Kiyosaki argues that most financial education focuses on preparing people for the E quadrant, leaving the B and I quadrants largely unaddressed.",
      "Beyond the framework itself, the book spends considerable time on the different tax treatment, risk profile, and mindset each quadrant requires — and is candid that moving from the left side to the right side isn't simply a matter of working harder, but of learning a different set of skills: how to build or buy systems, and how to evaluate and manage investments.",
      "Read alongside Rich Dad Poor Dad, this book is less about the philosophy of financial literacy and more a practical map of the different routes people take to get there — useful less as a step-by-step manual than as a lens for thinking about which quadrant your own income currently sits in, and why.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    yearOrTag: "Bestseller",
    coverTitle: "The Psychology\nof Money",
    coverGradient: "linear-gradient(160deg, #1A3B9F 0%, #091540 100%)",
    shortDesc: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
    summaryParagraphs: [
      "Morgan Housel's central premise is disarmingly simple: doing well with money has little to do with how smart you are, and a lot to do with how you behave — and behavior is hard to teach in a classroom because it's shaped by ego, pride, envy, and each person's own narrow slice of lived experience.",
      "The book is structured as a series of short, largely independent essays rather than one continuous argument, which makes it easy to read in pieces. Recurring themes include the outsized role of luck and risk in financial outcomes (and why it's dangerous to study only the extreme winners), the idea that wealth is genuinely what you don't spend rather than what you earn or display, and the argument that a person's savings rate matters more to most people's financial outcomes than their investment returns.",
      "One of the book's most quoted ideas is that everyone forms their view of how money \"works\" from an incredibly small and specific set of personal experiences — the country they grew up in, the decade, their family's financial situation — and mistakes that narrow experience for a universal truth. Housel uses this to explain why reasonable, intelligent people can hold wildly different and equally confident views about markets and risk.",
      "The book also spends real time on the psychological difficulty of staying invested through volatility, arguing that the ability to endure uncertainty — not the ability to predict it — is what compounding actually rewards over long periods. It's less a technical investing book than a book about the temperament investing requires.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "joys-of-compounding",
    title: "The Joys of Compounding",
    author: "Gautam Baid",
    yearOrTag: "Gautam Baid",
    coverTitle: "The Joys of\nCompounding",
    coverGradient: "linear-gradient(160deg, #091540 0%, #1A3B9F 100%)",
    shortDesc: "The Passionate Pursuit of Lifelong Learning — synthesis of mental models and value investing.",
    summaryParagraphs: [
      "Gautam Baid, an India-based value investor, wrote this book as a synthesis of the mental models, reading habits, and life philosophy he credits with shaping his own investment approach — drawing heavily on the writings and speeches of investors like Warren Buffett and Charlie Munger, alongside ideas from psychology, philosophy, and other disciplines.",
      "The title's double meaning is deliberate: the book is about the financial power of compounding returns over long periods, but equally about compounding as a life philosophy — the idea that small, consistent improvements in knowledge, character, and habits accumulate into outsized results over time, in much the same way modest, consistent investment returns compound into significant wealth given enough time.",
      "A recurring theme is the importance of continuous learning and building a personal \"latticework\" of mental models from multiple disciplines, rather than relying on a single framework or formula to make investment decisions. Baid is also emphatic about the importance of avoiding permanent capital loss and staying within one's circle of competence, echoing the more conservative, business-focused school of value investing.",
      "Structurally, the book reads less like a conventional investing manual and more like an extensively annotated commonplace book — dense with quotations and references — making it a useful entry point for readers who want to explore the broader canon of value investing and mental-models thinking that has influenced it.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "hit-investing",
    title: "H.I.T. Investing",
    author: "Mahesh Joshi",
    yearOrTag: "Mahesh Joshi",
    coverTitle: "H.I.T.\nInvesting",
    coverGradient: "linear-gradient(160deg, #0D1E52 0%, #1A3B9F 100%)",
    shortDesc: "Strong Returns Through High-Impact Investing Leveraging Technology.",
    summaryParagraphs: [
      "H.I.T. Investing carries the subtitle \"Strong Returns Through High-Impact Investing Leveraging Technology,\" which points to its central focus: an investment approach built around identifying companies positioned to benefit from technological change, and using that lens as a filter for stronger long-term returns.",
      "This is a more specialised, less widely-covered title than the other books on this list, and we want to be upfront about that rather than overstate our familiarity with it: we don't have detailed, verified knowledge of its specific frameworks, case studies, or conclusions beyond what the title and subtitle describe.",
      "If you've read it and think it deserves a fuller summary here, or if you can share the book or a synopsis, we'd genuinely like to put together a proper overview rather than guess at its contents.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "one-up-on-wall-street",
    title: "One Up on Wall Street",
    author: "Peter Lynch and John Rothchild, 1989",
    yearOrTag: "1989",
    coverTitle: "One Up on\nWall Street",
    coverGradient: "linear-gradient(160deg, #1A3B9F 0%, #091540 100%)",
    shortDesc: "How to use what you already know to make money in the market.",
    summaryParagraphs: [
      "Peter Lynch managed Fidelity's Magellan Fund to one of the strongest long-term track records in mutual fund history, and this book lays out the reasoning behind his stock-picking approach — aimed squarely at individual investors rather than professionals.",
      "Lynch's central argument is that ordinary investors have a structural advantage Wall Street analysts often lack: direct, everyday exposure to products, stores, and businesses long before those companies show up on an institutional radar. His famous advice to \"invest in what you know\" isn't a suggestion to buy blindly based on familiarity, but to use everyday observation as a starting point for research that professionals, removed from the consumer experience, might miss entirely.",
      "The book introduces a practical framework for categorising stocks — slow growers, stalwarts, fast growers, cyclicals, turnarounds, and asset plays — arguing that each category calls for a different valuation approach and a different set of expectations. Lynch also popularised the PEG ratio (price/earnings relative to growth rate) as a way to judge whether a growing company's stock price is actually justified by its growth.",
      "Throughout, Lynch is candid that this approach demands real homework — reading annual reports, understanding a company's competitive position, and revisiting the thesis regularly — and is skeptical of both blindly following tips and of investors who buy a stock without being able to explain, in a sentence or two, why they own it.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
  {
    slug: "lords-of-finance",
    title: "Lords of Finance",
    author: "Liaquat Ahamed",
    yearOrTag: "Pulitzer Winner",
    coverTitle: "Lords of\nFinance",
    coverGradient: "linear-gradient(160deg, #091540 0%, #0D1E52 100%)",
    shortDesc: "1929, the Great Depression, and the Bankers Who Broke the World.",
    summaryParagraphs: [
      "Winner of the 2010 Pulitzer Prize for History, Lords of Finance tells the story of the Great Depression through the lives and decisions of the central bankers of the world's four major economies at the time: Montagu Norman (Bank of England), Benjamin Strong (Federal Reserve Bank of New York), Hjalmar Schacht (Reichsbank), and Émile Moreau (Banque de France).",
      "Ahamed's central thesis is that the economic collapse of the 1930s was not an inevitable systemic failure, but the direct result of catastrophic misjudgments by this small group of men — driven by their dogmatic commitment to the gold standard and an inability to cooperate across borders during crisis moments.",
      "The book offers profound lessons on monetary policy, the fragility of international financial systems, and how hubris and flawed economic models can amplify minor downturns into historic global catastrophes.",
    ],
    disclaimer:
      "This is a general overview of the book's themes for educational purposes and is not a substitute for reading the original text. Views expressed in the book are the author's own and do not constitute investment advice from MyAnmol.",
  },
];