"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductbyID } from "@/app/store/action/productAction";

const Page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductbyID(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h1>{product?.name}</h1>
    </div>
  );
};

export default Page;
