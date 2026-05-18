import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

import CreateLeadModal from "../components/leads/CreateLeadModal";

import EditLeadModal from "../components/leads/EditLeadModal";

import {
  getLeads,
  exportLeadsCSV,
  deleteLead,
} from "../api/leadApi";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const LeadsPage = () => {

  const navigate =
    useNavigate();

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [sort, setSort] =
    useState("latest");

  const [showModal, setShowModal] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(
      null
    );

  // Debounced Search
  useEffect(() => {

    const timer =
      setTimeout(() => {

        setDebouncedSearch(
          search
        );

      }, 400);

    return () =>
      clearTimeout(timer);

  }, [search]);

  // Fetch Leads
  useEffect(() => {

    fetchLeads();

  }, [
    debouncedSearch,
    status,
    source,
    sort,
    currentPage,
  ]);

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const data =
        await getLeads(
          debouncedSearch,
          status,
          source,
          sort,
          currentPage
        );

      setLeads(data.leads);

      setTotalPages(
        data.totalPages
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch leads"
      );

    } finally {

      setLoading(false);

    }
  };

  // Export CSV
  const handleExportCSV =
    async () => {

      try {

        const data =
          await exportLeadsCSV();

        const url =
          window.URL.createObjectURL(
            new Blob([data])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.setAttribute(
          "download",
          "leads.csv"
        );

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();

        toast.success(
          "CSV exported successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to export CSV"
        );
      }
    };

  // Delete Lead
  const handleDeleteLead =
    async (id: string) => {

      const confirmDelete =
        window.confirm(
          "Delete this lead?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteLead(id);

        toast.success(
          "Lead deleted successfully"
        );

        fetchLeads();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to delete lead"
        );
      }
    };

  // Loading State
  if (loading) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[60vh]">

          <div className="dark:text-white text-slate-900 text-2xl font-semibold animate-pulse">

            Loading Leads...

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold !text-slate-900 dark:!text-white">

            Leads Management

          </h1>

          <p className="dark:text-slate-400 text-slate-600 mt-2">

            Manage and monitor all leads.

          </p>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={
              handleExportCSV
            }
            className="dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 transition px-6 py-3 rounded-xl font-semibold dark:text-white text-slate-900"
          >
            Export CSV
          </button>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold text-white"
          >
            + Add Lead
          </button>

        </div>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {

            setSearch(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-xl px-4 py-3 outline-none focus:border-blue-500 dark:text-white text-slate-900"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => {

            setStatus(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-xl px-4 py-3 outline-none focus:border-blue-500 dark:text-white text-slate-900"
        >

          <option value="">
            All Status
          </option>

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

        {/* Source */}
        <select
          value={source}
          onChange={(e) => {

            setSource(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-xl px-4 py-3 outline-none focus:border-blue-500 dark:text-white text-slate-900"
        >

          <option value="">
            All Sources
          </option>

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

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => {

            setSort(
              e.target.value
            );

            setCurrentPage(1);

          }}
          className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-xl px-4 py-3 outline-none focus:border-blue-500 dark:text-white text-slate-900"
        >

          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

        </select>

      </div>

      {/* Table */}
      <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl overflow-hidden shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="dark:bg-slate-800 bg-slate-200">

              <tr>

                <th className="text-left px-6 py-4 dark:text-white text-slate-900">
                  Name
                </th>

                <th className="text-left px-6 py-4 dark:text-white text-slate-900">
                  Email
                </th>

                <th className="text-left px-6 py-4 dark:text-white text-slate-900">
                  Status
                </th>

                <th className="text-left px-6 py-4 dark:text-white text-slate-900">
                  Source
                </th>

                <th className="text-left px-6 py-4 dark:text-white text-slate-900">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-10 dark:text-slate-400 text-slate-600"
                  >
                    No leads found
                  </td>

                </tr>

              ) : (

                leads.map((lead) => (

                  <tr
                    key={lead._id}
                    onClick={() =>
                      navigate(
                        `/leads/${lead._id}`
                      )
                    }
                    className="border-t dark:border-slate-800 border-slate-300 dark:hover:bg-slate-800/40 hover:bg-slate-100 cursor-pointer transition"
                  >

                    <td className="px-6 py-4 font-medium dark:text-white text-slate-900">
                      {lead.name}
                    </td>

                    <td className="px-6 py-4 dark:text-slate-300 text-slate-700">
                      {lead.email}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
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

                    </td>

                    <td className="px-6 py-4 capitalize dark:text-slate-300 text-slate-700">
                      {lead.source}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            setSelectedLead(
                              lead
                            );

                            setShowEditModal(
                              true
                            );

                          }}
                          className="bg-orange-500 hover:bg-orange-400 transition px-4 py-2 rounded-lg text-sm text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            handleDeleteLead(
                              lead._id
                            );

                          }}
                          className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-lg text-sm text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
          className="dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 px-5 py-2 rounded-lg disabled:opacity-40 dark:text-white text-slate-900"
        >
          Previous
        </button>

        <span className="dark:text-slate-300 text-slate-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
          className="dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 px-5 py-2 rounded-lg disabled:opacity-40 dark:text-white text-slate-900"
        >
          Next
        </button>

      </div>

      {/* Create Modal */}
      {showModal && (

        <CreateLeadModal
          onClose={() =>
            setShowModal(false)
          }
          onLeadCreated={
            fetchLeads
          }
        />
      )}

      {/* Edit Modal */}
      {
        showEditModal &&
        selectedLead && (

          <EditLeadModal
            lead={selectedLead}
            onClose={() =>
              setShowEditModal(false)
            }
            onLeadUpdated={
              fetchLeads
            }
          />
        )
      }

    </DashboardLayout>
  );
};

export default LeadsPage;