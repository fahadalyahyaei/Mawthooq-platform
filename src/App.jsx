import './styles.css';

const stats = [
  { label: 'الطلاب المسجلين', value: '24.8K', icon: '🎓' },
  { label: 'الخدمات المنجزة', value: '3.6K', icon: '✅' },
  { label: 'الجامعات المتعاقدة', value: '120', icon: '🏛️' },
  { label: 'رضا العملاء', value: '96%', icon: '⭐' },
];

const features = [
  {
    icon: '📚',
    title: 'خدمات أكاديمية متكاملة',
    text: 'نقدم خدمات البحث العلمي، التوثيق، المراجعة، والدعم الأكاديمي عبر منصة احترافية وسريعة.',
  },
  {
    icon: '⚡',
    title: 'تجربة سهلة ومباشرة',
    text: 'واجهة مستخدم واضحة، تشغيل سريع، ومتابعة دقيقة تجعل كل طلبك أكثر وضوحًا وفعالية.',
  },
  {
    icon: '🔒',
    title: 'أمان وخصوصية',
    text: 'نحافظ على سرية بياناتك ونعمل على بيئة آمنة ومطمئنة في كل التفاعل.',
  },
];

const services = [
  { name: 'البحوث العلمية', price: 'من 250 ر.ع', icon: '📘' },
  { name: 'المراجعات الأكاديمية', price: 'من 180 ر.ع', icon: '📝' },
  { name: 'الرسائل الجامعية', price: 'من 420 ر.ع', icon: '🎓' },
  { name: 'التحليل الإحصائي', price: 'من 220 ر.ع', icon: '📊' },
];

const process = [
  { step: '01', title: 'تقديم الطلب', text: 'تحديد نوع الخدمة والاحتياج الأكاديمي بكل وضوح.' },
  { step: '02', title: 'تقييم سريع', text: 'فريقنا يراجع الطلب ويحدد الوقت والتكلفة المناسبة.' },
  { step: '03', title: 'التنفيذ', text: 'نقوم بالعمل بشكل احترافي وفق المعايير الأكاديمية المطلوبة.' },
  { step: '04', title: 'التسليم', text: 'استلام النتيجة النهائية مع متابعة وتعديلات عند الحاجة.' },
];

function App() {
  return (
    <div className="landing-page">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand" aria-label="شعار المنصة">
            <div className="brand-mark">م</div>
            <div>
              <div className="brand-name">موثوق</div>
              <small>Academic Platform</small>
            </div>
          </div>

          <nav className="nav-links" aria-label="التنقل بين الصفحات">
            <a href="#home" className="active">الرئيسية</a>
            <a href="#services">الخدمات</a>
            <a href="#about">من نحن</a>
            <a href="#process">العملية</a>
            <a href="#contact">تواصل معنا</a>
          </nav>

          <button className="primary-btn nav-cta">ابدأ الآن</button>
        </div>
      </header>

      <main className="container hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">منصة خدمات أكاديمية رقمية</span>
          <h1>
            نُسهّل رحلتك الأكاديمية <span>بخبرة موثوقة</span>
          </h1>
          <p>
            نقدم خدمات تعليمية وبحثية احترافية تدعم الطلاب والباحثين والجامعات، عبر تجربة
            رقمية متكاملة تجمع الجودة، السرعة، والاعتمادية في مكان واحد.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">احجز الخدمة</button>
            <button className="secondary-btn">استعراض الخدمات</button>
          </div>

          <div className="mini-trust">
            <div>
              <strong>4.9/5</strong>
              <span>تقييم المستخدمين</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>دعم مستمر</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="لوحة حالة الطلبات">
          <div className="glass-panel">
            <div className="card-head">
              <span className="status-dot" />
              <span>حالة الطلبات</span>
            </div>

            <div className="request-box">
              <div className="request-icon">📄</div>
              <div>
                <strong>بحث أكاديمي</strong>
                <small>قيد التنفيذ</small>
              </div>
              <span className="chip chip-blue">متقدم</span>
            </div>

            <div className="request-box">
              <div className="request-icon alt">📊</div>
              <div>
                <strong>تحليل إحصائي</strong>
                <small>جاهز للتسليم</small>
              </div>
              <span className="chip chip-green">جاهز</span>
            </div>

            <div className="request-box">
              <div className="request-icon alt-2">🎓</div>
              <div>
                <strong>دراسة ورسالة</strong>
                <small>مراجعة نهائية</small>
              </div>
              <span className="chip chip-gold">قريب</span>
            </div>

            <div className="progress-ring-wrap">
              <div className="progress-ring">
                <span>92%</span>
              </div>
              <div className="progress-text">
                <strong>معدل الرضا</strong>
                <small>من العملاء</small>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="stats-wrap">
        <div className="container stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.label}>
              <div className="stat-icon">{item.icon}</div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container features" id="about">
        <div className="section-heading">
          <span>لماذا نحن؟</span>
          <h2>خدمات متكاملة لتسريع رحلتك الأكاديمية</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon-box">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-heading center">
            <span>خدماتنا</span>
            <h2>حلول احترافية لكل احتياج أكاديمي</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <div className="service-card" key={service.name}>
                <div className="service-icon-box">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>
                  خدمة دقيقة ومخصصة لتلبية متطلباتك الأكاديمية مع متابعة مستمرة وجودة عالية.
                </p>
                <div className="service-footer">
                  <strong>{service.price}</strong>
                  <button>طلب الخدمة</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="container">
          <div className="section-heading center">
            <span>كيف نعمل؟</span>
            <h2>عملية واضحة، سریعة، واحترافية</h2>
          </div>

          <div className="process-grid">
            {process.map((item) => (
              <div className="process-card" key={item.step}>
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="container cta-box">
          <div>
            <span>ابدأ الآن</span>
            <h2>أنشئ طلبك واستفد من تجربة أكاديمية مميزة</h2>
          </div>
          <button className="primary-btn">تواصل معنا</button>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© 2026 منصة موثوق</div>
          <div>جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
