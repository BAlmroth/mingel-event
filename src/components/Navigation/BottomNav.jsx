import { useLocation, useNavigate } from "react-router-dom"
import styles from "./BottomNav.module.css"
import joinBtn from "../../assets/joinBtn.svg"
import { useUser } from "../../hooks/UserContext"


export function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useUser()

    return (
        <nav className={styles.nav}>
        <div
          className={location.pathname === "/feed" ? styles.active : ""}
          onClick={() => navigate("/feed")}
        >
          <p>Mingle Feed</p>
        </div>
    
        {!user && (
        <div className={styles.joinWrapper}>
          <img
            src={joinBtn}
            className={styles.joinSvg}
            onClick={() => navigate("/")}
            alt="join"
          />
          <p className={styles.joinText}>Join</p>
        </div>
      )}   
    
        <div
          className={location.pathname === "/profile" ? styles.active : ""}
          onClick={() => navigate("/profile")}
        >
          <p>My Profile</p>
        </div>
      </nav>
    )
}

