import { useState } from "react";
import Styles from "./MingleFeed.module.css";
import { MingleCard } from "./MingleCard";
import { useUser } from "../../hooks/UserContext";

const filters = ["All", "Students", "Industry"];

export function MingleFeed() {
  const { allUsers, loading } = useUser();
  const [active, setActive] = useState("All");

const roleMap = { Students: "student", Industry: "industry" };
const filtered = active === "All" ? allUsers : allUsers.filter(u => u.role === roleMap[active]);

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
              className={`${Styles.filterButton} ${active === filter ? Styles.active : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={Styles.MingleFeed}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filtered.map((person) => (
              <MingleCard key={person.id} user={person} />
            ))}
            <small>{filtered.length} people in the room</small>
          </>
        )}
      </section>
    </>
  );
}