export type SeminarQuote = { quote: string; name: string; role: string };

export type SeminarTopic = {
  pageId: string;
  title: string;
  description: string;
  benefits: string;
  images: string[];
  pollQuestion: string;
  pollOptions: string[];
  testimonials: SeminarQuote[];
};

const classroom = [
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
];

export const PERSONAL_FINANCE_SEMINARS: SeminarTopic[] = [
  {
    pageId: "manage-your-salary",
    title: "How to manage your salary better: Save, Spend & Invest",
    description: "A practical entry-level masterclass for young earners on optimizing take-home pay, smart budgeting, and building healthy cash flow habits.",
    benefits: "Clear understanding of monthly cash allocation, reduced impulse spending, and a structured approach to initial savings.",
    images: classroom,
    pollQuestion: "What is your primary financial goal for the next 12 months?",
    pollOptions: [
      "Building an emergency fund & better budgeting",
      "Starting my first mutual fund SIP",
      "Clearing existing debt / loans",
      "Planning for retirement / long-term wealth",
    ],
    testimonials: [
      { quote: "Mohit's budgeting framework completely transformed how I handle my monthly salary. Highly practical!", name: "Rahul Sharma", role: "Software Engineer" },
      { quote: "The 2-bank approach was an eye-opener. I finally have control over my savings vs spending.", name: "Ananya Deshmukh", role: "Marketing Specialist" },
      { quote: "Clear, jargon-free, and extremely actionable. Every young earner should attend this masterclass.", name: "Karan Mehta", role: "Financial Analyst" },
      { quote: "The session gave me a structured roadmap to build my first 10 lakh without stressing over every rupee.", name: "Priya Nair", role: "HR Professional" },
      { quote: "Engaging presentation style and incredible insights into smart cash flow habits.", name: "Vikram Malhotra", role: "Operations Manager" },
    ],
  },
  {
    pageId: "2-bank-approach",
    title: "The 2-bank approach to better budgeting",
    description: "A practical session on using two bank accounts so salary, bills, and saving stop competing inside one balance.",
    benefits: "A two-account setup you can start this month, a transfer that happens before spending, and fewer end-of-month surprises.",
    images: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
      classroom[0],
      classroom[1],
    ],
    pollQuestion: "How does your salary move today?",
    pollOptions: [
      "One account pays for everything",
      "I move savings by hand when money is left",
      "I already use a separate savings account",
      "I am not sure where the month's money goes",
    ],
    testimonials: [
      { quote: "Splitting the salary on day one made the spending account honest. I stopped guessing what was left.", name: "Neha Kulkarni", role: "Product Designer" },
      { quote: "The session showed which bills stay in the spending account and what leaves on payday.", name: "Arjun Iyer", role: "Consultant" },
      { quote: "Simple, specific, and easy to set up with the bank I already use.", name: "Sana Qureshi", role: "Teacher" },
      { quote: "I finally have a number that is allowed to be spent, and another number that is not.", name: "Rohit Banerjee", role: "Sales Manager" },
    ],
  },
  {
    pageId: "10-money-mistakes",
    title: "10 money mistakes that can cost you lakhs",
    description: "A session on the everyday decisions that quietly reduce what a household can keep, from idle cash and costly debt to buying a product before a plan.",
    benefits: "A short list of mistakes to stop, a clearer order for emergency money, protection, and investing, and fewer purchases made in a hurry.",
    images: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      classroom[1],
      classroom[2],
    ],
    pollQuestion: "Which money habit do you most want to change?",
    pollOptions: [
      "Leaving too much cash idle",
      "Carrying expensive debt",
      "Buying products without a goal",
      "Skipping protection for the family",
    ],
    testimonials: [
      { quote: "The list was uncomfortably familiar. I left with three changes I could make this week.", name: "Meera Joshi", role: "Architect" },
      { quote: "No product pitch. Just the order in which money decisions should be made.", name: "Farhan Ali", role: "Operations Lead" },
      { quote: "I understood why a high-interest loan was costing more than my investments could earn.", name: "Divya Rao", role: "Chartered Accountant" },
      { quote: "Clear examples, and a checklist I could share with my spouse the same evening.", name: "Nikhil Kapoor", role: "Entrepreneur" },
    ],
  },
  {
    pageId: "how-much-to-save",
    title: "How much should you save from your monthly income?",
    description: "A session for young earners on choosing a monthly savings amount that still leaves room for rent, family support, and bills.",
    benefits: "A savings number you can defend, a split between emergency money and longer-term investing, and a first month you can actually follow.",
    images: [
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
      classroom[0],
      classroom[2],
    ],
    pollQuestion: "What best describes your monthly saving today?",
    pollOptions: [
      "I save whatever is left at the end of the month",
      "I save a fixed amount, but I am not sure it is enough",
      "I have not started a regular savings amount",
      "I save, and I want to check the split",
    ],
    testimonials: [
      { quote: "I stopped using a random percentage and worked out a number from my actual bills.", name: "Aisha Khan", role: "Analyst" },
      { quote: "The session separated emergency money from the amount that can be invested.", name: "Varun Shah", role: "Engineer" },
      { quote: "Practical for someone who also sends money home every month.", name: "Lakshmi Nair", role: "Nurse" },
      { quote: "I left with a savings amount I can start on the next salary day.", name: "Harsh Patel", role: "Designer" },
    ],
  },
  {
    pageId: "build-first-10-lakh",
    title: "How to build your first ₹10 lakh",
    description: "A step-by-step session on reaching the first ₹10 lakh from a steady monthly surplus, rather than waiting for a windfall.",
    benefits: "A target date, a monthly amount, and a simple order for cash, costly debt, and the first long-term investments.",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      classroom[1],
      classroom[0],
    ],
    pollQuestion: "Where are you on the way to your first ₹10 lakh?",
    pollOptions: [
      "I have not started a dedicated amount yet",
      "I save, but it is not aimed at a number",
      "I am part of the way and want a finish date",
      "Costly debt is slowing the target down",
    ],
    testimonials: [
      { quote: "The target stopped feeling vague. I could see the monthly amount and the date.", name: "Pooja Menon", role: "Marketing Manager" },
      { quote: "Useful order: emergency cash first, then the amount that stays invested.", name: "Siddharth Jain", role: "Software Engineer" },
      { quote: "I understood what not to interrupt just because the market moved.", name: "Ritika Bose", role: "Research Associate" },
      { quote: "Straightforward maths, explained without a product catalogue.", name: "Aditya Kulkarni", role: "Consultant" },
    ],
  },
  {
    pageId: "credit-cards-emis-loans",
    title: "Credit cards, EMIs and personal loans: Friend or Foe?",
    description: "A session on when a credit card, an EMI, or a personal loan fits a plan, and when the interest cost works against it.",
    benefits: "A way to read the total cost of borrowing, rules for card spending, and a payoff order for the loans you already have.",
    images: [
      "https://images.unsplash.com/photo-1607532948233-3340f0c3453b?auto=format&fit=crop&w=1200&q=80",
      classroom[2],
      classroom[1],
    ],
    pollQuestion: "What kind of borrowing is on your mind?",
    pollOptions: [
      "Credit card balances that roll over",
      "EMIs for purchases",
      "A personal loan I already have",
      "I want to know before I borrow",
    ],
    testimonials: [
      { quote: "I finally compared the interest, not just the monthly EMI.", name: "Kunal Desai", role: "Business Analyst" },
      { quote: "The card rules were simple enough to use on the next purchase.", name: "Shreya Gupta", role: "Pharmacist" },
      { quote: "Helpful payoff order when more than one loan is running.", name: "Imran Sheikh", role: "Civil Engineer" },
      { quote: "Clear about when borrowing helps and when it should wait.", name: "Nandini Rao", role: "HR Business Partner" },
    ],
  },
  {
    pageId: "financial-independence-45",
    title: "How to become financially independent by 45/50",
    description: "A session for people from their late twenties to their mid-forties on the savings rate, protection, and investing habit behind an earlier work-optional life.",
    benefits: "A plain definition of financial independence for your household, a savings-rate check, and the gaps that push the date later.",
    images: [
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1200&q=80",
      classroom[0],
      classroom[2],
    ],
    pollQuestion: "What does financial independence mean for you right now?",
    pollOptions: [
      "Work becomes a choice, not a necessity",
      "Family expenses are covered if income stops",
      "I want a target age and a savings rate",
      "I am still defining the goal",
    ],
    testimonials: [
      { quote: "The age stopped being a slogan. We tied it to spending and a savings rate.", name: "Anil Reddy", role: "Engineering Manager" },
      { quote: "Protection and investing were put in the right order, which I had reversed.", name: "Kavya Krishnan", role: "Doctor" },
      { quote: "Honest about what has to change if the date is 45 rather than 60.", name: "Manish Agarwal", role: "Founder" },
      { quote: "A calm explanation of a big goal, with the next step small enough to start.", name: "Tara D'Souza", role: "Lawyer" },
    ],
  },
  {
    pageId: "financial-planning-couples",
    title: "Financial planning for couples: Managing money together",
    description: "A session for couples who want one view of income, spending, and goals, with room for personal money as well as shared money.",
    benefits: "An agenda for a monthly money conversation, a split between joint and personal spending, and a first list of shared goals.",
    images: [
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
      classroom[1],
      classroom[0],
    ],
    pollQuestion: "How do you and your partner handle money today?",
    pollOptions: [
      "We keep everything separate",
      "One person manages most of the bills",
      "We have a joint account and still disagree on goals",
      "We want a shared plan and have not started",
    ],
    testimonials: [
      { quote: "We left with a 30-minute monthly agenda instead of another argument about expenses.", name: "Rhea and Kabir Sethi", role: "Working couple" },
      { quote: "The joint-and-personal split removed the feeling that every rupee had to be negotiated.", name: "Ananya Pillai", role: "Designer" },
      { quote: "Useful whether incomes are similar or very different.", name: "Joseph Mathew", role: "Teacher" },
      { quote: "Practical language we could both use the same evening.", name: "Fatima Noor", role: "Researcher" },
    ],
  },
  {
    pageId: "planning-after-marriage",
    title: "Financial planning after marriage",
    description: "A session for newly married couples on combining households, updating nominees, and setting the first shared emergency fund.",
    benefits: "A checklist for accounts, nominees, and insurance, plus a first-year budget that includes family commitments.",
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
      classroom[2],
      classroom[0],
    ],
    pollQuestion: "What is the first money task after marriage for you?",
    pollOptions: [
      "Combining household bills",
      "Updating nominees and insurance",
      "Building a shared emergency fund",
      "Agreeing how family support is handled",
    ],
    testimonials: [
      { quote: "The nominee and insurance checklist was the part we would have postponed.", name: "Ishaan Verma", role: "Analyst" },
      { quote: "A first-year budget that included weddings, travel, and family support.", name: "Maya Krishnan", role: "Doctor" },
      { quote: "We agreed what stays personal and what becomes a household cost.", name: "Rahul and Sneha Kulkarni", role: "Newly married" },
      { quote: "Calm and specific. Nothing assumed we already had a joint system.", name: "Priyanka Das", role: "Architect" },
    ],
  },
  {
    pageId: "major-life-events",
    title: "How to prepare financially for major life events",
    description: "A session on getting money ready for events such as a child, a home, a career break, or caring for parents.",
    benefits: "A way to price an event before it arrives, a sinking-fund habit, and a check that protection is in place before the goal investing.",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
      classroom[0],
      classroom[1],
    ],
    pollQuestion: "Which life event are you preparing for?",
    pollOptions: [
      "A child or growing family costs",
      "A home purchase",
      "A career break or job change",
      "Support for parents",
    ],
    testimonials: [
      { quote: "We priced the event instead of hoping the savings would be enough when it arrived.", name: "Deepa Nair", role: "Project Manager" },
      { quote: "The sinking-fund idea was the missing piece beside our monthly SIP.", name: "Arvind Rao", role: "Banker" },
      { quote: "Protection was checked before the goal amount, which changed our order.", name: "Sneha Iyer", role: "Teacher" },
      { quote: "Useful for more than one event. We could reuse the same worksheet.", name: "Mohammed Irfan", role: "Entrepreneur" },
    ],
  },
];

export function seminarTopic(pageId: string) {
  return PERSONAL_FINANCE_SEMINARS.find((topic) => topic.pageId === pageId) || null;
}

export function relatedSeminarTopics(pageId: string) {
  const index = PERSONAL_FINANCE_SEMINARS.findIndex((topic) => topic.pageId === pageId);
  if (index < 0) return [];
  const related: SeminarTopic[] = [];
  for (let step = 1; related.length < 3 && step < PERSONAL_FINANCE_SEMINARS.length; step += 1) {
    related.push(PERSONAL_FINANCE_SEMINARS[(index + step) % PERSONAL_FINANCE_SEMINARS.length]);
  }
  return related;
}
