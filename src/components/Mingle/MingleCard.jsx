import Styles from "./MingleFeed.module.css";

const getInitials = (firstName, lastName) => { //lägg i egen component då den används flera gånger
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export function MingleCard({ user }) {
  return (
    <div className={Styles.profileCard}>
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
            getInitials(user.first_name, user.last_name)
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
