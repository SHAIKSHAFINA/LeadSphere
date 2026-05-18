import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getLeadStats } from "../api/leadApi";

interface Stats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
}

const DashboardPage = () => {

  const [stats, setStats] =
    useState<Stats>({
      totalLeads: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      lostLeads: 0,
    });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const data =
        await getLeadStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  };

  // Loading State
  if (
    !stats.totalLeads &&
    !stats.newLeads &&
    !stats.qualifiedLeads &&
    !stats.lostLeads
  ) {

    return (

      <DashboardLayout>

        <div className="flex items-center justify-center h-[60vh]">

          <div className="dark:text-white text-slate-900 text-2xl animate-pulse">

            Loading Dashboard...

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-3xl sm:text-4xl font-bold !text-slate-900 dark:!text-white">

          Dashboard Overview

        </h1>

        <p className="dark:text-slate-400 text-slate-600 mt-2">

          Monitor sales and lead performance.

        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Leads */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600 text-sm">

            Total Leads

          </p>

          <h2 className="text-4xl font-bold mt-4 dark:text-white text-slate-900">

            {stats.totalLeads}

          </h2>

        </div>

        {/* New Leads */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600 text-sm">

            New Leads

          </p>

          <h2 className="text-4xl font-bold mt-4 text-blue-500">

            {stats.newLeads}

          </h2>

        </div>

        {/* Qualified */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600 text-sm">

            Qualified Leads

          </p>

          <h2 className="text-4xl font-bold mt-4 text-emerald-500">

            {stats.qualifiedLeads}

          </h2>

        </div>

        {/* Lost */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600 text-sm">

            Lost Leads

          </p>

          <h2 className="text-4xl font-bold mt-4 text-red-500">

            {stats.lostLeads}

          </h2>

        </div>

      </div>

      {/* Performance Summary */}
      <div className="mt-10 dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-4 sm:p-6 shadow-sm">

        <h2 className="text-2xl font-semibold mb-6 dark:text-white text-slate-900">

          Performance Summary

        </h2>

        <div className="space-y-5">

          {/* Total Leads */}
          <div>

            <div className="flex justify-between mb-2 dark:text-white text-slate-900">

              <span>Total Leads</span>

              <span>

                {stats.totalLeads}

              </span>

            </div>

            <div className="w-full dark:bg-slate-800 bg-slate-200 rounded-full h-3">

              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{
                  width: "100%",
                }}
              />

            </div>

          </div>

          {/* Qualified Leads */}
          <div>

            <div className="flex justify-between mb-2 dark:text-white text-slate-900">

              <span>

                Qualified Leads

              </span>

              <span>

                {stats.qualifiedLeads}

              </span>

            </div>

            <div className="w-full dark:bg-slate-800 bg-slate-200 rounded-full h-3">

              <div
                className="bg-emerald-500 h-3 rounded-full"
                style={{
                  width: `${
                    stats.totalLeads
                      ? (
                          stats.qualifiedLeads /
                          stats.totalLeads
                        ) * 100
                      : 0
                  }%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default DashboardPage;