import { useState } from 'react';
import './styles.css';

const stats = [
  { label: 'طالب وباحث', value: '24.8K', icon: '🎓' },
  { label: 'خدمة منجزة', value: '3.6K', icon: '✓' },
  { label: 'جهة أكاديمية', value: '120+', icon: '⌂' },
  { label: 'معدل الرضا', value: '96%', icon: '★' },
];

const services = [
  { name: 'البحوث والتقارير', icon: '▤', price: 'من 250 ر.ع', description: 'إعداد ومراجعة البحوث والتقارير بأسلوب أكاديمي منظم.' },
  { name: 'التحليل الإحصائي', icon: '◒', price: 'من 180 ر.ع', description: 'تحليل البيانات وتفسير النتائج باستخدام منهجية دقيقة.' },
  { name: 'الرسائل الجامعية', icon: '◇', price: 'من 420 ر.ع', description: 'دعم متكامل لمشاريع التخرج والرسائل العلمية.' },
  { name: 'التدقيق والتنسيق', icon: '✓', price: 'من 120 ر.ع', description: 'تدقيق لغوي وتنسيق أكاديمي وفق المتطلبات الجامعية.' },
];

const steps = [
  ['01', 'أرسل طلبك', 'حدد الخدمة وأرفق تفاصيل احتياجك الأكاديمي.'],
  ['02', 'نراجع الطلب', 'يتواصل معك فريق موثوق لتأكيد التفاصيل والتكلفة.'],
  ['03', 'ننفذ باحتراف', 'يعمل المختصون على طلبك وفق معايير الجودة.'],
  ['04', 'تستلم بثقة', 'تستلم العمل مع إمكانية المراجعة والدعم.'],
];

