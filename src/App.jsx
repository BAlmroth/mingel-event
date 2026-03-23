import "./App.css";
import { ChooseRole } from "./components/ChooseRole";

function App() {
  return (
    <>
      <section className="roles">
        <div className="roleInfo">
          <h4>Register to</h4>
          <h1>Stalk the people at the event</h1>
          <h4>I AM A...</h4>
        </div>

        <ChooseRole
          title="Student"
          description="I'm here to learn and connect"
        />

        <ChooseRole title="Industry" description="I'm here to meet talent" />
      </section>

      <section>
        {/* create profile logic */}
      </section>
    </>
  );
}

export default App;
