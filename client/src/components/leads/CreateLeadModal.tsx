import { useState } from "react";
import toast from "react-hot-toast";

import { createLead } from "../../api/leadApi";

interface CreateLeadModalProps {
  onClose: () => void;
  onLeadCreated: () => void;
}

const CreateLeadModal = ({
  onClose,
  onLeadCreated,
}: CreateLeadModalProps) => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [source, setSource] =
    useState("instagram");

  const [status, setStatus] =
    useState("new");

  const [loading, setLoading] =
    useState(false);

  const handleCreateLead =
    async () => {

      if (
  !name ||
  !email ||
  !source
) {

  toast.error(
    "Please fill all fields"
  );

  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {

  toast.error(
    "Invalid email format"
  );

  return;
}

      try {
        setLoading(true);

        await createLead({
          name,
          email,
          source,
          status,
        });

        toast.success(
            "Lead created successfully"
        );

        onLeadCreated();

        onClose();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to create lead"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Create Lead
            </h2>

            <p className="text-slate-400 mt-1">
              Add a new sales lead.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Lead name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Lead email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {/* Source */}
          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="instagram">
              Instagram
            </option>

            <option value="linkedin">
              LinkedIn
            </option>

            <option value="website">
              Website
            </option>

            <option value="referral">
              Referral
            </option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
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

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 transition rounded-xl py-3 font-semibold text-white"
            >
              Cancel
            </button>

            <button
              onClick={
                handleCreateLead
              }
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 transition rounded-xl py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Lead"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateLeadModal;