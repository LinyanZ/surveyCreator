import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

export default function ResizeablePanel({ children, ...props }) {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{
        height: height || "auto",
        transition: { duration: 0.2 },
      }}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
