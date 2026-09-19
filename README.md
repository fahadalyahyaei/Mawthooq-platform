# Mawthooq Platform — موثوق

نموذج أولي MVP لمنصة رقمية في سلطنة عُمان تربط طالبي الخدمات الأكاديمية بمقدمي الخدمات.

## ما الموجود في هذا الإصدار؟
- واجهة عربية RTL متجاوبة مع الهاتف والآيباد والكمبيوتر.
- صفحة رئيسية وخدمات.
- تسجيل طالب خدمة / مقدم خدمة.
- تسجيل دخول.
- لوحة تحكم.
- إنشاء طلب خدمة.
- ملف مقدم خدمة.
- لوحة إدارة أولية.
- حفظ تجريبي عبر `localStorage`.
- احتساب عمولة افتراضية 10% لأغراض النموذج.
- صفحات قابلة للتوسع لاحقًا إلى Backend وقاعدة بيانات ودفع إلكتروني.

## نطاق الاستخدام المسؤول
المنصة مخصصة للدعم الأكاديمي المشروع مثل الاستشارات، التدقيق، التنسيق، التحليل، التدريب، والمراجعة. لا ينبغي استخدامها لانتحال أعمال الآخرين أو تقديم أعمال مكتوبة بالنيابة عن الطالب باعتبارها إنتاجه الشخصي.

## البنية المستهدفة للإصدار الإنتاجي
```text
Frontend
  ├─ React/Next.js أو واجهة مماثلة
  ├─ Arabic RTL
  └─ Responsive

Backend
  ├─ Authentication
  ├─ Users & Roles
  ├─ Services
  ├─ Requests
  ├─ Offers
  ├─ Orders
  ├─ Messages
  ├─ Reviews
  ├─ Notifications
  ├─ Payments
  ├─ Disputes
  └─ Audit Logs

Database
  ├─ users
  ├─ provider_profiles
  ├─ services
  ├─ requests
  ├─ offers
  ├─ orders
  ├─ messages
  ├─ files
  ├─ payments
  ├─ reviews
  ├─ disputes
  └─ audit_logs
```

## ملاحظات أمنية
هذا الإصدار تعليمي فقط. لا تستخدم `localStorage` لكلمات المرور في الإنتاج، ولا تضع مفاتيح API أو أسرار الدفع داخل GitHub. يجب نقل المصادقة، الملفات، الدفع، الصلاحيات، والتحقق إلى Backend آمن.

## خطة التطوير
1. تثبيت الهوية التجارية والصفحات.
2. اختيار Backend وقاعدة البيانات.
3. بناء نظام الحسابات والصلاحيات.
4. بناء الخدمات والطلبات والعروض.
5. بناء المحادثات والملفات.
6. بناء التقييمات والنزاعات.
7. دمج الدفع في بيئة Sandbox.
8. اختبار الأمان والخصوصية.
9. اختبار قبول المستخدم UAT.
10. إطلاق نسخة تجريبية ثم الإنتاج.

