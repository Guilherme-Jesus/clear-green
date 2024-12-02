"use client";

import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

interface DraggableItemProps {
  item: {
    id: number;
    text: string;
    type: "conserve" | "waste";
  };
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
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
      className={`p-4 bg-blue-50 rounded-lg shadow-md cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-blue-800">{item.text}</p>
    </motion.div>
  );
};

export default DraggableItem;
