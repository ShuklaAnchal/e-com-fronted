// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchSubcategory } from "@/app/store/action/subcategoryAction";

export function useSubcategories() {
  const dispatch = useDispatch();

  const [Subcategories, SetSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshSubcategories = async () => {
    setLoading(true);

    const result =
      await dispatch(asyncfetchSubcategory());

    if (result?.subcategories) {
      SetSubcategories(result.subcategories);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshSubcategories();
  }, []);

  return {
    Subcategories,
    loading,
    refreshSubcategories,
  };
}