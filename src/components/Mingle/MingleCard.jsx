import Styles from "./MingleFeed.module.css";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helpers";

export function MingleCard({ user }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/profiles/${user.username}`)} className={Styles.profileCard}>
      <div className={Styles.leftField}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className={`initials ${user.role}`}>
  {getInitials(user.first_name, user.last_name)}
</div>
          )}
        </div>
        <div className={Styles.profileText}>
          <h5>
            {user.first_name} {user.last_name}
          </h5>
          <p>{user.description}</p>
        </div>
      </div>
      <small className={Styles.role}>{user.role}</small>
    </div>
  );
}
