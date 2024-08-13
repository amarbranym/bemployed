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
    getCities: builder.query({
      query: () => ({
        url: `cities?populate=*`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetStudentQuery, useGetCitiesQuery } = studentApi;
