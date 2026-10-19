import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, BriefcaseBusiness, IndianRupee, CalendarDays, ArrowUpRight } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Campaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  async function load() {
    try {
      const [c, a] = await Promise.all([API.get("/campaigns"), API.get("/applications")]);
      setCampaigns(c.data); setApplications(a.data);
    } catch { setError("Could not load campaigns. Confirm the backend is running on port 5000."); }
  }
  useEffect(() => { load(); }, []);

  const filtered = campaigns.filter(c => `${c.title} ${c.description}`.toLowerCase().includes(search.toLowerCase()));
  const appliedIds = new Set(applications.filter(a => String(a.influencerId?._id || a.influencerId) === String(user?.id)).map(a => String(a.campaignId?._id || a.campaignId)));

  async function apply(campaignId) {
    setMessage(""); setError(""); setBusyId(campaignId);
    try {
      await API.post("/applications", { campaignId, influencerId: user.id });
      setMessage("Application submitted successfully.");
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit application.");
    } finally { setBusyId(""); }
  }

  return <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-violet-600">Discover</p><h1 className="mt-2 text-3xl font-black text-slate-950">{user?.role==="brand" ? "Campaign directory" : "Explore campaigns"}</h1><p className="mt-2 text-slate-500">{user?.role==="brand" ? "See the campaigns available in your workspace." : "Find a brief that fits your audience and creative style."}</p></div><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:w-72"><Search size={18} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search campaigns..." className="w-full bg-transparent text-sm outline-none"/></div></div>
    {message && <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}{error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    <div className="mt-7 flex items-center justify-between text-sm text-slate-500"><span>{filtered.length} campaign{filtered.length===1?"":"s"} found</span><span className="flex items-center gap-2"><SlidersHorizontal size={16}/> Search by title or description</span></div>
    <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map(c => <article key={c._id} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-700"><BriefcaseBusiness size={21}/></span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Open</span></div><h2 className="mt-5 text-lg font-extrabold text-slate-900">{c.title}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{c.description}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div><p className="text-xs text-slate-400">Campaign budget</p><p className="mt-1 flex items-center gap-1 font-black text-slate-900"><IndianRupee size={16}/>{Number(c.budget||0).toLocaleString("en-IN")}</p></div><div className="text-right"><p className="text-xs text-slate-400">Posted by</p><p className="mt-1 max-w-28 truncate text-sm font-semibold text-slate-700">{c.createdBy?.name || "Brand"}</p></div></div>
      {user?.role==="influencer" && <button disabled={appliedIds.has(String(c._id))||busyId===c._id} onClick={()=>apply(c._id)} className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">{busyId===c._id?"Submitting...":appliedIds.has(String(c._id))?"Already applied":"Apply to campaign"} <ArrowUpRight size={16}/></button>}
    </article>)}</div>
    {filtered.length===0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center"><BriefcaseBusiness className="mx-auto text-slate-300" size={32}/><p className="mt-3 font-bold text-slate-800">No matching campaigns</p><p className="mt-1 text-sm text-slate-500">Try another search term.</p></div>}
  </div>;
}