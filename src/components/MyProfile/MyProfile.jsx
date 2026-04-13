import { useUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { LikedCard } from "../Mingle/LikedCard";
import styles from "./MyProfile.module.css";
import Star from "../../assets/Star.svg";
import Edit from "../../assets/Edit.svg";
import logout from "../../assets/logout.svg";
import { getInitials } from "../../utils/helpers";
import { MingleCard } from "../Mingle/MingleCard";

export function MyProfile() {
  const {
    user,
    loading,
    allUsers,
    likedIds = [],
    unlikeUser,
    logOut,
  } = useUser();
  const navigate = useNavigate();

  // handle user logout
  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  // filter users that current user has liked
  const likedProfiles = allUsers.filter((u) => likedIds.includes(u.id));

  return (
    <section className={styles.profilesection}>
      <div className={styles.profileheader}>
        <h5>YOUR PROFILE</h5>
        <div className={styles.titleRow}>
          <h1>Personal Card</h1>
          <button
            className={styles.editBtn}
            onClick={() => navigate("/profile/edit")}
          >
            <img src={Edit} alt="Edit profile" />
          </button>
          <button className={styles.editBtn} onClick={handleLogout}>
            <img src={logout} alt="Logout" />
          </button>
        </div>
        <p className="subTitle">Wihoo! now people can stalk you, and you them...</p>
      </div>
      <div className={styles.avatar}>
        <div className={styles.avatarWrapper}>
          {user.picture ? (
            <img
              src={user.picture}
              alt="profile"
              className={styles.avatarImage}
            />
          ) : (
            <div className={`${styles.avatarInitials} ${user.role}`}>
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
            <div className={styles.funFact}>
              <h4>MY FUN FACT:</h4>
              <p>{user.fun_fact}</p>
            </div>
        </div>
        <div className={styles.stalkLater}>
          <img src={Star} alt="stalk" className={styles.stalkBtn} />
          <h3>Stalking for later</h3>
        </div>
      <div className={styles.stalkedFeed}>
        {likedProfiles.map((p) => (
          <MingleCard key={p.id} user={p} />
        ))}
      </div>
    </section>
  );
}
