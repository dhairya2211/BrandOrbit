import { ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, Instagram, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const features = [
  { icon: BriefcaseBusiness, title: "Campaigns made simple", text: "Create clear briefs, budgets and timelines in one organized workspace." },
  { icon: Users, title: "The right creator fit", text: "Bring brands and influencers together around shared goals and audiences." },
  { icon: BarChart3, title: "Track every application", text: "Keep applications and campaign activity easy to follow." },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <BrandLogo />
        <div className="flex items-center gap-3"><Link to="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-violet-700">Log in</Link><Link to="/register" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700">Get started <ArrowRight className="ml-1 inline" size={16} /></Link></div>
      </nav>
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700"><Sparkles size={14} /> THE CREATOR COLLABORATION PLATFORM</div>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Good partnerships make <span className="text-violet-600">great brands.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">BrandOrbit helps brands launch campaigns and helps creators discover opportunities that fit their style.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/register" className="rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">Start collaborating <ArrowRight className="ml-2 inline" size={17} /></Link><Link to="/login" className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:bg-slate-50">Explore workspace</Link></div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500"><span className="flex items-center gap-2"><BadgeCheck size={17} className="text-emerald-500" /> Simple campaign workflow</span><span className="flex items-center gap-2"><Zap size={17} className="text-amber-500" /> Built for collaboration</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-5 -top-6 h-32 w-32 rounded-full bg-fuchsia-200/60 blur-2xl" />
          <div className="relative rounded-[2rem] border border-slate-100 bg-white p-4 shadow-2xl shadow-violet-100 sm:p-6">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-6 text-white sm:p-8"><div className="flex items-center justify-between"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Campaign spotlight</span><Instagram size={22} /></div><p className="mt-8 text-sm text-violet-100">Featured opportunity</p><h2 className="mt-2 text-2xl font-extrabold">Everyday Style Edit</h2><p className="mt-2 max-w-xs text-sm leading-6 text-indigo-100">Create authentic content for a new generation of style lovers.</p><div className="mt-6 flex items-end justify-between"><div><p className="text-xs text-indigo-100">Campaign budget</p><p className="mt-1 text-2xl font-bold">₹10,000</p></div><span className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-violet-700">View campaign ↗</span></div></div>
            <div className="grid grid-cols-3 gap-3 p-3 pt-5 sm:gap-4"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Campaigns</p><p className="mt-1 text-2xl font-black text-slate-900">24</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Creators</p><p className="mt-1 text-2xl font-black text-slate-900">1.2k</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Matches</p><p className="mt-1 text-2xl font-black text-slate-900">86%</p></div></div>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f8fd] px-5 py-16 sm:py-20"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-violet-600">One orbit. More possibilities.</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Everything you need to work better together.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Icon size={23} /></div><h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></article>)}</div></div></section>
      <footer className="flex flex-col items-center justify-between gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:px-10"><BrandLogo /><p>© {new Date().getFullYear()} BrandOrbit. Built for better collaborations.</p></footer>
    </div>
  );
}