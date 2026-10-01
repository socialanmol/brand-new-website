import { createBrowserRouter } from 'react-router';
import Root from './Root';
import Home from '../pages/Home';
import GeneralInsurance from '../pages/GeneralInsurance';
import HealthInsurance from '../pages/HealthInsurance';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/privacypolicy';
import Disclaimer from '../pages/disclaimer';
import TermInsurance from '../pages/TermInsurance';
import LifeInsurance from '../pages/LifeInsurance';
import Resources from '../pages/Resources';
import ArticlesInsights from '../pages/ArticlesInsights';
import ForArmedForces from '../pages/ForArmedForces';
import ForBusinessOwners from '../pages/ForBusinessOwners';
import SeminarsWorkshops from '../pages/SeminarsWorkshops';
import SeminarRetirementEstate from '../pages/SeminarRetirementEstate';
import SeminarInvestingPlanning from '../pages/SeminarInvestingPlanning';
import SeminarLifeStress from '../pages/SeminarLifeStress';
import CourseLanding from '../pages/CourseLanding';
import CourseLearn from '../pages/CourseLearn';
import AlternativeInvestmentFunds from '../pages/AlternativeInvestmentFunds';
import PortfolioManagementServices from '../pages/PortfolioManagementServices';
import SheIsAnmol from '../pages/SheIsAnmol';
import GenZHub from '../pages/GenZHub';
import BookSummary from '../pages/BookSummary';
import BookAReview from '../pages/BookAReview';
import ForFamilies from '../pages/ForFamilies';
import OurTeam from '../pages/OurTeam';
import ForNri from '../pages/ForNri';
import FinancialFitnessQuiz from '../pages/FinancialFitnessQuiz';
import BuildYourWealth from '../pages/BuildYourWealth';
import RegulatoryDisclosures from '../pages/RegulatoryDisclosures';
import WealthEstateSolutions from '../pages/WealthEstateSolutions';
import RealEstateAdvisory from '../pages/RealEstateAdvisory';
import CommoditiesAdvisory from '../pages/CommoditiesAdvisory';
import SolutionsTravel from '../pages/SolutionsTravel';
import TaxServices from '../pages/TaxServices';
import OurJourney from '../pages/OurJourney';
import Teachers from '../pages/Teachers';
import ZeroInterestPlanner from '../pages/ZeroInterestPlanner';
import Doctors from '../pages/Doctors';
import SaveInsureInvest from '../pages/SaveInsureInvest';
import CalculatorsHub from '../pages/CalculatorsHub';
import SipCalculator from '../pages/sip-calculator';
import SipTopUpCalculator from '../pages/siptopup';
import LumpsumCalculator from '../pages/lumpsumcalculator';
import CompoundingCalculator from '../pages/compoundingcalc';
import CompositeGoalPlanner from '../pages/compositegoalplanner';
import GoalBasedSipTopUpCalculator from '../pages/goalbasedtopup';
import NpsCalculator from '../pages/npscalculator';
import SwpCalculator from '../pages/swpcalculator';
import SwpWithIncreasingPayoutCalculator from '../pages/swpwithincreasingpayout';
import ChildEducationPlanner from '../pages/childeducationplanner';
import NetWorthCalculator from '../pages/networthcalculator';
import HomeLoanCalculator from '../pages/homeloancalculator';
import PersonalLoanCalculator from '../pages/PersonalLoanCalculator';
import CarLoanEmiCalculator from '../pages/carloanemi';
import EducationLoanCalculator from '../pages/educationemiloan';
import InflationImpactCalculator from '../pages/inflationimpact';
import CostInflationIndexCalculator from '../pages/cii';
import GoalBasedSipCalculator from '../pages/GoalBasedSipCalculator';
import RetirementCalculator from '../pages/retirementcalculator';
import FinancialConfidenceBuilder from '../pages/FinancialConfidenceBuilder';
import GoalMapping from '../pages/GoalMapping';
import SpecializedInvestmentFunds from '../pages/SpecializedInvestmentFunds';
import InvestmentServices from '../pages/InvestmentServices';
import Careers from '../pages/Careers';
import FinancialWellnessThemed from '../pages/FinancialWellnessThemed';
import ForRetirees from '../pages/ForRetirees';
import PayrollSip from '../pages/PayrollSip';
import OtherServicesHub from '../pages/OtherServicesHub';
import FixedDeposits from '../pages/FixedDeposits';
import EquityTrading from '../pages/EquityTrading';
import TaxFiling from '../pages/TaxFiling';
import Glossary from '../pages/Glossary';
import GiftCity from '../pages/GiftCity';
import ContactUs from '../pages/ContactUs';
import ComingSoon from '../pages/ComingSoon';
import CalculatorEntryGate from '../components/CalculatorEntryGate';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'insurance/general', Component: GeneralInsurance },
      { path: 'insurance/health', Component: HealthInsurance },
      { path: 'insurance/term', Component: TermInsurance },
      { path: 'insurance/life', Component: LifeInsurance },
      { path: 'terms-and-conditions', Component: TermsAndConditions },
      { path: 'privacy-policy', Component: PrivacyPolicy },
      { path: 'disclaimer', Component: Disclaimer },

      { path: 'solutions/families', Component: ForFamilies },
      { path: 'for-families', Component: ForFamilies },

      { path: 'solutions/business-owners', Component: ForBusinessOwners },
      { path: 'solutions/biz', Component: ForBusinessOwners },
      { path: 'for-business-owners', Component: ForBusinessOwners },
      
      { path: 'insights/learn', Component: Resources },
      { path: 'insights/articles', Component: ArticlesInsights },
      { path: 'articles', Component: ArticlesInsights },

      { path: 'financial-wellbeing', Component: FinancialWellnessThemed },
      { path: 'solutions/financial-wellbeing', Component: FinancialWellnessThemed },

      { path: 'services/wealth-estate', Component: WealthEstateSolutions },
      { path: 'services/real-estate', Component: RealEstateAdvisory },
      { path: 'services/commodities', Component: CommoditiesAdvisory },
      { path: 'services/travel', Component: SolutionsTravel },
      { path: 'services/tax', Component: TaxServices },

      { path: 'solutions/nri', Component: ForNri },
      { path: 'for-nri', Component: ForNri },

      { path: 'solutions/armed-forces', Component: ForArmedForces },
      { path: 'solutions/armed', Component: ForArmedForces },
      { path: 'for-armed-forces', Component: ForArmedForces },
      
      { path: 'insights/seminars', Component: SeminarsWorkshops },
      { path: 'seminars', Component: SeminarsWorkshops },
      { path: 'insights/seminars/retirement-estate-planning', Component: SeminarRetirementEstate },
      { path: 'insights/seminars/investing-financial-planning', Component: SeminarInvestingPlanning },
      { path: 'insights/seminars/life-stress-management', Component: SeminarLifeStress },

      { path: 'insights/workshops/financial-fitness-certificate', Component: CourseLanding },
      { path: 'insights/workshops/financial-fitness-certificate/learn', Component: CourseLearn },

      { path: 'insights/learn/:slug', Component: BookSummary },
      { path: 'insights/glossary', Component: Glossary },
      { path: 'glossary', Component: Glossary },
      { path: 'resources', Component: Resources },
      { path: 'resources/books/:slug', Component: BookSummary },

      { path: 'wp/sii', Component: SaveInsureInvest },
      { path: 'save-insure-invest', Component: SaveInsureInvest },

      { path: 'wp/goals', Component: GoalMapping },
      { path: 'goal-mapping', Component: GoalMapping },

      { path: 'services/sif', Component: SpecializedInvestmentFunds },
      { path: 'mutual-funds/sifs', Component: SpecializedInvestmentFunds },
      { path: 'specialized-investment-funds', Component: SpecializedInvestmentFunds },

      { path: 'services/aifs', Component: AlternativeInvestmentFunds },
      { path: 'services/aif', Component: AlternativeInvestmentFunds },
      { path: 'mutual-funds/aifs', Component: AlternativeInvestmentFunds },

      { path: 'services/pms', Component: PortfolioManagementServices },
      { path: 'mutual-funds/pms', Component: PortfolioManagementServices },

      { path: 'investment-services', Component: InvestmentServices },

      { path: 'solutions/retirees', Component: ForRetirees },
      { path: 'for-retirees', Component: ForRetirees },

      { path: 'solutions/women', Component: SheIsAnmol },
      { path: 'she-is-anmol', Component: SheIsAnmol },

      { path: 'solutions/salaried', Component: PayrollSip },
      { path: 'payroll-sip', Component: PayrollSip },

      { path: 'solutions/genz', Component: GenZHub },
      { path: 'solutions/igenz', Component: GenZHub },
      { path: 'genz', Component: GenZHub },

      { path: 'services/other', Component: OtherServicesHub },
      { path: 'services/other/fixed-deposits', Component: FixedDeposits },
      { path: 'services/other/equity-trading', Component: EquityTrading },
      { path: 'services/other/tax-filing', Component: TaxFiling },
      { path: 'services/other/:slug', Component: ComingSoon },

      { path: 'mutual-funds/gift-city', Component: GiftCity },
      { path: 'gift-city', Component: GiftCity },

      { path: 'contact', Component: ContactUs },
      { path: 'contact-us', Component: ContactUs },
      { path: 'get-started', Component: ContactUs },

      { path: 'wp/review', Component: BookAReview },
      { path: 'book-a-review', Component: BookAReview },
      { path: 'booking', Component: BookAReview },

      { path: 'about/journey', Component: OurJourney },
      { path: 'journey', Component: OurJourney },
      { path: 'our-journey', Component: OurJourney },

      { path: 'about/team', Component: OurTeam },
      { path: 'our-team', Component: OurTeam },

      { path: 'careers/intern', Component: Careers },
      { path: 'careers', Component: Careers },

      { path: 'fw/check', Component: FinancialWellnessThemed },
      { path: 'financial-wellness-check', Component: FinancialWellnessThemed },

      { path: 'fw/quiz', Component: FinancialFitnessQuiz },
      { path: 'financial-fitness-quiz', Component: FinancialFitnessQuiz },

      { path: 'fw/build', Component: BuildYourWealth },
      { path: 'build-your-wealth', Component: BuildYourWealth },
      { path: 'wealth-path', Component: BuildYourWealth },

      { path: 'fw/zero-int', Component: ZeroInterestPlanner },
      { path: 'zero-interest-planner', Component: ZeroInterestPlanner },

      { path: 'fw/30-day', Component: FinancialConfidenceBuilder },
      { path: '30-day-financial-confidence-builder', Component: FinancialConfidenceBuilder },

      { path: 'tools', Component: CalculatorsHub },
      { path: 'calculators', Component: CalculatorsHub },
      {
        Component: CalculatorEntryGate,
        children: [
          { path: 'sip-calculator', Component: SipCalculator },
          { path: 'calculators/sip-calculator', Component: SipCalculator },
          { path: 'calculators/sip-topup-calculator', Component: SipTopUpCalculator },
          { path: 'calculators/lumpsum-calculator', Component: LumpsumCalculator },
          { path: 'calculators/compounding-calculator', Component: CompoundingCalculator },
          { path: 'calculators/composite-financial-goal-planner', Component: CompositeGoalPlanner },
          { path: 'calculators/goal-based-topup-sip', Component: GoalBasedSipTopUpCalculator },
          { path: 'calculators/goal-based-sip', Component: GoalBasedSipCalculator },
          { path: 'calculators/nps-calculator', Component: NpsCalculator },
          { path: 'calculators/swp-calculator', Component: SwpCalculator },
          { path: 'calculators/swp-with-increasing-payout', Component: SwpWithIncreasingPayoutCalculator },
          { path: 'calculators/child-education-planner', Component: ChildEducationPlanner },
          { path: 'calculators/networth-calculator', Component: NetWorthCalculator },
          { path: 'calculators/home-loan-emi-calculator', Component: HomeLoanCalculator },
          { path: 'calculators/personal-loan-emi-calculator', Component: PersonalLoanCalculator },
          { path: 'calculators/car-loan-emi-calculator', Component: CarLoanEmiCalculator },
          { path: 'calculators/education-loan-emi-calculator', Component: EducationLoanCalculator },
          { path: 'calculators/future-value-inflation-calculator', Component: InflationImpactCalculator },
          { path: 'calculators/cost-inflation-index', Component: CostInflationIndexCalculator },
          { path: 'calculators/retirement-planning-calculator', Component: RetirementCalculator },
        ],
      },
      { path: 'calculators/:slug', Component: ComingSoon },

      { path: 'solutions/teachers', Component: Teachers },
      { path: 'for-teachers', Component: Teachers },

      { path: 'solutions/doc', Component: Doctors },
      { path: 'docwealth', Component: Doctors },
      { path: 'for-doctors', Component: Doctors },

      { path: 'regulatory', Component: RegulatoryDisclosures },
      { path: 'regulatory-disclosures', Component: RegulatoryDisclosures },
      { path: 'disclosures', Component: RegulatoryDisclosures },

      { path: '*', Component: ComingSoon },
    ],
  },
]);