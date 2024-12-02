import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Droplet, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./draggable-item";

interface Item {
  id: number;
  text: string;
  type: "conserve" | "waste";
}

const items: Item[] = [
  { id: 1, text: "Fechar a torneira ao escovar os dentes", type: "conserve" },
  { id: 2, text: "Tomar banhos longos", type: "waste" },
  { id: 3, text: "Consertar vazamentos", type: "conserve" },
  { id: 4, text: "Lavar o carro com mangueira", type: "waste" },
  { id: 5, text: "Reutilizar a água da chuva", type: "conserve" },
  { id: 6, text: "Deixar torneiras pingando", type: "waste" },
  { id: 7, text: "Lavar a calçada com mangueira", type: "waste" },
];

export function WaterConservationGame() {
  const [gameItems, setGameItems] = useState(items);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [{ isOverConserve }, dropConserve] = useDrop(() => ({
    accept: "item",
    drop: (item: Item) => handleDrop(item, "conserve"),
    collect: (monitor) => ({
      isOverConserve: monitor.isOver(),
    }),
  }));

  const [{ isOverWaste }, dropWaste] = useDrop(() => ({
    accept: "item",
    drop: (item: Item) => handleDrop(item, "waste"),
    collect: (monitor) => ({
      isOverWaste: monitor.isOver(),
    }),
  }));

  const handleDrop = (item: Item, binType: "conserve" | "waste") => {
    if (item.type === binType) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correto! Boa escolha!");
    } else {
      const explanations: Record<number, string> = {
        1: "Fechar a torneira ao escovar os dentes é uma boa prática! Isso evita desperdício de água.",
        2: "Tomar banhos longos é uma prática que desperdiça água. Banhos mais curtos são mais econômicos.",
        3: "Consertar vazamentos é essencial para a conservação de água. Um vazamento pequeno pode desperdiçar muitos litros de água por dia.",
        4: "Lavar o carro com mangueira é uma prática que desperdiça água. Alternativas como balde e esponja são mais econômicas.",
        5: "Reutilizar a água da chuva para regar plantas e lavar calçadas é uma boa prática! Isso economiza água potável.",
        6: "Deixar torneiras pingando é uma prática que desperdiça água. A torneira pingando desperdiça até 20 litros de água por dia.",
        7: "Lavar a calçada com mangueira é uma prática que desperdiça água. Alternativas como balde e esponja são mais econômicas.",
      };

      setFeedback(explanations[item.id]);
    }
    setGameItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const resetGame = () => {
    setGameItems(items);
    setScore(0);
    setFeedback(null);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const progress = (score / items.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-none rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Droplet className="mr-2" />
            Jogo de Conservação de Água
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-blue-800 mb-2">
              Arraste as ações para a categoria correta
            </p>
            <Progress value={progress} className="w-full h-2 mb-2" />
            <p className="text-blue-700">
              Pontuação: {score} de {items.length}
            </p>
          </div>
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-center mb-4 p-2 rounded flex items-center ${
                  feedback.includes("Correto")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800 text-sm"
                }`}
              >
                {feedback.includes("Correto") ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <AnimatePresence>
              {gameItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <DraggableItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {gameItems.length > 0 && (
            <div className="flex flex-col md:flex-row justify-around gap-4">
              <motion.div
                ref={dropConserve}
                className={`flex-1 h-40 border-4 ${
                  isOverConserve
                    ? "border-green-500 bg-green-100"
                    : "border-blue-300"
                } flex flex-col items-center justify-center rounded-lg transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <Droplet className="w-12 h-12 text-blue-500 mb-2" />
                <p className="text-blue-800 font-semibold text-center">
                  Conserva Água
                </p>
              </motion.div>
              <motion.div
                ref={dropWaste}
                className={`flex-1 h-40 border-4 ${
                  isOverWaste ? "border-red-500 bg-red-100" : "border-red-300"
                } flex flex-col items-center justify-center rounded-lg transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <Trash2 className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-red-800 font-semibold text-center">
                  Desperdiça Água
                </p>
              </motion.div>
            </div>
          )}
          {gameItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 p-6 bg-blue-100 rounded-lg"
            >
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                {score === items.length ? "🌊 INCRÍVEL! 🌊" : "Jogo Concluído!"}
              </h2>
              <p className="text-xl text-blue-700 mb-4">
                {score === items.length &&
                  "Você é um verdadeiro guardião da água! Parabéns pela pontuação perfeita!"}
                {score >= items.length / 2 &&
                  score < items.length &&
                  "Bom trabalho! Você entende bem sobre conservação de água, mas ainda pode aprender mais!"}
                {score < items.length / 2 &&
                  "Continue aprendendo sobre a importância da água! Tente novamente para melhorar sua pontuação."}
              </p>
              <Button
                onClick={resetGame}
                size="lg"
                className={`${
                  score === items.length
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-bold`}
              >
                Jogar Novamente
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default WaterConservationGame;
