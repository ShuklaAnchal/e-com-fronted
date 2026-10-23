
"use client";

import React, { useEffect, useState } from "react";
import { asyncfetchpayments } from "@/app/store/action/paymentAction";
import Table from "@/app/component/table/table";
import { paymentColoum } from "@/app/colums/paymentColumns";
import { useDispatch } from "react-redux";

const PAGE_SIZE = 10;

const Index = () => {
  const dispatch = useDispatch();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);

        const response = await dispatch(
          asyncfetchpayments({
            page: currentPage,
            limit: PAGE_SIZE,
          })
        );

      

       console.log({response});

        const paymentList =
          response?.payments ??
          (Array.isArray(response) ? response : []);

        setPayments(
          Array.isArray(paymentList) ? paymentList : []
        );

        setTotalPayments(
          Number(response?.pagination?.totalPayments ?? response?.total ?? 0)
        );

        setTotalPages(
          Math.max(1, Number(response?.pagination?.totalPages ?? 1))
        );
      } catch (error) {
        console.error("Failed to fetch payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [dispatch, currentPage]);

  // Pagination functions
  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    );
  };

  const previousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  // Pagination metadata for Table
  const pagination = {
    currentPage,
    totalPages,
    totalItems: totalPayments,
    limit: PAGE_SIZE,
  };

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Payments
      </h1>

      <Table
        columns={paymentColoum()}
        data={payments || []}
        pagination={pagination}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        loading={loading}
      />
    </div>
  );
};

export default Index;
