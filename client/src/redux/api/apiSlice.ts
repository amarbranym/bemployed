import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["strapi"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (studentId) => ({
        url: `students/${studentId}?populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,Skills,qualification.school,qualification.qualification,Contacts`,
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
      query: (data) => ({
        url: `students`,
        method: "POST",
        credentials: "include" as const,
        body: {
          data
        },
      }),
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetOptionsQuery,
  useCreateNewEntryMutation,
  useCreateNewStudentMutation
} = apiSlice;
