export default function Navbar() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 50px",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}>NextGenRoboticX</h2>

      <nav style={{ display: "flex", gap: "25px" }}>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Home
        </a>

        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Courses
        </a>

        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Student Portal
        </a>

        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Current Openings
        </a>

        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </a>
      </nav>
    </header>
  );
}