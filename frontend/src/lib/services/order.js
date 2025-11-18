import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "OrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    addToOrderPaypal: builder.mutation({
      query: (Data) => ({
        url: "/order-paypal",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(Data),
      }),
      invalidatesTags: ["Orders"],
    }),

    capturePayment: builder.mutation({
      query: (orderID) => ({
        url: `/order-paypal/${orderID}/capture`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    addToOrderStripe: builder.mutation({
      query: (Data) => ({
        url: "/order-stripe/checkout/stripe",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(Data),
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    addToOrderCOD: builder.mutation({
      query: (Data) => ({
        url: "/order-cod",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Data),
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    // ----- QR -----
    addToOrderQR: builder.mutation({
      query: (Data) => {
        const formData = new FormData();

        Object.entries(Data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });

        return {
          url: "/order-qr",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Orders"],
    }),

    getOrderBySession: builder.query({
      query: (sessionId) => ({
        url: `/check-order-status`,
        method: "GET",
        params: { session_id: sessionId },
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),

    getAllOrder: builder.query({
      query: () => {
        return {
          url: `/all-orders`,
          method: "GET",
          headers: {},
          credentials: "include",
        };
      },
      providesTags: ["Orders"],
    }),

    getMyOrder: builder.query({
      query: (id) => {
        return {
          url: `/my-order`,
          method: "GET",
          headers: {},
          credentials: "include",
        };
      },
      providesTags: ["Orders"],
    }),

    getsingleOrder: builder.query({
      query: (id) => {
        return {
          url: `/order-details/${id}`,
          method: "GET",
          headers: {},
          credentials: "include",
        };
      },
      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ newStatus, id }) => {
        return {
          url: `/order-status/${id}`,
          method: "PATCH",
          body: { newStatus },
          headers: {},
          credentials: "include",
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useAddToOrderPaypalMutation,
  useGetAllOrderQuery,
  useCapturePaymentMutation,
  useAddToOrderStripeMutation,
  useGetsingleOrderQuery,
  useGetMyOrderQuery,
  useUpdateOrderStatusMutation,
  useGetOrderBySessionQuery,
  useAddToOrderCODMutation,
  useAddToOrderQRMutation,
} = orderApi;

export default orderApi;
