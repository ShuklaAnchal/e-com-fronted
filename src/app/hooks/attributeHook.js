// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAttribute } from "@/app/store/action/attributeAction";

export function useAttributes() {
  const dispatch = useDispatch();

  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAttributes = async () => {
    setLoading(true);

    const result = await dispatch(fetchAllAttribute());
  console.log({result});
  
    if (result?.attributes) {
      setAttributes(result.attributes);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshAttributes();
  }, []);

  return {
    attributes,
    loading,
    refreshAttributes,
  };
}
