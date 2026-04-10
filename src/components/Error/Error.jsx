import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Error.module.css";
import Stalker from "../../assets/Stalker.svg";

export function Error() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isNotFound = location.pathname !== "/error";
  
  return (
    <section className={styles.errorSection}>
      <div className={styles.errorContainer}>
      <img src={Stalker} alt="error icon" className={styles.errorIcon} />
        <h1>{isNotFound ? "404" : "500"}</h1>
        <h2>{isNotFound ? "Page Not Found" : "Something Went Wrong"}</h2>
        <p>
          {isNotFound 
            ? "Couldn't find the page you're looking for"
            : "Please try again later"
          }
        </p>
        <button onClick={() => navigate("/feed")} className={styles.errorBtn}>
          Go Back to Feed
        </button>
      </div>
    </section>
  );
}
