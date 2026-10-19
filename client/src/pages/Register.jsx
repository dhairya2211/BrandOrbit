import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, LockKeyhole, Mail, UserRound } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "influencer" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault(); setError(""); setSuccess("");
    try {
      await register(form);
      setSuccess("Account created successfully. You can now sign in.");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Check your backend server.");
    }
  }

  return <div className="grid min-h-screen bg-white lg:grid-cols-2">
    <div className="hidden flex-col justify-between bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700 p-12 text-white lg:flex"><BrandLogo light /><div className="max-w-lg"><p className="text-sm font-bold uppercase tracking-[.2em] text-violet-200">Make your next move</p><h1 className="mt-4 text-5xl font-black leading-tight">Good work happens when the right people connect.</h1><p className="mt-5 leading-7 text-indigo-100">Join a workspace designed for meaningful brand and creator partnerships.</p></div><p className="text-sm text-indigo-200">Create your orbit today.</p></div>
    <div className="flex items-center justify-center px-5 py-10"><div className="w-full max-w-md"><Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-700"><ArrowLeft size={16} /> Back to home</Link><div className="mb-7 lg:hidden"><BrandLogo /></div><p className="text-sm font-bold uppercase tracking-[.16em] text-violet-600">Get started for free</p><h2 className="mt-2 text-3xl font-black text-slate-950">Create your account</h2><p className="mt-2 text-slate-500">Choose how you want to use BrandOrbit.</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">{error && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}{success && <div role="status" className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Full name</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><UserRound size={18} className="text-slate-400" /><input required name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your name" className="w-full py-3 outline-none" /></span></label>
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Email address</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><Mail size={18} className="text-slate-400" /><input required type="email" name="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" className="w-full py-3 outline-none" /></span></label>
        <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Password</span><span className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-50"><LockKeyhole size={18} className="text-slate-400" /><input required minLength={6} type="password" name="password" value={form.password} onChange={update} autoComplete="new-password" placeholder="At least 6 characters" className="w-full py-3 outline-none" /></span></label>
        <div><span className="mb-2 block text-sm font-bold text-slate-700">I am joining as a...</span><div className="grid grid-cols-2 gap-3"><button type="button" onClick={()=>setForm({...form,role:"influencer"})} className={`rounded-xl border p-4 text-left transition ${form.role==="influencer"?"border-violet-500 bg-violet-50 ring-2 ring-violet-100":"border-slate-200 hover:border-slate-300"}`}><UserRound className={form.role==="influencer"?"text-violet-700":"text-slate-400"} size={20}/><p className="mt-2 font-bold text-slate-800">Influencer</p><p className="mt-1 text-xs text-slate-500">Discover campaigns</p></button><button type="button" onClick={()=>setForm({...form,role:"brand"})} className={`rounded-xl border p-4 text-left transition ${form.role==="brand"?"border-violet-500 bg-violet-50 ring-2 ring-violet-100":"border-slate-200 hover:border-slate-300"}`}><Building2 className={form.role==="brand"?"text-violet-700":"text-slate-400"} size={20}/><p className="mt-2 font-bold text-slate-800">Brand</p><p className="mt-1 text-xs text-slate-500">Create campaigns</p></button></div></div>
        <button disabled={loading} className="w-full rounded-xl bg-violet-600 py-3.5 font-bold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700 disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button></form><p className="mt-5 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-violet-700 hover:text-violet-900">Sign in</Link></p>
    </div></div>
  </div>;
}