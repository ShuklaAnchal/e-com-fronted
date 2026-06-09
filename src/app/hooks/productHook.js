// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchcategory } from "@/app/store/action/";

export function useCategories() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCategories = async () => {
    setLoading(true);

    const result =
      await dispatch(asyncfetchcategory());

    if (result?.categories) {
      setCategories(result.categories);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return {
    categories,
    loading,
    refreshCategories,
  };
}