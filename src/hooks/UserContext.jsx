import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

const UserContext = createContext(null);

export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch all info from db
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/me", { credentials: "include" });
      if (!res.ok) { setLoading(false); return; }

      const linkedinUser = await res.json();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("linkedin_id", linkedinUser.linkedin_id)
        .maybeSingle();

        //put data in const user
      if (!error) setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );

};

export function useUser() {
  return useContext(UserContext);
};

