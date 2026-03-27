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
      .eq("linkedin_id", linkedinUser.linkedin_id)
      .maybeSingle();

    if (!error) {
      setUser(data);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";

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
        {user.picture ? (
        <img src={user.picture} alt="profile" />
        ) : (
        getInitials(`${user.first_name} ${user.last_name}`)
  )}
</div>

      <h2>{user.first_name} {user.last_name}</h2>
      <p>
        {user.role} • {user.description}
      </p>
    </section>
  );
}