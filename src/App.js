// src/App.js
import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

/* ============================
   Theme & constants
   ============================ */
const THEME = "#ff4755";
const POS = "#059669";
const NEG = "#dc2626";
const MUTED = "#6b7280";
const BORDER = "#eef2f6";
const MAX_WIDTH = "max-w-7xl";

/* ============================
   Translations (English / Arabic - UAE)
   Keys are used across the app as t[key]
   ============================ */
const TRANSLATIONS = {
  en: {
    siteTitle: "SupremeFX — Risk Management & Automation",
    headerLogoAlt: "SupremeFX",
    heroTitle: "Risk Management & Automation Strategy",
    heroP1:
      "This proposal outlines a structured approach to protect revenue, strengthen operational resilience and realise scalable profitability.",
    heroP2:
      "Focused execution, lean piloting and transparent KPIs enable confident decision-making and predictable improvement.",
    whyTitle: "Why this matters",
    whySubtitle:
      "A concise overview of strategic outcomes and how they are achieved — presented for leadership clarity and decision-making.",
    profit: "Profit uplift",
    avoidable: "Avoidable losses",
    opsResponse: "Ops response",
    lpEfficiency: "LP efficiency",
    dashboard: "Dashboard",
    dashboardSubtitle: "Real-time Risk Monitoring",
    liveDemo: "Live demo",
    printSummary: "Print summary",
    realised24: "Realised P&L (24h)",
    openExposure: "Open Exposure",
    activeAlerts: "Active Alerts",
    clientStream: "Client Activity Stream",
    quickActions: "Quick Actions",
    lpHealth: "LP Health",
    topTrades: "Top Trades (live)",
    topProfitLoss: "Top Profit / Loss Accounts",
    abusiveClients: "Abusive / Improper Clients",
    swapReports: "Swap & Automation Reports",
    widgetsNote:
      "Widgets: client activity, LP health, pricing ticks, realised P&L, realised losses, slippage & top trades, alerts, swap reports and quick actions.",
    actionableAlerts: "Actionable Alerts",
    alertsNote: "Signals for market making & hedging",
    details: "Details",
    hedge: "Hedge",
    reroute: "Reroute",
    freeze: "Freeze",
    validated: "Validated",
    requiresReview: "Requires review",
    netImproved: "Net — improved",
    book: "Book",
    technologySnapshot: "Current snapshot",
    technologyProposed: "Proposed improvements",
    integrationChecklistTitle: "Integration checklist",
    implementationRequirementsTitle: "Implementation requirements",
    hostingSetupTitle: "Hosting & Setup",
    hostingSetupDesc:
      "Recommended hosting and resources to run pilot and scale to production.",
    timelineTitle: "Timeline & milestones",
    timelineDesc: "High-level phases for the soft-launch",
    impactTitle: "Impact — Initial vs Potential",
    executiveBriefingTitle: "Executive briefing",
    executiveBriefingNote:
      "Prepared for immediate coordination — enabling rapid pilot execution.",
    conclusionTitle: "Conclusion",
    conclusionText:
      "This strategy is designed to safeguard margins, reduce unnecessary losses and strengthen operational resilience. Automation is paired with appropriate oversight, ensuring routing efficiency, compliance and effective fallback logic. The result is a trading environment that is both more profitable and better prepared for scale.",
    widgets: "Widgets",
    preparedBy: "Prepared by",
    approve: "Approve",
    coreTeam: "Core Team",
    provideMt5: "Provide MT5 API (staging)",
    lpTestCreds: "LP Test Credentials",
    mt5Desc: "Manager API credentials for integration and testing",
    lpCredsDesc: "1–2 LP accounts for routing & benchmark tests",
    coreTeamDesc:
      "Lean setup with focused engineering expertise (backend, SRE, product/ops) — sufficient for pilot scale and growth",
    integrationNote: "Actionable items to enable integration and testing",
    implementationNote: "Operational priorities for a stable rollout",
    resourcesInfra:
      "Kubernetes cluster (3 nodes), Postgres (replicated), Redis, message broker (Kafka or RabbitMQ)",
    resourcesObs:
      "Prometheus, Grafana, ELK/Opensearch, PagerDuty/Sentry for incidents",
    resourcesSec: "Vault for secrets, OIDC for SSO, backups and DR runbook",
    resourcesEst:
      "Lean setup with focused engineering expertise (backend, SRE, product/ops) — sufficient for pilot scale and growth",
    printable: "Print summary",
  },
  ar: {
    siteTitle: "سوبريم إف إكس — استراتيجية إدارة المخاطر والأتمتة",
    headerLogoAlt: "سوبريم إف إكس",
    heroTitle: "استراتيجية إدارة المخاطر والأتمتة",
    heroP1:
      "توضح هذه المقترح نهجًا منظمًا لحماية الإيرادات، وتعزيز مرونة العمليات، وتحقيق قابلية التوسع في الربحية.",
    heroP2:
      "تنفيذ مركز، تجربة تجريبية نحيلة، ومؤشرات أداء شفافة تمكّن من اتخاذ قرارات واثقة وتحقيق تحسّن متوقع.",
    whyTitle: "لماذا هذا مهم",
    whySubtitle:
      "نظرة موجزة على النتائج الاستراتيجية وكيفية تحقيقها — مصممة لتمكين القيادة من اتخاذ قرارات مدروسة.",
    profit: "زيادة الربح",
    avoidable: "الخسائر القابلة للتجنّب",
    opsResponse: "استجابة العمليات",
    lpEfficiency: "كفاءة مزوّدي السيولة",
    dashboard: "لوحة القيادة",
    dashboardSubtitle: "مراقبة المخاطر في الوقت الحقيقي",
    liveDemo: "عرض مباشر",
    printSummary: "طباعة الملخص",
    realised24: "الأرباح المحققة (24س)",
    openExposure: "التعرّض المفتوح",
    activeAlerts: "التنبيهات النشطة",
    clientStream: "تدفّق نشاط العميل",
    quickActions: "إجراءات سريعة",
    lpHealth: "حالة مزوّدي السيولة",
    topTrades: "أهم الصفقات (مباشر)",
    topProfitLoss: "أعلى حسابات ربح / خسارة",
    abusiveClients: "عملاء مسيئون / غير قانونيين",
    swapReports: "تقارير المقايضات والأتمتة",
    widgetsNote:
      "عناصر: نشاط العميل، حالة المزودين، أسعار السوق، الأرباح المحققة، الخسائر، الانزلاق، الصفقات الكبرى، التنبيهات، تقارير المقايضات والإجراءات السريعة.",
    actionableAlerts: "تنبيهات قابلة للتنفيذ",
    alertsNote: "إشارات لتسعير السوق والهيدج",
    details: "تفاصيل",
    hedge: "تحوّط",
    reroute: "إعادة توجيه",
    freeze: "تجميد",
    validated: "تم التحقق",
    requiresReview: "يتطلب مراجعة",
    netImproved: "صافي — محسّن",
    book: "دفتر",
    technologySnapshot: "الحالة الحالية",
    technologyProposed: "التحسينات المقترحة",
    integrationChecklistTitle: "قائمة التكامل",
    implementationRequirementsTitle: "متطلبات التنفيذ",
    hostingSetupTitle: "الاستضافة والإعداد",
    hostingSetupDesc:
      "الاستضافة والموارد الموصى بها لتشغيل المرحلة التجريبية والتوسّع للإنتاج.",
    timelineTitle: "الجدول الزمني والمعالم",
    timelineDesc: "مراحل عالية المستوى لإطلاق تجريبي سلس",
    impactTitle: "التأثير — مبدئي مقابل محتمل",
    executiveBriefingTitle: "موجز تنفيذي",
    executiveBriefingNote:
      "جاهز للتنسيق الفوري — يمكّن تنفيذ المرحلة التجريبية بسرعة.",
    conclusionTitle: "الخلاصة",
    conclusionText:
      "تم تصميم هذه الاستراتيجية لحماية الهوامش، وتقليل الخسائر غير الضرورية، وتعزيز مرونة العمليات. تم إقران الأتمتة مع إشراف مناسب لضمان كفاءة التوجيه والامتثال ومنطق التراجع الفعّال. النتيجة بيئة تداول أكثر ربحية واستعدادًا للتوسّع.",
    widgets: "عناصر",
    preparedBy: "إعداد",
    approve: "الموافقة",
    coreTeam: "الفريق الأساسي",
    provideMt5: "توفير API لـ MT5 (بيئة تجريبية)",
    lpTestCreds: "بيانات اختبار مزوّدي السيولة",
    mt5Desc: "بيانات اعتماد واجهة المدير للتكامل والاختبار",
    lpCredsDesc: "1–2 حساب مزود سيولة للاختبار والقياس",
    coreTeamDesc:
      "هيكل نحيل بخبرة هندسية مركّزة (backend, SRE, product/ops) — كافٍ للمرحلة التجريبية والنمو",
    integrationNote: "عناصر تنفيذية لتمكين التكامل والاختبار",
    implementationNote: "أولويات تشغيلية لطرح مستقر",
    resourcesInfra:
      "عنقود Kubernetes (3 عقد)، Postgres (مكرّر)، Redis، وسيط رسائل (Kafka أو RabbitMQ)",
    resourcesObs:
      "Prometheus وGrafana وELK/Opensearch وPagerDuty/Sentry للحوادث",
    resourcesSec:
      "Vault لإدارة الأسرار، OIDC لتسجيل الدخول الموحد، نسخ احتياطية وخطة استعادة الكوارث",
    resourcesEst:
      "هيكل نحيل بخبرة هندسية مركّزة (backend, SRE, product/ops) — مناسب للمقياس التجريبي والنمو",
    printable: "طباعة الملخص",
  },
};

