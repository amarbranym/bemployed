import { apiSlice } from "../api/apiSlice";
import { toast } from "react-hot-toast";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getStudent: builder.query({
      query: (studentId) => ({
        url: `students/${studentId}?populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,Skills,qualification.school,qualification.qualification,Contacts`,
        method: "GET",
        credentials: "include" as const,
      }),
      //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //     try {
      //       const result = await queryFulfilled;
      //       console.log(" student", result);
      //     } catch (error: any) {
      //       toast.error("falid");
      //     }
      //   },
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
  }),
});

export const {
  useGetStudentQuery,
  useGetOptionsQuery,
  useCreateNewEntryMutation,
} = studentApi;
