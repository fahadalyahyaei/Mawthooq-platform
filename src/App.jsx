import { useState } from 'react';

const stats = [
  { label: 'إيرادات اليوم', value: '12.4K', delta: '+18.2%', tone: 'green', icon: '💰' },
  { label: 'العملاء النشطون', value: '24.8K', delta: '+12.4%', tone: 'blue', icon: '👥' },
  { label: 'المشاريع', value: '368', delta: '+8.1%', tone: 'violet', icon: '📦' },
  { label: 'معدل التحويل', value: '7.6%', delta: '-2.3%', tone: 'orange', icon: '📈' },
];

const services = [
  { name: 'البحوث والتقارير', desc: 'إعداد وتحليل البحوث والأطروحات بحتوى احترافي.', icon: '📝', price: 'من 250 ر.ع' },
  { name: 'الدراسات الأكاديمية', desc: 'خدمات دعم لأبحاث التخرج والدراسات الجامعية.', icon: '🎓', price: 'من 320 ر.ع' },
  { name: 'التحليل الإحصائي', desc: 'تحليل البيانات وتفسير النتائج بشكل دقيق.', icon: '📊', price: 'من 180 ر.ع' },
  { name: 'الرسائل العلمية', desc: 'مراجعة وتنسيق الرسائل العلمية والمشاريع.', icon: '📚', price: 'من 420 ر.ع' },
];

const requests = [
  { title: 'إعداد بحث أكاديمي', meta: '4 عناصر جديدة', status: 'قيد التنفيذ', tone: 'blue' },
  { title: 'تحديث نسخة المنصة', meta: 'إصدار 2.1', status: 'قيد المراجعة', tone: 'green' },
  { title: 'إعداد تقارير', meta: 'تقرير الأداء', status: 'مؤجل', tone: 'gold' },
  { title: 'حل المشكلات', meta: '3 أخطاء معلقة', status: 'حرج', tone: 'pink' },
];

const activities = [
  { user: 'محمد', action: 'تمت إضافة مشروع جديد', time: 'منذ 18 دقيقة', tag: 'مشروع' },
  { user: 'سارة', action: 'تم تحديث التقرير الشهري', time: 'منذ 1 ساعة', tag: 'تقارير' },
  { user: 'خالد', action: 'تمت معالجة مخالفة', time: 'منذ 3 ساعات', tag: 'إدارة' },
];

const projects = [
  { name: 'منصة المبيعات', owner: 'أحمد', progress: '82%', status: 'مكتمل', statusClass: 'done' },
  { name: 'لوحة الدعم', owner: 'سارة', progress: '64%', status: 'قيد التنفيذ', statusClass: 'progress' },
  { name: 'تطبيق العملاء', owner: 'خالد', progress: '41%', status: 'متأخر', statusClass: 'pending' },
  { name: 'تجربة المستخدم', owner: 'لينا', progress: '93%', status: 'مكتمل', statusClass: 'done' },
];

const trustBadges = ['A+ جودة التنفيذ', '24/7 دعم', 'سجل موثوق 99.9%'];

const highlights = [
  { title: 'تحسين معدلات التحويل', value: '+42%', detail: 'بفضل تحسين تجربة المستخدم وعمليات التسليم', icon: '🚀' },
  { title: 'وقت الاستجابة', value: '1.8h', detail: 'متوسط زمن الرد على الطلبات الجديدة', icon: '⚡' },
  { title: 'رضا العملاء', value: '96%', detail: 'مؤشر رضا مستمر خلال الربع الحالي', icon: '⭐' },
];

