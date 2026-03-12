import React, { useMemo, useState } from 'react'
const COUNTRY_CODES = [
  { flag: '🇲🇾', code: '+60',  name: 'Malaysia' },
  { flag: '🇦🇫', code: '+93',  name: 'Afghanistan' },
  { flag: '🇦🇱', code: '+355', name: 'Albania' },
  { flag: '🇩🇿', code: '+213', name: 'Algeria' },
  { flag: '🇦🇩', code: '+376', name: 'Andorra' },
  { flag: '🇦🇴', code: '+244', name: 'Angola' },
  { flag: '🇦🇬', code: '+1',   name: 'Antigua and Barbuda' },
  { flag: '🇦🇷', code: '+54',  name: 'Argentina' },
  { flag: '🇦🇲', code: '+374', name: 'Armenia' },
  { flag: '🇦🇺', code: '+61',  name: 'Australia' },
  { flag: '🇦🇹', code: '+43',  name: 'Austria' },
  { flag: '🇦🇿', code: '+994', name: 'Azerbaijan' },
  { flag: '🇧🇸', code: '+1',   name: 'Bahamas' },
  { flag: '🇧🇭', code: '+973', name: 'Bahrain' },
  { flag: '🇧🇩', code: '+880', name: 'Bangladesh' },
  { flag: '🇧🇧', code: '+1',   name: 'Barbados' },
  { flag: '🇧🇾', code: '+375', name: 'Belarus' },
  { flag: '🇧🇪', code: '+32',  name: 'Belgium' },
  { flag: '🇧🇿', code: '+501', name: 'Belize' },
  { flag: '🇧🇯', code: '+229', name: 'Benin' },
  { flag: '🇧🇹', code: '+975', name: 'Bhutan' },
  { flag: '🇧🇴', code: '+591', name: 'Bolivia' },
  { flag: '🇧🇦', code: '+387', name: 'Bosnia and Herzegovina' },
  { flag: '🇧🇼', code: '+267', name: 'Botswana' },
  { flag: '🇧🇷', code: '+55',  name: 'Brazil' },
  { flag: '🇧🇳', code: '+673', name: 'Brunei' },
  { flag: '🇧🇬', code: '+359', name: 'Bulgaria' },
  { flag: '🇧🇫', code: '+226', name: 'Burkina Faso' },
  { flag: '🇧🇮', code: '+257', name: 'Burundi' },
  { flag: '🇨🇻', code: '+238', name: 'Cabo Verde' },
  { flag: '🇰🇭', code: '+855', name: 'Cambodia' },
  { flag: '🇨🇲', code: '+237', name: 'Cameroon' },
  { flag: '🇨🇦', code: '+1',   name: 'Canada' },
  { flag: '🇨🇫', code: '+236', name: 'Central African Republic' },
  { flag: '🇹🇩', code: '+235', name: 'Chad' },
  { flag: '🇨🇱', code: '+56',  name: 'Chile' },
  { flag: '🇨🇳', code: '+86',  name: 'China' },
  { flag: '🇨🇴', code: '+57',  name: 'Colombia' },
  { flag: '🇰🇲', code: '+269', name: 'Comoros' },
  { flag: '🇨🇬', code: '+242', name: 'Congo' },
  { flag: '🇨🇩', code: '+243', name: 'Congo (DRC)' },
  { flag: '🇨🇷', code: '+506', name: 'Costa Rica' },
  { flag: '🇭🇷', code: '+385', name: 'Croatia' },
  { flag: '🇨🇺', code: '+53',  name: 'Cuba' },
  { flag: '🇨🇾', code: '+357', name: 'Cyprus' },
  { flag: '🇨🇿', code: '+420', name: 'Czech Republic' },
  { flag: '🇩🇰', code: '+45',  name: 'Denmark' },
  { flag: '🇩🇯', code: '+253', name: 'Djibouti' },
  { flag: '🇩🇲', code: '+1',   name: 'Dominica' },
  { flag: '🇩🇴', code: '+1',   name: 'Dominican Republic' },
  { flag: '🇪🇨', code: '+593', name: 'Ecuador' },
  { flag: '🇪🇬', code: '+20',  name: 'Egypt' },
  { flag: '🇸🇻', code: '+503', name: 'El Salvador' },
  { flag: '🇬🇶', code: '+240', name: 'Equatorial Guinea' },
  { flag: '🇪🇷', code: '+291', name: 'Eritrea' },
  { flag: '🇪🇪', code: '+372', name: 'Estonia' },
  { flag: '🇸🇿', code: '+268', name: 'Eswatini' },
  { flag: '🇪🇹', code: '+251', name: 'Ethiopia' },
  { flag: '🇫🇯', code: '+679', name: 'Fiji' },
  { flag: '🇫🇮', code: '+358', name: 'Finland' },
  { flag: '🇫🇷', code: '+33',  name: 'France' },
  { flag: '🇬🇦', code: '+241', name: 'Gabon' },
  { flag: '🇬🇲', code: '+220', name: 'Gambia' },
  { flag: '🇬🇪', code: '+995', name: 'Georgia' },
  { flag: '🇩🇪', code: '+49',  name: 'Germany' },
  { flag: '🇬🇭', code: '+233', name: 'Ghana' },
  { flag: '🇬🇷', code: '+30',  name: 'Greece' },
  { flag: '🇬🇩', code: '+1',   name: 'Grenada' },
  { flag: '🇬🇹', code: '+502', name: 'Guatemala' },
  { flag: '🇬🇳', code: '+224', name: 'Guinea' },
  { flag: '🇬🇼', code: '+245', name: 'Guinea-Bissau' },
  { flag: '🇬🇾', code: '+592', name: 'Guyana' },
  { flag: '🇭🇹', code: '+509', name: 'Haiti' },
  { flag: '🇭🇳', code: '+504', name: 'Honduras' },
  { flag: '🇭🇺', code: '+36',  name: 'Hungary' },
  { flag: '🇮🇸', code: '+354', name: 'Iceland' },
  { flag: '🇮🇳', code: '+91',  name: 'India' },
  { flag: '🇮🇩', code: '+62',  name: 'Indonesia' },
  { flag: '🇮🇷', code: '+98',  name: 'Iran' },
  { flag: '🇮🇶', code: '+964', name: 'Iraq' },
  { flag: '🇮🇪', code: '+353', name: 'Ireland' },
  { flag: '🇮🇱', code: '+972', name: 'Israel' },
  { flag: '🇮🇹', code: '+39',  name: 'Italy' },
  { flag: '🇯🇲', code: '+1',   name: 'Jamaica' },
  { flag: '🇯🇵', code: '+81',  name: 'Japan' },
  { flag: '🇯🇴', code: '+962', name: 'Jordan' },
  { flag: '🇰🇿', code: '+7',   name: 'Kazakhstan' },
  { flag: '🇰🇪', code: '+254', name: 'Kenya' },
  { flag: '🇰🇮', code: '+686', name: 'Kiribati' },
  { flag: '🇽🇰', code: '+383', name: 'Kosovo' },
  { flag: '🇰🇼', code: '+965', name: 'Kuwait' },
  { flag: '🇰🇬', code: '+996', name: 'Kyrgyzstan' },
  { flag: '🇱🇦', code: '+856', name: 'Laos' },
  { flag: '🇱🇻', code: '+371', name: 'Latvia' },
  { flag: '🇱🇧', code: '+961', name: 'Lebanon' },
  { flag: '🇱🇸', code: '+266', name: 'Lesotho' },
  { flag: '🇱🇷', code: '+231', name: 'Liberia' },
  { flag: '🇱🇾', code: '+218', name: 'Libya' },
  { flag: '🇱🇮', code: '+423', name: 'Liechtenstein' },
  { flag: '🇱🇹', code: '+370', name: 'Lithuania' },
  { flag: '🇱🇺', code: '+352', name: 'Luxembourg' },
  { flag: '🇲🇬', code: '+261', name: 'Madagascar' },
  { flag: '🇲🇼', code: '+265', name: 'Malawi' },
  { flag: '🇲🇻', code: '+960', name: 'Maldives' },
  { flag: '🇲🇱', code: '+223', name: 'Mali' },
  { flag: '🇲🇹', code: '+356', name: 'Malta' },
  { flag: '🇲🇭', code: '+692', name: 'Marshall Islands' },
  { flag: '🇲🇷', code: '+222', name: 'Mauritania' },
  { flag: '🇲🇺', code: '+230', name: 'Mauritius' },
  { flag: '🇲🇽', code: '+52',  name: 'Mexico' },
  { flag: '🇫🇲', code: '+691', name: 'Micronesia' },
  { flag: '🇲🇩', code: '+373', name: 'Moldova' },
  { flag: '🇲🇨', code: '+377', name: 'Monaco' },
  { flag: '🇲🇳', code: '+976', name: 'Mongolia' },
  { flag: '🇲🇪', code: '+382', name: 'Montenegro' },
  { flag: '🇲🇦', code: '+212', name: 'Morocco' },
  { flag: '🇲🇿', code: '+258', name: 'Mozambique' },
  { flag: '🇲🇲', code: '+95',  name: 'Myanmar' },
  { flag: '🇳🇦', code: '+264', name: 'Namibia' },
  { flag: '🇳🇷', code: '+674', name: 'Nauru' },
  { flag: '🇳🇵', code: '+977', name: 'Nepal' },
  { flag: '🇳🇱', code: '+31',  name: 'Netherlands' },
  { flag: '🇳🇿', code: '+64',  name: 'New Zealand' },
  { flag: '🇳🇮', code: '+505', name: 'Nicaragua' },
  { flag: '🇳🇪', code: '+227', name: 'Niger' },
  { flag: '🇳🇬', code: '+234', name: 'Nigeria' },
  { flag: '🇲🇰', code: '+389', name: 'North Macedonia' },
  { flag: '🇳🇴', code: '+47',  name: 'Norway' },
  { flag: '🇴🇲', code: '+968', name: 'Oman' },
  { flag: '🇵🇰', code: '+92',  name: 'Pakistan' },
  { flag: '🇵🇼', code: '+680', name: 'Palau' },
  { flag: '🇵🇦', code: '+507', name: 'Panama' },
  { flag: '🇵🇬', code: '+675', name: 'Papua New Guinea' },
  { flag: '🇵🇾', code: '+595', name: 'Paraguay' },
  { flag: '🇵🇪', code: '+51',  name: 'Peru' },
  { flag: '🇵🇭', code: '+63',  name: 'Philippines' },
  { flag: '🇵🇱', code: '+48',  name: 'Poland' },
  { flag: '🇵🇹', code: '+351', name: 'Portugal' },
  { flag: '🇶🇦', code: '+974', name: 'Qatar' },
  { flag: '🇷🇴', code: '+40',  name: 'Romania' },
  { flag: '🇷🇺', code: '+7',   name: 'Russia' },
  { flag: '🇷🇼', code: '+250', name: 'Rwanda' },
  { flag: '🇰🇳', code: '+1',   name: 'Saint Kitts and Nevis' },
  { flag: '🇱🇨', code: '+1',   name: 'Saint Lucia' },
  { flag: '🇻🇨', code: '+1',   name: 'Saint Vincent and the Grenadines' },
  { flag: '🇼🇸', code: '+685', name: 'Samoa' },
  { flag: '🇸🇲', code: '+378', name: 'San Marino' },
  { flag: '🇸🇹', code: '+239', name: 'Sao Tome and Principe' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi Arabia' },
  { flag: '🇸🇳', code: '+221', name: 'Senegal' },
  { flag: '🇷🇸', code: '+381', name: 'Serbia' },
  { flag: '🇸🇨', code: '+248', name: 'Seychelles' },
  { flag: '🇸🇱', code: '+232', name: 'Sierra Leone' },
  { flag: '🇸🇬', code: '+65',  name: 'Singapore' },
  { flag: '🇸🇰', code: '+421', name: 'Slovakia' },
  { flag: '🇸🇮', code: '+386', name: 'Slovenia' },
  { flag: '🇸🇧', code: '+677', name: 'Solomon Islands' },
  { flag: '🇸🇴', code: '+252', name: 'Somalia' },
  { flag: '🇿🇦', code: '+27',  name: 'South Africa' },
  { flag: '🇸🇸', code: '+211', name: 'South Sudan' },
  { flag: '🇪🇸', code: '+34',  name: 'Spain' },
  { flag: '🇱🇰', code: '+94',  name: 'Sri Lanka' },
  { flag: '🇸🇩', code: '+249', name: 'Sudan' },
  { flag: '🇸🇷', code: '+597', name: 'Suriname' },
  { flag: '🇸🇪', code: '+46',  name: 'Sweden' },
  { flag: '🇨🇭', code: '+41',  name: 'Switzerland' },
  { flag: '🇸🇾', code: '+963', name: 'Syria' },
  { flag: '🇹🇼', code: '+886', name: 'Taiwan' },
  { flag: '🇹🇯', code: '+992', name: 'Tajikistan' },
  { flag: '🇹🇿', code: '+255', name: 'Tanzania' },
  { flag: '🇹🇭', code: '+66',  name: 'Thailand' },
  { flag: '🇹🇱', code: '+670', name: 'Timor-Leste' },
  { flag: '🇹🇬', code: '+228', name: 'Togo' },
  { flag: '🇹🇴', code: '+676', name: 'Tonga' },
  { flag: '🇹🇹', code: '+1',   name: 'Trinidad and Tobago' },
  { flag: '🇹🇳', code: '+216', name: 'Tunisia' },
  { flag: '🇹🇷', code: '+90',  name: 'Turkey' },
  { flag: '🇹🇲', code: '+993', name: 'Turkmenistan' },
  { flag: '🇹🇻', code: '+688', name: 'Tuvalu' },
  { flag: '🇺🇬', code: '+256', name: 'Uganda' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine' },
  { flag: '🇦🇪', code: '+971', name: 'UAE' },
  { flag: '🇬🇧', code: '+44',  name: 'United Kingdom' },
  { flag: '🇺🇸', code: '+1',   name: 'United States' },
  { flag: '🇺🇾', code: '+598', name: 'Uruguay' },
  { flag: '🇺🇿', code: '+998', name: 'Uzbekistan' },
  { flag: '🇻🇺', code: '+678', name: 'Vanuatu' },
  { flag: '🇻🇦', code: '+39',  name: 'Vatican City' },
  { flag: '🇻🇪', code: '+58',  name: 'Venezuela' },
  { flag: '🇻🇳', code: '+84',  name: 'Vietnam' },
  { flag: '🇾🇪', code: '+967', name: 'Yemen' },
  { flag: '🇿🇲', code: '+260', name: 'Zambia' },
  { flag: '🇿🇼', code: '+263', name: 'Zimbabwe' },
]

const INDUSTRIES = [
  'Agriculture', 'Automotive', 'Construction', 'Education', 'Energy',
  'Finance & Banking', 'Food & Beverage', 'Healthcare', 'Hospitality & Tourism',
  'IT & Software', 'Legal', 'Logistics & Supply Chain', 'Manufacturing',
  'Media & Entertainment', 'Professional Services', 'Real Estate',
  'Retail & E-commerce', 'SaaS / Technology', 'Telecommunications', 'Other',
]

const PILLARS = [
  {
    name: 'MARKET POSITIONING',
    desc: "Strategic value of your product's placement in the market to attract the targeted customer segment.",
    img: '/marketpositioning.png',
  },
  {
    name: 'BRAND VALUE',
    desc: "Evaluation of your brand's strength in attracting and retaining loyal customers.",
    img: '/brandvalue.png',
  },
  {
    name: 'EMPLOYEE SATISFACTION',
    desc: 'Assessment of employee happiness and engagement within your company culture.',
    img: '/employeesatisfaction.png',
  },
  {
    name: 'MARGINS',
    desc: "Analysis of your company's profitability in relation to operational costs and pricing strategies.",
    img: '/margin.png',
  },
  {
    name: 'REVENUE',
    desc: 'Effectiveness of your marketing efforts to consistently generate sales for the company.',
    img: '/revenue.png',
  },
  {
    name: 'PRODUCTIVITY',
    desc: "Measure of your team's efficiency in converting resources into profitable outputs.",
    img: '/productivity.png',
  },
]

export default function Landing({ onStart }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', company: '', position: '', industry: '' })
  const [touched, setTouched] = useState({})
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]) // default Malaysia
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', company: '', position: '', industry: '' })
  const [modalTouched, setModalTouched] = useState({})
  const [modalCountry, setModalCountry] = useState(COUNTRY_CODES[0])

  const setModal = (key) => (e) => setModalForm((f) => ({ ...f, [key]: e.target.value }))
  const markModal = (key) => () => setModalTouched((t) => ({ ...t, [key]: true }))

  const modalErrors = useMemo(() => {
    const e = {}
    if (!modalForm.firstName.trim()) e.firstName = 'Required'
    if (!modalForm.lastName.trim()) e.lastName = 'Required'
    if (!modalForm.email.trim() || !/.+@.+\..+/.test(modalForm.email)) e.email = 'Enter a valid email'
    if (!modalForm.mobile.trim()) e.mobile = 'Required'
    if (modalForm.mobile && modalForm.mobile.replace(/\D/g, '').length < 7) e.mobile = 'Enter a valid number'
    if (!modalForm.company.trim()) e.company = 'Required'
    if (!modalForm.position.trim()) e.position = 'Required'
    if (!modalForm.industry.trim()) e.industry = 'Please select'
    return e
  }, [modalForm])

  const submitModal = (e) => {
    e.preventDefault()
    setModalTouched({ firstName: true, lastName: true, email: true, mobile: true, company: true, position: true, industry: true })
    if (Object.keys(modalErrors).length > 0) return
    setShowModal(false)
    onStart({ ...modalForm })
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const mark = (key) => () => setTouched((t) => ({ ...t, [key]: true }))

  const errors = useMemo(() => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.mobile.trim()) e.mobile = 'Required'
    if (form.mobile && form.mobile.replace(/\D/g, '').length < 7) e.mobile = 'Enter a valid mobile number'
    if (!form.company.trim()) e.company = 'Required'
    if (!form.position.trim()) e.position = 'Required'
    if (!form.industry.trim()) e.industry = 'Please select your industry'
    return e
  }, [form])

  const canSubmit = Object.keys(errors).length === 0

  const submit = (e) => {
    e.preventDefault()
    setTouched({ firstName: true, lastName: true, email: true, mobile: true, company: true, position: true, industry: true })
    if (!canSubmit) return
    onStart({ ...form })
  }

  return (
    <section className="landing">
      <div className="hero">
        {/* Left: headline + bullets */}
        <div className="hero-left">
          <h1 className="hero-title">
            Improve Your Business Performance with the <strong>Future-Ready Business Scorecard</strong>!
          </h1>
          <p className="hero-subtitle">Get Your <strong>Personalized</strong> Business Gap Analysis in 5 Minutes (faster than answering an email!)</p>
          <ul className="hero-points">
            <li><span className="hero-check">✓</span> Answer all the business assessment questions!</li>
            <li><span className="hero-check">✓</span> Instantly receive a Business Scorecard customised to your business's revenue needs.</li>
            <li><span className="hero-check">✓</span> It's FREE (for a limited time)</li>
          </ul>
        </div>

        {/* Right: form card */}
        <div className="form-card">
          <p className="form-tagline">Fill in your details below &amp; you're good to go!</p>

          <form className="form" onSubmit={submit} noValidate>

            {/* First + Last name row */}
            <div className="form-row-2">
              <div className="field">
                <input
                  id="firstName" name="firstName" type="text"
                  className={`input ${touched.firstName && errors.firstName ? 'invalid' : ''}`}
                  value={form.firstName} onChange={set('firstName')} onBlur={mark('firstName')}
                  placeholder="First name *" required
                />
                {touched.firstName && errors.firstName && <div className="error">{errors.firstName}</div>}
              </div>
              <div className="field">
                <input
                  id="lastName" name="lastName" type="text"
                  className={`input ${touched.lastName && errors.lastName ? 'invalid' : ''}`}
                  value={form.lastName} onChange={set('lastName')} onBlur={mark('lastName')}
                  placeholder="Last name *" required
                />
                {touched.lastName && errors.lastName && <div className="error">{errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div className="field">
              <input
                id="email" name="email" type="email"
                className={`input ${touched.email && errors.email ? 'invalid' : ''}`}
                value={form.email} onChange={set('email')} onBlur={mark('email')}
                placeholder="Email *" required
              />
              {touched.email && errors.email && <div className="error">{errors.email}</div>}
            </div>

            {/* Mobile */}
            <div className="field">
              <div className={`mobile-wrap ${touched.mobile && errors.mobile ? 'invalid' : ''}`}>
                <select
                  className="mobile-country-select"
                  value={countryCode.name}
                  onChange={e => setCountryCode(COUNTRY_CODES.find(c => c.name === e.target.value))}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map(c => (
                    <option key={c.name} value={c.name}>{c.flag} {c.code} {c.name}</option>
                  ))}
                </select>
                <span className="mobile-flag-display">{countryCode.flag} {countryCode.code}</span>
                <input
                  id="mobile" name="mobile" type="tel" inputMode="numeric"
                  className="mobile-input"
                  value={form.mobile} onChange={set('mobile')} onBlur={mark('mobile')}
                  placeholder="012-345 6789" required
                />
              </div>
              {touched.mobile && errors.mobile && <div className="error">{errors.mobile}</div>}
            </div>

            {/* Company Name */}
            <div className="field">
              <input
                id="company" name="company" type="text"
                className={`input ${touched.company && errors.company ? 'invalid' : ''}`}
                value={form.company} onChange={set('company')} onBlur={mark('company')}
                placeholder="Company Name *" required
              />
              {touched.company && errors.company && <div className="error">{errors.company}</div>}
            </div>

            {/* Position */}
            <div className="field">
              <input
                id="position" name="position" type="text"
                className={`input ${touched.position && errors.position ? 'invalid' : ''}`}
                value={form.position} onChange={set('position')} onBlur={mark('position')}
                placeholder="Position in Company *" required
              />
              {touched.position && errors.position && <div className="error">{errors.position}</div>}
            </div>

            {/* Industry dropdown */}
            <div className="field">
              <select
                id="industry" name="industry"
                className={`input select-input ${touched.industry && errors.industry ? 'invalid' : ''}`}
                value={form.industry} onChange={set('industry')} onBlur={mark('industry')}
                required
              >
                <option value="">What industry are you in? *</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              {touched.industry && errors.industry && <div className="error">{errors.industry}</div>}
            </div>

            <button className="btn primary landing-btn" type="submit">START YOUR SCORECARD</button>
          </form>

          
          
        </div>
      </div>
      {/* 6 Performance Pillars section */}
      <div className="pillars-section">
        <h2 className="pillars-title">ASSESS THE 6 PERFORMANCE PILLARS THAT POWERS YOUR BUSINESS</h2>
        <div className="pillars-grid">
          {PILLARS.map((p, i) => (
            <div key={i} className="pillar-item">
              <div className="pillar-icon-wrap">
                <img src={p.img} alt={p.name} className="pillar-img" />
              </div>
              <h3 className="pillar-name">{p.name}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA text + button */}
        <div className="pillars-cta">
          <p className="pillars-cta-text">
            This 5-Minute Business Scorecard will highlight which <strong>Performance Pillar</strong> You and Your Key Leaders will need to prioritise, so You Can Become the market Leader of Your Industry.
          </p>
          <button className="pillars-cta-btn" onClick={() => setShowModal(true)}>LET'S GET STARTED</button>
        </div>
      </div>

      {/* Companies section */}
      <div className="companies-section">
        <img src="/marker13.png" alt="Companies we have worked with" className="companies-image" />
      </div>

      {/* Trusted Advisors section (separate frame below companies) */}
      <div className="advisors-section" aria-label="Trusted advisors">
        <p className="advisors-note">
          The Future-Ready Business Scorecard is Developed by Venture Builders with the Combined Experience of Starting 91 Startups Across 14 Industries with 5 IPOs.
        </p>
        <div className="advisors-people">
          <div className="advisor-person">
            <img src="/datojamesfoo.png" alt="Dato' James Foo" className="advisor-avatar" />
            <div className="advisor-name">DATO' JAMES FOO</div>
            <div className="advisor-role">Business Model Strategist</div>
          </div>
          <div className="advisor-person">
            <img src="/candymoy.png" alt="Candy Moy" className="advisor-avatar" />
            <div className="advisor-name">CANDY MOY</div>
            <div className="advisor-role">PR &amp; Operations Strategist</div>
          </div>
        </div>
      </div>

      {/* Dark CTA banner — marker14.png */}
      <div className="cta-banner">
        <p className="cta-banner-text">
          Sometimes all it takes is one idea, one insight or one inspiration, to totally change the trajectory of your business (and your life)!
        </p>
        <button className="cta-banner-btn" onClick={() => setShowModal(true)}>UNLOCK YOUR BUSINESS' POTENTIAL</button>
      </div>

      {/* Modal popup */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">✕</button>
            <p className="modal-title">Enter your details below to start the scorecard</p>
            <form className="form" onSubmit={submitModal} noValidate>

              {/* First + Last name */}
              <div className="form-row-2">
                <div className="field">
                  <input type="text" className={`input modal-input ${modalTouched.firstName && modalErrors.firstName ? 'invalid' : ''}`} placeholder="First name *" value={modalForm.firstName} onChange={setModal('firstName')} onBlur={markModal('firstName')} />
                  {modalTouched.firstName && modalErrors.firstName && <div className="error">{modalErrors.firstName}</div>}
                </div>
                <div className="field">
                  <input type="text" className={`input modal-input ${modalTouched.lastName && modalErrors.lastName ? 'invalid' : ''}`} placeholder="Last name *" value={modalForm.lastName} onChange={setModal('lastName')} onBlur={markModal('lastName')} />
                  {modalTouched.lastName && modalErrors.lastName && <div className="error">{modalErrors.lastName}</div>}
                </div>
              </div>

              {/* Email */}
              <div className="field">
                <input type="email" className={`input modal-input ${modalTouched.email && modalErrors.email ? 'invalid' : ''}`} placeholder="Email *" value={modalForm.email} onChange={setModal('email')} onBlur={markModal('email')} />
                {modalTouched.email && modalErrors.email && <div className="error">{modalErrors.email}</div>}
              </div>

              {/* Mobile */}
              <div className="field">
                <div className="modal-mobile-label">Mobile *</div>
                <div className={`mobile-wrap modal-mobile ${modalTouched.mobile && modalErrors.mobile ? 'invalid' : ''}`}>
                  <select className="mobile-country-select" value={modalCountry.name} onChange={e => setModalCountry(COUNTRY_CODES.find(c => c.name === e.target.value))} aria-label="Country code">
                    {COUNTRY_CODES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.code} {c.name}</option>)}
                  </select>
                  <span className="mobile-flag-display">{modalCountry.flag} <span style={{fontSize:12}}>▾</span></span>
                  <input type="tel" className="mobile-input" placeholder="012-345 6789" value={modalForm.mobile} onChange={setModal('mobile')} onBlur={markModal('mobile')} />
                </div>
                {modalTouched.mobile && modalErrors.mobile && <div className="error">{modalErrors.mobile}</div>}
              </div>

              {/* Company */}
              <div className="field">
                <input type="text" className={`input modal-input ${modalTouched.company && modalErrors.company ? 'invalid' : ''}`} placeholder="Company Name *" value={modalForm.company} onChange={setModal('company')} onBlur={markModal('company')} />
                {modalTouched.company && modalErrors.company && <div className="error">{modalErrors.company}</div>}
              </div>

              {/* Position */}
              <div className="field">
                <input type="text" className={`input modal-input ${modalTouched.position && modalErrors.position ? 'invalid' : ''}`} placeholder="Position in Company *" value={modalForm.position} onChange={setModal('position')} onBlur={markModal('position')} />
                {modalTouched.position && modalErrors.position && <div className="error">{modalErrors.position}</div>}
              </div>

              {/* Industry */}
              <div className="field">
                <select className={`input modal-input select-input ${modalTouched.industry && modalErrors.industry ? 'invalid' : ''}`} value={modalForm.industry} onChange={setModal('industry')} onBlur={markModal('industry')}>
                  <option value="">What industry are you in? *</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                {modalTouched.industry && modalErrors.industry && <div className="error">{modalErrors.industry}</div>}
              </div>

              <button type="submit" className="modal-submit-btn">START NOW</button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