## نموذج العمولة
الواجهة الحالية تعرض 10% كقيمة افتراضية قابلة للتعديل. آلية تحصيل وتسوية أموال مقدمي الخدمات يجب اعتمادها تعاقديًا وفنيًا مع مزود الدفع والبنك قبل الإنتاج.
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>لوحة منصة | Platform Dashboard</title>
    <style>
      :root {
        --bg: #07111f;
        --bg-soft: #0d1a2a;
        --panel: rgba(17, 25, 40, 0.92);
        --panel-2: #111f2f;
        --card: #132338;
        --card-2: #1a2e49;
        --border: rgba(148, 163, 184, 0.18);
        --text: #e5eefb;
        --muted: #8ea1bb;
        --primary: #5eead4;
        --primary-2: #60a5fa;
        --secondary: #a78bfa;
        --warning: #fbbf24;
        --danger: #fb7185;
        --success: #34d399;
        --shadow: 0 20px 45px rgba(15, 23, 42, 0.55);
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        min-height: 100%;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(96, 165, 250, 0.18), transparent 20%),
          radial-gradient(circle at bottom right, rgba(94, 234, 212, 0.14), transparent 20%),
          var(--bg);
        color: var(--text);
      }

      body {
        padding: 24px;
      }

      .app {
        max-width: 1440px;
        margin: 0 auto;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        background: rgba(15, 23, 42, 0.75);
        border: 1px solid var(--border);
        backdrop-filter: blur(14px);
        border-radius: 22px;
        padding: 18px 22px;
        box-shadow: var(--shadow);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
      }

      .logo {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--primary), var(--primary-2));
        display: grid;
        place-items: center;
        color: #041423;
        font-size: 20px;
        font-weight: 900;
        box-shadow: 0 12px 25px rgba(96, 165, 250, 0.4);
      }

      .nav {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(17, 25, 40, 0.8);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 8px;
      }

      .nav-item {
        padding: 10px 16px;
        border-radius: 10px;
        color: var(--muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .nav-item.active {
        background: linear-gradient(135deg, rgba(94, 234, 212, 0.18), rgba(96, 165, 250, 0.12));
        color: var(--text);
        border: 1px solid rgba(94, 234, 212, 0.25);
      }

      .nav-item:hover {
        color: var(--text);
        background: rgba(148, 163, 184, 0.08);
      }

      .topbar-actions {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .search {
        display: flex;
        align-items: center;
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 10px 14px;
        min-width: 260px;
      }

      .search input {
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        width: 100%;
        font-size: 14px;
      }

      .search input::placeholder {
        color: var(--muted);
      }

      .icon-btn {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: rgba(17, 25, 40, 0.9);
        color: var(--text);
        display: grid;
        place-items: center;
        font-size: 18px;
        cursor: pointer;
      }

      .user-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px 8px 8px;
        border-radius: 16px;
        background: rgba(17, 25, 40, 0.9);
        border: 1px solid var(--border);
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--secondary), var(--primary-2));
        display: grid;
        place-items: center;
        font-size: 14px;
        font-weight: 700;
        color: white;
      }

      .user-meta small {
        display: block;
        color: var(--muted);
        font-size: 11px;
      }

      .user-meta strong {
        font-size: 14px;
      }

      .main {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 24px;
        margin-top: 24px;
      }

      .column {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .panel {
        background: rgba(15, 23, 42, 0.78);
        border: 1px solid var(--border);
        border-radius: 24px;
        box-shadow: var(--shadow);
        overflow: hidden;
      }

      .section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px 22px 16px;
      }

      .title {
        font-size: 18px;
        font-weight: 700;
      }

      .sub {
        color: var(--muted);
        font-size: 13px;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(52, 211, 153, 0.12);
        border: 1px solid rgba(52, 211, 153, 0.25);
        border-radius: 999px;
        padding: 8px 12px;
        color: var(--success);
        font-weight: 600;
        font-size: 12px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(160px, 1fr));
        gap: 18px;
        padding: 0 22px 22px;
      }

      .stat-card {
        background: linear-gradient(180deg, rgba(19, 35, 56, 0.9), rgba(17, 25, 40, 0.9));
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 18px 16px;
      }

      .stat-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .stat-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        font-size: 18px;
      }

      .stat-card:nth-child(1) .stat-icon { background: rgba(94, 234, 212, 0.15); color: var(--primary); }
      .stat-card:nth-child(2) .stat-icon { background: rgba(96, 165, 250, 0.15); color: var(--primary-2); }
      .stat-card:nth-child(3) .stat-icon { background: rgba(167, 139, 250, 0.15); color: var(--secondary); }
      .stat-card:nth-child(4) .stat-icon { background: rgba(251, 191, 36, 0.12); color: var(--warning); }

      .stat-card .value {
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 6px;
      }

      .stat-card .label {
        color: var(--muted);
        font-size: 13px;
      }

      .trend {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        margin-top: 12px;
        padding: 5px 8px;
        border-radius: 999px;
      }

      .trend.up {
        color: var(--success);
        background: rgba(52, 211, 153, 0.12);
      }

      .trend.down {
        color: var(--danger);
        background: rgba(251, 113, 133, 0.12);
      }

      .chart-panel {
        padding-bottom: 12px;
      }

      .chart-wrap {
        padding: 0 22px 20px;
      }

      .chart {
        height: 260px;
        border-radius: 18px;
        background:
          linear-gradient(to top, rgba(96, 165, 250, 0.12), rgba(17, 25, 40, 0.35)),
          linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          linear-gradient(to top, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          rgba(17, 25, 40, 0.7);
        background-size: auto, 24px 100%, 100% 24px, auto;
        border: 1px solid var(--border);
        position: relative;
        overflow: hidden;
      }

      .chart svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .chart .fill {
        fill: url(#lineFill);
        opacity: 0.6;
      }

      .chart .line {
        fill: none;
        stroke: url(#lineStroke);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .chart .dot {
        fill: #dff7ff;
        stroke: #60a5fa;
        stroke-width: 2;
      }

      .kanban {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 18px;
        padding: 0 22px 22px;
      }

      .mini-card {
        background: rgba(19, 35, 56, 0.9);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 18px 16px;
      }

      .mini-card h4 {
        margin: 0 0 10px;
        font-size: 15px;
      }

      .progress {
        width: 100%;
        height: 12px;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.15);
        overflow: hidden;
        margin-top: 12px;
      }

      .progress > span {
        display: block;
        height: 100%;
        border-radius: inherit;
      }

      .progress.orange > span { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
      .progress.blue > span { background: linear-gradient(90deg, #60a5fa, #3b82f6); }
      .progress.green > span { background: linear-gradient(90deg, #34d399, #10b981); }

      .right-col {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .tasks, .activity, .calendar-card {
        padding: 0 0 18px;
      }

      .task-list, .activity-list {
        padding: 0 22px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .task-item, .activity-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 12px;
        background: rgba(19, 35, 56, 0.7);
        border: 1px solid var(--border);
        border-radius: 16px;
      }

      .task-main, .activity-main {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .task-bullet {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(255,255,255,0.04);
      }

      .task-bullet.blue { background: var(--primary-2); }
      .task-bullet.green { background: var(--success); }
      .task-bullet.gold { background: var(--warning); }
      .task-bullet.pink { background: var(--danger); }

      .task-text strong {
        display: block;
        font-size: 14px;
      }

      .task-text small {
        color: var(--muted);
      }

      .tag {
        font-size: 12px;
        border-radius: 999px;
        padding: 6px 10px;
        border: 1px solid var(--border);
        background: rgba(148, 163, 184, 0.08);
        color: var(--text);
      }

      .tag.success {
        color: var(--success);
        background: rgba(52, 211, 153, 0.12);
        border-color: rgba(52, 211, 153, 0.25);
      }

      .tag.pending {
        color: var(--warning);
        background: rgba(251, 191, 36, 0.12);
        border-color: rgba(251, 191, 36, 0.25);
      }

      .tag.alert {
        color: var(--danger);
        background: rgba(251, 113, 133, 0.12);
        border-color: rgba(251, 113, 133, 0.25);
      }

      .calendar {
        padding: 0 22px 20px;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 8px;
        text-align: center;
        margin-top: 10px;
      }

      .day-head, .day {
        padding: 14px 8px;
        border-radius: 12px;
        font-size: 13px;
      }

      .day-head {
        color: var(--muted);
      }

      .day {
        background: rgba(19, 35, 56, 0.8);
        border: 1px solid var(--border);
        color: var(--text);
      }

      .day.active {
        background: linear-gradient(135deg, rgba(94, 234, 212, 0.22), rgba(96, 165, 250, 0.18));
        border-color: rgba(94, 234, 212, 0.28);
      }

      .day.has-event {
        position: relative;
      }

      .day.has-event::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background: var(--warning);
        border-radius: 50%;
        bottom: 8px;
        left: calc(50% - 3px);
      }

      .table-wrap {
        padding: 0 22px 22px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: 16px;
      }

      th, td {
        text-align: right;
        padding: 16px 12px;
        border-bottom: 1px solid var(--border);
      }

      th {
        color: var(--muted);
        font-size: 12px;
        font-weight: 600;
      }

      td {
        font-size: 14px;
      }

      .project-name {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .mini-logo {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        font-weight: 700;
        color: white;
      }

      .mini-logo.a { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
      .mini-logo.b { background: linear-gradient(135deg, #34d399, #10b981); }
      .mini-logo.c { background: linear-gradient(135deg, #a78bfa, #8b5cf6); }
      .mini-logo.d { background: linear-gradient(135deg, #fbbf24, #f59e0b); }

      .status {
        display: inline-flex;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 12px;
        border: 1px solid var(--border);
      }

      .status.done {
        color: var(--success);
        background: rgba(52, 211, 153, 0.12);
        border-color: rgba(52, 211, 153, 0.25);
      }

      .status.progress {
        color: var(--warning);
        background: rgba(251, 191, 36, 0.12);
        border-color: rgba(251, 191, 36, 0.25);
      }

      .status.pending {
        color: var(--danger);
        background: rgba(251, 113, 133, 0.12);
        border-color: rgba(251, 113, 133, 0.25);
      }

      @media (max-width: 1120px) {
        .main {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 900px) {
        .topbar {
          flex-wrap: wrap;
        }

        .nav {
          order: 3;
          width: 100%;
          justify-content: space-between;
          overflow-x: auto;
        }

        .stats-grid {
          grid-template-columns: repeat(2, minmax(150px, 1fr));
        }

        .kanban {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 560px) {
        body {
          padding: 16px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }

        .search {
          min-width: 100%;
        }

        .topbar-actions {
          width: 100%;
          justify-content: space-between;
        }

        .table-wrap {
          overflow-x: auto;
        }

        table {
          min-width: 640px;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <header class="topbar">
        <div class="brand">
          <div class="logo">P</div>
          <div>
            <div style="font-size: 18px;">المنصة</div>
            <div class="sub">Platform Control</div>
          </div>
        </div>

        <nav class="nav" aria-label="التنقل">
          <div class="nav-item active">الرئيسية</div>
          <div class="nav-item">التحليلات</div>
          <div class="nav-item">المشاريع</div>
          <div class="nav-item">الفواتير</div>
          <div class="nav-item">العملاء</div>
          <div class="nav-item">الإعدادات</div>
        </nav>

        <div class="topbar-actions">
          <div class="search">
            <span style="color: var(--muted); margin-left: 8px;">⌕</span>
            <input type="text" placeholder="بحث..." />
          </div>
          <button class="icon-btn" aria-label="الإشعارات">🔔</button>
          <div class="user-pill">
            <div class="avatar">م</div>
            <div class="user-meta">
              <strong>محمد</strong>
              <small>مدير المنصة</small>
            </div>
          </div>
        </div>
      </header>

      <main class="main">
        <section class="column">
          <div class="panel">
            <div class="section-head">
              <div>
                <div class="title">نظرة عامة</div>
                <div class="sub">ملخص الأداء اليومي</div>
              </div>
              <div class="pill">● متصل الآن</div>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-top">
                  <div class="label">إيرادات اليوم</div>
                  <div class="stat-icon">💰</div>
                </div>
                <div class="value">12.4K</div>
                <div class="label">ريال</div>
                <div class="trend up">▲ 18.2%</div>
              </div>

              <div class="stat-card">
                <div class="stat-top">
                  <div class="label">المستخدمين</div>
                  <div class="stat-icon">👥</div>
                </div>
                <div class="value">24.8K</div>
                <div class="label">مستخدم نشط</div>
                <div class="trend up">▲ 12.4%</div>
              </div>

              <div class="stat-card">
                <div class="stat-top">
                  <div class="label">المشاريع</div>
                  <div class="stat-icon">📦</div>
                </div>
                <div class="value">368</div>
                <div class="label">مشاريع نشطة</div>
                <div class="trend up">▲ 8.1%</div>
              </div>

              <div class="stat-card">
                <div class="stat-top">
                  <div class="label">معدل التحويل</div>
                  <div class="stat-icon">📈</div>
                </div>
                <div class="value">7.6%</div>
                <div class="label">نسبة النمو</div>
                <div class="trend down">▼ 2.3%</div>
              </div>
            </div>
          </div>

          <div class="panel chart-panel">
            <div class="section-head">
              <div>
                <div class="title">مؤشرات الأداء</div>
                <div class="sub">آخر 7 أيام</div>
              </div>
              <div class="tag success">+ 24.8%</div>
            </div>

            <div class="chart-wrap">
              <div class="chart">
                <svg viewBox="0 0 700 260" preserveAspectRatio="none" aria-label="مخطط الأداء">
                  <defs>
                    <linearGradient id="lineStroke" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stop-color="#5eead4"/>
                      <stop offset="50%" stop-color="#60a5fa"/>
                      <stop offset="100%" stop-color="#a78bfa"/>
                    </linearGradient>
                    <linearGradient id="lineFill" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stop-color="rgba(94,234,212,0.5)"/>
                      <stop offset="100%" stop-color="rgba(96,165,250,0)"/>
                    </linearGradient>
                  </defs>

                  <path class="fill" d="M0,200 C80,175 120,160 180,172 S280,120 340,140 S430,90 500,120 S620,70 700,90 L700,260 L0,260 Z"></path>
                  <path class="line" d="M0,200 C80,175 120,160 180,172 S280,120 340,140 S430,90 500,120 S620,70 700,90"></path>

                  <circle class="dot" cx="500" cy="120" r="5"></circle>
                  <circle class="dot" cx="700" cy="90" r="5"></circle>
                </svg>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="section-head">
              <div>
                <div class="title">أحدث المشاريع</div>
                <div class="sub">تحديثات هذا الأسبوع</div>
              </div>
              <div class="tag">14 مشروع</div>
            </div>

            <div class="table-wrap">
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
                  <tr>
                    <td>
                      <div class="project-name">
                        <div class="mini-logo a">A</div>
                        <div>منصة المبيعات</div>
                      </div>
                    </td>
                    <td>أحمد</td>
                    <td>82%</td>
                    <td><span class="status done">مكتمل</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="project-name">
                        <div class="mini-logo b">B</div>
                        <div>لوحة الدعم</div>
                      </div>
                    </td>
                    <td>سارة</td>
                    <td>64%</td>
                    <td><span class="status progress">قيد التنفيذ</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="project-name">
                        <div class="mini-logo c">C</div>
                        <div>تطبيق العملاء</div>
                      </div>
                    </td>
                    <td>خالد</td>
                    <td>41%</td>
                    <td><span class="status pending">متأخر</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="project-name">
                        <div class="mini-logo d">D</div>
                        <div>تجربة المستخدم</div>
                      </div>
                    </td>
                    <td>لينا</td>
                    <td>93%</td>
                    <td><span class="status done">مكتمل</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <aside class="right-col">
          <div class="panel tasks">
            <div class="section-head">
              <div>
                <div class="title">المهام اليومية</div>
                <div class="sub">جدول الأعمال</div>
              </div>
              <div class="tag">8 عناصر</div>
            </div>

            <div class="task-list">
              <div class="task-item">
                <div class="task-main">
                  <div class="task-bullet blue"></div>
                  <div class="task-text">
                    <strong>مراجعة الطلبات</strong>
                    <small>4 عناصر جديدة</small>
                  </div>
                </div>
                <span class="tag success">جاهز</span>
              </div>

              <div class="task-item">
                <div class="task-main">
                  <div class="task-bullet green"></div>
                  <div class="task-text">
                    <strong>تحديث النسخة</strong>
                    <small>إصدار 2.1</small>
                  </div>
                </div>
                <span class="tag pending">قيد المراجعة</span>
              </div>

              <div class="task-item">
                <div class="task-main">
                  <div class="task-bullet gold"></div>
                  <div class="task-text">
                    <strong>إعداد تقارير</strong>
                    <small>تقرير الأداء</small>
                  </div>
                </div>
                <span class="tag pending">مؤجل</span>
              </div>

              <div class="task-item">
                <div class="task-main">
                  <div class="task-bullet pink"></div>
                  <div class="task-text">
                    <strong>حل المشكلات</strong>
                    <small>3 أخطاء معلقة</small>
                  </div>
                </div>
                <span class="tag alert">حرج</span>
              </div>
            </div>
          </div>

          <div class="panel activity">
            <div class="section-head">
              <div>
                <div class="title">النشاط</div>
                <div class="sub">آخر المعاملات</div>
              </div>
            </div>

            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-main">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 12px;">م</div>
                  <div>
                    <strong style="display:block; font-size: 14px;">تمت إضافة مشروع جديد</strong>
                    <small style="color: var(--muted);">منذ 18 دقيقة</small>
                  </div>
                </div>
                <span class="tag">مشروع</span>
              </div>

              <div class="activity-item">
                <div class="activity-main">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: linear-gradient(135deg, #34d399, #10b981);">س</div>
                  <div>
                    <strong style="display:block; font-size: 14px;">تم تحديث التقرير الشهري</strong>
                    <small style="color: var(--muted);">منذ 1 ساعة</small>
                  </div>
                </div>
                <span class="tag">تقارير</span>
              </div>

              <div class="activity-item">
                <div class="activity-main">
                  <div class="avatar" style="width: 32px; height: 32px; font-size: 12px; background: linear-gradient(135deg, #fbbf24, #f59e0b);">خ</div>
                  <div>
                    <strong style="display:block; font-size: 14px;">تمت معالجة مخالفة</strong>
                    <small style="color: var(--muted);">منذ 3 ساعات</small>
                  </div>
                </div>
                <span class="tag">إدارة</span>
              </div>
            </div>
          </div>

          <div class="panel calendar-card">
            <div class="section-head">
              <div>
                <div class="title">التقويم</div>
                <div class="sub">الأحداث القادمة</div>
              </div>
            </div>

            <div class="calendar">
              <div class="calendar-grid">
                <div class="day-head">ح</div>
                <div class="day-head">خ</div>
                <div class="day-head">س</div>
                <div class="day-head">ر</div>
                <div class="day-head">خ</div>
                <div class="day-head">ج</div>
                <div class="day-head">س</div>

                <div class="day">29</div>
                <div class="day">30</div>
                <div class="day">1</div>
                <div class="day">2</div>
                <div class="day">3</div>
                <div class="day">4</div>
                <div class="day">5</div>

                <div class="day">6</div>
                <div class="day active">7</div>
                <div class="day has-event">8</div>
                <div class="day">9</div>
                <div class="day">10</div>
                <div class="day">11</div>
                <div class="day">12</div>

                <div class="day">13</div>
                <div class="day">14</div>
                <div class="day">15</div>
                <div class="day has-event">16</div>
                <div class="day">17</div>
                <div class="day">18</div>
                <div class="day">19</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>

    <script>
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });
    </script>
  </body>
</html>
{
  "name": "mawthooq-platform-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.10"
  }
}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>موثوق | لوحة الإدارة</title>
    <meta name="description" content="لوحة إدارة منصة موثوق" />
    <script type="module" src="/src/main.jsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { useEffect, useMemo, useState } from 'react';

const roles = {
  owner: { label: 'المالك / المدير', name: 'فهد اليحيائي', permissions: ['dashboard', 'services', 'orders', 'users', 'settings'] },
  student: { label: 'طالب', name: 'طالب موثوق', permissions: ['dashboard', 'services', 'orders'] },
  provider: { label: 'مقدم خدمة', name: 'مقدم الخدمة', permissions: ['dashboard', 'provider-orders', 'services'] },
};

const services = [
  { id: 1, name: 'البحوث والتقارير', desc: 'إعداد وتحليل البحوث والأطروحات بمحتوى احترافي.', icon: '📝', price: 'من 250 ر.ع' },
  { id: 2, name: 'الدراسات الأكاديمية', desc: 'دعم مشاريع التخرج والدراسات الجامعية.', icon: '🎓', price: 'من 320 ر.ع' },
  { id: 3, name: 'التحليل الإحصائي', desc: 'تحليل البيانات وتفسير النتائج بشكل دقيق.', icon: '📊', price: 'من 180 ر.ع' },
  { id: 4, name: 'الرسائل العلمية', desc: 'مراجعة وتنسيق الرسائل العلمية والمشاريع.', icon: '📚', price: 'من 420 ر.ع' },
];

const initialOrders = [
  { id: 'MW-1001', service: 'إعداد بحث أكاديمي', customer: 'أحمد محمد', provider: 'سارة علي', status: 'قيد التنفيذ', amount: '250 ر.ع', date: '19 سبتمبر 2026' },
  { id: 'MW-1002', service: 'تحليل إحصائي', customer: 'نورة خالد', provider: 'مريم سالم', status: 'جديد', amount: '180 ر.ع', date: '18 سبتمبر 2026' },
  { id: 'MW-1003', service: 'مراجعة رسالة علمية', customer: 'خالد راشد', provider: 'سارة علي', status: 'مكتمل', amount: '420 ر.ع', date: '17 سبتمبر 2026' },
];

const stats = [
  { label: 'إيرادات اليوم', value: '12.4K', delta: '+18.2%', icon: '💰' },
  { label: 'المستخدمون', value: '24.8K', delta: '+12.4%', icon: '👥' },
  { label: 'الطلبات', value: '368', delta: '+8.1%', icon: '📦' },
  { label: 'معدل التحويل', value: '7.6%', delta: '-2.3%', icon: '📈' },
];

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('mawthooq-role') || 'owner');
  const [page, setPage] = useState('dashboard');
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('mawthooq-orders') || 'null') || initialOrders);
  const [showRequest, setShowRequest] = useState(false);
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');

  const currentRole = roles[role];
  const can = (permission) => currentRole.permissions.includes(permission);

  useEffect(() => {
    localStorage.setItem('mawthooq-role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('mawthooq-orders', JSON.stringify(orders));
  }, [orders]);

  const visibleOrders = useMemo(() => orders.filter((order) => Object.values(order).join(' ').toLowerCase().includes(query.toLowerCase())), [orders, query]);

  const navigate = (nextPage) => {
    if (can(nextPage)) setPage(nextPage);
    else showNotice('ليس لديك صلاحية للوصول إلى هذه الصفحة.');
  };

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3500);
  };

  const createOrder = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order = {
      id: `MW-${1000 + orders.length + 1}`,
      service: form.get('service'),
      customer: form.get('name'),
      provider: 'بانتظار التعيين',
      status: 'جديد',
      amount: 'يحدد لاحقًا',
      date: new Date().toLocaleDateString('ar-OM'),
    };
    setOrders((current) => [order, ...current]);
    setShowRequest(false);
    setPage('orders');
    showNotice('تم إنشاء الطلب وحفظه بنجاح.');
  };

  const menu = [
    ['dashboard', 'الرئيسية', '⌂'],
    ['services', 'الخدمات', '▦'],
    [role === 'provider' ? 'provider-orders' : 'orders', role === 'provider' ? 'طلبات العملاء' : 'الطلبات', '◫'],
    ...(role === 'owner' ? [['users', 'المستخدمون', '♙'], ['settings', 'الإعدادات', '⚙']] : []),
  ];

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="sidebar-brand"><span className="brand-mark">م</span><div><b>موثوق</b><small>لوحة الإدارة</small></div></div>
        <div className="role-card"><span>الدور الحالي</span><strong>{currentRole.label}</strong><select value={role} onChange={(event) => { setRole(event.target.value); setPage('dashboard'); }} aria-label="اختيار الدور"><option value=\"owner\">المالك / المدير</option><option value=\"student\">طالب</option><option value=\"provider\">مقدم خدمة</option></select></div>
        <nav className="side-nav">{menu.map(([id, label, icon]) => <button key={id} className={page === id ? 'selected' : ''} onClick={() => navigate(id)}><span>{icon}</span>{label}</button>)}</nav>
        <div className="sidebar-footer"><span className=\"secure-dot\">●</span> الحساب محمي<br /><small>آخر دخول: اليوم 09:42</small></div>
      </aside>

      <div className="workspace">
        <header className="admin-header"><div><span className="breadcrumb">موثوق / لوحة التحكم / </span><b>{menu.find(([id]) => id === page)?.[1] || 'الرئيسية'}</b></div><div className="header-tools"><label className="search-box">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في المنصة..." /></label><button className="icon-btn">🔔</button><div className="profile"><span className="user-avatar">{currentRole.name.charAt(0)}</span><span><b>{currentRole.name}</b><small>{currentRole.label}</small></span></div></div></header>

        <main className="workspace-content">
          {page === 'dashboard' && <Dashboard role={role} stats={stats} orders={orders} onNew={() => setShowRequest(true)} onNavigate={navigate} />}
          {page === 'services' && <Services canManage={role === 'owner'} onRequest={() => setShowRequest(true)} onNotice={showNotice} />}
          {(page === 'orders' || page === 'provider-orders') && <Orders orders={visibleOrders} role={role} onNotice={showNotice} />}
          {page === 'users' && can('users') && <Users onNotice={showNotice} />}
          {page === 'settings' && can('settings') && <Settings onNotice={showNotice} />}
        </main>
      </div>

      {showRequest && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowRequest(false)}><form className="modal" onSubmit={createOrder}><div className="modal-head"><div><h2>إنشاء طلب خدمة</h2><p>أدخل بيانات الطلب وسيظهر في قائمة الطلبات.</p></div><button type=\"button\" className=\"close-btn\" onClick={() => setShowRequest(false)}>×</button></div><label>الخدمة<select name=\"service\" required>{services.map((service) => <option key={service.id}>{service.name}</option>)}</select></label><label>اسم الطالب<input name=\"name\" required placeholder=\"أدخل اسم الطالب\" /></label><label>تفاصيل الطلب<textarea name=\"details\" rows=\"4\" required placeholder=\"اكتب تفاصيل الخدمة المطلوبة...\" /></label><button className=\"primary-btn\" type=\"submit\">حفظ وإرسال الطلب</button></form></div>}
      {notice && <div className=\"toast\">✓ {notice}</div>}
    </div>
  );
}

function Dashboard({ role, stats, orders, onNew, onNavigate }) {
  return <>
    <div className="page-title">
      <div>
        <span className="eyebrow">مرحبًا بك، {roles[role].name}</span>
        <h1>لوحة التحكم</h1>
        <p>تابع أداء المنصة والطلبات من مكان واحد.</p>
      </div>
      <button className="primary-btn" onClick={onNew}>＋ إنشاء طلب</button>
    </div>

    <div className="stats-grid admin-stats">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-head">
            <span>{stat.label}</span>
            <div className="stat-icon blue">{stat.icon}</div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="trend green">{stat.delta}</div>
        </div>
      ))}
    </div>

    <div className="dashboard-two-col">
      <div className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>آخر الطلبات</h3>
            <small>آخر تحديثات المنصة</small>
          </div>
          <button className="text-btn" onClick={() => onNavigate('orders')}>عرض الكل ←</button>
        </div>
        <OrderTable orders={orders.slice(0, 4)} />
      </div>

      <div className="panel insight-panel">
        <div className="panel-head">
          <div>
            <h3>صلاحياتك</h3>
            <small>الوصول حسب دورك</small>
          </div>
        </div>
        <PermissionList role={role} />
      </div>
    </div>

    <div className="panel chart-panel">
      <div className="panel-head">
        <div>
          <h3>أداء المنصة</h3>
          <small>آخر 7 أيام</small>
        </div>
        <span className="badge success">+24.8%</span>
      </div>
      <div className="chart-box">
        <svg viewBox="0 0 700 260" preserveAspectRatio="none">
          <path d="M0,200 C80,175 120,160 180,170 S280,120 340,140 S430,90 500,120 S620,70 700,90 L700,260 L0,260 Z" fill="rgba(96,165,250,.16)" />
          <path d="M0,200 C80,175 120,160 180,170 S280,120 340,140 S430,90 500,120 S620,70 700,90" fill="none" stroke="#2486c7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  </>;
}

function Services({ canManage, onRequest, onNotice }) {
  return <>
    <PageIntro title="الخدمات" text="إدارة الخدمات الأكاديمية واستقبال الطلبات." action={canManage ? '＋ إضافة خدمة' : null} onAction={() => onNotice('يمكنك إضافة خدمات جديدة من هنا بعد ربط قاعدة البيانات.')} />
    <div className="service-grid">
      {services.map((service) => (
        <article className="service-card large" key={service.id}>
          <div className="service-head">
            <span className="service-icon">{service.icon}</span>
            <div>
              <h3>{service.name}</h3>
              <span className="service-price">{service.price}</span>
            </div>
          </div>
          <p>{service.desc}</p>
          <div className="service-actions">
            <button className="primary-btn" onClick={onRequest}>طلب الخدمة</button>
            {canManage && <button className="secondary-btn" onClick={() => onNotice('تم فتح محرر الخدمة.')}>تعديل</button>}
          </div>
        </article>
      ))}
    </div>
  </>;
}

function Orders({ orders, role, onNotice }) {
  return <>
    <PageIntro title={role === 'provider' ? 'طلبات العملاء' : 'الطلبات'} text={role === 'provider' ? 'راجع الطلبات المسندة إليك وحدّث حالتها.' : 'متابعة كل الطلبات المقدمة عبر المنصة.'} />
    <div className="panel table-panel">
      <div className="panel-head">
        <div>
          <h3>قائمة الطلبات</h3>
          <small>{orders.length} طلب</small>
        </div>
        <button className="secondary-btn" onClick={() => onNotice('سيتم تصدير البيانات بصيغة CSV بعد ربط الخادم.')}>تصدير CSV</button>
      </div>
      <OrderTable orders={orders} onStatus={() => onNotice('تم تحديث حالة الطلب محليًا.')} />
    </div>
  </>;
}

function OrderTable({ orders, onStatus }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>الخدمة</th>
            <th>الطالب</th>
            <th>مقدم الخدمة</th>
            <th>المبلغ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><b>{order.id}</b></td>
              <td>{order.service}</td>
              <td>{order.customer}</td>
              <td>{order.provider}</td>
              <td>{order.amount}</td>
              <td>
                <button className={`status ${order.status === 'مكتمل' ? 'done' : order.status === 'جديد' ? 'progress' : 'pending'}`} onClick={onStatus}>{order.status}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Users({ onNotice }) {
  return <>
    <PageIntro title="المستخدمون" text="إدارة الطلاب ومقدمي الخدمات وصلاحياتهم." action="＋ إضافة مستخدم" onAction={() => onNotice('سيتم فتح نموذج إضافة مستخدم.')} />
    <div className="user-grid">
      {[
        ['👨‍🎓','طلاب مسجلون','1,248','نشط'],
        ['🧑‍💻','مقدمو خدمات','86','تم التحقق'],
        ['⏳','طلبات تحقق','12','تحتاج مراجعة']
      ].map(([icon, title, number, status]) => (
        <div className="user-stat" key={title}>
          <span className="service-icon">{icon}</span>
          <div>
            <small>{title}</small>
            <strong>{number}</strong>
            <span className="badge success">{status}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="panel permission-panel">
      <div className="panel-head">
        <div>
          <h3>مصفوفة الصلاحيات</h3>
          <small>تحكم بصلاحيات الفئات</small>
        </div>
      </div>
      <PermissionTable />
    </div>
  </>;
}

function PermissionTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>الفئة</th>
            <th>لوحة التحكم</th>
            <th>إدارة الطلبات</th>
            <th>إدارة المستخدمين</th>
            <th>الإعدادات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>المالك / المدير</b></td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
            <td>✓</td>
          </tr>
          <tr>
            <td><b>الطالب</b></td>
            <td>✓</td>
            <td>✓</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td><b>مقدم الخدمة</b></td>
            <td>✓</td>
            <td>طلبات العملاء</td>
            <td>—</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Settings({ onNotice }) {
  return <>
    <PageIntro title="الإعدادات" text="إعدادات الحساب والمنصة والإشعارات." />
    <div className="settings-grid">
      <div className="panel settings-card">
        <h3>ملف المالك</h3>
        <label>الاسم<input defaultValue="فهد اليحيائي" /></label>
        <label>البريد الإلكتروني<input defaultValue="admin@mawthooq.om" type="email" /></label>
        <button className="primary-btn" onClick={() => onNotice('تم حفظ إعدادات الحساب.')}>حفظ التعديلات</button>
      </div>

      <div className="panel settings-card">
        <h3>الأمان والصلاحيات</h3>
        <label className="switch-row"><span>المصادقة الثنائية</span><input type="checkbox" defaultChecked /></label>
        <label className="switch-row"><span>تنبيهات الطلبات</span><input type="checkbox" defaultChecked /></label>
        <p className="muted">للتشغيل الفعلي، اربط هذه الواجهة بخادم مصادقة وقاعدة بيانات.</p>
      </div>
    </div>
  </>;
}

function PageIntro({ title, text, action, onAction }) {
  return (
    <div className="page-title">
      <div>
        <span className="eyebrow">منصة موثوق</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action && <button className="primary-btn" onClick={onAction}>{action}</button>}
    </div>
  );
}

function PermissionList({ role }) {
  return (
    <div className="permission-list">
      {roles[role].permissions.map((item) => (
        <div key={item}>
          <span className="permission-check">✓</span>
          <span>{{
            dashboard: 'لوحة المؤشرات',
            services: 'استعراض الخدمات',
            orders: 'إدارة الطلبات',
            'provider-orders': 'طلبات العملاء',
            users: 'إدارة المستخدمين',
            settings: 'إعدادات المنصة'
          }[item]}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
:root {
  --bg: #f5f8fc;
  --panel: rgba(255, 255, 255, 0.96);
  --card: #ffffff;
  --navy: #0b1f3a;
  --navy-soft: #122d52;
  --blue: #1769aa;
  --blue-soft: #eaf4ff;
  --cyan: #20b8c5;
  --green: #149b72;
  --green-soft: #e8f8f2;
  --orange: #f59e0b;
  --orange-soft: #fff2db;
  --violet: #8b5cf6;
  --violet-soft: #f4edff;
  --pink: #ef5d7a;
  --pink-soft: #ffe7ee;
  --line: #e7edf5;
  --text: #14263f;
  --muted: #7387a1;
  --shadow: 0 16px 40px rgba(23, 48, 80, 0.08);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #edf5ff 0%, #f8fbff 100%);
  color: var(--text);
}

a { text-decoration: none; color: inherit; }
button, input, select, textarea {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 20px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 82px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  color: var(--navy);
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  display: grid;
  place-items: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 12px 24px rgba(23,105,170,0.25);
}

.brand-name {
  font-size: 22px;
}

.brand small {
  display: block;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 14px;
}

.nav-links a {
  padding: 10px 10px;
  border-radius: 10px;
  transition: 0.2s;
}

.nav-links a.active,
.nav-links a:hover {
  background: var(--blue-soft);
  color: var(--blue);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f4f7fb;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 220px;
  color: var(--muted);
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
}

.icon-btn {
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: white;
  cursor: pointer;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 8px 12px 8px 8px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--violet), var(--blue));
  color: white;
  font-weight: 700;
}

.user-pill strong {
  display: block;
  font-size: 14px;
}

.user-pill small {
  color: var(--muted);
  font-size: 11px;
}

.main-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.95fr;
  gap: 24px;
  padding-top: 26px;
  padding-bottom: 40px;
}

.content-column, .side-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.hero-panel {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  padding: 28px 28px 18px;
  background: linear-gradient(135deg, rgba(234, 243, 255, 0.9), rgba(245, 250, 255, 0.96));
}

.hero-copy {
  padding: 10px 0;
}

.eyebrow {
  display: inline-block;
  color: var(--blue);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 12px;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3.3rem);
  line-height: 1.1;
  color: var(--navy);
}

.hero-copy h1 span {
  color: var(--blue);
}

.hero-copy p {
  margin: 18px 0 0;
  color: var(--muted);
  line-height: 1.9;
  font-size: 15px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.primary-btn, .secondary-btn {
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
}

.primary-btn {
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  color: white;
  box-shadow: 0 12px 24px rgba(23,105,170,0.2);
}

.secondary-btn {
  background: white;
  border: 1px solid var(--line);
  color: var(--navy);
}

.overview-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 20px 18px;
  box-shadow: inset 0 0 0 1px rgba(130,150,175,0.04);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-top strong {
  font-size: 18px;
}

.live-tag {
  background: var(--green-soft);
  color: var(--green);
  border: 1px solid rgba(20,155,114,0.2);
  font-size: 11px;
  border-radius: 999px;
  padding: 7px 10px;
}

.request-line {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 10px;
  border: 1px solid var(--line);
  border-radius: 14px;
  margin-bottom: 10px;
}

.request-line:last-child {
  margin-bottom: 0;
}

.mini-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--blue-soft);
  display: grid;
  place-items: center;
  font-size: 18px;
}

.request-line b {
  display: block;
  margin-bottom: 4px;
}

.request-line small {
  color: var(--muted);
}

.mini-status {
  margin-right: auto;
  font-size: 11px;
  border-radius: 999px;
  padding: 7px 9px;
  border: 1px solid transparent;
}

.mini-status.good {
  background: var(--green-soft);
  color: var(--green);
  border-color: rgba(20,155,114,0.2);
}

.mini-status.wait {
  background: var(--blue-soft);
  color: var(--blue);
  border-color: rgba(23,105,170,0.2);
}

.mini-status.new {
  background: var(--orange-soft);
  color: var(--orange);
  border-color: rgba(245,158,11,0.2);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 22px 22px 14px;
}

.panel-head h3 {
  margin: 0;
  font-size: 20px;
  color: var(--navy);
}

.panel-head small {
  color: var(--var(--muted));
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.badge.success {
  background: var(--green-soft);
  color: var(--green);
}

.badge.blue {
  background: var(--blue-soft);
  color: var(--blue);
}

.badge.neutral {
  background: #f4f7fb;
  color: var(--navy);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 18px;
  padding: 0 22px 22px;
}

.stat-card {
  background: linear-gradient(180deg, rgba(19,35,56,0.95), rgba(17,25,40,0.95));
  border-radius: 18px;
  padding: 18px 16px;
  border: 1px solid rgba(255,255,255,0.04);
}

.stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: rgba(255,255,255,0.7);
  font-size: 13px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 18px;
}

.stat-icon.green { background: rgba(20, 155, 114, 0.18); color: #76e0b7; }
.stat-icon.blue { background: rgba(96, 165, 250, 0.18); color: #98c3ff; }
.stat-icon.violet { background: rgba(167, 139, 250, 0.18); color: #d2b9ff; }
.stat-icon.orange { background: rgba(245, 158, 11, 0.18); color: #ffc56d; }

.stat-value {
  margin-top: 18px;
  color: white;
  font-size: 32px;
  font-weight: 800;
}

.trend {
  display: inline-flex;
  margin-top: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.trend.green {
  background: rgba(20, 155, 114, 0.14);
  color: #7ee3c3;
}

.trend.blue {
  background: rgba(20, 165, 250, 0.14);
  color: #9cc5ff;
}

.trend.violet {
  background: rgba(167, 139, 250, 0.14);
  color: #d6c3ff;
}

.trend.orange {
  background: rgba(245, 158, 11, 0.14);
  color: #ffd18a;
}

.chart-box {
  padding: 0 22px 22px;
}

.chart-box svg {
  display: block;
  width: 100%;
  height: 260px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(11,31,58,0.04), rgba(11,31,58,0.01));
}

.table-wrap {
  padding: 0 22px 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}

th, td {
  text-align: right;
  padding: 16px 12px;
  border-bottom: 1px solid var(--line);
}

th {
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

.project-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.mini-logo {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
}

.mini-logo:nth-child(3n) { background: linear-gradient(135deg, var(--green), var(--cyan)); }
.mini-logo:nth-child(4n) { background: linear-gradient(135deg, var(--violet), var(--pink)); }

.status {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status.done {
  background: var(--green-soft);
  color: var(--green);
}

.status.progress {
  background: var(--orange-soft);
  color: var(--orange);
}

.status.pending {
  background: var(--pink-soft);
  color: var(--pink);
}

.small-panel {
  padding-bottom: 18px;
}

.task-list, .activity-list, .service-list {
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  background: #f9fbff;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.task-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.bullet.blue { background: var(--blue); }
.bullet.green { background: var(--green); }
.bullet.gold { background: var(--orange); }
.bullet.pink { background: var(--pink); }

.task-main strong, .task-main small {
  display: block;
}

.task-main small {
  color: var(--muted);
  margin-top: 4px;
}

.task-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 9px;
  font-size: 11px;
  border-radius: 999px;
  font-weight: 700;
}

.task-tag.blue { background: var(--blue-soft); color: var(--blue); }
.task-tag.green { background: var(--green-soft); color: var(--green); }
.task-tag.gold { background: var(--orange-soft); color: var(--orange); }
.task-tag.pink { background: var(--pink-soft); color: var(--pink); }

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fafcff;
}

.user-avatar.small {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 10px;
  font-size: 12px;
}

.activity-copy {
  flex: 1;
}

.activity-copy strong {
  display: block;
  font-size: 14px;
}

.activity-copy small {
  color: var(--muted);
}

.mini-tag {
  background: #f4f7fb;
  color: var(--navy);
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.service-card {
  background: #f9fbff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px 12px;
}

.service-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.service-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--blue-soft);
  font-size: 18px;
}

.service-card p {
  margin: 0 0 12px;
  color: var(--muted);
  line-height: 1.7;
  font-size: 13px;
}

.service-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.service-foot span {
  color: var(--blue);
  font-weight: 700;
}

.service-foot button {
  border: 0;
  border-radius: 10px;
  background: var(--navy);
  color: white;
  padding: 8px 12px;
  cursor: pointer;
}

.form-panel {
  padding-bottom: 18px;
}

.request-form {
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.request-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--navy);
}

.request-form input, .request-form select, .request-form textarea {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #f8fafc;
  padding: 12px 14px;
  outline: none;
  color: var(--text);
}

.request-form input:focus, .request-form select:focus, .request-form textarea:focus {
  border-color: rgba(23, 105, 170, 0.4);
  box-shadow: 0 0 0 4px rgba(23, 105, 170, 0.08);
}

.full-width {
  width: 100%;
  margin-top: 8px;
}

@media (max-width: 1100px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 840px) {
  .nav-wrap {
    flex-wrap: wrap;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: space-between;
    overflow-x: auto;
  }

  .hero-panel {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }
}

@media (max-width: 560px) {
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-box {
    min-width: 0;
    flex: 1;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
  }
}