/* ============================
   Helpers & sample data (unchanged)
   ============================ */
const basePNLdata = {
  EURUSD: [
    { t: "09:15", v: 1200 },
    { t: "09:20", v: 1600 },
    { t: "09:25", v: 1400 },
    { t: "09:30", v: 1700 },
    { t: "09:35", v: 1650 },
  ],
  USDJPY: [
    { t: "09:15", v: 800 },
    { t: "09:20", v: 1100 },
    { t: "09:25", v: 1150 },
    { t: "09:30", v: 1000 },
    { t: "09:35", v: 1300 },
  ],
  GBPUSD: [
    { t: "09:15", v: 900 },
    { t: "09:20", v: 950 },
    { t: "09:25", v: 1200 },
    { t: "09:30", v: 1250 },
    { t: "09:35", v: 1400 },
  ],
};

const LP_LIST_CONST = [
  { name: "LP-Alpha", eff: 96 },
  { name: "LP-Beta", eff: 89 },
  { name: "LP-Gamma", eff: 78 },
  { name: "LP-Delta", eff: 72 },
];

const impact = [
  { name: "Profitability", Initial: 5, Potential: 18 },
  { name: "Liquidity", Initial: 6, Potential: 25 },
  { name: "Slippage", Initial: 10, Potential: 2 },
  { name: "Latency", Initial: 20, Potential: 5 },
  { name: "Compliance", Initial: 40, Potential: 10 },
];

const sampleTopTrades = (sym) => [
  { sym, vol: 2.0, slip: sym === "EURUSD" ? 0.008 : 0.0012 },
  { sym, vol: 1.5, slip: sym === "USDJPY" ? 0.001 : 0.003 },
  { sym, vol: 0.8, slip: 0.002 },
];

function formatSlip(slip) {
  if (slip == null) return "-";
  if (slip <= 1) return `${(slip * 100).toFixed(2)}%`;
  return `${slip.toFixed(2)}%`;
}

/* ============================
   Local mocks used by DashboardPreview
   ============================ */
const alertsMock = [
  {
    sym: "XAUUSD",
    action: "Sell",
    confidence: 0.82,
    reason: "Overbought + spread widening",
  },
  {
    sym: "EURUSD",
    action: "Buy",
    confidence: 0.68,
    reason: "Support hold + low slippage",
  },
];

const topProfitAccountsMock = [
  { id: "A123", profit: 12000 },
  { id: "B456", profit: 8900 },
];

