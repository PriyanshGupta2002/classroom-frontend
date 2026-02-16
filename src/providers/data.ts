import { BACKEND_BASE_URL } from "@/constants";
import { CreateResponse, GetOneResponse, ListResponse } from "@/types";
import { DataProvider } from "@refinedev/core";
import axios from "axios";

if (!BACKEND_BASE_URL) {
  throw new Error(
    "BACKEND_BASE_URL is not configured. Please set VITE_BACKEND_URL in your .env file",
  );
}

// Create axios instance with credentials
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true, // This sends cookies
});

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    const page = pagination?.current ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    const params: Record<string, string | number> = { page, limit: pageSize };

    filters?.forEach((filter) => {
      const field = "field" in filter ? filter.field : "";
      const value = String(filter.value);

      if (resource === "subjects") {
        if (field === "department") params.department = value;
        if (field === "name" || field === "code") {
          params.search = value;
        }
      }
      if (resource === "classes") {
        if (field === "teacher") params.teacher = value;
        if (field === "subject") params.subject = value;
        if (field === "name" || field === "code") {
          params.search = value;
        }
      }
    });

    const { data } = await axiosInstance.get<ListResponse>(resource, {
      params,
    });

    return {
      data: data.data ?? [],
      total: data?.pagination?.total ?? data.data?.length ?? 0,
    };
  },

  create: async ({ resource, variables }) => {
    const { data } = await axiosInstance.post<CreateResponse>(
      resource,
      variables,
    );
    return {
      data: data.data,
    };
  },

  getOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.get<GetOneResponse>(
      `${resource}/${id}`,
    );
    return {
      data: data.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const { data } = await axiosInstance.patch(`${resource}/${id}`, variables);
    return {
      data: data.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const { data } = await axiosInstance.delete(`${resource}/${id}`);
    return {
      data: data.data,
    };
  },

  getApiUrl: () => BACKEND_BASE_URL,
};
