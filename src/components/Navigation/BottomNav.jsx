import { useLocation, useNavigate } from "react-router-dom"
import styles from "./BottomNav.module.css"
import joinBtn from "../../assets/joinBtn.svg"
import { useUser } from "../../hooks/UserContext"
import searchImg from "../../assets/search.svg"
import stalkerBtn from "../../assets/Stalker.svg"

export function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading } = useUser()

    const isActive = (path) => location.pathname === path ? styles.active : ""

    return (
        <nav className={styles.nav}>
        <div
          className={isActive("/feed")}
          onClick={() => navigate("/feed")}
        >
          <img src={searchImg} alt="mingle feed" className={styles.icon} />
          <p>Mingle Feed</p>
        </div>
    
        {!loading && !user && (
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
          className={isActive("/profile")}
          onClick={() => navigate("/profile")}
        >
          <img src={stalkerBtn} alt="my profile" className={styles.icon} />
          <p>My Profile</p>
        </div>
      </nav>
    )
}