function App() {
  const [form, setForm] = useState({ service: services[0].name, name: '', email: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  };

  const submitRequest = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="landing-page">
      <div className="top-strip"><div className="container">منصة موثوق للخدمات الأكاديمية في سلطنة عُمان <span>● دعم متاح الآن</span></div></div>
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="موثوق">
            <div className="brand-mark">م</div>
            <div><b>موثوق</b><small>MAWTHOOQ</small></div>
          </a>
          <nav className="nav-links" aria-label="التنقل">
            <a href="#home" className="active">الرئيسية</a><a href="#services">الخدمات</a><a href="#about">عن موثوق</a><a href="#steps">كيف نعمل؟</a><a href="#request">طلب خدمة</a>
          </nav>
          <a className="primary-btn nav-cta" href="#request">ابدأ طلبك <span>←</span></a>
        </div>
      </header>

      <main id="home">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span>✦</span> شريكك الأكاديمي الموثوق</div>
            <h1>نحوّل طموحك الأكاديمي إلى <em>إنجاز موثوق</em></h1>
            <p>منصة عُمانية تجمعك بخدمات أكاديمية احترافية، مصممة لتمنحك الجودة والوضوح والدعم في كل خطوة من رحلتك التعليمية.</p>
            <div className="hero-actions"><a className="primary-btn" href="#request">اطلب خدمتك الآن <span>←</span></a><a className="secondary-btn" href="#services">اكتشف خدماتنا <span>↓</span></a></div>
            <div className="trust-row"><div className="avatars"><i>م</i><i>س</i><i>أ</i><b>+24K</b></div><div><strong>يثق بنا الطلاب والباحثون</strong><small>تجربة أكاديمية تبدأ بالثقة</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="glow glow-one" /><div className="glow glow-two" />
            <div className="dashboard-card">
              <div className="dashboard-top"><div><small>لوحة المتابعة</small><strong>مرحباً بك في موثوق</strong></div><div className="mark-small">م</div></div>
              <div className="completion"><div><small>إنجاز الطلبات</small><strong>92%</strong></div><div className="bar"><span /></div><small>تحسن هذا الشهر <b>+18%</b></small></div>
              <div className="request-preview"><div className="preview-head"><strong>آخر الطلبات</strong><span>عرض الكل</span></div>{['بحث أكاديمي', 'تحليل إحصائي', 'رسالة جامعية'].map((item, index) => <div className="preview-row" key={item}><span className={`preview-icon p${index}`}>{['▤', '◒', '◇'][index]}</span><div><b>{item}</b><small>{['قيد التنفيذ', 'جاهز للتسليم', 'مراجعة نهائية'][index]}</small></div><span className={`request-status s${index}`}>{['متقدم', 'جاهز', 'قريب'][index]}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section className="stats-wrap"><div className="container stats-grid">{stats.map((item) => <div className="stat-card" key={item.label}><span className="stat-icon">{item.icon}</span><div><strong>{item.value}</strong><small>{item.label}</small></div></div>)}</div></section>

        <section className="section container" id="about"><div className="section-heading"><div><span className="section-kicker">لماذا موثوق؟</span><h2>كل ما تحتاجه لرحلة أكاديمية <em>أكثر وضوحاً</em></h2></div><p>نؤمن أن الوصول إلى الخدمة الأكاديمية المناسبة يجب أن يكون سهلاً، آمناً، وموثوقاً.</p></div><div className="value-grid"><article><span>01</span><h3>جودة نعتز بها</h3><p>نختار الخبرات والكفاءات بعناية لنقدم نتائج تليق بطموحك.</p></article><article><span>02</span><h3>وضوح في كل خطوة</h3><p>أسعار واضحة، متابعة مستمرة، وتواصل مباشر من البداية حتى التسليم.</p></article><article><span>03</span><h3>حلول تناسبك</h3><p>خدمات مرنة تناسب الطلاب والباحثين والمؤسسات الأكاديمية.</p></article></div></section>

        <section className="services-section" id="services"><div className="container"><div className="section-heading light"><div><span className="section-kicker">خدماتنا الأكاديمية</span><h2>نضع خبرتنا بين يديك</h2></div><p>اختر الخدمة التي تناسب احتياجك، وسنساعدك على تحويل فكرتك إلى نتيجة احترافية.</p></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.name}><span className="service-icon">{service.icon}</span><h3>{service.name}</h3><p>{service.description}</p><div><strong>{service.price}</strong><a href="#request">اطلب الآن <span>←</span></a></div></article>)}</div></div></section>

        <section className="section process" id="steps"><div className="section-heading center"><span className="section-kicker">رحلتك مع موثوق</span><h2>أربع خطوات تفصلك عن الإنجاز</h2></div><div className="steps-grid">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

        <section className="request-section" id="request"><div className="container request-layout"><div className="request-intro"><span className="section-kicker">ابدأ الآن</span><h2>لديك إنجاز قادم؟<br /><em>دعنا نبدأه معاً.</em></h2><p>أرسل تفاصيل طلبك وسيتواصل معك فريق موثوق لتأكيد الخدمة والخطوات القادمة.</p><div className="contact-note"><span>✓</span><div><strong>رد سريع من فريقنا</strong><small>نتواصل معك خلال ساعات العمل</small></div></div></div><form className="request-form" onSubmit={submitRequest}><div className="form-title"><div><h3>اطلب خدمة أكاديمية</h3><p>املأ البيانات التالية وسنعود إليك قريباً.</p></div><span>مـ</span></div><label>نوع الخدمة<select name="service" value={form.service} onChange={updateForm}>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></label><div className="form-row"><label>الاسم الكامل<input name="name" value={form.name} onChange={updateForm} placeholder="أدخل اسمك" required /></label><label>البريد الإلكتروني<input type="email" name="email" value={form.email} onChange={updateForm} placeholder="name@example.com" required /></label></div><label>تفاصيل الطلب<textarea name="details" value={form.details} onChange={updateForm} placeholder="اكتب تفاصيل طلبك أو استفسارك..." rows="4" required /></label><button className="primary-btn submit-btn" type="submit">إرسال الطلب <span>←</span></button>{submitted && <div className="success-message">✓ تم استلام طلبك بنجاح، سيتواصل معك فريق موثوق قريباً.</div>}</form></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><a className="brand" href="#home"><div className="brand-mark">م</div><b>موثوق</b></a><p>منصة رقمية للخدمات الأكاديمية في سلطنة عُمان</p><span>© 2026 Mawthooq</span></div></footer>
    </div>
  );
}

export default App;
