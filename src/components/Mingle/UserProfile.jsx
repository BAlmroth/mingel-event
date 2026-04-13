import { useParams, Link } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import Styles from "./UserProfile.module.css";
import Star from "../../assets/Star.svg";
import BackArrow from "../../assets/BackArrow.svg";
import { getInitials } from "../../utils/helpers";

export function UserProfile() {
  const {
    allUsers,
    loading,
    likedIds = [],
    likeUser,
    unlikeUser,
    user: loggedInUser,
  } = useUser();
  const { username } = useParams();

  // find user by username
  const user = allUsers?.find((u) => u.username === username);
  const isLiked = likedIds.includes(user?.id);

  if (loading) return <p>Loading...</p>;
  if (!user && !loading) return <p>Person not found</p>;

  return (
    <section>
      <Link to="/feed" className={`backLink ${Styles.backButton}`}>
        <img src={BackArrow} alt="back arrow" />
        Back
      </Link>
      <h2 className={Styles.userInfo}>
        {user.first_name} {user.last_name}
      </h2>
      <div className={Styles.avatar}>
        <div className={Styles.avatarWrapper}>
          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              style={{
                width: "150px",
                borderRadius: "50%",
                marginBottom: "1.5rem",
              }}
            />
          ) : (
            <div className={`${Styles.avatarInitials} ${user.role}`}>
              {getInitials(user.first_name, user.last_name)}
            </div>
          )}
        </div>
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p>
          {user.role} • {user.description}
        </p>
        <h4>Email:</h4>
        <h5>{user.email}</h5>
        <div className={Styles.funFact}>
          <h4>MY FUN FACT:</h4>
          <p>{user.fun_fact}</p>
        </div>
      </div>

      {/* only show if logge in and not looking at your own profile */}
      {loggedInUser && loggedInUser.username !== username && (
        <div
          className={Styles.stalkLater}
          onClick={() => (isLiked ? unlikeUser(user.id) : likeUser(user.id))}
        >
          <img
            src={Star}
            alt="stalk"
            className={Styles.stalkStar}
            style={{ opacity: isLiked ? 1 : 0.3 }}
          />
          <button className={Styles.stalkBtn} type="button">
            {isLiked ? "Stalking!" : "Stalk for later"}
          </button>
        </div>
      )}
    </section>
  );
}
