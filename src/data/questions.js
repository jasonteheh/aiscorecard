const questions = [
  // ── Revenue (7) ──
  {
    category: 'Revenue',
    question: 'Do you have at least 3 different channels to generate leads?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'How many percent of your revenue comes from existing customers?',
    options: [
      { label: 'More than 50%', score: 3 },
      { label: 'More than 30%', score: 2 },
      { label: 'More than 20%', score: 1 },
      { label: 'Less than 10%', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'How often are you staying in touch with your customers?',
    options: [
      { label: 'Monthly', score: 3 },
      { label: 'Quarterly', score: 2 },
      { label: 'Yearly', score: 1 },
      { label: 'Whenever there is a need', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'Do you have a dashboard to monitor all the important sales and marketing metrics?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'Does your team have a list of criteria for your best type of customers?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'Do you have clear touchpoints to engage your prospects and customers?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Revenue',
    question: 'Do you have yearly, quarterly and monthly revenue projections?',
    options: [
      { label: 'Monthly', score: 3 },
      { label: 'Quarterly', score: 2 },
      { label: 'Yearly', score: 1 },
      { label: "I don't do revenue projections", score: 0 },
    ],
  },

  // ── Brand Value (7) ──
  {
    category: 'Brand Value',
    question: 'How often do you get feedback from customers?',
    options: [
      { label: 'Everytime', score: 2 },
      { label: '50-50', score: 1 },
      { label: 'Hardly ever', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: "Do you collect reviews and/or testimonials of your customers' success stories?",
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: 'Do your company\'s founders and key leaders have a strong social media presence?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: 'Do you know your company have a brand identity? (Example: logos, taglines, color scheme, CI etc)',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: "Does the company's brand align with business goals?",
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: 'Does your brand have distinguishing factors that differentiate it from competitors that are effectively communicated?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Brand Value',
    question: 'Does your brand consistently deliver on its promises and meet customer expectations?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },

  // ── Margins (7) ──
  {
    category: 'Margins',
    question: 'How long can your business continue operating without incoming sales?',
    options: [
      { label: 'More than a year', score: 4 },
      { label: 'A year', score: 3 },
      { label: 'Half a year', score: 2 },
      { label: 'A quarter', score: 1 },
      { label: 'A month', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Can you get the accurate financial health of your company in less than 15 minutes?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Can your business generate monthly recurring revenue?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Do you clearly know where your high profit and cost centres are?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Is your debt collection process efficient?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Do you have a well-developed strategy to exit the business one day?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Margins',
    question: 'Do you know who your competitors and contenders are?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },

  // ── Market Positioning (6) ──
  {
    category: 'Market Positioning',
    question: "Do you solving, eradicating or eliminating your customers' challenges?",
    options: [
      { label: 'Eliminating', score: 2 },
      { label: 'Eradicating', score: 1 },
      { label: 'Solving', score: 0 },
    ],
  },
  {
    category: 'Market Positioning',
    question: 'Are you in a sunrise, evergreen or sunset industry?',
    options: [
      { label: 'Sunrise', score: 2 },
      { label: 'Evergreen', score: 1 },
      { label: 'Sunset', score: 0 },
    ],
  },
  {
    category: 'Market Positioning',
    question: "Are you familiar with your business's Strengths, Weaknesses, Opportunities and Threats?",
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Market Positioning',
    question: 'Do you have a 3- and 10- years plan for your business?',
    options: [
      { label: 'Yes', score: 2 },
      { label: 'Only 3-year plan', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Market Positioning',
    question: 'Do you effectively target and reach your target customer segments?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Market Positioning',
    question: 'How often does your company innovate new products?',
    options: [
      { label: 'Quarterly', score: 2 },
      { label: 'Yearly', score: 1 },
      { label: 'Hardly ever', score: 0 },
    ],
  },

  // ── Productivity (7) ──
  {
    category: 'Productivity',
    question: 'How often do your employees have to work overtime?',
    options: [
      { label: 'Never', score: 3 },
      { label: 'Once a month', score: 2 },
      { label: 'Once a week', score: 1 },
      { label: 'Several times a week', score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: 'Do you have a team of key leaders for each of your business functions/departments?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: 'Are your SOPs clear, simple and duplicable?',
    options: [
      { label: 'Yes', score: 2 },
      { label: 'There\'s room for improvement', score: 1 },
      { label: "We don't have SOPs", score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: 'Do you clearly know which key areas of your business you need to work on in the next 90 days?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: 'Have you upgraded your tools and technologies in the last 18 months? (Example: computer hardware, software etc)',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: "Is every team member's targets properly set and monitored to achieve the goals that has the most impact?",
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Productivity',
    question: 'Is your team accomplishing their daily and weekly goals?',
    options: [
      { label: 'Yes', score: 2 },
      { label: '50-50', score: 1 },
      { label: 'No', score: 0 },
    ],
  },

  // ── Employee Satisfaction (7) ──
  {
    category: 'Employee Satisfaction',
    question: "Do you have a career development track for your employee' promotions and professional goals?",
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Do you have a channel for employees to give feedback to the leadership?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Do you have a reward scheme for your team?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Do you have adequate job description in place?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Are you and your team continuously upgrading your mind, skills, tools and body?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Are you paying your team lower, same or higher than the market rate?',
    options: [
      { label: 'Higher than the market rate', score: 2 },
      { label: 'Same as the market rate', score: 1 },
      { label: 'Lower than the market rate', score: 0 },
    ],
  },
  {
    category: 'Employee Satisfaction',
    question: 'Does your team have the right tools and resources needed to perform their job well?',
    options: [
      { label: 'Yes', score: 1 },
      { label: 'No', score: 0 },
    ],
  },
]

export default questions
