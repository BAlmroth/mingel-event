import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch all
  useEffect(() => {
    const fetchData = async () => {
      const { data: allData, error: allError } = await supabase
        .from("users")
        .select("*");

      if (!allError) setAllUsers(allData);

      //fetch your info on login
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }

      const linkedinUser = await res.json();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("linkedin_id", linkedinUser.linkedin_id)
        .maybeSingle();

      if (!error) setUser(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === updatedData.id ? { ...u, ...updatedData } : u))
    );
  };

  return (
    <UserContext.Provider value={{ user, allUsers, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
