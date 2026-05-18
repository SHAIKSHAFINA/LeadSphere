import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getSingleLead
} from "../api/leadApi";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

const LeadDetailsPage = () => {

  const { id } = useParams();

  const [lead, setLead] =
    useState<Lead | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchLead();

  }, []);

  const fetchLead = async () => {

    try {

      const data =
        await getSingleLead(
          id as string
        );

      setLead(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // Loading State
  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[60vh]">

          <div className="text-2xl animate-pulse dark:text-white text-slate-900">

            Loading Lead...

          </div>

        </div>

      </DashboardLayout>
    );
  }

  // Lead Not Found
  if (!lead) {

    return (

      <DashboardLayout>

        <div className="text-center text-red-500 text-xl">

          Lead not found

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900">

              Lead Details

            </h1>

            <p className="dark:text-slate-400 text-slate-600 mt-2">

              View lead information

            </p>

          </div>

          {/* Back Button */}
          <Link
            to="/leads"
            className="dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 transition px-5 py-3 rounded-xl dark:text-white text-slate-900 text-center"
          >

            Back

          </Link>

        </div>

        {/* Card */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">

          {/* Name */}
          <div>

            <p className="dark:text-slate-400 text-slate-600 text-sm mb-2">

              Name

            </p>

            <h2 className="text-2xl font-semibold dark:text-white text-slate-900">

              {lead.name}

            </h2>

          </div>

          {/* Email */}
          <div>

            <p className="dark:text-slate-400 text-slate-600 text-sm mb-2">

              Email

            </p>

            <h2 className="text-xl dark:text-white text-slate-900 break-all">

              {lead.email}

            </h2>

          </div>

          {/* Status */}
          <div>

            <p className="dark:text-slate-400 text-slate-600 text-sm mb-2">

              Status

            </p>

            <span
              className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                lead.status ===
                "qualified"
                  ? "bg-emerald-600"
                  : lead.status ===
                    "lost"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
            >

              {lead.status}

            </span>

          </div>

          {/* Source */}
          <div>

            <p className="dark:text-slate-400 text-slate-600 text-sm mb-2">

              Source

            </p>

            <h2 className="text-xl capitalize dark:text-white text-slate-900">

              {lead.source}

            </h2>

          </div>

          {/* Created At */}
          <div>

            <p className="dark:text-slate-400 text-slate-600 text-sm mb-2">

              Created At

            </p>

            <h2 className="text-xl dark:text-white text-slate-900">

              {new Date(
                lead.createdAt
              ).toLocaleString()}

            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default LeadDetailsPage;