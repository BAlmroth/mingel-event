import { useParams, Link } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import Styles from "./UserProfile.module.css";
import Star from "../../assets/Star.svg";
import BackArrow from "../../assets/BackArrow.svg";

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

  const user = allUsers?.find((u) => u.username === username);
  const isLiked = likedIds.includes(user?.id);

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
      <Link to="/feed" className={Styles.backButton}>
        <img src={BackArrow} alt="back arrow" />
        Back
      </Link>
      <h2 className={Styles.userInfo}>
        {user.first_name} {user.last_name}
      </h2>
      <p className={Styles.smallText}>Ask {user.first_name} about their funfact!</p>
      <div className={Styles.avatar}>
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
          getInitials(`${user.first_name} ${user.last_name}`)
        )}
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p>
          {user.role} • {user.description}
        </p>
        <div className={Styles.email}>
          <h5>Email:</h5>
          <p>{user.email}</p>
        </div>

        <div className={Styles.funFact}>
          <h5>MY FUN FACT:</h5>
          <p>{user.fun_fact}</p>



        </div>
      </div>
      {/* only show if logge in and not looking at your own profile */}
      {loggedInUser && loggedInUser.username !== username && (
        <div
          className={Styles.stalkLater}
          onClick={() => (isLiked ? unlikeUser(user.id) : likeUser(user.id))} //add or unadd user from db table likes
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
