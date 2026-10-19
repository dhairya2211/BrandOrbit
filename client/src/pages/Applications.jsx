import { useEffect, useState } from "react";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  LoaderCircle,
} from "lucide-react";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Applications() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch applications from the backend
  async function loadApplications() {
    try {
      const response = await API.get("/applications");
      setItems(response.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load applications. Check the backend."
      );
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  const isBrand = user?.role === "brand";

  // Show only relevant applications
  const visible = items.filter((application) => {
    if (isBrand) {
      const campaignOwner =
        application.campaignId?.createdBy?._id ||
        application.campaignId?.createdBy;

      return String(campaignOwner) === String(user?.id);
    }

    const influencerId =
      application.influencerId?._id ||
      application.influencerId;

    return String(influencerId) === String(user?.id);
  });

  // Approve or reject an application
  async function updateStatus(applicationId, status) {
    setUpdatingId(applicationId);
    setError("");
    setMessage("");

    try {
      const response = await API.patch(
        `/applications/${applicationId}/status`,
        { status }
      );

      setItems((previousItems) =>
        previousItems.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: response.data.application.status,
              }
            : application
        )
      );

      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  // Status badge
  function StatusBadge({ status }) {
    const styles = {
      Pending: "bg-amber-50 text-amber-700",
      Approved: "bg-emerald-50 text-emerald-700",
      Rejected: "bg-red-50 text-red-700",
    };

    const icons = {
      Pending: Clock3,
      Approved: CheckCircle2,
      Rejected: XCircle,
    };

    const Icon = icons[status] || Clock3;

    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
          styles[status] || styles.Pending
        }`}
      >
        <Icon size={14} />
        {status || "Pending"}
      </span>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-bold uppercase tracking-[.16em] text-violet-600">
        Campaign activity
      </p>

      <h1 className="mt-2 text-3xl font-black text-slate-950">
        {isBrand ? "Applications received" : "My applications"}
      </h1>

      <p className="mt-2 text-slate-500">
        {isBrand
          ? "Review creators who have applied to your campaigns."
          : "Keep track of your campaign applications."}
      </p>

      {/* Success message */}
      {message && (
        <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Application list */}
      <div className="mt-7 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-extrabold text-slate-900">
            Application list

            <span className="ml-2 rounded-full bg-violet-50 px-2.5 py-1 text-xs text-violet-700">
              {visible.length}
            </span>
          </h2>
        </div>

        {visible.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {visible.map((application) => {
              const status = application.status || "Pending";

              const applicantName =
                application.influencerId?.name || "Influencer";

              const campaignTitle =
                application.campaignId?.title || "Campaign";

              const isUpdating =
                updatingId === application._id;

              return (
                <div
                  key={application._id}
                  className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center"
                >
                  {/* Application details */}
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                    <ClipboardList size={20} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">
                      {campaignTitle}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Applicant: {applicantName}
                    </p>

                    {application.influencerId?.email && (
                      <p className="mt-1 text-xs text-slate-400">
                        {application.influencerId.email}
                      </p>
                    )}
                  </div>

                  {/* Status and actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={status} />

                    {isBrand && status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              application._id,
                              "Approved"
                            )
                          }
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isUpdating ? (
                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <CheckCircle2 size={16} />
                          )}

                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              application._id,
                              "Rejected"
                            )
                          }
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </>
                    )}

                    {isBrand && status === "Approved" && (
                      <span className="text-xs font-semibold text-emerald-700">
                        Application approved
                      </span>
                    )}

                    {isBrand && status === "Rejected" && (
                      <span className="text-xs font-semibold text-red-600">
                        Application rejected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-16 text-center">
            <ClipboardList
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-bold text-slate-800">
              No applications yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {isBrand
                ? "Creator applications will appear here."
                : "Explore campaigns and apply to get started."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}