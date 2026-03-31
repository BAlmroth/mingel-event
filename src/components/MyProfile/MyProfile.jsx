import { useUser } from "../../hooks/UserContext";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";
import styles from "./MyProfile.module.css"
import { QRCodeCanvas } from "qrcode.react"
import Star from "../../assets/Star.svg"



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

  const linkedinUrl = `https://www.linkedin.com/in/${user.linkedin_id}`;


  return (
    <section className={styles.profilesection}>
      <div className={styles.profileheader}>
        <h5>YOUR PROFILE</h5>
        <h1>Stalk me!</h1>
      </div>
      <div className={styles.avatar}>
        {user.picture ? (
        <img src={user.picture} alt="profile" style={{ width: "150px", borderRadius: "50%", marginBottom: "1.5rem" }} />
        ) : (
        getInitials(`${user.first_name} ${user.last_name}`)
  )}

          <h2>{user.first_name} {user.last_name}</h2>
          <p>
            {user.role} • {user.description}
          </p>
        <div className={styles.qrContainer}>
              <QRCodeCanvas value={linkedinUrl} size={140} />
          </div>
          <p>https://www.linkedin.com/in/${user.linkedin_id}</p>
      </div>
      <div className={styles.stalkLater}>
        <img src={Star} alt="stalk" className={styles.stalkBtn} />
        <h3>Stalk for later</h3>
      </div>
    </section>
  );
}