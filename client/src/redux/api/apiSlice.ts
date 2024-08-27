import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
const populateQuery =
  "populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference";
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["strapi"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (studentId) => ({
        url: `students/${studentId}?${populateQuery}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCandidateList: builder.mutation({
      query: (page:number) => ({
        url: `students?${populateQuery}&pagination[page]=${page}&pagination[pageSize]=10`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOptions: builder.query({
      query: (params: { searchValue: string; model: string }) => ({
        url: `${params.model}?_q=${params.searchValue}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createNewEntry: builder.mutation({
      query: (params: { data: any; model: string }) => ({
        url: `${params.model}`,
        method: "POST",
        credentials: "include" as const,
        body: {
          data: params.data,
        },
      }),
    }),
    createNewStudent: builder.mutation({
      query: (params: { id: string | undefined; data: any }) => ({
        url: params.id ? `students/${params.id}` : `students`,
        method: params.id ? "PUT" : "POST",
        credentials: "include" as const,
        body: {
          data: params.data,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success("Saved");
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetOptionsQuery,
  useCreateNewEntryMutation,
  useCreateNewStudentMutation,
  useGetCandidateListMutation,
} = apiSlice;