const topLossAccountsMock = [
  { id: "C789", loss: -5400 },
  { id: "D012", loss: -3300 },
];

const abusiveClientsMock = [
  { id: "Z999", reason: "High frequency / toxic flow" },
];

const swapReportsMock = [
  {
    id: "SR-20250901",
    summary:
      "Automated swap adjustments — protect overnight margins with zero manual intervention",
    when: "2025-09-01",
  },
];

/* ============================
   Global typography styles (Apple-like)
   ============================ */
const GlobalTypography = ({ lang }) => (
  <style>{`
    html, body, #root {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    body {
      font-size: 16px;
      line-height: 1.5;
    }
    .hero-title { font-weight: 700; line-height: 1.05; margin: 0; }
    @media (min-width: 1024px) {
      .hero-title { font-size: 44px; } /* desktop */
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      .hero-title { font-size: 36px; } /* tablet */
    }
    @media (max-width: 767px) {
      .hero-title { font-size: 28px; } /* mobile */
    }
    ${lang === "ar" ? `body { font-size: 17px; }` : ""}
    /* keep plus signs and arrows from wrapping awkwardly */
    .metric-inline { display: inline-flex; align-items: baseline; gap: 6px; white-space: nowrap; }
    .metric-block { display:flex; flex-direction:column; align-items:flex-start; }
    @media (max-width: 640px) {
      .metric-block { align-items: flex-start; }
    }
  `}</style>
);

/* ============================
   Small UI components
   ============================ */
const Stat = ({ label, value, note, positive, lang }) => (
  <div
    className="p-4 rounded-xl"
    style={{
      border: `1px solid ${BORDER}`,
      background: "linear-gradient(180deg,#ffffff,#fbfbfd)",
      textAlign: lang === "ar" ? "right" : "left",
    }}
  >
    <div className="text-xs text-gray-400">{label}</div>
    <div
      className="text-2xl font-semibold"
      style={{ color: positive ? POS : "#0f172a" }}
    >
      {value}
    </div>
    {note && <div className="text-xs text-gray-400 mt-1">{note}</div>}
  </div>
);

/* ============================
   AnimatedPlus (collapse)
   ============================ */
