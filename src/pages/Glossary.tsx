import React, { useState, useMemo } from "react";
import { Link } from "react-router";

interface GlossaryTerm {
  g: "mf" | "ins";
  t: string;
  c: string;
  d: string;
  e?: string;
}

const CATS: Record<string, string> = {
  basics: "Basics",
  types: "Fund types",
  returns: "Returns",
  risk: "Risk & ratios",
  fees: "Costs & loads",
  plans: "SIP & transactions",
  debt: "Debt & money market",
  docs: "Rules & documents",
  payout: "Payouts & tax",
  ibasics: "Insurance basics",
  life: "Life insurance",
  health: "Health insurance",
  motor: "Motor insurance",
  general: "General insurance",
  claims: "Claims",
  admin: "Policy servicing",
  itax: "Tax & regulation",
};

const DOMCATS: Record<"mf" | "ins", string[]> = {
  mf: ["basics", "types", "returns", "risk", "fees", "plans", "debt", "docs", "payout"],
  ins: ["ibasics", "life", "health", "motor", "general", "claims", "admin", "itax"],
};

const DOMNAME: Record<"mf" | "ins", string> = {
  mf: "Mutual funds",
  ins: "Insurance",
};

const GLOSSARY_TERMS: GlossaryTerm[] = [
  { g: "mf", t: "Account Statement", c: "basics", d: "A record of everything that has happened in your folio with a fund house — purchases, redemptions, switches, units held, the NAV applied on each date, and the current value of your holding." },
  { g: "mf", t: "Adjusted NAV", c: "returns", d: "NAV restated so that payouts made during the period are counted in the return. Plain NAV growth understates performance because every payout knocks the NAV down by the amount paid.", e: "A fund at ₹100 on 1 Jan pays ₹10 during the year and closes at ₹150. Plain NAV return reads (150−100)/100 = <strong>50%</strong>. Adjusted for the payout it is (150+10−100)/100 = <strong>60%</strong>." },
  { g: "mf", t: "Age of Fund", c: "returns", d: "How long the scheme has been running since launch. A longer age means more market cycles on record, which makes the track record more meaningful than a two-year number from a bull run." },
  { g: "mf", t: "Alpha", c: "risk", d: "The return a fund generated above or below its benchmark, after adjusting for the risk it took. Positive alpha means the fund manager added value; negative alpha means you would have done better in the index." },
  { g: "mf", t: "AMFI", c: "docs", d: "The Association of Mutual Funds in India — the industry body that sets distributor standards, runs the ARN registration process, publishes daily NAVs and industry AUM data, and handles investor awareness programmes." },
  { g: "mf", t: "Annual Return", c: "returns", d: "The percentage change in a fund’s NAV over one calendar or financial year. Depending on how it is quoted it may or may not include payouts, so check the basis before comparing two funds." },
  { g: "mf", t: "Annualised Return", c: "returns", d: "A return earned over a period longer or shorter than a year, restated as a per-year figure so periods of different lengths can be compared. Annualising a three-month return is statistically fair but practically misleading — treat short-period annualised numbers with suspicion." },
  { g: "mf", t: "Applicable NAV", c: "plans", d: "The NAV at which your purchase or redemption is actually processed, decided by whether your money and application reached the fund house before that day’s cut-off time." },
  { g: "mf", t: "Arbitrage Fund", c: "types", d: "A hybrid fund that profits from the price gap between the cash and futures market rather than from market direction. Because it is fully hedged, it carries equity taxation with a risk profile closer to short-term debt." },
  { g: "mf", t: "ARN", c: "docs", d: "AMFI Registration Number — the licence a mutual fund distributor must hold to advise on and transact in mutual funds. Always ask for it. Ours is ARN 114893." },
  { g: "mf", t: "Asset Allocation", c: "basics", d: "How your money is split across equity, debt, gold and cash. It is the single biggest driver of your long-term outcome — bigger than which particular fund you pick within each bucket." },
  { g: "mf", t: "Asset Management Company (AMC)", c: "basics", d: "The company that actually runs the schemes — hires the fund managers, makes investment decisions within the stated mandate and manages operations, under the supervision of the trustees and SEBI." },
  { g: "mf", t: "Assets Under Management (AUM)", c: "basics", d: "The total market value of everything a scheme or fund house manages on a given date. Large AUM signals investor confidence, but in small-cap and mid-cap funds a swollen AUM can become a drag on nimbleness." },
  { g: "mf", t: "Average Cost Method", c: "returns", d: "Your cost per unit worked out as total money invested divided by total units received. This is what an SIP does for you automatically across market levels.", e: "Two investments of ₹25,000 each fetch 100 and 110 units. Average cost = 50,000 ÷ 210 = <strong>₹238.09</strong> per unit." },
  { g: "mf", t: "Average Credit Quality", c: "debt", d: "The weighted-average credit rating of the bonds a debt fund holds. Government paper and cash count as the highest quality; a portfolio drifting towards lower ratings is reaching for yield by taking credit risk." },
  { g: "mf", t: "Average Maturity", c: "debt", d: "The weighted-average time to maturity of the bonds in a debt portfolio. Longer average maturity means more sensitivity to interest rate movements, in both directions." },
  { g: "mf", t: "Balanced Advantage Fund", c: "types", d: "A dynamic asset allocation fund that shifts between equity and debt using a valuation or trend model, so equity exposure falls when markets look expensive and rises when they look cheap. Often used as a first equity step for cautious investors." },
  { g: "mf", t: "Balance Maturity Tenure", c: "types", d: "In a close-ended scheme, the time still to run before the scheme matures and money is returned to investors." },
  { g: "mf", t: "Bear Market", c: "basics", d: "A stretched period of falling prices and persistent selling. Uncomfortable to live through, and historically the period during which disciplined SIP investors accumulate the units that drive the next cycle’s returns." },
  { g: "mf", t: "Benchmark", c: "returns", d: "The index a scheme measures itself against. SEBI requires funds to report against a Total Return Index, so the comparison includes dividends the index constituents paid.", e: "A large-cap fund is judged against Nifty 100 TRI. Beating the category average while trailing the benchmark still means the index would have served you better." },
  { g: "mf", t: "Beta", c: "risk", d: "How sharply a fund moves relative to its market. The market is set at 1. Beta above 1 means the fund amplifies market moves; below 1 means it cushions them.", e: "A fund with beta of 1.2 tends to move about 120 points for every 100-point move in the market — up and down alike." },
  { g: "mf", t: "Blue Chip Stock", c: "basics", d: "Shares of large, established companies with a long record of stable earnings, dividends and brand strength. In India, names like Reliance, TCS and HUL are typically described this way." },
  { g: "mf", t: "Bond", c: "debt", d: "A loan you make to a government or company in return for periodic interest and repayment of the principal on a fixed maturity date." },
  { g: "mf", t: "Bonus Units", c: "payout", d: "Extra units credited to your folio, with the NAV reduced in the same proportion. Your total value does not change on the day — only the unit count and the per-unit price." },
  { g: "mf", t: "Broker / Distributor", c: "basics", d: "An intermediary registered with AMFI who helps you choose, transact in and review mutual funds, and is paid a commission by the fund house rather than a fee by you." },
  { g: "mf", t: "Brokerage / Commission", c: "fees", d: "What the AMC pays a distributor out of the scheme’s expense ratio for bringing and servicing investments. It is disclosed in your statement, not charged to you separately." },
  { g: "mf", t: "BSE Sensex", c: "basics", d: "The index of 30 large companies listed on the Bombay Stock Exchange, widely used as shorthand for how the Indian market is doing." },
  { g: "mf", t: "Bull Market", c: "basics", d: "A stretched period of rising prices and steady buying. The stage at which investors most often abandon asset allocation — and most regret it later." },
  { g: "mf", t: "CAGR", c: "returns", d: "Compound Annual Growth Rate — the smoothed yearly rate that takes a lumpsum from its starting value to its ending value. It is the right measure for a single investment held throughout, and the wrong one for an SIP." },
  { g: "mf", t: "Capital Gains", c: "payout", d: "The profit when you redeem units for more than you paid. Equity-oriented funds held over 12 months attract long-term capital gains tax at 12.5% on gains above ₹1.25 lakh a year; shorter holdings are taxed at 20%. Debt-oriented funds bought on or after 1 April 2023 are taxed at your slab rate regardless of holding period." },
  { g: "mf", t: "Certificate of Deposit", c: "debt", d: "A short-term negotiable deposit issued by a scheduled commercial bank, typically maturing between 91 days and three years. A staple holding in liquid and money market funds." },
  { g: "mf", t: "Close-Ended Scheme", c: "types", d: "A scheme with a fixed maturity that you can only buy during its new fund offer. Exit is at maturity, or by selling on the exchange if listed — where the traded price can differ from NAV." },
  { g: "mf", t: "Commercial Paper", c: "debt", d: "An unsecured short-term note issued by a company to fund working capital, usually maturing within 91 to 365 days. Yield is higher than a treasury bill because the credit risk is higher too." },
  { g: "mf", t: "Consolidated Account Statement (CAS)", c: "docs", d: "A single monthly or half-yearly statement showing your holdings across every fund house, linked to your PAN. The fastest way to find folios you have forgotten about." },
  { g: "mf", t: "Corpus", c: "basics", d: "The total money pooled in a scheme by all its investors at a point in time." },
  { g: "mf", t: "Cost of Churning", c: "fees", d: "The cost the fund bears each time the manager buys and sells — brokerage, custodian charges, transaction fees, stamp duty. It comes out of your returns even though it never appears as a separate line." },
  { g: "mf", t: "Coupon Rate", c: "debt", d: "The annual interest a bond pays, expressed as a percentage of its face value.", e: "A ₹100 bond paying ₹8 a year is an <strong>8% coupon</strong> bond." },
  { g: "mf", t: "Credit Risk", c: "risk", d: "The risk that a bond issuer delays or fails to pay interest or principal. In debt funds this shows up suddenly as a sharp NAV drop, not as gentle volatility — which is why credit quality matters more than yield." },
  { g: "mf", t: "Current Yield", c: "debt", d: "A bond’s annual interest divided by its current market price.", e: "An 8% coupon bond with ₹100 face value trading at ₹120 yields 8 ÷ 120 = <strong>6.67%</strong>." },
  { g: "mf", t: "Custodian", c: "docs", d: "The SEBI-registered entity that physically holds the scheme’s securities, separate from the AMC that manages them. This separation is a core investor protection in the Indian structure." },
  { g: "mf", t: "Cut-off Time", c: "plans", d: "The daily deadline for an application to get the same day’s NAV. Applications after it are processed at the next business day’s NAV. For most schemes, the NAV also depends on the funds actually reaching the AMC." },
  { g: "mf", t: "Debt Fund", c: "types", d: "A fund investing mainly in bonds, debentures, government securities, treasury bills, commercial paper and certificates of deposit. Lower volatility than equity — but not risk-free, since interest rate and credit risk both apply." },
  { g: "mf", t: "Direct Plan", c: "fees", d: "The version of a scheme bought without a distributor, carrying a lower expense ratio because no commission is paid. The trade-off is that all research, selection, rebalancing and behaviour management sits with you." },
  { g: "mf", t: "Discount", c: "basics", d: "When a listed scheme’s market price trades below its NAV. Common in close-ended schemes where exchange demand is thin." },
  { g: "mf", t: "Diversification", c: "basics", d: "Spreading money across securities, sectors and asset classes so that no single failure can damage the whole portfolio. Owning eight funds that all hold the same twenty large-cap stocks is not diversification." },
  { g: "mf", t: "Dividend Distribution Tax (DDT)", c: "payout", d: "The tax fund houses once paid before distributing dividends. It was abolished with effect from FY 2020-21 — payouts are now taxed in the investor’s hands at their slab rate, with TDS deducted by the AMC above the prescribed threshold." },
  { g: "mf", t: "Dividend Yield", c: "returns", d: "Payout per unit as a percentage of the current price. Also the strategy behind dividend yield funds, which buy shares of companies with a consistent record of paying out." },
  { g: "mf", t: "Duration", c: "debt", d: "A measure of how much a bond portfolio’s value will move when interest rates change. A duration of 4 implies roughly a 4% price fall for a 1% rise in rates — and roughly a 4% gain if rates fall." },
  { g: "mf", t: "ELSS", c: "types", d: "Equity Linked Savings Scheme — an equity fund with a three-year lock-in that qualifies for deduction under Section 80C, up to ₹1.5 lakh a year, for those who remain under the old tax regime. The shortest lock-in among 80C options." },
  { g: "mf", t: "Entry Load", c: "fees", d: "A charge once levied when you invested. SEBI abolished entry loads in August 2009 — no Indian mutual fund can charge one today." },
  { g: "mf", t: "ETF", c: "types", d: "An Exchange Traded Fund tracks an index and trades on the exchange like a share, at live prices through the day. You need a demat account, and the price you get can differ slightly from NAV." },
  { g: "mf", t: "Ex-Dividend Date", c: "payout", d: "The date from which the NAV no longer includes the declared payout. Buying on or after this date means you do not receive that particular distribution." },
  { g: "mf", t: "Exit Load", c: "fees", d: "A charge deducted when you redeem within a stated period — commonly 1% if you exit an equity fund within a year. Designed to discourage short-term money in long-term portfolios." },
  { g: "mf", t: "Expense Ratio", c: "fees", d: "The annual cost of running the scheme — management fee, custodian charges, registrar fees, distributor commission — as a percentage of assets. It is already deducted from NAV, so a 1.8% ratio quietly costs you 1.8% every year, compounding against you." },
  { g: "mf", t: "Face Value", c: "basics", d: "The base price of a unit when the scheme launched, typically ₹10 in India. It has no bearing on whether a fund is cheap or expensive today — a ₹15 NAV is not better value than a ₹450 NAV." },
  { g: "mf", t: "Flexi Cap Fund", c: "types", d: "An equity fund free to invest across large, mid and small caps in any proportion, with at least 65% in equity. The manager’s allocation calls matter as much as stock selection." },
  { g: "mf", t: "Focused Fund", c: "types", d: "An equity fund restricted to a maximum of 30 stocks. Higher conviction, higher concentration, and consequently a wider range of outcomes than a diversified fund." },
  { g: "mf", t: "Folio Number", c: "basics", d: "Your unique account number with a fund house, holding all your schemes with that AMC. Keeping one folio per AMC makes tracking and nomination far simpler." },
  { g: "mf", t: "Fund Category", c: "types", d: "SEBI’s standardised classification — large cap, mid cap, ELSS, aggressive hybrid, liquid and so on — introduced so that funds in the same category hold genuinely comparable portfolios." },
  { g: "mf", t: "Fund Family", c: "basics", d: "All the schemes managed by a single mutual fund house." },
  { g: "mf", t: "Fund Manager", c: "basics", d: "The professional appointed by the AMC to run a scheme within its stated mandate. When a manager with a long record leaves, it is worth reviewing whether your reason for holding the fund still stands." },
  { g: "mf", t: "Fund of Funds", c: "types", d: "A scheme that invests in other mutual fund schemes rather than directly in securities. Convenient, but you bear the expense ratio at both levels." },
  { g: "mf", t: "Gilt Fund", c: "types", d: "A fund that invests only in government securities. Free of credit risk because of the sovereign guarantee, but fully exposed to interest rate risk — gilt NAVs can swing meaningfully when rates move." },
  { g: "mf", t: "Government Securities (G-Secs)", c: "debt", d: "Bonds issued by the Central or State Government. Sovereign-backed, so credit risk is treated as negligible." },
  { g: "mf", t: "Growth Option", c: "payout", d: "The option where profits stay invested and compound inside the scheme instead of being paid out. You are taxed only when you redeem — which makes it the default choice for most long-term goals." },
  { g: "mf", t: "Guaranteed Returns", c: "basics", d: "A promised return, permissible only in narrowly defined and heavily regulated products. No equity mutual fund in India can guarantee returns, and any such promise should be treated as a warning sign." },
  { g: "mf", t: "IDCW", c: "payout", d: "Income Distribution cum Capital Withdrawal — the name SEBI mandated from April 2021 in place of “dividend”. The rename was deliberate: part of every payout is your own capital being returned, which is exactly why the NAV falls by the amount distributed." },
  { g: "mf", t: "Index Fund", c: "types", d: "A fund built to mirror an index rather than beat it. Low expense ratio, no fund manager risk, and returns that track the index minus costs and tracking error." },
  { g: "mf", t: "Indexation", c: "payout", d: "Adjusting your purchase cost for inflation before computing capital gains, using the Cost Inflation Index. Indexation on debt mutual funds was withdrawn for investments made on or after 1 April 2023 — a change worth checking against your purchase dates.", e: "Bought at ₹100 when CII was 105 and sold when CII was 230, the indexed cost becomes 100 × (230 ÷ 105) = <strong>₹219.05</strong>." },
  { g: "mf", t: "Inflation", c: "basics", d: "The steady rise in the price of goods and services. The reason a savings account paying 3% is a guaranteed loss of purchasing power, not a safe outcome." },
  { g: "mf", t: "Inflation Risk", c: "risk", d: "The risk that your investment grows slower than prices do, so your money buys less at the end than at the start. The dominant risk for conservative portfolios held over long periods." },
  { g: "mf", t: "International Fund", c: "types", d: "A fund investing in overseas companies, giving exposure to currencies and markets not available at home. Indian investors can access these, though subscriptions have periodically been restricted when the industry-wide overseas investment limit set by RBI is reached." },
  { g: "mf", t: "Investment Objective", c: "docs", d: "The stated purpose of a scheme, set out in its offer document. Read it before the returns table — a fund cannot be judged against a goal it never set out to achieve." },
  { g: "mf", t: "Investment Strategy", c: "docs", d: "The framework a scheme follows in deploying investors’ money — what it buys, what it avoids, and how it manages cash and risk." },
  { g: "mf", t: "Key Information Memorandum (KIM)", c: "docs", d: "The abridged version of the scheme document, listing objective, asset allocation, risk factors, fees and how to apply. Legally required to accompany the application form." },
  { g: "mf", t: "KYC", c: "docs", d: "Know Your Customer — the one-time identity and address verification required before you can invest. Completed once with a KRA, it works across all fund houses." },
  { g: "mf", t: "Launch Date", c: "types", d: "The date the scheme first opened for subscription. Used together with the age of the fund to judge how much of a track record actually exists." },
  { g: "mf", t: "Liquid Fund", c: "types", d: "A fund holding only very short-term money market instruments, aimed at capital preservation and quick access rather than high returns. Typically used for emergency funds and money awaiting deployment." },
  { g: "mf", t: "Liquidity", c: "basics", d: "How quickly an asset can be turned into cash without taking a hit on price. Mutual fund units are highly liquid; property and unlisted holdings are not." },
  { g: "mf", t: "Load", c: "fees", d: "Any charge levied as a percentage of NAV when entering or exiting a scheme. In India today only exit loads exist." },
  { g: "mf", t: "Lock-in Period", c: "plans", d: "A period during which units cannot be redeemed.", e: "ELSS carries a three-year lock-in, and it applies to each instalment separately — an SIP instalment paid on 1 Jan 2026 is free only on 1 Jan 2029." },
  { g: "mf", t: "Lumpsum", c: "plans", d: "A one-time investment, as opposed to an SIP. Suits money you already hold; the trade-off is that your entire entry rides on a single day’s market level." },
  { g: "mf", t: "Macaulay Duration", c: "debt", d: "The weighted average time taken to recover a bond’s cost through its interest and principal payments. SEBI uses it to define the debt fund categories — low duration, short duration, medium duration and so on." },
  { g: "mf", t: "Management Fee", c: "fees", d: "The portion of the expense ratio the AMC charges for managing the portfolio, expressed as a percentage of assets." },
  { g: "mf", t: "Market Capitalisation Categories", c: "types", d: "SEBI’s ranking by full market cap: the top 100 companies are large cap, the next 150 mid cap, and everything from 251 onwards small cap. This ranking, not the fund manager’s opinion, decides what a fund can call itself." },
  { g: "mf", t: "Market Risk", c: "risk", d: "The risk that prices fall because of economic, political or sentiment-driven conditions affecting the whole market. Diversification reduces stock-specific risk but cannot remove market risk." },
  { g: "mf", t: "Maturity Date", c: "types", d: "The date on which a close-ended scheme ends and proceeds become payable to investors." },
  { g: "mf", t: "Minimum Additional Investment", c: "plans", d: "The smallest top-up a scheme accepts into an existing folio, often lower than the first-time minimum." },
  { g: "mf", t: "Minimum Subscription", c: "plans", d: "The smallest amount accepted for a first investment in a scheme — commonly ₹500 to ₹5,000, with SIPs frequently starting at ₹500 or less." },
  { g: "mf", t: "Minimum Withdrawal", c: "plans", d: "The smallest amount a scheme allows you to redeem in one transaction." },
  { g: "mf", t: "Modified Duration", c: "debt", d: "Macaulay duration adjusted for yield, giving a direct read on price sensitivity to interest rates. The number to check before buying a long-duration debt fund." },
  { g: "mf", t: "Money Market", c: "debt", d: "The market for debt instruments maturing in under a year, such as treasury bills and commercial paper." },
  { g: "mf", t: "Money Market Instruments", c: "debt", d: "Short-dated debt securities — treasury bills, commercial paper, certificates of deposit and government securities maturing within a year." },
  { g: "mf", t: "Multi Asset Allocation Fund", c: "types", d: "A fund required to hold at least 10% each in three asset classes, typically equity, debt and gold. Built-in diversification, with the allocation decision handed to the manager." },
  { g: "mf", t: "Mutual Fund", c: "basics", d: "A pooled vehicle that collects money from many investors and invests it in shares, bonds and money market instruments, professionally managed and regulated by SEBI, with gains and losses shared in proportion to units held." },
  { g: "mf", t: "NAV", c: "basics", d: "Net Asset Value — the per-unit value of a scheme, calculated as the market value of its holdings minus liabilities, divided by units outstanding. Published daily for open-ended schemes. It tells you what your holding is worth, not whether the fund is cheap." },
  { g: "mf", t: "New Fund Offer (NFO)", c: "types", d: "The period when a new scheme is first offered, usually at ₹10 per unit. The ₹10 price is not a discount — an NFO has no track record, which is precisely what an existing fund gives you." },
  { g: "mf", t: "Nifty 50", c: "basics", d: "The index of 50 large companies on the National Stock Exchange, and the most widely used benchmark for Indian equity." },
  { g: "mf", t: "No-Load Scheme", c: "fees", d: "A scheme that charges nothing on entry or exit. Most Indian open-ended schemes are no-load beyond a short initial exit load window." },
  { g: "mf", t: "Nomination", c: "docs", d: "Recording who receives your units if you die. It takes minutes and is the single most common gap we find in otherwise well-built portfolios — without it, your family faces a far longer claim process." },
  { g: "mf", t: "Non-Performing Investment", c: "debt", d: "A holding that has stopped paying interest or principal on time. SEBI’s valuation norms require such holdings to be marked down, so the impact shows in NAV rather than sitting hidden." },
  { g: "mf", t: "Offer Document", c: "docs", d: "The full document a fund house issues before launching a scheme, covering objective, strategy, risk factors, fees, and the fund management team. Everything a scheme is permitted to do is written here." },
  { g: "mf", t: "Open-Ended Scheme", c: "types", d: "A scheme you can buy into or exit on any business day at that day’s NAV. The overwhelming majority of Indian mutual funds are open-ended." },
  { g: "mf", t: "Opening NAV", c: "basics", d: "The first NAV declared after a new fund offer closes and the scheme begins operations." },
  { g: "mf", t: "Overnight Fund", c: "types", d: "A debt fund holding securities maturing in one day. The lowest-risk category in the debt space, used for parking money for very short periods." },
  { g: "mf", t: "Portfolio", c: "basics", d: "The full set of holdings — in a scheme, or across everything you own. Reviewing yours at the portfolio level rather than fund by fund is what surfaces overlap and gaps." },
  { g: "mf", t: "Portfolio Manager", c: "basics", d: "Another name for the fund manager: the specialist responsible for what a scheme buys and sells, within its mandate and in investors’ interest." },
  { g: "mf", t: "Portfolio Management Service (PMS)", c: "types", d: "A discretionary service where a manager runs a customised portfolio in your own demat account, with a minimum investment of ₹50 lakh. You hold the securities directly, unlike in a mutual fund where you hold units." },
  { g: "mf", t: "Portfolio Turnover", c: "fees", d: "How much of the portfolio was traded during the year. High turnover means higher transaction costs eating into returns, and is worth questioning in a fund that claims to invest for the long term." },
  { g: "mf", t: "Premium", c: "basics", d: "When a listed scheme’s market price is above its NAV." },
  { g: "mf", t: "Purchase Price", c: "basics", d: "The price at which units are bought — the NAV, plus any applicable charge. With entry loads abolished, this is simply the applicable NAV for open-ended schemes." },
  { g: "mf", t: "Rating", c: "debt", d: "A credit rating agency’s opinion on an issuer’s ability to service its debt on time, from AAA downwards. It is an opinion, not a guarantee, and ratings can be downgraded quickly." },
  { g: "mf", t: "Record Date", c: "payout", d: "The date on which the fund house checks its register to decide who is eligible for a declared payout." },
  { g: "mf", t: "Redemption", c: "plans", d: "Selling your units back to the fund house. Proceeds are based on the applicable NAV, less exit load and applicable taxes, and typically credited within one to three working days." },
  { g: "mf", t: "Redemption Price", c: "plans", d: "The price at which an open-ended scheme buys back units, or a close-ended scheme redeems them at maturity — derived from NAV." },
  { g: "mf", t: "Regular Plan", c: "fees", d: "The version of a scheme bought through a distributor, with commission built into a slightly higher expense ratio. Worth it when the advice, reviews and behavioural discipline you receive outweigh the cost difference." },
  { g: "mf", t: "Riskometer", c: "docs", d: "The mandatory six-level risk label on every scheme, from Low to Very High, reviewed and updated monthly based on the actual portfolio. Check it before you invest, and again if the fund changes its stance." },
  { g: "mf", t: "Risk-Adjusted Return", c: "risk", d: "Return measured against the risk taken to earn it. Two funds delivering 14% are not equivalent if one of them halved along the way — this is what the Sharpe, Sortino and Treynor ratios attempt to capture." },
  { g: "mf", t: "Risk-Free Rate", c: "risk", d: "The return available with negligible credit risk, usually taken as the government security yield. It is the baseline every risk-adjusted return measure is built on." },
  { g: "mf", t: "Rolling Returns", c: "returns", d: "Returns calculated across every possible start date over a period, rather than from one convenient date. The most honest way to see how consistent a fund has been, because it removes the luck of the starting point." },
  { g: "mf", t: "R-Squared", c: "risk", d: "How much of a fund’s movement is explained by its benchmark, from 0 to 1. A number close to 1 in an actively managed fund suggests you are paying active fees for something close to index performance." },
  { g: "mf", t: "Scheme Information Document (SID)", c: "docs", d: "The detailed legal document for a scheme — objective, asset allocation, investment strategy, risk factors, fees and expenses. The definitive reference when a fund’s behaviour surprises you." },
  { g: "mf", t: "Scheme Objective", c: "docs", d: "The goal a scheme sets out to achieve and the instruments it will use to get there." },
  { g: "mf", t: "SEBI", c: "docs", d: "The Securities and Exchange Board of India — the regulator that governs mutual funds, sets scheme categorisation and disclosure norms, and oversees AMCs, trustees and distributors." },
  { g: "mf", t: "Sector Allocation", c: "basics", d: "How a fund’s money is spread across sectors such as financials, technology or energy. A large single-sector weight tells you where the fund’s fortunes are concentrated." },
  { g: "mf", t: "Sector Fund", c: "types", d: "A fund investing in one sector or theme — banking, pharma, technology, defence. Higher potential, considerably higher risk, and dependent on your timing both entering and exiting. A satellite holding, never a core one." },
  { g: "mf", t: "Security", c: "basics", d: "Any tradable financial instrument representing ownership or debt — shares, bonds, debentures, notes." },
  { g: "mf", t: "Sharpe Ratio", c: "risk", d: "Excess return over the risk-free rate, divided by the fund’s standard deviation. Higher is better: it shows how much extra return each unit of volatility bought you.", e: "A fund returning 18% with 6% standard deviation, against an 8% risk-free rate: (18 − 8) ÷ 6 = <strong>1.67</strong>." },
  { g: "mf", t: "SIP", c: "plans", d: "Systematic Investment Plan — a fixed amount invested at a fixed interval, auto-debited from your bank account. It buys more units when markets fall and fewer when they rise, and removes the need to guess the right moment." },
  { g: "mf", t: "SIP Top-up", c: "plans", d: "An instruction to raise your SIP amount automatically each year, by a set percentage or figure. Tying it to your annual increment is the simplest way to keep investing in step with income." },
  { g: "mf", t: "Sortino Ratio", c: "risk", d: "Like the Sharpe ratio, but it counts only downside volatility. A fairer measure for investors who do not mind returns swinging upwards." },
  { g: "mf", t: "Sponsor", c: "docs", d: "The entity that establishes a mutual fund and applies to SEBI for its registration, and which must contribute a minimum share of the AMC’s net worth." },
  { g: "mf", t: "Stamp Duty", c: "fees", d: "A 0.005% levy on every mutual fund purchase, including each SIP instalment and every switch-in, applicable since July 2020. Small, but it applies to transfers too." },
  { g: "mf", t: "Standard Deviation", c: "risk", d: "How far a fund’s returns typically stray from their own average — the standard measure of volatility. Lower means a steadier ride, not necessarily a better outcome." },
  { g: "mf", t: "STP", c: "plans", d: "Systematic Transfer Plan — moving a fixed amount from one scheme to another at set intervals. Commonly used to shift a lumpsum from a liquid fund into equity in stages, or to de-risk as a goal approaches." },
  { g: "mf", t: "Switch", c: "plans", d: "Moving money from one scheme to another within the same fund house. Convenient, but it counts as a redemption and a fresh purchase for both tax and exit load." },
  { g: "mf", t: "SWP", c: "plans", d: "Systematic Withdrawal Plan — drawing a fixed amount at a fixed interval from your investment. The standard way to build a monthly income stream in retirement, and usually more tax-efficient than taking IDCW payouts." },
  { g: "mf", t: "Total Return", c: "returns", d: "Return counting everything — capital appreciation plus payouts and interest — rather than price movement alone. The only basis on which two funds can be compared fairly." },
  { g: "mf", t: "Total Return Index (TRI)", c: "returns", d: "A version of an index that reinvests the dividends its constituents pay. SEBI requires funds to benchmark against TRI, which raised the bar for what counts as outperformance." },
  { g: "mf", t: "Tracking Error", c: "risk", d: "How far an index fund or ETF strays from the index it follows. Lower is better — it is the first number to compare when choosing between two index funds tracking the same index." },
  { g: "mf", t: "Treynor Ratio", c: "risk", d: "Excess return per unit of market risk, using beta instead of standard deviation. Useful when judging a fund as one part of an already diversified portfolio." },
  { g: "mf", t: "Trust", c: "docs", d: "The legal structure Indian mutual funds are set up under, registered through the Indian Trusts Act. Your money is held in trust for you, separate from the AMC’s own balance sheet." },
  { g: "mf", t: "Trustee", c: "docs", d: "The body holding supervisory authority over the AMC, responsible for ensuring the scheme is run in line with its documents and that investors’ assets are safeguarded." },
  { g: "mf", t: "Turnover Rate", c: "fees", d: "A measure of trading activity, calculated as total purchases or sales divided by the fund’s net assets over the period." },
  { g: "mf", t: "Unit", c: "basics", d: "One share of a scheme’s portfolio. Buy ₹10,000 at an NAV of ₹250 and you own 40 units." },
  { g: "mf", t: "Unitholder", c: "basics", d: "Anyone holding units in a scheme in their own name." },
  { g: "mf", t: "Value Stock", c: "basics", d: "A share trading below what its fundamentals suggest it is worth, judged on measures like price-to-earnings, price-to-book or discounted cash flow. Value strategies can underperform for years before they work, which is exactly why they work." },
  { g: "mf", t: "Volatility", c: "risk", d: "How much and how sharply prices move. Volatility is the price of admission for equity returns — it becomes a loss only when it makes you sell." },
  { g: "mf", t: "XIRR", c: "returns", d: "The return measure for investments made at irregular intervals — which is every SIP, every top-up, every partial withdrawal. If your statement shows one return number for an SIP, this is the one that is meaningful." },
  { g: "mf", t: "Yield", c: "returns", d: "Income earned from an investment, expressed as a percentage of NAV or market price. Unlike total return, it excludes capital appreciation." },
  { g: "mf", t: "Yield Curve", c: "debt", d: "A plot of yields against maturities. Usually upward sloping, since lenders want more for longer commitments. When it flattens or inverts, the market is signalling something about growth and rates." },
  { g: "mf", t: "Yield to Maturity", c: "debt", d: "The return a bond delivers if held to maturity, accounting for purchase price, coupon, frequency and redemption value. In a debt fund’s factsheet, YTM gives you a rough sense of the return on offer before expenses." },
  { g: "mf", t: "Zero-Coupon Bond", c: "debt", d: "A bond that pays no periodic interest and is instead sold below face value, with the discount forming your return at maturity.", e: "Buy at ₹80, receive ₹100 at maturity — the <strong>₹20</strong> gap is the interest." },

  { g: "ins", t: "Accidental Death Benefit", c: "life", d: "A rider that pays an additional sum on top of the base cover if death results from an accident. Cheap to add, but it is a top-up on a specific cause of death, never a substitute for adequate base term cover." },
  { g: "ins", t: "Actual Cash Value", c: "general", d: "The market value of damaged or stolen property immediately before the loss, after accounting for age and wear. Most Indian general insurance settles on this basis unless you have specifically bought replacement cost or zero depreciation cover." },
  { g: "ins", t: "Add-on Cover", c: "motor", d: "An optional cover bought on top of a base motor or health policy for an extra premium: zero depreciation, engine protection, roadside assistance, return to invoice. Useful on newer vehicles, largely wasted on older ones." },
  { g: "ins", t: "Agent", c: "ibasics", d: "An individual licensed by IRDAI to sell policies on behalf of insurers. An agent represents the insurer; a broker represents you. Knowing which one is sitting across from you tells you whose interest the recommendation serves." },
  { g: "ins", t: "Annuity", c: "life", d: "A contract where you hand over a lumpsum and receive a guaranteed income for life or a fixed term. It solves longevity risk, the risk of outliving your money, which no mutual fund can. The trade-off is rigidity and rates locked in on the day you buy." },
  { g: "ins", t: "Assignment", c: "admin", d: "Legally transferring the rights under a policy to someone else, most often a lender who wants the policy as security against a loan. Absolute assignment transfers ownership outright; conditional assignment reverts to you once the loan is repaid." },
  { g: "ins", t: "Beneficiary", c: "admin", d: "The person who receives the policy proceeds. In Indian life insurance this is the nominee, who under current law is a beneficial owner rather than merely a receiver of funds where an immediate family nomination is made." },
  { g: "ins", t: "Bodily Injury", c: "claims", d: "Physical injury to a person. In motor policies, third party liability cover for bodily injury is unlimited by law, with the amount decided by the Motor Accident Claims Tribunal." },
  { g: "ins", t: "Bonus (Life Insurance)", c: "life", d: "An addition declared on participating traditional policies out of the insurer’s surplus. A reversionary bonus is declared annually and paid at maturity or death; a terminal bonus is a one-time addition at exit. Illustrated bonuses are not guaranteed until they are actually declared." },
  { g: "ins", t: "Burglary Insurance", c: "general", d: "Cover against loss from forcible entry into insured premises. Ordinary theft without signs of forced entry is usually excluded, which is the clause most claimants discover too late." },
  { g: "ins", t: "Cashless Claim", c: "health", d: "Settlement where the insurer or TPA pays the hospital directly, so you are not out of pocket beyond deductibles, co-payment and non-payable items. Requires a network hospital and prior authorisation, except in emergencies where intimation follows admission." },
  { g: "ins", t: "Claim", c: "claims", d: "Your formal request for payment under a policy. Intimate it as early as the policy requires. Late intimation is one of the most common and most avoidable grounds for rejection." },
  { g: "ins", t: "Claim Settlement Ratio", c: "ibasics", d: "The proportion of claims an insurer settled against those received in a year. Useful, but blunt: it counts a ₹50,000 claim and a ₹2 crore claim equally. For term insurance, read the amount-wise ratio and the average settlement time alongside it." },
  { g: "ins", t: "Co-payment", c: "health", d: "A fixed percentage of every admissible claim you agree to bear yourself. It lowers your premium and raises your exposure. Common in senior citizen plans, and in policies bought for a city tier lower than where you actually receive treatment." },
  { g: "ins", t: "Comprehensive Cover", c: "motor", d: "A motor policy combining compulsory third party liability with own damage cover for your own vehicle: fire, theft, accident, natural calamity. Third party alone is the legal minimum, not adequate protection." },
  { g: "ins", t: "Critical Illness Cover", c: "health", d: "Pays a lumpsum on diagnosis of a listed condition, regardless of what treatment costs. It is a benefit policy, not an indemnity policy, so it sits alongside a hospitalisation policy rather than replacing it. Read the definitions closely: listed conditions are defined narrowly and precisely." },
  { g: "ins", t: "Cumulative Bonus", c: "health", d: "An increase in your health sum insured for each claim-free year at no extra premium, stepping up to a stated ceiling. Check whether a claim resets it entirely or only reduces it by one step." },
  { g: "ins", t: "Day Care Procedures", c: "health", d: "Treatments needing less than 24 hours of hospitalisation because of medical advancement: cataract, dialysis, chemotherapy and hundreds of others. Covered despite failing the usual 24-hour rule, but only if listed in your policy." },
  { g: "ins", t: "Deductible", c: "ibasics", d: "The amount you pay from your own pocket before the insurer pays anything. A higher deductible lowers your premium, which is the basis on which super top-up health policies are built." },
  { g: "ins", t: "Depreciation", c: "motor", d: "The reduction in a part’s value from age and wear, deducted from your motor claim. Plastic and rubber parts depreciate fastest. Zero depreciation cover removes this deduction, which is why it matters most in a vehicle’s early years." },
  { g: "ins", t: "Domiciliary Hospitalisation", c: "health", d: "Treatment taken at home that would ordinarily have required hospitalisation, because the patient could not be moved or no bed was available. Covered by many policies subject to conditions and a minimum duration." },
  { g: "ins", t: "Endorsement", c: "admin", d: "A written amendment to an existing policy, adding, removing or correcting cover. Anything agreed verbally during a sale means nothing until it appears as an endorsement on the policy document." },
  { g: "ins", t: "Endowment Policy", c: "life", d: "A traditional life policy paying a sum on death or on survival to maturity. It bundles protection with saving and typically delivers modest returns for the premium paid. Separating the two, term cover plus an investment, usually gives more of both." },
  { g: "ins", t: "Exclusion", c: "ibasics", d: "What a policy will not pay for, listed explicitly in the contract. The exclusions section is the most important page in any policy document and the one almost nobody reads before buying." },
  { g: "ins", t: "Family Floater", c: "health", d: "One sum insured shared across the whole family instead of separate cover for each member. Cheaper per head, with the catch that one major claim can exhaust the cover for everyone else that year." },
  { g: "ins", t: "Fire Insurance", c: "general", d: "Cover for loss or damage to a building and its contents from fire and allied perils such as lightning, explosion, riot and storm. Usually bundled into a home or commercial package policy rather than bought alone." },
  { g: "ins", t: "Free-Look Period", c: "admin", d: "The window after receiving your policy in which you can return it for a refund, less proportionate risk cover and medical costs. IRDAI norms provide 30 days regardless of how the policy was sourced. Use it to read what was actually issued against what was actually promised." },
  { g: "ins", t: "Grace Period", c: "admin", d: "The time after a premium due date during which you can still pay and keep cover intact, typically 15 days for monthly modes and 30 days otherwise. Miss it and the policy lapses, which for term insurance means going uncovered." },
  { g: "ins", t: "Group Insurance", c: "ibasics", d: "Cover provided to a set of people under one master policy, most often by an employer. It ends when the employment does, which is why relying solely on corporate health cover leaves you exposed at exactly the point you switch jobs or retire." },
  { g: "ins", t: "GST on Premium", c: "itax", d: "The indirect tax on insurance premiums, charged at 18% on most general and motor policies. Individual life and health insurance premiums were exempted from GST with effect from September 2025. Confirm the position applying on your renewal date, since rates change with each Council decision." },
  { g: "ins", t: "Health Insurance", c: "health", d: "A policy that reimburses or directly settles hospitalisation and related medical costs up to the sum insured. With healthcare inflation running well ahead of general inflation, this is the cover most portfolios are underweight on." },
  { g: "ins", t: "Home Insurance", c: "general", d: "Cover for the structure of your home, its contents, or both, against fire, burglary, natural calamity and allied perils. Extraordinarily cheap relative to the asset it protects, and correspondingly underbought." },
  { g: "ins", t: "Human Life Value", c: "life", d: "An estimate of what your future earnings are worth to your dependants today, used to size life cover properly. A working figure is ten to fifteen times annual income, adjusted for liabilities, goals and existing assets, rather than whatever premium happens to fit the 80C limit." },
  { g: "ins", t: "Incontestability (Section 45)", c: "admin", d: "Under Section 45 of the Insurance Act, an insurer cannot question a life policy on any ground once three years have passed from commencement, revival or rider addition, not even for misstatement or non-disclosure. Before three years, it can. The strongest possible argument for disclosing everything honestly at proposal stage." },
  { g: "ins", t: "Insurance Broker", c: "ibasics", d: "An IRDAI-licensed entity that represents you rather than any single insurer, and can place your risk with any of them. The distinction from an agent matters most when you are comparing products across companies." },
  { g: "ins", t: "Insured", c: "ibasics", d: "The person or entity whose risk the policy covers. Not always the same as the policyholder, who owns the contract and pays the premium." },
  { g: "ins", t: "Insured Declared Value (IDV)", c: "motor", d: "The current market value of your vehicle, and the maximum your insurer will pay if it is stolen or written off. Understating it to save premium directly cuts your payout; overstating it does not increase the settlement." },
  { g: "ins", t: "Insurer", c: "ibasics", d: "The company carrying the risk and paying the claim, licensed and supervised by IRDAI." },
  { g: "ins", t: "IRDAI", c: "ibasics", d: "The Insurance Regulatory and Development Authority of India: the regulator that licenses insurers, agents and brokers, approves products, sets policyholder protection norms and runs the Bima Bharosa grievance system." },
  { g: "ins", t: "Lapse", c: "admin", d: "What happens when a premium goes unpaid beyond the grace period: cover stops. A lapsed term policy pays nothing on a claim. Revival is usually possible within a set window, often with interest and fresh medical evidence." },
  { g: "ins", t: "Liability Cover", c: "general", d: "Cover for amounts you become legally obliged to pay a third party for injury or property damage. The compulsory element of every motor policy, and a standalone requirement for many businesses and professionals." },
  { g: "ins", t: "Life Insurance", c: "life", d: "A contract paying a defined sum to your nominee on your death. Its only real job is to replace the income your dependants would lose. If nobody depends on your income, you may not need it at all." },
  { g: "ins", t: "Loan Against Policy", c: "life", d: "Borrowing from the insurer against the surrender value of a traditional or endowment policy. Available only once the policy has acquired a surrender value, and any outstanding amount plus interest is deducted from the eventual payout." },
  { g: "ins", t: "Material Non-Disclosure", c: "claims", d: "Failing to declare, or misstating, a fact that would have affected the insurer’s decision to cover you or the premium charged: a pre-existing condition, a habit, an earlier claim. The most common reason genuine claims get rejected, and entirely within your control at proposal stage." },
  { g: "ins", t: "Maturity Benefit", c: "life", d: "The amount payable if you survive to the end of the policy term. Pure term insurance has none by design, which is exactly why it costs a fraction of the alternatives for the same cover." },
  { g: "ins", t: "Money Back Policy", c: "life", d: "A traditional plan returning part of the sum assured at intervals during the term, with the balance at maturity. Sold on the appeal of periodic payouts; the underlying return is typically low once you work it out as an XIRR." },
  { g: "ins", t: "Moratorium Period", c: "health", d: "After a health policy has run continuously for 60 months, the insurer cannot reject a claim on grounds of non-disclosure or misrepresentation, except for proven fraud or a permanent exclusion agreed in writing. A strong reason not to break continuity by switching carelessly." },
  { g: "ins", t: "MWP Act Policy", c: "life", d: "A life policy issued under the Married Women’s Property Act, 1874, where proceeds go into a trust for the wife and children and cannot be attached by creditors or claimed by other relatives. Important for business owners and anyone with personal guarantees outstanding, and it must be opted for at the time of purchase." },
  { g: "ins", t: "Network Hospital", c: "health", d: "A hospital your insurer or TPA has a tie-up with, allowing cashless treatment. Check that hospitals near you and near your parents are on the list before buying, not after admission." },
  { g: "ins", t: "No Claim Bonus (NCB)", c: "motor", d: "A discount on your own damage premium for each claim-free year, rising from 20% to 50% over five consecutive years. It belongs to you rather than the vehicle, so it transfers when you change cars, and it is lost by making one small claim you could have paid yourself." },
  { g: "ins", t: "Nominee", c: "admin", d: "The person you name to receive the policy proceeds. Keep it current after marriage, divorce, births and deaths. A stale nomination is the most common cause of delayed claim settlement." },
  { g: "ins", t: "Own Damage Cover", c: "motor", d: "The part of a motor policy covering damage to your own vehicle. Since 2019 it can be bought as a separate annual cover alongside a longer-term third party policy on new vehicles." },
  { g: "ins", t: "Peril", c: "general", d: "The event that causes a loss: fire, flood, theft, collision. Policies are written around named perils or on an all-risk basis with exclusions, and knowing which yours is determines what you can actually claim for." },
  { g: "ins", t: "Personal Accident Cover", c: "general", d: "Pays a lumpsum for accidental death, and graded amounts for permanent total or partial disability. The disability portion is the part people ignore and the part that matters more, since a disabling accident stops income while expenses continue." },
  { g: "ins", t: "Policy Document", c: "ibasics", d: "The written contract between you and the insurer, comprising the schedule, the terms and conditions, and any endorsements. Whatever was said during the sale is irrelevant if it is not in here." },
  { g: "ins", t: "Portability", c: "health", d: "The right to move your health policy to another insurer while carrying forward accrued waiting period and continuity credit. Apply at least 30 days before renewal. Acceptance remains at the new insurer’s underwriting discretion." },
  { g: "ins", t: "Pre- and Post-Hospitalisation", c: "health", d: "Medical expenses in the days immediately before admission and after discharge, typically 30 and 60 days, covered as part of the same claim. Frequently unclaimed simply because people do not keep the bills." },
  { g: "ins", t: "Pre-Existing Disease (PED)", c: "health", d: "A condition diagnosed or treated within a set period before the policy started. Subject to a waiting period, now capped at 36 months under IRDAI norms, after which it must be covered. Declare it: the moratorium and Section 45 protections only help those who disclosed honestly." },
  { g: "ins", t: "Premium (Insurance)", c: "ibasics", d: "What you pay the insurer to carry your risk. In protection products, a lower premium for the same cover from a comparably rated insurer is a straightforward win, unlike in investing where cheap can mean something quite different." },
  { g: "ins", t: "Premium Paying Term", c: "life", d: "How long you pay premiums, which need not match how long you are covered. A limited pay policy compresses payments into fewer years while cover continues for the full term." },
  { g: "ins", t: "Proposal Form", c: "admin", d: "The application on which the entire contract rests. Fill it yourself, answer every medical and lifestyle question truthfully, and never let anyone else complete it on your behalf. The signature on it is yours, and so is the consequence." },
  { g: "ins", t: "Reinstatement", c: "admin", d: "Restoring a lapsed policy to full effect, usually within a defined revival window on payment of arrears with interest, and sometimes fresh medical evidence. Note that the Section 45 three-year clock restarts from the date of revival." },
  { g: "ins", t: "Reinsurance", c: "ibasics", d: "Insurance bought by insurers to spread the risks they have taken on. It is the reason a single catastrophe does not take a company down, and it sits quietly behind every large cover you hold." },
  { g: "ins", t: "Restore Benefit", c: "health", d: "Automatic reinstatement of your health sum insured once it is exhausted within a policy year. Check whether it restores for unrelated illnesses only or for the same illness too. The difference is significant in a bad year." },
  { g: "ins", t: "Rider", c: "ibasics", d: "An optional add-on to a base policy for an extra premium: critical illness, accidental death, waiver of premium. Cheaper than a standalone policy, but narrower, and it dies with the base policy." },
  { g: "ins", t: "Room Rent Limit", c: "health", d: "A cap on the daily room charge your policy will pay. Exceed it and the insurer applies proportionate deduction across the entire bill, surgeon fees and tests included, not just the room. The single most expensive clause most people never check." },
  { g: "ins", t: "Salvage", c: "claims", d: "What remains of damaged property after a loss. Its value is deducted from your claim if you keep it, or it passes to the insurer if they settle in full." },
  { g: "ins", t: "Section 10(10D)", c: "itax", d: "The provision exempting life insurance maturity proceeds from tax, subject to premium-to-sum-assured limits and, for policies issued from April 2023, an aggregate annual premium ceiling on non-ULIP policies. Death proceeds remain exempt regardless." },
  { g: "ins", t: "Section 80C (Insurance)", c: "itax", d: "Allows deduction of life insurance premiums within the overall ₹1.5 lakh limit, for those who remain under the old tax regime. Buying cover for the deduction rather than the need is how people end up simultaneously underinsured and overpaying." },
  { g: "ins", t: "Section 80D", c: "itax", d: "Allows deduction of health insurance premiums, up to ₹25,000 for yourself and family and a further ₹50,000 for senior citizen parents, under the old tax regime. Preventive health check-ups count within these limits." },
  { g: "ins", t: "Solvency Ratio", c: "ibasics", d: "The buffer an insurer holds over its liabilities, with IRDAI requiring a minimum of 1.5. Since a term policy is a promise to pay decades from now, the insurer’s solvency deserves as much attention as its premium." },
  { g: "ins", t: "Sub-limit", c: "health", d: "A cap on what a policy pays for a specific item within the overall sum insured: a named surgery, ambulance charges, ICU costs. A ₹10 lakh policy with heavy sub-limits can settle far less than a ₹5 lakh policy without them." },
  { g: "ins", t: "Subrogation", c: "claims", d: "Once your insurer settles a claim, it steps into your shoes to recover the amount from whoever caused the loss. It is why you must not settle privately with a third party before informing your insurer." },
  { g: "ins", t: "Sum Assured", c: "life", d: "The guaranteed amount payable on death. This is the number that matters in life insurance, not the premium, not the maturity value, not the illustrated bonus." },
  { g: "ins", t: "Sum Insured", c: "health", d: "The maximum a health or general policy will pay in a policy year. Given healthcare inflation, cover that felt generous when bought will not feel generous a decade later, which is what top-ups and cumulative bonus exist to address." },
  { g: "ins", t: "Surrender Value", c: "life", d: "What you receive if you terminate a traditional or ULIP policy before maturity. Early surrender of a traditional policy usually crystallises a substantial loss, so the decision to exit deserves arithmetic rather than instinct." },
  { g: "ins", t: "Surveyor", c: "claims", d: "An IRDAI-licensed independent assessor appointed to inspect and quantify a general insurance loss. Their report largely determines what the insurer pays, so cooperate fully and document everything before repairs begin." },
  { g: "ins", t: "Term Insurance", c: "life", d: "Pure life cover for a fixed term, paying out only on death. No maturity value, and the highest cover per rupee of premium of any product available. For anyone with dependants, this is the foundation the rest of the plan sits on." },
  { g: "ins", t: "Third Party Administrator (TPA)", c: "health", d: "The intermediary handling cashless authorisation and claim processing between you, the hospital and the insurer. Some insurers process claims in-house instead, which often means faster turnaround." },
  { g: "ins", t: "Third Party Liability", c: "motor", d: "Cover for injury or damage you cause to others. Legally compulsory for every vehicle on Indian roads, unlimited for bodily injury and capped for property damage. Driving without it is an offence." },
  { g: "ins", t: "Top-up and Super Top-up", c: "health", d: "Additional health cover that begins paying above a chosen threshold. A top-up applies the threshold to each claim; a super top-up applies it to the year’s total claims, which makes it the more useful of the two for similar money." },
  { g: "ins", t: "Total Loss", c: "motor", d: "When repair costs approach or exceed the vehicle’s IDV, or the vehicle is stolen and untraced. The insurer settles the IDV rather than repairing, and the policy ends there." },
  { g: "ins", t: "ULIP", c: "life", d: "A Unit Linked Insurance Plan combining life cover with market-linked investment, with a five-year lock-in. Charges have fallen considerably since the older generation of products, but you are still buying two things in one wrapper, which makes each harder to evaluate or exit independently." },
  { g: "ins", t: "Underwriting", c: "ibasics", d: "The insurer’s process of assessing your risk and deciding whether to cover you, at what premium, with what exclusions, or not at all. Medical tests, financial documents and lifestyle questions all feed into it." },
  { g: "ins", t: "Waiting Period", c: "health", d: "The time that must pass before a particular cover begins: typically 30 days for illness generally, one to two years for specified conditions, and up to 36 months for pre-existing disease. Waiting periods reset if you let a policy lapse." },
  { g: "ins", t: "Waiver of Premium", c: "life", d: "A rider under which future premiums are waived while cover continues, if you become disabled or are diagnosed with a critical illness. It protects the policy at exactly the point your income is most likely to stop." },
  { g: "ins", t: "Zero Depreciation Cover", c: "motor", d: "A motor add-on removing the depreciation deduction on replaced parts, so you receive the full claim. Worth the extra premium on vehicles in their first five years, and usually not thereafter." },
];

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDom, setSelectedDom] = useState<"all" | "mf" | "ins">("all");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");
  const [openTerms, setOpenTerms] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(false);

  const activeCategories = useMemo(() => {
    if (selectedDom === "all") return [...DOMCATS.mf, ...DOMCATS.ins];
    return DOMCATS[selectedDom];
  }, [selectedDom]);

  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GLOSSARY_TERMS.filter((x) => {
      if (selectedDom !== "all" && x.g !== selectedDom) return false;
      if (selectedCat !== "all" && x.c !== selectedCat) return false;
      if (selectedLetter !== "all" && x.t.charAt(0).toUpperCase() !== selectedLetter) return false;
      if (q && !(`${x.t} ${x.d} ${x.e || ""}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [searchQuery, selectedDom, selectedCat, selectedLetter]);

  const toggleTerm = (id: string) => {
    setOpenTerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAll = () => {
    const next = !allExpanded;
    setAllExpanded(next);
    const updated: Record<string, boolean> = {};
    if (next) {
      filteredTerms.forEach((x) => {
        const id = `${x.g}-${x.t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        updated[id] = true;
      });
    }
    setOpenTerms(updated);
  };

  return (
    <div className="font-[var(--fs)] bg-[#F5F3EE] text-[#17211B] antialiased min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-white py-16 sm:py-20 px-6 relative overflow-hidden">
        <div className="max-w-[1080px] mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[.14em] text-[#8DC63F] block mb-3">
            MyAnmol Investor Library
          </span>
          <h1 className="font-[var(--serif)] text-3xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
            The jargon in your policy <br />
            and your fund statement
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl mb-8 leading-relaxed">
            Every term your scheme document, factsheet, policy schedule, and claim form throws at you — explained the way we would explain it to you directly, without the sales pitch. Search it, filter it, share it.
          </p>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-[#8DC63F]/35 text-white">
            <div>
              <span className="font-[var(--serif)] text-2xl font-bold text-[#8DC63F] block">
                {GLOSSARY_TERMS.length}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/70">Terms defined</span>
            </div>
            <div>
              <span className="font-[var(--serif)] text-2xl font-bold text-[#8DC63F] block">2</span>
              <span className="text-xs uppercase tracking-wider text-white/70">Glossaries</span>
            </div>
            <div>
              <span className="font-[var(--serif)] text-2xl font-bold text-[#8DC63F] block">
                {Object.keys(CATS).length}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/70">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <div className="sticky top-0 z-40 bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E3DFD5] py-4 px-6 shadow-sm">
        <div className="max-w-[1080px] mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <input
                type="search"
                placeholder="Search a term or a definition — try 'exit load', 'room rent', 'XIRR'…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E3DFD5] rounded-xl px-4 py-3 text-sm text-[#17211B] focus:border-[#1A3B9F] focus:outline-none focus:ring-2 focus:ring-[#1A3B9F]/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-lg"
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={handleToggleAll}
              className="bg-white border border-[#E3DFD5] hover:bg-[#1A3B9F] hover:text-white font-bold text-xs px-5 py-3 rounded-xl transition-all"
            >
              {allExpanded ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {/* Domain Pills */}
          <div className="flex gap-2 bg-white border border-[#E3DFD5] rounded-xl p-1 w-fit">
            {[
              { id: "all", label: "Everything" },
              { id: "mf", label: "Mutual funds" },
              { id: "ins", label: "Insurance" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDom(d.id as any);
                  setSelectedCat("all");
                }}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                  selectedDom === d.id ? "bg-[#1A3B9F] text-white shadow-sm" : "text-[#5A6B60] hover:text-[#17211B]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedCat("all")}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all shrink-0 ${
                selectedCat === "all" ? "bg-[#1A3B9F] text-white border-[#1A3B9F]" : "bg-transparent text-[#5A6B60] border-[#E3DFD5]"
              }`}
            >
              All topics
            </button>
            {activeCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all shrink-0 ${
                  selectedCat === c ? "bg-[#1A3B9F] text-white border-[#1A3B9F]" : "bg-transparent text-[#5A6B60] border-[#E3DFD5]"
                }`}
              >
                {CATS[c]}
              </button>
            ))}
          </div>

          {/* A-Z Index Rail */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar pt-2 border-t border-[#EFECE4]">
            <button
              onClick={() => setSelectedLetter("all")}
              className={`text-xs font-bold px-3 py-1 rounded-md ${
                selectedLetter === "all" ? "bg-[#1A3B9F] text-white" : "text-[#5A6B60] hover:bg-white"
              }`}
            >
              All
            </button>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => {
              const hasTerms = GLOSSARY_TERMS.some(
                (x) =>
                  (selectedDom === "all" || x.g === selectedDom) &&
                  x.t.charAt(0).toUpperCase() === l
              );
              return (
                <button
                  key={l}
                  disabled={!hasTerms}
                  onClick={() => setSelectedLetter(l)}
                  className={`w-7 h-7 text-xs font-bold rounded-md flex items-center justify-center transition-all ${
                    selectedLetter === l
                      ? "bg-[#1A3B9F] text-white"
                      : hasTerms
                      ? "text-[#5A6B60] hover:bg-white hover:text-[#1A3B9F]"
                      : "opacity-25 cursor-default"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <main className="max-w-[1080px] mx-auto px-6 py-8">
        <div className="text-sm text-[#5A6B60] mb-6">
          Showing <b>{filteredTerms.length}</b> of {GLOSSARY_TERMS.length} terms
        </div>

        {filteredTerms.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E3DFD5] rounded-2xl p-12 text-center">
            <h3 className="font-[var(--serif)] text-2xl font-bold text-[#1A3B9F] mb-2">
              Nothing matches that yet
            </h3>
            <p className="text-sm text-[#5A6B60] mb-6">
              Try a shorter word, or clear the filters to see all terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDom("all");
                setSelectedCat("all");
                setSelectedLetter("all");
              }}
              className="bg-[#1A3B9F] text-white font-bold text-sm px-6 py-2.5 rounded-xl"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTerms.map((term) => {
              const id = `${term.g}-${term.t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
              const isOpen = !!openTerms[id];

              return (
                <div
                  key={id}
                  className={`bg-white border rounded-xl overflow-hidden transition-all ${
                    isOpen ? "border-[#1A3B9F] shadow-sm ring-1 ring-[#1A3B9F]/10" : "border-[#E3DFD5]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTerm(id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left bg-transparent"
                  >
                    <span className="font-bold text-base text-[#17211B]">{term.t}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6660] bg-[#F5F3EE] px-3 py-1 rounded-full">
                        {CATS[term.c]}
                      </span>
                      <span className="text-gray-400 font-bold">{isOpen ? "−" : "+"}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-[#EFECE4] text-sm text-[#3A423C] leading-relaxed space-y-3">
                      <p>{term.d}</p>
                      {term.e && (
                        <div
                          className="bg-[#EEF2FB] border-l-4 border-[#1A3B9F] p-3.5 rounded-r-xl text-xs sm:text-sm text-[#111827]"
                          dangerouslySetInnerHTML={{ __html: term.e }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Note */}
        <div className="bg-white border border-[#E3DFD5] rounded-2xl p-6 mt-12 text-xs sm:text-sm text-[#5A6B60] leading-relaxed">
          <b>A note on tax and regulation.</b> Definitions reflect Indian mutual fund rules as they stand in 2026 — including the shift from dividends to IDCW, the withdrawal of DDT, and the change in how debt fund gains are taxed. Tax rules change with each Finance Act, so confirm the position that applies to your own holdings before you act. Insurance definitions follow IRDAI norms and Indian policy wording, and the terms of your own contract always override any general definition. Mutual fund investments are subject to market risk; read all scheme related documents carefully. Insurance is the subject matter of solicitation.
        </div>
      </main>

      {/* CTA FOOTER */}
      <section className="bg-[#0D1E52] text-white py-16 px-6 mt-16">
        <div className="max-w-[1080px] mx-auto">
          <h2 className="font-[var(--serif)] text-2xl sm:text-4xl font-bold mb-4">
            Knowing the words is step one. Knowing what to do with them is step two.
          </h2>
          <p className="text-base text-white/80 max-w-2xl mb-8 leading-relaxed font-light">
            We map every rupee to a goal before we recommend a single product. Bring your statements, your questions and your jargon — we will walk through all of it with you.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+919742826665"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              Talk to us — 97428 26665
            </a>
            <Link
              to="/wp/review"
              className="border border-white/25 bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
            >
              Book a planning session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}