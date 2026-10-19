import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, IndianRupee, Megaphone } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CreateCampaign() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", budget: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await API.post("/campaigns", { ...form, budget: Number(form.budget), createdBy: user.id });
      navigate("/campaigns");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create campaign. Check the backend.");
    } finally { setLoading(false); }
  }

  return <div className="mx-auto max-w-3xl"><Link to="/campaigns" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-700"><ArrowLeft size={16}/> Back to campaigns</Link><div className="mt-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-9"><span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-50 text-violet-700"><Megaphone size={23}/></span><h1 className="mt-5 text-3xl font-black text-slate-950">Create a campaign</h1><p className="mt-2 text-slate-500">Share your brief and invite creators to collaborate.</p>
    <form onSubmit={submit} className="mt-8 space-y-5">{error&&<p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}<label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Campaign title</span><input required maxLength={100} name="title" value={form.title} onChange={update} placeholder="e.g. Summer skincare launch" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-50"/></label><label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Description and requirements</span><textarea required rows={5} maxLength={1500} name="description" value={form.description} onChange={update} placeholder="Describe the product, content needed and ideal creator..." className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-50"/></label><label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Budget (INR)</span><span className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><IndianRupee size={18} className="text-slate-400"/><input required type="number" min="1" name="budget" value={form.budget} onChange={update} placeholder="10000" className="w-full py-3 outline-none"/></span></label><button disabled={loading} className="w-full rounded-xl bg-violet-600 py-3.5 font-bold text-white hover:bg-violet-700 disabled:opacity-60">{loading?"Publishing...":"Publish campaign"}</button></form>
  </div></div>;
}