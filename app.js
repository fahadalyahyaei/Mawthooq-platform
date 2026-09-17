const KEY = "mawthooq_mvp_v1";

const seed = {
  users: JSON.parse(localStorage.getItem(KEY + "_users") || "[]"),
  requests: JSON.parse(localStorage.getItem(KEY + "_requests") || "[]"),
  currentUser: JSON.parse(localStorage.getItem(KEY + "_current") || "null")
};

function save(){
  localStorage.setItem(KEY+"_users", JSON.stringify(seed.users));
  localStorage.setItem(KEY+"_requests", JSON.stringify(seed.requests));
  localStorage.setItem(KEY+"_current", JSON.stringify(seed.currentUser));
}
function uid(prefix="id"){ return prefix+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,7); }
function msg(el, text, type="ok"){ if(!el)return; el.textContent=text; el.className="form-msg "+type; }
function money(n){ return `${Number(n||0).toFixed(2)} ر.ع`; }

const services = [
  ["📚","الإطار النظري","بناء هيكل الإطار النظري والاستشارات المتعلقة بالمفاهيم والمراجع."],
  ["🔎","الدراسات السابقة","تنظيم وتحليل الدراسات السابقة والمقارنة بينها."],
  ["🧭","المنهجية","استشارات تصميم الدراسة، الأدوات، العينة، والمنهج."],
  ["📊","التحليل الإحصائي","تحليل البيانات وتفسير النتائج باستخدام الأدوات المناسبة."],
  ["✍️","التدقيق والمراجعة","مراجعة لغوية وأكاديمية وتحسين الوضوح والتناسق."],
  ["🗂️","التنسيق","تنسيق البحوث والرسائل وفق دليل الجامعة."],
  ["🌐","الترجمة الأكاديمية","ترجمة أكاديمية مع المحافظة على المصطلحات والسياق."],
  ["💡","الاستشارات البحثية","جلسات استشارية وتوجيهية لمراحل البحث المختلفة."]
];

function initHome(){
  const grid=document.getElementById("serviceGrid");
  if(grid) grid.innerHTML=services.map(s=>`<article class="service-card"><div class="service-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join("");
}

function initRegister(){
  let role=new URLSearchParams(location.search).get("role")||"seeker";
  const roles=document.querySelectorAll(".role");
  const setRole=r=>{role=r;roles.forEach(x=>x.classList.toggle("active",x.dataset.role===r));};
  roles.forEach(x=>x.addEventListener("click",()=>setRole(x.dataset.role)));
  setRole(role);
  document.getElementById("registerForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const email=f.get("email").trim().toLowerCase();
    if(seed.users.some(u=>u.email===email)){msg(document.getElementById("registerMsg"),"البريد مستخدم مسبقًا.","error");return;}
    const user={id:uid("usr"),name:f.get("name").trim(),email,phone:f.get("phone").trim(),password:f.get("password"),role};
    seed.users.push(user); seed.currentUser={...user,password:undefined}; save();
    msg(document.getElementById("registerMsg"),"تم إنشاء الحساب. سيتم تحويلك إلى لوحة التحكم...");
    setTimeout(()=>location.href="dashboard.html",500);
  });
}

function initLogin(){
  document.getElementById("loginForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(e.target), email=f.get("email").trim().toLowerCase();
    const user=seed.users.find(u=>u.email===email && u.password===f.get("password"));
    if(!user){msg(document.getElementById("loginMsg"),"بيانات الدخول غير صحيحة.","error");return;}
    seed.currentUser={...user,password:undefined}; save(); location.href="dashboard.html";
  });
}

function requireUser(){
  if(!seed.currentUser){ location.href="login.html"; return false; }
  return true;
}

function initDashboard(){
  if(!requireUser())return;
  const u=seed.currentUser;
  document.getElementById("userName").textContent=u.name;
  document.getElementById("dashTitle").textContent=`مرحبًا ${u.name}`;
  document.getElementById("dashSubtitle").textContent=u.role==="provider"?"تابع عروضك وطلبات العملاء.":"تابع طلباتك وعروض مقدمي الخدمات.";
  const my=seed.requests.filter(r=>u.role==="provider"?r.providerId===u.id:r.userId===u.id);
  document.getElementById("statRequests").textContent=my.length;
  document.getElementById("statActive").textContent=my.filter(r=>r.status==="قيد التنفيذ").length;
  document.getElementById("statDone").textContent=my.filter(r=>r.status==="مكتمل").length;
  document.getElementById("statMoney").textContent=money(my.reduce((a,r)=>a+Number(r.budget||0),0));
  const list=document.getElementById("requestList");
  list.innerHTML=my.length?my.slice().reverse().map(r=>`<div class="list-item"><div><h3>${r.title}</h3><p>${r.category} · ${r.dueDate||"بدون موعد"}</p></div><div><span class="status status-open">${r.status}</span><p>${money(r.budget)}</p></div></div>`).join(""):`<div class="muted">لا توجد طلبات بعد. ابدأ بإنشاء طلب جديد.</div>`;
  document.getElementById("newRequestBtn").style.display=u.role==="provider"?"none":"inline-flex";
  document.getElementById("logoutBtn").onclick=()=>{seed.currentUser=null;save();location.href="index.html";};
}

function initRequest(){
  if(!requireUser())return;
  document.getElementById("requestForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const r={id:uid("req"),userId:seed.currentUser.id,title:f.get("title"),category:f.get("category"),description:f.get("description"),budget:Number(f.get("budget")),dueDate:f.get("dueDate"),attachment:f.get("attachment"),status:"مفتوح",createdAt:new Date().toISOString(),commissionRate:.10};
    seed.requests.push(r);save();
    msg(document.getElementById("requestMsg"),"تم نشر الطلب في النموذج الأولي. في النسخة الإنتاجية سيظهر لمقدمي الخدمات.");
    e.target.reset();
  });
}

function initAdmin(){
  document.getElementById("adminUsers").textContent=seed.users.length;
  document.getElementById("adminRequests").textContent=seed.requests.length;
  const commission=seed.requests.reduce((a,r)=>a+(Number(r.budget||0)*.10),0);
  document.getElementById("adminCommission").textContent=money(commission);
  const list=document.getElementById("adminRequestList");
  list.innerHTML=seed.requests.length?seed.requests.slice().reverse().map(r=>`<div class="list-item"><div><h3>${r.title}</h3><p>${r.category} · ${r.createdAt.slice(0,10)}</p></div><div><strong>${money(r.budget)}</strong><p>عمولة 10%: ${money(r.budget*.10)}</p></div></div>`).join(""):`<div class="muted">لا توجد طلبات.</div>`;
}

const page=document.body.dataset.page;
if(page==="home")initHome();
if(page==="register")initRegister();
if(page==="login")initLogin();
if(page==="dashboard")initDashboard();
if(page==="request")initRequest();
if(page==="admin")initAdmin();
