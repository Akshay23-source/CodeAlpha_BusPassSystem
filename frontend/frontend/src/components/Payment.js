import { motion } from "framer-motion";

export default function Payment() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      style={styles.container}
    >
      <h2>💳 Payment</h2>
      <button>Pay ₹100</button>
    </motion.div>
  );
}

const styles = {
  container: {
    padding: 40,
    textAlign: "center"
  }
};