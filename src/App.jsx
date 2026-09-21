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
    text: 'نوفر لك خدمات البحث العلمي، التوثيق، المراجعة، والدعم الأكاديمي بكل احترافية.',
  },
  {
    icon: '⚡',
    title: 'تجربة سريعة وسهلة',
    text: 'واجهة مستخدم واضحة، تنقل سلس، وعمليات مريحة تدعم الطالب والباحث بشكل فوري.',
  },
  {
    icon: '🔒',
    title: 'أمان وخصوصية',
    text: 'نراعي خصوصية بيانات المستخدمين ونضمن بيئة آمنة ومطمئنة في جميع المعاملات.',
  },
];

const services = [
  { name: 'البحوث العلمية', price: 'من 250 ر.ع' },
  { name: 'المراجعات الأكاديمية', price: 'من 180 ر.ع' },
  { name: 'الرسائل الجامعية', price: 'من 420 ر.ع' },
  { name: 'التحليل الإحصائي', price: 'من 220 ر.ع' },
];

function App() {
  return (
    <div className="landing-page">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand">
            <div className="brand-mark">م</div>
            <div>
              <div className="brand-name">موثوق</div>
              <small>Academic Platform</small>
            </div>
          </div>

          <nav className="nav-links" aria-label="التنقل">
            <a href="#home" className="active">الرئيسية</a>
            <a href="#services">الخدمات</a>
            <a href="#about">من نحن</a>
            <a href="#contact">تواصل معنا</a>
          </nav>

          <button className="primary-btn small-btn">ابدأ الآن</button>
        </div>
      </header>

      <main className="container hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">منصة رقمية أكاديمية متكاملة</span>
          <h1>
            بناؤك الأكاديمي يبدأ من <span>مكانٍ موثوق</span>
          </h1>
          <p>
            نقدم لك خدمات تعليمية وبحثية احترافية تدعم طلابك والباحثين والجهات الأكاديمية
            في كل خطوة، عبر منصة ذكية وسهلة الاستخدام.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">احجز الخدمة</button>
            <button className="secondary-btn">استعرض الخدمات</button>
          </div>

          <div className="mini-trust">
            <div>
              <strong>4.9/5</strong>
              <span>تقييم المستخدمين</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>دعم فني مستمر</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
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
                <div className="service-badge">{service.name}</div>
                <h3>{service.name}</h3>
                <p>خدمة دقيقة ومخصصة لتلبية متطلباتك الأكاديمية، مع متابعة مستمرة وجودة عالية.</p>
                <div className="service-footer">
                  <strong>{service.price}</strong>
                  <button>طلب الخدمة</button>
                </div>
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
