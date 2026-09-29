export type CalculatorDefinition = {
  slug: string;
  name: string;
  description: string;
  category: "Calculators";
  formula: string;
  example: string;
};

export const calculators: CalculatorDefinition[] = [
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age from a date of birth.", category: "Calculators", formula: "Age is calculated from the date of birth to the selected end date.", example: "Enter your birth date and use today as the end date." },
  { slug: "emi-calculator", name: "EMI Calculator", description: "Estimate monthly loan payments, total interest and total payment.", category: "Calculators", formula: "EMI = P × r × (1+r)^n / ((1+r)^n − 1)", example: "For a ₹5,00,000 loan at 10% yearly interest for 5 years, the calculator estimates the monthly EMI." },
  { slug: "gst-calculator", name: "GST Calculator", description: "Add GST to a base amount or remove GST from an inclusive amount.", category: "Calculators", formula: "GST = taxable amount × GST rate / 100", example: "Enter ₹1,000 and 18% to calculate GST and the final amount." },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Find percentages, percentage change and the value of a percentage.", category: "Calculators", formula: "Percentage = (part ÷ whole) × 100", example: "Find what percentage 25 is of 200, or calculate 15% of 800." },
  { slug: "profit-loss-calculator", name: "Profit & Loss Calculator", description: "Calculate profit, loss and percentage from cost and selling prices.", category: "Calculators", formula: "Profit/Loss = Selling Price − Cost Price", example: "Enter cost ₹800 and selling price ₹1,000 to calculate profit and profit percentage." },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate body mass index from height and weight.", category: "Calculators", formula: "BMI = weight (kg) ÷ height² (m²)", example: "Enter height in centimetres and weight in kilograms." },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", description: "Find the difference between two dates in days, weeks, months and years.", category: "Calculators", formula: "Difference = end date − start date", example: "Choose two dates to see the calendar-day difference." },
  { slug: "salary-calculator", name: "Salary Calculator", description: "Estimate take-home salary from gross salary and deductions.", category: "Calculators", formula: "Take-home salary = gross salary − total deductions", example: "Enter monthly gross salary and estimated deductions." },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate discount amount and final price.", category: "Calculators", formula: "Discount = original price × discount rate / 100", example: "Enter ₹2,000 and a 15% discount to get ₹300 savings and a ₹1,700 final price." },
  { slug: "sip-calculator", name: "SIP Calculator", description: "Estimate the future value of a monthly SIP investment.", category: "Calculators", formula: "FV = P × [((1+r)^n − 1) / r] × (1+r)", example: "Enter a monthly investment, expected annual return and investment period." },
];

export const calculatorSlugs = calculators.map((calculator) => calculator.slug);
export const getCalculator = (slug: string) => calculators.find((calculator) => calculator.slug === slug);
