// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchAddress } from "@/app/store/action/addressAction";

export function useAddress() {
  const dispatch = useDispatch();

  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshAddress = async () => {
    setLoading(true);

    const result = await dispatch(asyncfetchAddress());
    console.log({result});
    
    if (result?.shippingAddress) {
      setAddress(result.shippingAddress);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshAddress();
  }, []);

  return {
    address,
    loading,
    refreshAddress,
  };
}
