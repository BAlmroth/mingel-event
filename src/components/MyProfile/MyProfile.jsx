import { useUser } from "../../hooks/UserContext";
import styles from "./MyProfile.module.css";

export function MyProfile() {
  const { user, loading } = useUser();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

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
    <p>{user.role} • {user.description}</p>
  </section>
);
}