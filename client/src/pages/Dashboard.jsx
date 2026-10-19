import { useEffect, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, ClipboardList, Compass, Plus, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function StatCard({ icon: Icon, label, value, hint }) {
  return <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-700"><Icon size={21}/></span><TrendingUp size={17} className="text-emerald-500"/></div><p className="mt-5 text-sm font-medium text-slate-500">{label}</p><p className="mt-1 text-3xl font-black text-slate-900">{value}</p><p className="mt-2 text-xs text-slate-400">{hint}</p></div>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const isBrand = user?.role === "brand";
  const [campaigns, setCampaigns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([API.get("/campaigns"), API.get("/applications")])
      .then(([c, a]) => { if (active) { setCampaigns(c.data); setApplications(a.data); } })
      .catch(() => { if (active) setError("Could not load live statistics. Make sure the backend is running."); });
    return () => { active = false; };
  }, []);

  const visibleCampaigns = isBrand ? campaigns.filter(c => String(c.createdBy?._id || c.createdBy) === String(user?.id)) : campaigns;
  const visibleApplications = isBrand ? applications.filter(a => visibleCampaigns.some(c => String(c._id) === String(a.campaignId?._id || a.campaignId))) : applications.filter(a => String(a.influencerId?._id || a.influencerId) === String(user?.id));

  return <div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-violet-600">MONDAY, YOUR WAY</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Welcome back, {user?.name?.split(" ")[0] || "there"} 👋</h1><p className="mt-2 text-slate-500">{isBrand ? "Here’s what’s happening with your brand campaigns." : "Find your next collaboration and keep your applications moving."}</p></div><Link to={isBrand ? "/campaigns/new" : "/campaigns"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-100 hover:bg-violet-700">{isBrand ? <Plus size={17}/> : <Compass size={17}/>} {isBrand ? "Create campaign" : "Explore campaigns"}</Link></div>
    {error && <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</p>}
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><StatCard icon={BriefcaseBusiness} label={isBrand ? "Your campaigns" : "Available campaigns"} value={visibleCampaigns.length} hint={isBrand ? "Campaigns created by you" : "Opportunities to explore"}/><StatCard icon={ClipboardList} label={isBrand ? "Applications received" : "Your applications"} value={visibleApplications.length} hint="Based on current records"/><StatCard icon={Users} label="Your account" value={isBrand ? "Brand" : "Creator"} hint="Your workspace role"/></div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]"><section className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-extrabold text-slate-900">Recent campaigns</h2><p className="mt-1 text-sm text-slate-500">Latest opportunities in BrandOrbit</p></div><Link to="/campaigns" className="text-sm font-bold text-violet-700">View all <ArrowUpRight className="inline" size={15}/></Link></div>
      <div className="mt-5 space-y-3">{visibleCampaigns.slice(0,4).map(c => <div key={c._id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-700"><BriefcaseBusiness size={19}/></div><div className="min-w-0 flex-1"><p className="truncate font-bold text-slate-800">{c.title}</p><p className="mt-1 truncate text-xs text-slate-500">{c.description}</p></div><span className="whitespace-nowrap text-sm font-extrabold text-slate-900">₹{Number(c.budget || 0).toLocaleString("en-IN")}</span></div>)}
      {visibleCampaigns.length===0 && <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center"><BriefcaseBusiness className="mx-auto text-slate-300" size={28}/><p className="mt-3 font-bold text-slate-700">No campaigns yet</p><p className="mt-1 text-sm text-slate-500">Campaigns will appear here once available.</p></div>}</div></section>
      <section className="rounded-2xl bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-6 text-white"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15"><Sparkles size={22}/></span><h2 className="mt-5 text-xl font-black">Make your next move count.</h2><p className="mt-2 text-sm leading-6 text-indigo-100">{isBrand ? "Launch a campaign and find creators who can tell your story." : "Explore available campaigns and apply to the ones that match your style."}</p><Link to={isBrand ? "/campaigns/new" : "/campaigns"} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-violet-700">{isBrand ? "Launch a campaign" : "Find opportunities"} <ArrowUpRight size={16}/></Link></section>
    </div>
  </div>;
}