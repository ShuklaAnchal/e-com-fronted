// hooks/useAddress.js

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import {
  asyncfetchAddress,
} from "@/app/store/action/addressAction";

export function useAddress() {
  const dispatch = useDispatch();

  /*
   * null = API has not completed yet
   *
   * [] = API completed and there are no addresses
   *
   * [...] = API completed and addresses exist
   */
  const [address, setAddress] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
   * useCallback is VERY important.
   *
   * It prevents refreshAddress from being
   * recreated on every render.
   */
  const refreshAddress = useCallback(
    async () => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncfetchAddress()
        );

        console.log(
          "ADDRESS API RESULT:",
          result
        );
        const addresses =
          result?.shippingAddress;

        if (
          Array.isArray(addresses)
        ) {
          setAddress(addresses);
        } else if (
          addresses &&
          typeof addresses ===
            "object"
        ) {
          /*
           * In case backend returns
           * a single address object.
           */
          setAddress([addresses]);
        } else {
          setAddress([]);
        }

        return result;
      } catch (error) {
        console.error(
          "REFRESH ADDRESS ERROR:",
          error
        );

        setAddress([]);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  /*
   * Fetch addresses ONCE when the hook
   * is mounted.
   */
  useEffect(() => {
    refreshAddress();
  }, [refreshAddress]);

  return {
    address,
    loading,
    refreshAddress,
  };
}