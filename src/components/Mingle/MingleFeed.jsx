import { useState } from "react";
import Styles from "./MingleFeed.module.css";
import { MingleCard } from "./MingleCard";

const filters = ["All", "Students", "Industry"];

const mockData = [
  { name: "Rune Yrgosson", description: "Webbutvecklare", role: "Student", color: "#e51236" },
  { name: "Rune Yrgosson", description: "Webbutvecklare", role: "Student", color: "#001A52" },
  { name: "Rune Yrgosson", description: "Webbutvecklare", role: "Student", color: "#35D4D1" },
];

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
              className={`${Styles.filterButton} ${active === filter ? Styles.active : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={Styles.MingleFeed}>
        {mockData.map((person, i) => (
          <MingleCard key={i} {...person} />
        ))}
        <small>{mockData.length} people in the room</small>
      </section>
    </>
  );
}