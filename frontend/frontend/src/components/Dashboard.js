import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <h1>📊 Dashboard</h1>
      <p>Welcome to Bus Pass System</p>
    </motion.div>
  );
}

const styles = {
  container: {
    padding: 40,
    textAlign: "center"
  }
};