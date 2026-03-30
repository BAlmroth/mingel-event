import Styles from "./MingleFeed.module.css";

export function MingleCard({ name, description, role, color }) {
  return (
    <div className={Styles.profileCard}>
      <div className={Styles.leftField}>
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "1rem",
            backgroundColor: color,
          }}
        ></div>
        <div className={Styles.profileText}>
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
      </div>
      <small className={Styles.role}>{role}</small>
    </div>
  );
}