import { useLocation, useNavigate } from "react-router-dom"
import styles from "./BottomNav.module.css"
import joinBtn from "../../assets/joinBtn.svg"


export function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav className={styles.nav}>
        <div
          className={location.pathname === "/feed" ? styles.active : ""}
          onClick={() => navigate("/feed")}
        >
          <p>Mingle Feed</p>
        </div>
    
        <div className={styles.joinWrapper}>
            <img
                src={joinBtn}
                className={styles.joinSvg}
                onClick={() => navigate("/")}
                alt="join"
            />
            <p className={styles.joinText}>Join</p>
        </div>      
    
        <div
          className={location.pathname === "/profile" ? styles.active : ""}
          onClick={() => navigate("/profile")}
        >
          <p>My Profile</p>
        </div>
      </nav>
    )
}

