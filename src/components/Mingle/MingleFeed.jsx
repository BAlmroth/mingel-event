import { useState } from "react";
import Styles from "./MingleFeed.module.css";

const filters = ["All", "Students", "Industry"];

export function MingleFeed() {
  const [active, setActive] = useState("All");
  return (
    <>
      <section className={Styles.top}>
        <div className={Styles.mingleHeader}>
          <div className={Styles.live}>
            <span className={Styles.dot}></span>
            <p>Live Room</p>
          </div>
          <h2>Mingle Feed</h2>
        </div>
        <div className={Styles.filter}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`${Styles.btn} ${active === filter ? Styles.active : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={Styles.MingleFeed}>
        {/* mockdata 1 */}
        <div className={Styles.profileCard}>
          <div className={Styles.leftField}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "1rem",
                backgroundColor: "#e51236",
              }}
            ></div>
            <div className={Styles.profileText}>
              <p>Rune Yrgosson</p>
              <small>Webbutvecklare</small>
            </div>
          </div>
          <small className={Styles.role}>Student</small>
        </div>

        {/* mockdata 2 */}
        <div className={Styles.profileCard}>
          <div className={Styles.leftField}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "1rem",
                backgroundColor: "#001A52",
              }}
            ></div>
            <div className={Styles.profileText}>
              <p>Rune Yrgosson</p>
              <small>Webbutvecklare</small>
            </div>
          </div>
          <small className={Styles.role}>Student</small>
        </div>

        {/* mockdata 3 */}
        <div className={Styles.profileCard}>
          <div className={Styles.leftField}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "1rem",
                backgroundColor: "#35D4D1",
              }}
            ></div>
            <div className={Styles.profileText}>
              <p>Rune Yrgosson</p>
              <small>Webbutvecklare</small>
            </div>
          </div>
          <small className={Styles.role}>Student</small>
        </div>

        <p>3 people in the room</p>
      </section>
    </>
  );
}
