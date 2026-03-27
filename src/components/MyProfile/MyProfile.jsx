import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";
import styles from "./MyProfile.module.css"


export function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/me", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data) {
        fetchUserFromDB(data);
      }
    };

    fetchUser();
  }, []);

  const fetchUserFromDB = async (linkedinUser) => {
    const fullName = `${linkedinUser.first_name} ${linkedinUser.last_name}`;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", fullName)
      .single();

    if (!error) {
      setUser(data);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) return <p>Loading...</p>;



  return (
    <section>
      <div className={styles.avatar}>
        {getInitials(user.name)}
      </div>

      <h2>{user.name}</h2>
      <p>
        {user.role} • {user.description}
      </p>
    </section>
  );
}