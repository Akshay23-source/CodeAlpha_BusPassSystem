import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={styles.nav}
    >
      <h2>🚌 Bus Pass System</h2>
      <div>
        <span>Home</span>
        <span>Apply</span>
        <span>Admin</span>
      </div>
    </motion.div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    background: "#0f172a",
    color: "white"
  }
};