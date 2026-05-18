import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getLeadStats,
  getLeads,
} from "../api/leadApi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
];

const AnalyticsPage = () => {

  const [stats, setStats] =
    useState({
      totalLeads: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      lostLeads: 0,
    });

  const [sourceData, setSourceData] =
    useState<any[]>([]);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        // Stats
        const statsData =
          await getLeadStats();

        setStats(statsData);

        // Leads
        const leadsData =
          await getLeads();

        const leads =
          leadsData.leads;

        // Count Sources
        const sourceCount: any =
          {};

        leads.forEach(
          (lead: any) => {

            sourceCount[
              lead.source
            ] =
              (sourceCount[
                lead.source
              ] || 0) + 1;

          }
        );

        const formattedSources =
          Object.keys(
            sourceCount
          ).map((key) => ({
            name: key,
            value:
              sourceCount[
                key
              ],
          }));

        setSourceData(
          formattedSources
        );

      } catch (error) {

        console.log(error);

      }
    };

  const statusData = [
    {
      name: "New",
      value: stats.newLeads,
    },
    {
      name: "Qualified",
      value:
        stats.qualifiedLeads,
    },
    {
      name: "Lost",
      value: stats.lostLeads,
    },
  ];

  return (

    <DashboardLayout>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold !text-slate-900 dark:!text-white">

          Analytics

        </h1>

        <p className="dark:text-slate-400 text-slate-600 mt-2">

          Insights and lead performance overview.

        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {/* Total */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600">

            Total Leads

          </p>

          <h2 className="text-4xl font-bold mt-2 dark:text-white text-slate-900">

            {stats.totalLeads}

          </h2>

        </div>

        {/* New */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600">

            New Leads

          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-500">

            {stats.newLeads}

          </h2>

        </div>

        {/* Qualified */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600">

            Qualified

          </p>

          <h2 className="text-4xl font-bold mt-2 text-emerald-500">

            {stats.qualifiedLeads}

          </h2>

        </div>

        {/* Lost */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <p className="dark:text-slate-400 text-slate-600">

            Lost Leads

          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-500">

            {stats.lostLeads}

          </h2>

        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6 dark:text-white text-slate-900">

            Lead Status Distribution

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {statusData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="dark:bg-slate-900 bg-white dark:border-slate-800 border-slate-300 border rounded-2xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6 dark:text-white text-slate-900">

            Lead Sources

          </h2>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={sourceData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AnalyticsPage;