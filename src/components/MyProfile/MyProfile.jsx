import { useUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LikedCard } from "../Mingle/LikedCard";
import supabase from "../../lib/supabaseClient";
import styles from "./MyProfile.module.css";
import Star from "../../assets/Star.svg";
import Edit from "../../assets/Edit.svg";

export function MyProfile() {
  const { user, loading, allUsers, likedIds = [], unlikeUser, logOut } = useUser();
  const navigate = useNavigate();

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

  //gå igenom all users, om de stämmer med liked id (de man gillat) läggs de i const Liked Profiles
  const likedProfiles = allUsers.filter((u) => likedIds.includes(u.id));

  return (
    <section className={styles.profilesection}>
      <div className={styles.profileheader}>
        <h5>YOUR PROFILE</h5>
        <div className={styles.titleRow}>
          <h1>Stalk me!</h1>
          <button
            className={styles.editBtn}
            onClick={() => navigate("/profile/edit")}
          >
            <img src={Edit} alt="Edit profile" />
          </button>
        </div>
      </div>
      <div className={styles.avatar}>
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
        <h4>Email</h4>
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
            <LikedCard key={p.id} user={p} />
          ))}
        </div>
    </section>
  );
}
