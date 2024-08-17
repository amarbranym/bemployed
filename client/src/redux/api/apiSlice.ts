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
      // async onQueryStarted(params, { queryFulfilled, dispatch }) {
      //   try {
      //     await queryFulfilled;
      //     dispatch(
      //       apiSlice.endpoints.getOptions.initiate({
      //         searchValue: "",
      //         model: params.model,
      //       })
      //     );
      //   } catch (error: any) {}
      // },
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetOptionsQuery,
  useCreateNewEntryMutation,
} = apiSlice;
