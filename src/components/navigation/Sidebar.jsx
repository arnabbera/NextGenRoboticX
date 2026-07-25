export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        backgroundColor: "#1E293B",
        color: "#fff",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>NextGenRoboticX</h2>

      <hr />

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🏠 Dashboard</li>
        <li>📚 Learning Programs</li>
        <li>🛠 Projects</li>
        <li>🎓 Certification</li>
        <li>💼 Career</li>
        <li>👤 Profile</li>
      </ul>
    </aside>
  );
}