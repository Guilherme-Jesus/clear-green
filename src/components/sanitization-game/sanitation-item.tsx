"use client";

import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

interface SanitationItemProps {
  item: {
    id: number;
    text: string;
    type: "good" | "bad";
  };
}

const SanitationItem: React.FC<SanitationItemProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`p-4 bg-green-50 rounded-lg shadow-md cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-green-800">{item.text}</p>
    </motion.div>
  );
};

export default SanitationItem;
