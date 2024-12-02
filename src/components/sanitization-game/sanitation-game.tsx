"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import SanitationItem from "./sanitation-item";

interface Item {
  id: number;
  text: string;
  type: "good" | "bad";
}

const items: Item[] = [
  { id: 1, text: "Jogar lixo no lixo", type: "good" },
  { id: 2, text: "Despejar esgoto em rios", type: "bad" },
  { id: 3, text: "Lavar as mãos antes das refeições", type: "good" },
  { id: 4, text: "Deixar água parada no quintal", type: "bad" },
  { id: 5, text: "Tratar a água antes de beber", type: "good" },
  { id: 6, text: "Não utilizar fossas sépticas", type: "bad" },
];

export function SanitationGame() {
  const [gameItems, setGameItems] = useState(items);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [{ isOverGood }, dropGood] = useDrop(() => ({
    accept: "item",
    drop: (item: Item) => handleDrop(item, "good"),
    collect: (monitor) => ({
      isOverGood: monitor.isOver(),
    }),
  }));

  const [{ isOverBad }, dropBad] = useDrop(() => ({
    accept: "item",
    drop: (item: Item) => handleDrop(item, "bad"),
    collect: (monitor) => ({
      isOverBad: monitor.isOver(),
    }),
  }));

  const handleDrop = (item: Item, binType: "good" | "bad") => {
    if (item.type === binType) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Correto! Boa escolha!");
    } else {
      const explanations: Record<number, string> = {
        1: "Jogar lixo no lixo é uma boa prática! Isso evita a poluição do solo e da água, além de prevenir a proliferação de doenças.",
        2: "Despejar esgoto em rios é uma prática prejudicial! Contamina a água, mata os peixes e pode causar várias doenças na população.",
        3: "Lavar as mãos é fundamental! Esta prática previne doenças e é essencial para nossa saúde.",
        4: "Água parada é perigosa! Ela serve como criadouro para o mosquito da dengue e outros vetores de doenças.",
        5: "Tratar a água é essencial! Água não tratada pode conter microorganismos causadores de várias doenças.",
        6: "Fossas sépticas são importantes! Sem elas, o esgoto contamina o solo e o lençol freático.",
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
      <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border border-none rounded-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <ThumbsUp className="mr-2" />
            Missão Saneamento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-green-800 mb-2">
              Arraste as ações para a categoria correta
            </p>
            <Progress value={progress} className="w-full h-2 mb-2" />
            <p className="text-green-700">
              Pontuação: {score} de {items.length}
            </p>
          </div>
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-center mb-4 p-2 rounded ${
                  feedback.includes("Correto")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
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
                  <SanitationItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {gameItems.length > 0 && (
            <div className="flex flex-col md:flex-row justify-around gap-4">
              <motion.div
                ref={dropGood}
                className={`flex-1 h-40 border-4 ${
                  isOverGood
                    ? "border-green-500 bg-green-100"
                    : "border-green-300"
                } flex flex-col items-center justify-center rounded-lg transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <ThumbsUp className="w-12 h-12 text-green-500 mb-2" />
                <p className="text-green-800 font-semibold text-center">
                  Boa Prática
                </p>
              </motion.div>
              <motion.div
                ref={dropBad}
                className={`flex-1 h-40 border-4 ${
                  isOverBad ? "border-red-500 bg-red-100" : "border-red-300"
                } flex flex-col items-center justify-center rounded-lg transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <ThumbsDown className="w-12 h-12 text-red-500 mb-2" />
                <p className="text-red-800 font-semibold text-center">
                  Má Prática
                </p>
              </motion.div>
            </div>
          )}
          {gameItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6 p-6 bg-green-100 rounded-lg"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                {score === items.length ? "🎉 PARABÉNS! 🎉" : "Jogo Concluído!"}
              </h2>
              <p className="text-xl text-green-700 mb-4">
                {score === items.length &&
                  "Você é um verdadeiro defensor do saneamento básico! Acertou tudo!"}
                {score >= items.length / 2 &&
                  score < items.length &&
                  "Muito bem! Você está no caminho certo, mas ainda pode melhorar!"}
                {score < items.length / 2 &&
                  "Você pode melhorar! Que tal tentar novamente e aprender mais sobre saneamento básico?"}
              </p>
              <Button
                onClick={resetGame}
                size="lg"
                className={`${
                  score === items.length
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
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

export default SanitationGame;
