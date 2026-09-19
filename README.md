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
