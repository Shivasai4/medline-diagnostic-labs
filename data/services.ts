export interface Service {
  slug: string
  name: string
  icon: string
  shortDescription: string
  price: string
  overview: string
  whoShouldTake: string[]
  preparation: string
  benefits: string[]
  turnaround: string
}

export const services: Service[] = [
  {
    slug: "complete-blood-count",
    name: "Complete Blood Count (CBC)",
    icon: "Droplet",
    shortDescription: "Comprehensive blood cell analysis including RBC, WBC, and platelets.",
    price: "\u20B9299",
    overview:
      "A Complete Blood Count measures different components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. It helps detect a wide range of disorders including anemia, infection, and blood diseases.",
    whoShouldTake: [
      "Adults above 40 for annual checkup",
      "Patients with fatigue or weakness",
      "Pre-surgery screening",
    ],
    preparation: "No fasting required. Avoid strenuous exercise before the test.",
    benefits: ["Detects anemia", "Identifies infections", "Monitors blood disorders"],
    turnaround: "Same Day",
  },
  {
    slug: "lipid-profile",
    name: "Lipid Profile",
    icon: "Heart",
    shortDescription: "Complete cholesterol and triglyceride analysis for heart health assessment.",
    price: "\u20B9499",
    overview:
      "A Lipid Profile test measures the amount of cholesterol and fats in your blood. It includes total cholesterol, LDL, HDL, triglycerides, and VLDL levels to assess cardiovascular risk.",
    whoShouldTake: [
      "Adults above 35 years",
      "People with family history of heart disease",
      "Patients on cholesterol medication",
    ],
    preparation: "12 hours fasting required before the test. Water is allowed.",
    benefits: ["Assesses heart disease risk", "Monitors cholesterol levels", "Guides treatment plans"],
    turnaround: "Same Day",
  },
  {
    slug: "full-body-checkup",
    name: "Full Body Checkup",
    icon: "Activity",
    shortDescription: "Comprehensive health screening with 70+ parameters for complete wellness assessment.",
    price: "\u20B92,999",
    overview:
      "Our Full Body Checkup includes 70+ parameters covering blood count, liver function, kidney function, thyroid, diabetes, lipid profile, vitamins, and more. It provides a thorough health assessment for preventive care.",
    whoShouldTake: [
      "Everyone above 30 years annually",
      "People with sedentary lifestyles",
      "Individuals with family history of chronic diseases",
    ],
    preparation: "10-12 hours fasting required. Avoid alcohol 24 hours before.",
    benefits: ["Early disease detection", "Complete health overview", "Preventive care guidance"],
    turnaround: "24 Hours",
  },
  {
    slug: "hba1c-diabetes",
    name: "HbA1c (Diabetes)",
    icon: "Pill",
    shortDescription: "Measures average blood sugar levels over the past 2-3 months.",
    price: "\u20B9399",
    overview:
      "The HbA1c test measures your average blood glucose levels over the past 2-3 months. It is the gold standard for monitoring diabetes control and diagnosing prediabetes.",
    whoShouldTake: [
      "Diabetic patients for monitoring",
      "People with prediabetes symptoms",
      "Adults above 45 for screening",
    ],
    preparation: "No fasting required. Can be done at any time of the day.",
    benefits: ["Monitors diabetes control", "Detects prediabetes", "Guides medication adjustments"],
    turnaround: "Same Day",
  },
  {
    slug: "thyroid-panel",
    name: "Thyroid Panel (TSH/T3/T4)",
    icon: "Scan",
    shortDescription: "Complete thyroid function test including TSH, T3, and T4 levels.",
    price: "\u20B9599",
    overview:
      "The Thyroid Panel measures TSH, T3, and T4 hormone levels to evaluate thyroid gland function. It helps diagnose hypothyroidism, hyperthyroidism, and other thyroid disorders.",
    whoShouldTake: [
      "Women above 35 years",
      "Patients with unexplained weight changes",
      "People with fatigue or mood changes",
    ],
    preparation: "No fasting required. Best done in the morning.",
    benefits: ["Diagnoses thyroid disorders", "Monitors thyroid medication", "Detects hormonal imbalance"],
    turnaround: "Same Day",
  },
  {
    slug: "vitamin-d",
    name: "Vitamin D Test",
    icon: "Sun",
    shortDescription: "Measures Vitamin D levels to assess bone health and immune function.",
    price: "\u20B9699",
    overview:
      "The Vitamin D test measures the level of 25-hydroxyvitamin D in your blood. Low Vitamin D is linked to weak bones, fatigue, depression, and weakened immunity.",
    whoShouldTake: [
      "People with bone pain or weakness",
      "Indoor workers with limited sun exposure",
      "Elderly and postmenopausal women",
    ],
    preparation: "No fasting required. No special preparation needed.",
    benefits: ["Assesses bone health", "Identifies deficiency", "Guides supplementation"],
    turnaround: "24 Hours",
  },
  {
    slug: "vitamin-b12",
    name: "Vitamin B12 Test",
    icon: "Zap",
    shortDescription: "Measures Vitamin B12 levels essential for nerve function and red blood cell formation.",
    price: "\u20B9599",
    overview:
      "The Vitamin B12 test measures the amount of B12 in your blood. B12 is crucial for nerve function, DNA synthesis, and red blood cell formation. Deficiency can cause fatigue, numbness, and anemia.",
    whoShouldTake: [
      "Vegetarians and vegans",
      "People with numbness or tingling",
      "Patients with chronic fatigue",
    ],
    preparation: "No fasting required. Avoid B12 supplements 24 hours before.",
    benefits: ["Detects B12 deficiency", "Monitors nerve health", "Guides supplementation"],
    turnaround: "Same Day",
  },
  {
    slug: "liver-function-test",
    name: "Liver Function Test (LFT)",
    icon: "FileHeart",
    shortDescription: "Comprehensive liver health assessment including enzymes and protein levels.",
    price: "\u20B9499",
    overview:
      "The Liver Function Test measures enzymes, proteins, and substances produced by the liver. It includes ALT, AST, ALP, bilirubin, albumin, and total protein to assess liver health.",
    whoShouldTake: [
      "People on long-term medication",
      "Regular alcohol consumers",
      "Patients with jaundice symptoms",
    ],
    preparation: "8-12 hours fasting recommended.",
    benefits: ["Assesses liver health", "Detects liver diseases", "Monitors medication effects"],
    turnaround: "Same Day",
  },
  {
    slug: "kidney-function-test",
    name: "Kidney Function Test (KFT)",
    icon: "Beaker",
    shortDescription: "Evaluates kidney health through creatinine, urea, and electrolyte levels.",
    price: "\u20B9499",
    overview:
      "The Kidney Function Test evaluates how well your kidneys are working. It measures creatinine, blood urea nitrogen (BUN), uric acid, and electrolytes to detect kidney disease early.",
    whoShouldTake: [
      "Diabetic and hypertensive patients",
      "People with urinary issues",
      "Adults above 50 years",
    ],
    preparation: "8-12 hours fasting may be required. Follow doctor's advice.",
    benefits: ["Early kidney disease detection", "Monitors kidney function", "Guides treatment plans"],
    turnaround: "Same Day",
  },
  {
    slug: "covid-19-antibody-test",
    name: "COVID-19 Antibody Test",
    icon: "Shield",
    shortDescription: "Detects antibodies against SARS-CoV-2 to check immunity status.",
    price: "\u20B9799",
    overview:
      "The COVID-19 Antibody Test detects IgG antibodies against SARS-CoV-2 in your blood. It helps determine if you have developed immunity after infection or vaccination.",
    whoShouldTake: [
      "Post-COVID recovery patients",
      "Vaccinated individuals checking immunity",
      "People suspected of past infection",
    ],
    preparation: "No fasting required. No special preparation needed.",
    benefits: ["Checks immunity status", "Confirms past infection", "Assesses vaccine response"],
    turnaround: "24 Hours",
  },
]
