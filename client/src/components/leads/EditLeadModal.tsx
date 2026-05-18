import { useState } from "react";
import toast from "react-hot-toast";
import { updateLead } from "../../api/leadApi";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

interface EditLeadModalProps {
  lead: Lead;
  onClose: () => void;
  onLeadUpdated: () => void;
}

const EditLeadModal = ({
  lead,
  onClose,
  onLeadUpdated,
}: EditLeadModalProps) => {

  const [name, setName] =
    useState(lead.name);

  const [email, setEmail] =
    useState(lead.email);

  const [source, setSource] =
    useState(lead.source);

  const [status, setStatus] =
    useState(lead.status);

  const [loading, setLoading] =
    useState(false);

  const handleUpdateLead =
    async () => {

      try {

        setLoading(true);

        await updateLead(
          lead._id,
          {
            name,
            email,
            source,
            status,
          }
        );

        toast.success(
            "Lead updated successfully"
            );

            onLeadUpdated();

            onClose();

      } catch (error) {

        console.log(error);

        toast.error(
            "Failed to update lead"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Edit Lead
            </h2>

            <p className="text-slate-400 mt-1">
              Update lead details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
          />

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
          >

            <option value="instagram">
              Instagram
            </option>

            <option value="linkedin">
              Linkedin
            </option>

            <option value="website">
              Website
            </option>

            <option value="referral">
              Referral
            </option>

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none"
          >

            <option value="new">
              New
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="lost">
              Lost
            </option>

          </select>

          <div className="flex gap-3 pt-2">

            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 transition rounded-xl py-3 font-semibold text-white"
            >
              Cancel
            </button>

            <button
              onClick={
                handleUpdateLead
              }
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 transition rounded-xl py-3 font-semibold text-white"
            >
              {loading
                ? "Updating..."
                : "Update Lead"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EditLeadModal;