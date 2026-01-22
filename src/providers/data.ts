// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
import { subjectsMock } from "@/lib/utils";
import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }
    return {
      data: subjectsMock as unknown as TData[],
      total: subjectsMock.length,
    };
  },
  getOne: async () => {
    throw new Error("This function does is not present in mock");
  },
  create: async () => {
    throw new Error("This function does is not present in mock");
  },
  update: async () => {
    throw new Error("This function does is not present in mock");
  },
  deleteOne: async () => {
    throw new Error("This function does is not present in mock");
  },
  getApiUrl: () => {
    return "";
  },
};
