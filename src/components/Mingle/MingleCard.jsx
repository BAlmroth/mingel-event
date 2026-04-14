import Styles from "./MingleFeed.module.css";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helpers";

export function MingleCard({ user }) {
  const navigate = useNavigate();

  return (
      <div
      onClick={() => navigate(`/profiles/${user.username}`)}
      className={Styles.profileCard}
    >
      <div className={Styles.leftField}>
      <div className={Styles.imageWrapper}>
          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              className={Styles.profileImg}
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
      <small className={Styles.role}>
        {user.role === "student" ? (
          <>
            <span className={Styles.roleFull}>student</span>
            <span className={Styles.roleShort}>S</span>
          </>
        ) : (
          <>
            <span className={Styles.roleFull}>industry</span>
            <span className={Styles.roleShort}>I</span>
          </>
        )}
      </small>
    </div>
  );
}