function App() {
  const [form, setForm] = useState({
    service: 'البحوث والتقارير',
    name: '',
    email: '',
    details: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`تم إرسال طلب ${form.service} بنجاح، وسيتم التواصل مع ${form.name || 'العميل'} خلال ساعات.`);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <div className="brand">
            <div className="brand-mark">م</div>
            <div>
              <div className="brand-name">موثوق</div>
              <small>Platform</small>
            </div>
          </div>

          <nav className="nav-links" aria-label="التنقل">
            <a href="#" className="active">الرئيسية</a>
            <a href="#services">الخدمات</a>
            <a href="#dashboard">لوحة التحكم</a>
            <a href="#orders">الطلبات</a>
            <a href="#team">الفريق</a>
          </nav>

          <div className="header-actions">
            <div className="search-box">⌕ <input type="text" placeholder="بحث..." /></div>
            <button className="icon-btn" aria-label="الإشعارات">🔔</button>
            <div className="user-pill">
              <div className="user-avatar">م</div>
              <div>
                <strong>محمد</strong>
                <small>مدير المنصة</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-grid">
        <section className="content-column">
          <div className="panel hero-panel">
            <div className="hero-copy">
              <span className="eyebrow">منصة الخدمات الأكاديمية</span>
              <h1>لوحة إدارة <span>موثوق</span></h1>
              <p>
                نربط الباحثين والمستخدمين بمقدمي الخدمات الأكاديمية داخل منصة ذكية، مع متابعة
                الطلبات والإحصاءات والتواصل في بيئة احترافية وسريعة.
              </p>
              <div className="hero-actions">
                <button className="primary-btn">إنشاء طلب جديد</button>
                <button className="secondary-btn">استعراض الخدمات</button>
              </div>
              <div className="trust-row">
                {trustBadges.map((badge) => (
                  <span key={badge} className="trust-badge">✓ {badge}</span>
                ))}
              </div>
            </div>

            <div className="overview-card">
              <div className="card-top">
                <strong>متابعة الطلبات</strong>
                <span className="live-tag">● متصل الآن</span>
              </div>

              <div className="request-line">
                <div className="mini-icon">📄</div>
                <div>
                  <b>إعداد بحث أكاديمي</b>
                  <small>آخر تحديث: منذ 20 دقيقة</small>
                </div>
                <span className="mini-status good">قيد التنفيذ</span>
              </div>

              <div className="request-line">
                <div className="mini-icon">📊</div>
                <div>
                  <b>تحليل إحصائي</b>
                  <small>تم استلام العرض</small>
                </div>
                <span className="mini-status wait">متاح</span>
              </div>

              <div className="request-line">
                <div className="mini-icon">🎓</div>
                <div>
                  <b>مراجعة رسالة علمية</b>
                  <small>بانتظار التفاصيل</small>
                </div>
                <span className="mini-status new">جديد</span>
              </div>
            </div>
          </div>

          <div className="panel highlights-panel">
            <div className="panel-head">
              <div>
                <h3>أبرز المؤشرات</h3>
                <small>مقاييس الأداء الرئيسية</small>
              </div>
            </div>
            <div className="highlights-grid">
              {highlights.map((item) => (
                <div className="highlight-card" key={item.title}>
                  <div className="highlight-icon">{item.icon}</div>
                  <div className="highlight-value">{item.value}</div>
                  <div className="highlight-title">{item.title}</div>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" id="dashboard">
            <div className="panel-head">
              <div>
                <h3>نظرة عامة</h3>
                <small>ملخص الأداء اليومي</small>
              </div>
              <span className="badge success">+24.8%</span>
            </div>

            <div className="stats-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <div className="stat-head">
                    <span>{item.label}</span>
                    <div className={`stat-icon ${item.tone}`}>{item.icon}</div>
                  </div>
                  <div className="stat-value">{item.value}</div>
                  <div className={`trend ${item.tone}`}>{item.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel chart-panel">
            <div className="panel-head">
              <div>
                <h3>مؤشرات الأداء</h3>
                <small>آخر 7 أيام</small>
              </div>
              <span className="badge blue">مستقر</span>
            </div>

            <div className="chart-box">
              <svg viewBox="0 0 700 260" preserveAspectRatio="none" aria-label="مخطط الأداء">
                <defs>
                  <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(96,165,250,0.35)" />
                    <stop offset="100%" stopColor="rgba(96,165,250,0)" />
                  </linearGradient>
                  <linearGradient id="lineStroke" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#5eead4" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <path d="M0,200 C80,175 120,160 180,170 S280,120 340,140 S430,90 500,120 S620,70 700,90 L700,260 L0,260 Z" fill="url(#lineFill)"/>
                <path d="M0,200 C80,175 120,160 180,170 S280,120 340,140 S430,90 500,120 S620,70 700,90" fill="none" stroke="url(#lineStroke)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="500" cy="120" r="5" fill="#dff7ff" stroke="#60a5fa" strokeWidth="2" />
                <circle cx="700" cy="90" r="5" fill="#dff7ff" stroke="#60a5fa" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="panel" id="orders">
            <div className="panel-head">
              <div>
                <h3>أحدث المشاريع</h3>
                <small>تحديثات هذا الأسبوع</small>
              </div>
              <span className="badge neutral">14 مشروع</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>المشروع</th>
                    <th>المالك</th>
                    <th>التقدم</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.name}>
                      <td>
                        <div className="project-name">
                          <div className={`mini-logo ${project.name.length % 4}`}>{project.name.charAt(0)}</div>
                          {project.name}
                        </div>
                      </td>
                      <td>{project.owner}</td>
                      <td>{project.progress}</td>
                      <td><span className={`status ${project.statusClass}`}>{project.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel products-panel" id="services">
            <div className="panel-head">
              <div>
                <h3>المنتجات والخدمات</h3>
                <small>حلول مخصصة للتنفيذ والتوسع</small>
              </div>
              <span className="badge blue">منتجات مميزة</span>
            </div>

            <div className="product-grid">
              {services.map((service) => (
                <div className="product-card" key={service.name}>
                  <div className="product-card-top">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-tag">مميز</span>
                  </div>
                  <h4>{service.name}</h4>
                  <p>{service.desc}</p>
                  <div className="product-meta">
                    <span>{service.price}</span>
                    <button>اطلب الآن</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel products-panel" id="services">
            <div className="panel-head">
              <div>
                <h3>المنتجات والخدمات</h3>
                <small>حلول مخصصة للتنفيذ والتوسع</small>
              </div>
              <span className="badge blue">منتجات مميزة</span>
            </div>

            <div className="product-grid">
              {services.map((service) => (
                <div className="product-card" key={service.name}>
                  <div className="product-card-top">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-tag">مميز</span>
                  </div>
                  <h4>{service.name}</h4>
                  <p>{service.desc}</p>
                  <div className="product-meta">
                    <span>{service.price}</span>
                    <button>اطلب الآن</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="side-column">
          <div className="panel small-panel sidebar-panel">
            <div className="sidebar-brand">
              <div className="brand-mark">م</div>
              <div>
                <strong>موثوق</strong>
                <small>Executive Suite</small>
              </div>
            </div>

            <nav className="sidebar-nav" aria-label="القائمة الجانبية">
              <a href="#" className="side-link active">لوحة التحكم</a>
              <a href="#services" className="side-link">المنتجات</a>
              <a href="#dashboard" className="side-link">الإحصاءات</a>
              <a href="#orders" className="side-link">المشاريع</a>
              <a href="#team" className="side-link">الفريق</a>
              <a href="#" className="side-link">الإعدادات</a>
            </nav>

            <div className="mini-summary">
              <div className="mini-stat">
                <span>إنتاج</span>
                <strong>86%</strong>
              </div>
              <div className="mini-stat">
                <span>التسليم</span>
                <strong>12 يوم</strong>
              </div>
            </div>
          </div>
          <div className="panel small-panel sidebar-panel">
            <div className="sidebar-brand">
              <div className="brand-mark">م</div>
              <div>
                <strong>موثوق</strong>
                <small>Executive Suite</small>
              </div>
            </div>

            <nav className="sidebar-nav" aria-label="القائمة الجانبية">
              <a href="#" className="side-link active">لوحة التحكم</a>
              <a href="#services" className="side-link">المنتجات</a>
              <a href="#dashboard" className="side-link">الإحصاءات</a>
              <a href="#orders" className="side-link">المشاريع</a>
              <a href="#team" className="side-link">الفريق</a>
              <a href="#" className="side-link">الإعدادات</a>
            </nav>

            <div className="mini-summary">
              <div className="mini-stat">
                <span>إنتاج</span>
                <strong>86%</strong>
              </div>
              <div className="mini-stat">
                <span>التسليم</span>
                <strong>12 يوم</strong>
              </div>
            </div>
          </div>

          <div className="panel small-panel">
            <div className="panel-head">
              <div>
                <h3>المهام اليومية</h3>
                <small>جدول الأعمال</small>
              </div>
              <span className="badge neutral">8 عناصر</span>
            </div>

            <div className="task-list">
              {requests.map((item) => (
                <div className="task-item" key={item.title}>
                  <div className="task-main">
                    <span className={`bullet ${item.tone}`} />
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.meta}</small>
                    </div>
                  </div>
                  <span className={`task-tag ${item.tone}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel small-panel">
            <div className="panel-head">
              <div>
                <h3>آخر النشاطات</h3>
                <small>العمليات الأخيرة</small>
              </div>
            </div>

            <div className="activity-list">
              {activities.map((item) => (
                <div className="activity-item" key={item.action}>
                  <div className="user-avatar small" style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)' }}>
                    {item.user.charAt(0)}
                  </div>
                  <div className="activity-copy">
                    <strong>{item.action}</strong>
                    <small>{item.time}</small>
                  </div>
                  <span className="mini-tag">{item.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel small-panel form-panel" id="team">
            <div className="panel-head">
              <div>
                <h3>نموذج طلب الخدمة</h3>
                <small>أرسل طلبك الآن</small>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
              <label>
                <span>نوع الخدمة</span>
                <select name="service" value={form.service} onChange={handleChange}>
                  {services.map((service) => (
                    <option value={service.name} key={service.name}>{service.name}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>الاسم</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="أدخل اسمك" required />
              </label>

              <label>
                <span>البريد الإلكتروني</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </label>

              <label>
                <span>تفاصيل الطلب</span>
                <textarea name="details" value={form.details} onChange={handleChange} rows="4" placeholder="اكتب تفاصيل طلبك هنا..." required />
              </label>

              <button type="submit" className="primary-btn full-width">إرسال الطلب</button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
