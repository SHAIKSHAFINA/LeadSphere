import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
    "/leads",
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
    "/leads",
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
    `/leads/${id}`,
    leadData
  );

  return response.data;
};

export const getLeadStats =
  async () => {
    const response = await API.get(
      "/leads/stats"
    );

    return response.data;
  };
  export const exportLeadsCSV =
  async () => {

    const response =
      await API.get(
        "/leads/export/csv",
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
        `/leads/${id}`
      );

    return response.data;
  };
  export const getSingleLead =
  async (id: string) => {

    const response =
      await API.get(
        `/leads/${id}`
      );

    return response.data;
  };