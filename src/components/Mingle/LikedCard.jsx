import Styles from "./LikedCard.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import Star from "../../assets/Star.svg";

const getInitials = (firstName, lastName) => {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export function LikedCard({ user }) {
  const navigate = useNavigate();
  const { unlikeUser } = useUser();

  return (
    <div className={Styles.profileCard}>
      <div className={Styles.leftField} onClick={() => navigate(`/profiles/${user.username}`)}>
        <div className={Styles.profile}>
          {user.picture ? (
            <img src={user.picture} alt="profile" className={Styles.Image} />
          ) : (
            getInitials(user.first_name, user.last_name)
          )}
        </div>
        <div className={Styles.profileText}>
          <h5>{user.first_name} {user.last_name}</h5>
          <p>{user.description}</p>
        </div>
      </div>
      <img src={Star} alt="unlike" className={Styles.starBtn} onClick={() => unlikeUser(user.id)} />
    </div>
  );
}