function AnimatedPlus({ open, onToggle, id }) {
  const btnRef = useRef(null);
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const handler = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [onToggle]);

  return (
    <>
      <style>{`
        .plus-btn { width:44px; height:44px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; background:${THEME}; border:none; transition:transform .22s, box-shadow .22s; box-shadow: 0 8px 22px rgba(15,23,42,0.06); }
        .plus-btn.idle { animation: soft-breathe 3000ms ease-in-out infinite; }
        @keyframes soft-breathe { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
      `}</style>
      <button
        ref={btnRef}
        id={id}
        aria-controls={id ? `${id}-panel` : undefined}
        aria-expanded={open}
        className={`plus-btn ${open ? "" : "idle"}`}
        onClick={onToggle}
        title={open ? "Collapse details" : "Expand details"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5v14"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12h14"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}

/* ============================
   ExpandCard
   ============================ */
function ExpandCard({
  idSuffix,
  title,
  left,
  right,
  bullets = [],
  variant = "white",
  lang,
}) {
  const [open, setOpen] = useState(false);
  const panelId = idSuffix ? `panel-${idSuffix}` : undefined;

  const styleMap = {
    white: {
      style: {
        border: `1px solid ${BORDER}`,
        boxShadow: "0 6px 18px rgba(15,23,42,0.03)",
        background: "#ffffff",
      },
    },
    soft: {
      style: {
        border: `1px solid rgba(255,71,85,0.08)`,
        background: "#fff7f7",
      },
    },
    slate: {
      style: {
        border: `1px solid rgba(15,23,42,0.04)`,
        boxShadow: "0 10px 30px rgba(2,6,23,0.03)",
        background: "#fbfcfe",
      },
    },
  };

  const chosen = styleMap[variant] || styleMap.white;

  return (
    <div className="rounded-2xl p-4" style={chosen.style}>
      <div
        className="flex items-start gap-4"
        style={{ flexDirection: lang === "ar" ? "row-reverse" : "row" }}
      >
        <div
          className="flex-1 min-w-0"
          style={{ textAlign: lang === "ar" ? "right" : "left" }}
        >
          <div className="text-base font-semibold text-[#0f172a]">{title}</div>
          {left && <div className="text-sm text-gray-600 mt-2">{left}</div>}
        </div>

        <div className="w-48 flex flex-col items-end">
          {right && (
            <div style={{ textAlign: lang === "ar" ? "right" : "left" }}>
              <div className="text-xs">
                {lang === "ar" ? "أولي" : "Initial"}
              </div>
              <div
                className="text-lg font-semibold"
                style={{ display: "inline-flex", gap: 8 }}
              >
                <span style={{ whiteSpace: "nowrap" }}>{right.initial}</span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {lang === "ar" ? "محتمل" : "Potential"}
              </div>
              <div className="text-sm font-semibold" style={{ color: POS }}>
                {right.potential}
              </div>
            </div>
          )}
          <div className="mt-4">
            <AnimatedPlus
              open={open}
              onToggle={() => setOpen((s) => !s)}
              id={panelId ? panelId.replace("panel-", "") : undefined}
            />
          </div>
        </div>
      </div>

      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className="mt-4 pt-3 text-sm text-gray-700 transition-[max-height,padding-top] duration-300 ease-in-out"
        style={{
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          borderTop: open ? `1px dashed ${BORDER}` : "none",
          paddingTop: open ? 12 : 0,
          textAlign: lang === "ar" ? "right" : "left",
        }}
      >
        {open && (
          <ul className="list-disc list-inside space-y-2">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ============================
   Header Logo (PNG) - uses public/supremefx-logo.png
   ============================ */
function HeaderLogo({ lang }) {
  return (
    <img
      src="/supremefx-logo.png"
      alt={TRANSLATIONS[lang].headerLogoAlt}
      style={{ maxWidth: 120, height: "auto", display: "block" }}
      className="block"
    />
  );
}

/* ============================
   Strategy Hero
   ============================ */
function StrategyHero({ t, lang }) {
  return (
    <section className="pt-12 pb-8">
      <div className={`${MAX_WIDTH} mx-auto px-6`}>
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            boxShadow: "0 8px 30px rgba(2,6,23,0.02)",
          }}
        >
          <h1
            className="hero-title"
            style={{ textAlign: lang === "ar" ? "right" : "left" }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="mt-4 text-gray-700 max-w-3xl text-base md:text-lg"
            style={{ textAlign: lang === "ar" ? "right" : "left" }}
          >
            {t.heroP1}
          </p>
          <p
            className="mt-2 text-gray-700 text-base md:text-lg"
            style={{ textAlign: lang === "ar" ? "right" : "left" }}
          >
            {t.heroP2}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================
   Why this matters
   ============================ */
function WhyThisMatters({ t, lang }) {
  const stats = [
    {
      title: t.profit,
      value: "+5%",
      note: "→ +18–25% potential",
      expl:
        lang === "ar"
          ? "تحسين التسعير، التحوّط وتقليل الانزلاق لزيادة الهوامش."
          : "Optimised quoting, hedging and reduced slippage capture more margin.",
    },
    {
      title: t.avoidable,
      value: "-10%",
      note: "→ -35–45% potential",
      expl:
        lang === "ar"
          ? "احتواء التدفقات السامة وتقليل التعرض للحد من الخسائر."
          : "Toxic flows are quarantined, exposures reduced and losses contained.",
    },
    {
      title: t.opsResponse,
      value: "20%",
      note: "→ 55–70% potential",
      expl:
        lang === "ar"
          ? "أتمتة سيناريوهات العمل والتدخلات السريعة لتقليل وقت التعافي."
          : "Automated playbooks and rapid interventions reduce downtime and risk.",
    },
    {
      title: t.lpEfficiency,
      value: "+8%",
      note: "→ +25–40% potential",
      expl:
        lang === "ar"
          ? "تقييم ديناميكي لمزوّدي السيولة وتوجيه ذكي لتحسين التنفيذ."
          : "Dynamic LP scoring and routing enhance fill quality and improve execution.",
    },
  ];

  return (
    <section
      className="py-10"
      style={{ background: `linear-gradient(180deg, ${THEME}, #d94b56)` }}
    >
      <div className={`${MAX_WIDTH} mx-auto px-6`}>
        <div
          className="text-white mb-6"
          style={{ textAlign: lang === "ar" ? "right" : "left" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">{t.whyTitle}</h2>
          <p className="mt-2 text-white/90 max-w-3xl text-sm md:text-base">
            {t.whySubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 bg-white shadow-lg"
              style={{
                border: `1px solid ${BORDER}`,
                minHeight: 150,
                textAlign: lang === "ar" ? "right" : "left",
              }}
            >
              <div className="text-sm text-gray-600">{s.title}</div>

              {/* metric block: value + note with nowrap to avoid wrapping the plus / arrow */}
              <div className="mt-2">
                <div
                  className="metric-inline"
                  style={{
                    justifyContent: lang === "ar" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    className="text-2xl md:text-3xl font-bold text-gray-900"
                    aria-hidden
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs text-gray-500"
                    style={{ opacity: 0.9 }}
                  >
                    {s.note}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-700 mt-3">{s.expl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   DashboardPreview
   ============================ */
function DashboardPreview({ t, lang }) {
  const symbols = Object.keys(basePNLdata);
  const [symbol, setSymbol] = useState(symbols[0]);
  const [pnlData, setPnlData] = useState(basePNLdata[symbol]);

  useEffect(() => setPnlData(basePNLdata[symbol]), [symbol]);

  const isAr = lang === "ar";
  const align = isAr ? { textAlign: "right", direction: "rtl" } : {};

  return (
    <div
      className="bg-white rounded-2xl p-5 border"
      style={{ borderColor: BORDER, ...align }}
    >
      <div
        className="flex items-center justify-between mb-4"
        style={{ flexDirection: isAr ? "row-reverse" : "row" }}
      >
        <div>
          <div className="text-sm text-gray-500">{t.dashboard}</div>
          <div className="text-lg font-semibold">{t.dashboardSubtitle}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400">{t.liveDemo}</div>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
            aria-label="Select symbol"
          >
            {symbols.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            className="text-sm px-3 py-1 rounded bg-gray-50 border"
            onClick={() => window.print()}
          >
            {t.printSummary}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <div
            className="bg-white rounded-lg p-3 border"
            style={{ borderColor: "#f4f6f8" }}
          >
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pnlData}>
                  <defs>
                    <linearGradient id="pg2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor={THEME} stopOpacity={0.12} />
                      <stop offset="95%" stopColor={THEME} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fill: MUTED }} />
                  <YAxis tick={{ fill: MUTED }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={THEME}
                    fill="url(#pg2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className="p-3 rounded-lg"
              style={{
                border: `1px solid ${BORDER}`,
                background: "linear-gradient(180deg,#f7fff8,#ffffff)",
              }}
            >
              <div className="text-xs text-gray-500">{t.realised24}</div>
              <div className="text-lg font-semibold" style={{ color: POS }}>
                $2.3M
              </div>
              <div className="text-xs text-gray-400">{t.netImproved}</div>
            </div>
            <div
              className="p-3 rounded-lg bg-white"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div className="text-xs text-gray-500">{t.openExposure}</div>
              <div className="text-lg font-semibold">$1.2M</div>
              <div className="text-xs text-gray-400">{t.book}</div>
            </div>
            <div
              className="p-3 rounded-lg bg-white"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div className="text-xs text-gray-500">{t.activeAlerts}</div>
              <div className="text-lg font-semibold text-red-500">3</div>
              <div className="text-xs text-gray-400">{t.requiresReview}</div>
            </div>
          </div>

          <div className="mt-2 grid md:grid-cols-2 gap-3">
            <div
              className="bg-white border rounded-lg p-3"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="text-xs text-gray-500 mb-2">{t.clientStream}</div>
              <div className="text-xs">
                <div
                  className="flex justify-between"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>09:35 {symbol} Buy 0.5 — C771</div>
                  <div className="text-green-600">{t.validated}</div>
                </div>
                <div
                  className="flex justify-between mt-1"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>09:32 USDJPY Sell 1.0 — B990</div>
                  <div className="text-red-500">{t.requiresReview}</div>
                </div>
                <div
                  className="flex justify-between mt-1"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>09:30 GBPUSD Buy 0.3 — A234</div>
                  <div className="text-green-600">{t.validated}</div>
                </div>
              </div>
            </div>

            <div
              className="bg-white border rounded-lg p-3 shadow-sm"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="text-xs text-gray-500 mb-2">{t.quickActions}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-[#ff4755] text-white text-sm">
                  {t.hedge}
                </button>
                <button className="px-3 py-1 rounded bg-gray-100 text-sm">
                  {t.reroute}
                </button>
                <button className="px-3 py-1 rounded bg-gray-100 text-sm">
                  {t.freeze}
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                One-click interventions with audit trail.
              </div>
            </div>
          </div>

          {/* Alerts visual widget */}
          <div
            className="mt-3 p-3 rounded-lg"
            style={{
              border: `1px solid ${BORDER}`,
              background: "linear-gradient(180deg,#fff8f8,#ffffff)",
            }}
          >
            <div
              className="flex items-center justify-between mb-2"
              style={{ flexDirection: isAr ? "row-reverse" : "row" }}
            >
              <div className="font-semibold">{t.actionableAlerts}</div>
              <div className="text-xs text-gray-400">{t.alertsNote}</div>
            </div>
            <div className="space-y-2">
              {alertsMock.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded"
                  style={{
                    border: `1px dashed ${BORDER}`,
                    background: "#fff",
                    flexDirection: isAr ? "row-reverse" : "row",
                  }}
                >
                  <div style={{ textAlign: isAr ? "right" : "left" }}>
                    <div className="font-medium">
                      {a.sym} — {a.action.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {a.reason} • confidence {(a.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-white border"
                      style={{ borderColor: BORDER }}
                    >
                      {t.details}
                    </button>
                    <button
                      className="px-3 py-1 rounded"
                      style={{
                        background: a.action === "Buy" ? POS : THEME,
                        color: "#fff",
                      }}
                    >
                      {a.action}
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-100">
                      {t.hedge}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="bg-white border rounded-lg p-3"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="text-xs text-gray-500 mb-2">{t.lpHealth}</div>
            <div className="space-y-2">
              {LP_LIST_CONST.map((lp) => (
                <div key={lp.name}>
                  <div
                    className="flex justify-between text-sm mb-1"
                    style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                  >
                    <div className="font-medium">{lp.name}</div>
                    <div
                      style={{ color: lp.eff > 85 ? POS : MUTED }}
                      className="font-semibold"
                    >
                      {lp.eff}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="h-2 rounded"
                      style={{ width: `${lp.eff}%`, background: THEME }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white border rounded-lg p-3"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="text-xs text-gray-500 mb-2">{t.topTrades}</div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400">
                  <th>Sym</th>
                  <th>Vol</th>
                  <th>Slip</th>
                </tr>
              </thead>
              <tbody>
                {sampleTopTrades(symbol).map((trow, i) => (
                  <tr key={i}>
                    <td className="py-1">{trow.sym}</td>
                    <td>{trow.vol}</td>
                    <td
                      className={
                        trow.slip > 0.005
                          ? "text-red-500 text-xs"
                          : "text-green-600 text-xs"
                      }
                    >
                      {formatSlip(trow.slip)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="bg-white border rounded-lg p-3"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="text-xs text-gray-500 mb-2">{t.topProfitLoss}</div>
            <div className="text-sm">
              <div className="mb-2">
                <strong>{isAr ? "أعلى ربح" : "Top Profit"}</strong>
              </div>
              {topProfitAccountsMock.map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>{a.id}</div>
                  <div className="font-medium">
                    ${a.profit.toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="mt-3 mb-2">
                <strong>{isAr ? "أعلى خسارة" : "Top Loss"}</strong>
              </div>
              {topLossAccountsMock.map((a) => (
                <div
                  key={a.id}
                  className="flex justify-between"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>{a.id}</div>
                  <div className="font-medium text-red-500">
                    ${a.loss.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white border rounded-lg p-3"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="text-xs text-gray-500 mb-2">{t.abusiveClients}</div>
            <div className="text-sm">
              {abusiveClientsMock.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between"
                  style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                >
                  <div>{c.id}</div>
                  <div className="text-xs text-gray-500">{c.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white border rounded-lg p-3"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="text-xs text-gray-500 mb-2">{t.swapReports}</div>
            <div className="text-sm">
              {swapReportsMock.map((r) => (
                <div key={r.id} className="mb-2">
                  <div
                    className="flex justify-between"
                    style={{ flexDirection: isAr ? "row-reverse" : "row" }}
                  >
                    <div className="font-medium">{r.id}</div>
                    <div className="text-xs text-gray-400">{r.when}</div>
                  </div>
                  <div className="text-xs text-gray-600">{r.summary}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-4 text-sm text-gray-600"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        <strong>{t.widgets}:</strong> {t.widgetsNote}
      </div>
    </div>
  );
}

/* ============================
   Technology Comparison
   ============================ */
function TechnologyComparison({ t, lang }) {
  const isAr = lang === "ar";
  const before = [
    {
      title: "Platform",
      text: isAr
        ? "منصة تداول واحدة (MT5) بدون مستوى تحكم موحد"
        : "Single trading platform (MT5) without unified control plane",
    },
    {
      title: "Routing",
      text: isAr
        ? "توجيه يدوي وتفضيلات مزوّد ثابتة"
        : "Manual routing & static LP preferences",
    },
    {
      title: "Monitoring",
      text: isAr
        ? "سجلات أساسية ولوحات محدودة"
        : "Basic platform logs, limited dashboards",
    },
  ];
  const after = [
    {
      title: "Platform",
      text: isAr
        ? "استيعاب موحّد + ضوابط آلية وسجل تدقيق"
        : "Unified ingestion + automated controls and audit trail",
    },
    {
      title: "Routing",
      text: isAr
        ? "تقييم ديناميكي للمزوّدين وتوجيه تلقائي"
        : "Dynamic LP scoring & automatic routing",
    },
    {
      title: "Monitoring",
      text: isAr
        ? "مقاييس فورية، تنبيهات وإجراءات بنقرة"
        : "Real-time metrics, alerts and one-click actions",
    },
  ];

  return (
    <div
      className="grid md:grid-cols-2 gap-6"
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      <div
        className="rounded-2xl p-4"
        style={{
          border: `1px solid ${BORDER}`,
          boxShadow: "0 8px 24px rgba(2,6,23,0.02)",
          background: "#fbfbfe",
        }}
      >
        <div className="text-lg font-semibold mb-3">{t.technologySnapshot}</div>
        <div className="space-y-3">
          {before.map((b, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-white/50 border hover:shadow-sm transition"
            >
              <div className="text-sm font-medium">{b.title}</div>
              <div className="text-xs text-gray-600 mt-1">{b.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-4"
        style={{
          border: `1px solid ${BORDER}`,
          boxShadow: "0 8px 24px rgba(2,6,23,0.02)",
          background: "#fffaf9",
        }}
      >
        <div className="text-lg font-semibold mb-3">{t.technologyProposed}</div>
        <div className="space-y-3">
          {after.map((a, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-white/50 border-l-4"
              style={{
                borderColor: i === 0 ? THEME : i === 1 ? POS : "#7c3aed",
              }}
            >
              <div className="text-sm font-medium">{a.title}</div>
              <div className="text-xs text-gray-600 mt-1">{a.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================
   Integration Checklist
   ============================ */
function IntegrationChecklist({ t, lang }) {
  const isAr = lang === "ar";
  const tiles = [
    { title: t.provideMt5, desc: t.mt5Desc, color: THEME },
    { title: t.lpTestCreds, desc: t.lpCredsDesc, color: POS },
    {
      title: isAr ? "تغذية الأسعار" : "Tick Feed",
      desc: isAr
        ? "تغذية الأسعار موحدة عبر WebSocket بزمن بالمللي"
        : "Normalized ticks via WebSocket with ms timestamps",
      color: "#0ea5e9",
    },
    {
      title: isAr ? "حسابات اختبار" : "Sandbox Accounts",
      desc: isAr
        ? "حسابات اختبار داخلية لمحاكاة الهيدج وإعادة التشغيل"
        : "Internal test accounts for simulated hedging & replay",
      color: "#7c3aed",
    },
  ];

  return (
    <div
      className="grid md:grid-cols-4 gap-4"
      style={{ direction: isAr ? "rtl" : "ltr" }}
    >
      {tiles.map((titem, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl"
          style={{
            border: `1px solid ${BORDER}`,
            boxShadow: "0 6px 18px rgba(2,6,23,0.03)",
            transition: "transform .15s ease",
            background: "#fff",
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${titem.color}20` }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                background: titem.color,
                borderRadius: 6,
              }}
            />
          </div>
          <div className="font-semibold mt-3">{titem.title}</div>
          <div className="text-xs text-gray-600 mt-1">{titem.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================
   Implementation Requirements
   ============================ */
function ImplementationRequirements({ t, lang }) {
  const isAr = lang === "ar";
  const groups = [
    {
      title: isAr ? "الأمن والوصول" : "Security & Access",
      items: [
        isAr
          ? "Mutual TLS حيث تدعم ودو� вращ"
          : "Mutual TLS where supported and API key rotation",
        isAr
          ? "وصول قائم على الدور للعمليات والمهندسين"
          : "Role-based access for operations and engineers",
        isAr
          ? "سجلات تدقيق مشفرة وسياسة احتفاظ"
          : "Encrypted audit logs and retention policy",
      ],
      color: "#f97316",
    },
    {
      title: isAr ? "الموثوقية والتجاوز" : "Reliability & Failover",
      items: [
        isAr
          ? "فحوصات حالة المزود وإعادة التوجيه التلقائي"
          : "LP health checks, auto-reroute & fallback LPs",
        isAr
          ? "نشر متعدد المناطق ونسخ قاعدة بيانات"
          : "Multi-zone deployment and DB replicas",
        isAr
          ? "سياسات إعادة المحاولة ومحدد الدارة للروابط الخارجية"
          : "Retry policies and circuit-breaker for external links",
      ],
      color: "#059669",
    },
    {
      title: isAr ? "المراقبة" : "Observability",
      items: [
        isAr
          ? "جمع القياسات (زمن الاستجابة، معدل الخطأ، الانزلاق)"
          : "Metric collection (latency, error-rate, slippage)",
        isAr
          ? "سجلات مركزية مع تحري التنفيذ"
          : "Central logs with search and execution trace",
        isAr
          ? "توجيه التنبيهات إلى القنوات مع دوريات المناوبة"
          : "Alert routing to channels with on-call rotation",
      ],
      color: "#0ea5e9",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {groups.map((g, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl"
          style={{
            border: `1px solid ${BORDER}`,
            boxShadow: "0 10px 30px rgba(2,6,23,0.03)",
            background: "#fff",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ direction: isAr ? "rtl" : "ltr" }}
          >
            <div className="font-semibold">{g.title}</div>
            <div className="text-xs text-gray-400">Priority</div>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            {g.items.map((it, j) => (
              <div key={j} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: g.color, marginTop: 6 }}
                />
                <div style={{ textAlign: isAr ? "right" : "left" }}>{it}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================
   Hosting & Setup
   ============================ */
function HostingSetup({ t, lang }) {
  const isAr = lang === "ar";
  const resources = [
    {
      title: isAr ? "البنية التحتية" : "Infrastructure",
      desc: t.resourcesInfra,
    },
    { title: isAr ? "المراقبة" : "Observability", desc: t.resourcesObs },
    {
      title: isAr ? "الأمن والعمليات" : "Security & Ops",
      desc: t.resourcesSec,
    },
    {
      title: isAr ? "الموارد المقدرة" : "Estimated resources",
      desc: t.resourcesEst,
    },
  ];

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ border: `1px solid ${BORDER}`, background: "#fff" }}
    >
      <div
        className="text-lg font-semibold mb-3"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        {t.hostingSetupTitle}
      </div>
      <div
        className="text-sm text-gray-600 mb-3"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        {t.hostingSetupDesc}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {resources.map((r, i) => (
          <div
            key={i}
            className="p-3 rounded-lg"
            style={{
              border: `1px solid ${BORDER}`,
              textAlign: isAr ? "right" : "left",
            }}
          >
            <div className="font-medium">{r.title}</div>
            <div className="text-xs text-gray-600 mt-1">{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
   Roadmap Timeline
   ============================ */
function RoadmapTimeline({ t, lang }) {
  const isAr = lang === "ar";
  const steps = [
    {
      step: 1,
      title: isAr ? "الوصول والتصميم" : "Access & Design",
      subtitle: isAr
        ? "بيانات الاعتماد، مؤشرات الأداء، القبول"
        : "Credentials, KPIs, acceptance",
    },
    {
      step: 2,
      title: isAr ? "البناء الأساسي" : "Core Build",
      subtitle: isAr ? "الموصلات ومحرك التحكم" : "Connectors & control engine",
    },
    {
      step: 3,
      title: isAr ? "التوجيه وتعديل المزوّدين" : "Routing & LP Tuning",
      subtitle: isAr
        ? "القياس، الأوزان والتجاوز"
        : "Benchmark, weight & failover",
    },
    {
      step: 4,
      title: isAr ? "المرحلة التجريبية" : "Pilot",
      subtitle: isAr
        ? "تجربة مع مجموعة تحكم وتسليم"
        : "Pilot with control group & handover",
    },
    {
      step: 5,
      title: isAr ? "الإطلاق المرن" : "Soft Launch",
      subtitle: isAr ? "جاهزية العمليات والإطلاق" : "Ops readiness & go-live",
    },
  ];

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ border: `1px solid ${BORDER}`, background: "#fff" }}
    >
      <div
        className="flex items-center gap-6 overflow-x-auto py-2"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className="min-w-[180px] p-4 rounded-lg"
            style={{
              border: `1px solid ${i <= 2 ? THEME : BORDER}`,
              background: i <= 2 ? "#fffaf9" : "#fff",
            }}
          >
            <div className="text-xs text-gray-400">
              {isAr ? `المرحلة ${s.step}` : `Phase ${s.step}`}
            </div>
            <div className="font-semibold mt-2">{s.title}</div>
            <div className="text-xs text-gray-500 mt-1">{s.subtitle}</div>
            <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div
                style={{
                  width: `${(s.step / steps.length) * 100}%`,
                  background: s.step <= 3 ? THEME : POS,
                  height: 8,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
   Impact Comparison
   ============================ */
function ImpactComparison({ t, lang }) {
  const isAr = lang === "ar";
  return (
    <div
      className="bg-white rounded-2xl p-5 border"
      style={{ borderColor: BORDER }}
    >
      <div
        className="flex items-center justify-between mb-3"
        style={{ direction: isAr ? "rtl" : "ltr" }}
      >
        <div className="text-lg font-semibold">{t.impactTitle}</div>
        <div className="text-xs text-gray-400">Conservative → Scalable</div>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={impact} margin={{ left: -8 }}>
            <XAxis dataKey="name" tick={{ fill: MUTED }} />
            <YAxis tick={{ fill: MUTED }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Initial" fill={THEME} radius={[6, 6, 0, 0]} />
            <Bar dataKey="Potential" fill={POS} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ============================
   Executive Briefing
   ============================ */
function ExecutiveBriefing({ t, lang }) {
  const isAr = lang === "ar";
  const items = [
    { title: t.provideMt5, desc: t.mt5Desc },
    { title: t.lpTestCreds, desc: t.lpCredsDesc },
    { title: t.coreTeam, desc: t.coreTeamDesc },
  ];

  return (
    <div
      className="p-4 rounded-2xl"
      style={{
        border: `1px solid ${BORDER}`,
        boxShadow: "0 8px 24px rgba(2,6,23,0.03)",
        background: "#fff",
      }}
    >
      <div
        className="text-lg font-semibold mb-3"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        {t.executiveBriefingTitle}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-white"
            style={{
              border: `1px solid ${BORDER}`,
              textAlign: isAr ? "right" : "left",
            }}
          >
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-gray-600 mt-2">{it.desc}</div>
            <div className="mt-4 text-sm text-gray-700">
              {t.executiveBriefingNote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================
   Conclusion
   ============================ */
function ConclusionBlock({ t, lang }) {
  const isAr = lang === "ar";
  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        border: `1px solid ${BORDER}`,
        boxShadow: "0 8px 30px rgba(2,6,23,0.02)",
      }}
    >
      <div
        className="text-lg font-semibold mb-2"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        {t.conclusionTitle}
      </div>
      <div
        className="text-sm text-gray-700 leading-relaxed"
        style={{ textAlign: isAr ? "right" : "left" }}
      >
        {t.conclusionText}
      </div>
    </div>
  );
}

/* ============================
   App (main) - includes language switch
   ============================ */
export default function App() {
  const [lang, setLang] = useState("en"); // 'en' or 'ar'
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // favicon & title
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "/supremefx-logo.png";
    document.title = t.siteTitle;

    // set dir and lang for the document
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, t.siteTitle]);

  const isAr = lang === "ar";

  return (
    <div
      className="min-h-screen bg-white text-[#0f172a]"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial",
        WebkitFontSmoothing: "antialiased",
        direction: isAr ? "rtl" : "ltr",
      }}
    >
      <GlobalTypography lang={lang} />

      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: BORDER }}>
        <div
          className={`${MAX_WIDTH} mx-auto px-6 py-4 flex items-center justify-between`}
          style={{ flexDirection: isAr ? "row-reverse" : "row" }}
        >
          <div className="flex items-center">
            <HeaderLogo lang={lang} />
          </div>

          {/* Language switch */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded ${
                lang === "en" ? "bg-gray-100" : "bg-white"
              } border`}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`px-3 py-1 rounded ${
                lang === "ar" ? "bg-gray-100" : "bg-white"
              } border`}
              aria-pressed={lang === "ar"}
            >
              العربية
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main>
        <StrategyHero t={t} lang={lang} />
        <WhyThisMatters t={t} lang={lang} />

        <div
          className={`${MAX_WIDTH} mx-auto px-6 pb-20 space-y-12`}
          style={{ textAlign: isAr ? "right" : "left" }}
        >
          {/* Core cards */}
          <section className="mt-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              <ExpandCard
                idSuffix="exposure"
                title={isAr ? "مراقبة التعرض" : "Exposure Oversight"}
                left={
                  isAr
                    ? "تجميع التعرض لكل رمز وعميل، مع عتبات وتحوّطات دقيقة."
                    : "Per-symbol and per-client aggregated exposure with thresholds and micro-hedges."
                }
                right={{
                  initial: "+5%",
                  potential: isAr ? "+18–25%" : "+18–25%",
                }}
                bullets={[
                  isAr
                    ? "تجميعات التعرض الصافية - عرض حسب الرمز والعميل"
                    : "Net exposure rollups, symbol & client views",
                  isAr
                    ? "عتبات قابلة للتكوين والتحوّط التلقائي"
                    : "Configurable thresholds and auto-hedges",
                  isAr
                    ? "سجل تدقيق لكل إجراء وسجلات جاهزة للتحليل"
                    : "Audit trail for every action and RCA-ready logs",
                ]}
                variant="slate"
                lang={lang}
              />
              <ExpandCard
                idSuffix="marketmaking"
                title={
                  isAr
                    ? "تسعير السوق — محرك الربح"
                    : "Market Making — Profit Engine"
                }
                left={
                  isAr
                    ? "تسعير ديناميكي والتحكم بالمخزون لالتقاط الفروق مع الحد من مخاطر الدلتا."
                    : "Dynamic quoting and inventory control to capture spreads while limiting delta risk."
                }
                right={{
                  initial: "+7%",
                  potential: isAr ? "+22–30%" : "+22–30%",
                }}
                bullets={[
                  isAr
                    ? "محاكاة في حسابات اختبار قبل التنفيذ المباشر"
                    : "Test-account simulations before live execution",
                  isAr
                    ? "تحسين التسعير عبر حلقات تغذية P&L"
                    : "Quote tuning via P&L feedback loop",
                  isAr
                    ? "إعادة توازن المخزون وتحوّطات مستهدفة"
                    : "Inventory rebalancing and targeted hedges",
                ]}
                variant="soft"
                lang={lang}
              />
              <ExpandCard
                idSuffix="routing"
                title={
                  isAr ? "تصنيف العملاء والتوجيه" : "Client Profiling & Routing"
                }
                left={
                  isAr
                    ? "تقييم سلوك العملاء وتوجيه انتقائي لحماية السجل من التدفقات السامة."
                    : "Behavioral scoring and selective routing to protect the book from toxic flows."
                }
                right={{
                  initial: "-10%",
                  potential: isAr ? "-35–45%" : "-35–45%",
                }}
                bullets={[
                  isAr
                    ? "تصنيف حسب التأخير والتكرار والحجم"
                    : "Latency, frequency & size profiling",
                  isAr
                    ? "توجيه انتقائي اعتمادًا على الدرجة وحالة المزود"
                    : "Selective routing based on score and LP health",
                  isAr
                    ? "تمييز ومراجعة يدوية عند الحاجة"
                    : "Flagging and human review workflow",
                ]}
                variant="white"
                lang={lang}
              />
            </div>
          </section>

          {/* Dashboard */}
          <section id="dashboard">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {isAr
                  ? "معاينة لوحة القيادة — المراقبة والتحكم"
                  : "Dashboard Preview — Monitoring & Control"}
              </h3>
              <div className="text-sm text-gray-500">
                {isAr
                  ? "لوحة مركزة للمراقبة والتنبيهات والإجراءات."
                  : "A compact control plane for monitoring, alerts and actions."}
              </div>
            </div>
            <DashboardPreview t={t} lang={lang} />
          </section>

          {/* Technology comparison */}
          <section>
            <TechnologyComparison t={t} lang={lang} />
          </section>

          {/* Integration checklist */}
          <section>
            <div className="mb-3">
              <h4 className="text-lg font-semibold">
                {isAr ? "قائمة التكامل" : t.integrationChecklistTitle}
              </h4>
              <div className="text-sm text-gray-500">
                {isAr
                  ? "عناصر تنفيذية لتمكين التكامل والاختبار"
                  : t.integrationNote}
              </div>
            </div>
            <IntegrationChecklist t={t} lang={lang} />
          </section>

          {/* Implementation requirements */}
          <section>
            <div className="mb-3">
              <h4 className="text-lg font-semibold">
                {isAr ? "متطلبات التنفيذ" : t.implementationRequirementsTitle}
              </h4>
              <div className="text-sm text-gray-500">
                {isAr ? "أولويات تشغيلية لطرح مستقر" : t.implementationNote}
              </div>
            </div>
            <ImplementationRequirements t={t} lang={lang} />
          </section>

          {/* Hosting & setup */}
          <section>
            <HostingSetup t={t} lang={lang} />
          </section>

          {/* Roadmap */}
          <section>
            <div className="mb-3">
              <h4 className="text-lg font-semibold">{t.timelineTitle}</h4>
              <div className="text-sm text-gray-500">{t.timelineDesc}</div>
            </div>
            <RoadmapTimeline t={t} lang={lang} />
          </section>

          {/* Impact */}
          <section>
            <ImpactComparison t={t} lang={lang} />
          </section>

          {/* Executive briefing */}
          <section>
            <ExecutiveBriefing t={t} lang={lang} />
          </section>

          {/* Conclusion */}
          <section>
            <ConclusionBlock t={t} lang={lang} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-xs text-gray-500 border-t"
        style={{ borderColor: BORDER }}
      >
        <div
          className={`${MAX_WIDTH} mx-auto px-6 flex items-center justify-between`}
          style={{ flexDirection: isAr ? "row-reverse" : "row" }}
        >
          <div>
            {isAr
              ? "سوبريم إف إكس — استراتيجية إدارة المخاطر والأتمتة"
              : "SupremeFX — Risk Management & Automation Strategy"}
          </div>
          <div>
            {isAr ? `${t.preparedBy}: ` : `${t.preparedBy}: `}
            <strong>Mohamed Haris</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
