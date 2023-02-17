import React from "react";
import { motion, useMotionValue } from "framer-motion";

const DraggableListItem = React.forwardRef(
  ({ index, reorderItem, children }, ref) => {
    const zIndex = useMotionValue(0);

    return (
      <motion.li
        ref={ref}
        layout
        className="draggable list-none relative z-0"
        whileTap={{ scale: 1.03 }}
        drag="y"
        onDragStart={() => {
          zIndex.set(100);
        }}
        onDragEnd={() => {
          zIndex.set(0);
        }}
        dragSnapToOrigin
        dragElastic={1}
        onDrag={(e, info) => reorderItem(info.point.y, index)}
        style={{ zIndex }}
      >
        {children}
      </motion.li>
    );
  }
);

export default DraggableListItem;
