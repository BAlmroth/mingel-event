import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import Styles from "./UserProfile.module.css";
import Star from "../../assets/Star.svg"

export function UserProfile() {
  const { allUsers, loading } = useUser();
  const { username } = useParams();

  const user = allUsers?.find(u => u.username === username);

    const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) return <p>Loading...</p>;
  if (!user && !loading) return <p>Person not found</p>;

  return (
    <section>
      <h2 className={Styles.userInfo}>
        {user.first_name} {user.last_name}
      </h2>
      <div className={Styles.avatar}>
        {user.picture ? (
        <img src={user.picture} alt="profile" style={{ width: "150px", borderRadius: "50%", marginBottom: "1.5rem" }} />
        ) : (
        getInitials(`${user.first_name} ${user.last_name}`)
  )}
          <h2>{user.first_name} {user.last_name}</h2>
          <p>
            {user.role} • {user.description}
          </p>
      <div className={Styles.funFact}>
        <h4>MY FUN FACT:</h4>
        <p>{user.fun_fact}</p>
      </div>
      </div>
      <div className={Styles.stalkLater}>
        <img src={Star} alt="stalk" className={Styles.stalkStar} ></img>
        <button className={Styles.stalkBtn} type="submit">Stalk for later</button>
      </div>
    
    </section>
  );
}
