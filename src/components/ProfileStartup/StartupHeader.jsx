import styles from "./StartupHeader.module.css";
import { useLocation, Link } from "react-router-dom";
import BackArrow from "../../assets/BackArrow.svg";

export function PageHeader() {
  const location = useLocation();
  const isFirst = location.pathname === "/";

  return (
    <div className={styles.roleInfo}>
      <h4>Register to</h4>
      <h1>Stalk the people at the event</h1>

      {isFirst ? (
        <p className={styles.headerp}>I AM A...</p>
      ) : (
        <Link to="/" className={styles.backButton}>
          <img src={BackArrow} alt="back arrow" />
          Back
        </Link>
      )}
    </div>
  );
}
