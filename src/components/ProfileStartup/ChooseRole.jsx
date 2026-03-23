import styles from "./ChooseRole.module.css";
import { RoleCard } from "./RoleCard";

export function ChooseRole() {
  return (
    <>
      <section className="roles">
        <div className={styles.roleInfo}>
          <h4>Register to</h4>
          <h1>Stalk the people at the event</h1>
          <h4>I AM A...</h4>
        </div>

        <RoleCard title="Student" description="I'm here to learn and connect" />
        <RoleCard title="Industry" description="I'm here to meet talent" />
      </section>
    </>
  );
}
