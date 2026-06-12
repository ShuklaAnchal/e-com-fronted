// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchproduct } from "@/app/store/action/productAction";

export function useProducts() {
  const dispatch = useDispatch();

  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = async () => {
    setLoading(true);

    const result =
      await dispatch(asyncfetchproduct());
   console.log({result});
   
    if (result?.products) {
      setProduct(result.products);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return {
    products,
    loading,
    refreshProducts,
  };
}