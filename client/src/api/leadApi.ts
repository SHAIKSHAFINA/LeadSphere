import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export const getLeads = async (
  search = "",
  status = "",
  source = "",
  sort = "latest",
  page = 1
) => {

  const response = await API.get(
    "/api/leads",
    {
      params: {
        search,
        status,
        source,
        sort,
        page,
        limit: 10,
      },
    }
  );

  return response.data;
};

export const createLead = async (
  leadData: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {

  const response = await API.post(
    "/api/leads",
    leadData
  );

  return response.data;
};

export const updateLead = async (
  id: string,
  leadData: {
    name: string;
    email: string;
    status: string;
    source: string;
  }
) => {

  const response = await API.put(
    `/api/leads/${id}`,
    leadData
  );

  return response.data;
};

export const getLeadStats =
  async () => {

    const response = await API.get(
      "/api/leads/stats"
    );

    return response.data;
  };

export const exportLeadsCSV =
  async () => {

    const response =
      await API.get(
        "/api/leads/export/csv",
        {
          responseType: "blob",
        }
      );

    return response.data;
  };

export const deleteLead =
  async (id: string) => {

    const response =
      await API.delete(
        `/api/leads/${id}`
      );

    return response.data;
  };

export const getSingleLead =
  async (id: string) => {

    const response =
      await API.get(
        `/api/leads/${id}`
      );

    return response.data;
  };

export default API;