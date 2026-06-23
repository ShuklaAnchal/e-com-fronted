// hooks/useCategories.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchUsers } from "@/app/store/action/customerAction"
export function useUsers() {
  const dispatch = useDispatch();

  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshUsers = async () => {
    setLoading(true);

    const result = await dispatch(asyncfetchUsers());

    if (result?.user) {
      setUsers(result.user);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return {
    Users,
    loading,
    refreshUsers,
  };
}
