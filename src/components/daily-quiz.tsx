"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { DropletsIcon } from "lucide-react";
import { useEffect, useState } from "react";

const quizQuestions = [
  {
    question: "Quanto tempo você deve levar para lavar as mãos adequadamente?",
    options: ["5 segundos", "10 segundos", "20 segundos", "1 minuto"],
    correctAnswer: 2,
    explanation:
      "20 segundos é o tempo mínimo recomendado pela OMS para eliminar efetivamente os germes. Menos que isso não é suficiente para uma higienização adequada.",
  },
  {
    question: "Qual é a porcentagem aproximada de água no corpo humano adulto?",
    options: ["30%", "45%", "60%", "75%"],
    correctAnswer: 2,
    explanation:
      "O corpo humano é composto por aproximadamente 60% de água. Este alto percentual mostra como a água é essencial para nossa sobrevivência e funcionamento adequado do organismo.",
  },
  {
    question:
      "Quantos litros de água você pode economizar ao fechar a torneira enquanto escova os dentes?",
    options: ["2 litros", "6 litros", "12 litros", "20 litros"],
    correctAnswer: 2,
    explanation:
      "Ao deixar a torneira aberta durante a escovação, desperdiçamos cerca de 12 litros de água. Este volume poderia ser usado para outras necessidades essenciais.",
  },
  {
    question: "Qual é o principal problema de falta de água?",
    options: [
      "Falta de água",
      "Falta de saneamento",
      "Falta de energia",
      "Falta de alimentos",
    ],
    correctAnswer: 1,
    explanation:
      "A falta de saneamento é o principal problema, pois afeta diretamente a qualidade da água disponível e causa diversas doenças na população.",
  },
  {
    question: "Qual é a principal fonte de água doce no mundo?",
    options: ["Rios", "Lagos", "Geleiras", "Aquíferos subterrâneos"],
    correctAnswer: 2,
    explanation:
      "As geleiras contêm cerca de 70% da água doce do planeta. Por isso, o derretimento das geleiras devido ao aquecimento global é tão preocupante.",
  },
  {
    question: "Quantos dias uma pessoa pode sobreviver sem água, em média?",
    options: ["1 dia", "3 dias", "7 dias", "14 dias"],
    correctAnswer: 1,
    explanation:
      "Uma pessoa só consegue sobreviver cerca de 3 dias sem água, enquanto pode ficar semanas sem comida. Isso mostra como a água é vital para nossa sobrevivência.",
  },
  {
    question: "Qual é o oceano mais profundo do mundo?",
    options: [
      "Oceano Atlântico",
      "Oceano Índico",
      "Oceano Ártico",
      "Oceano Pacífico",
    ],
    correctAnswer: 3,
    explanation:
      "O Oceano Pacífico é o mais profundo, com pontos que chegam a 11 km de profundidade. Ele contém mais água que todos os outros oceanos juntos.",
  },
  {
    question: "Qual é o processo pelo qual a água se transforma em vapor?",
    options: ["Condensação", "Evaporação", "Precipitação", "Transpiração"],
    correctAnswer: 1,
    explanation:
      "A evaporação é o processo onde a água líquida se transforma em vapor. Este processo é fundamental no ciclo da água e na manutenção do clima.",
  },
];

export function DailyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    setSelectedAnswer("");
    setIsCorrect(null);
  }, [currentQuestion]);

  const handleAnswer = () => {
    if (selectedAnswer === "") return;

    const correct =
      parseInt(selectedAnswer) === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    }

    const delay = correct ? 1500 : 5000;

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
        setIsCorrect(null);
      } else {
        setQuizCompleted(true);
      }
    }, delay);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setIsCorrect(null);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border border-none rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <DropletsIcon className="mr-2" />
            Quiz Diário da Água
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!quizCompleted ? (
            <>
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-blue-600 mb-4">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </p>
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                {quizQuestions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={(value) => setSelectedAnswer(value)}
                className="space-y-2"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className="border-blue-400 text-blue-600"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-blue-800"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 p-4 rounded-lg ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {isCorrect ? "Correto! 👏" : "Incorreto"}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-red-800">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                Parabéns! Você completou o quiz diário!
              </h3>
              <p className="mb-4 text-blue-700">
                Você acertou {correctAnswers} de {quizQuestions.length}{" "}
                perguntas.
              </p>
              <Progress
                value={(correctAnswers / quizQuestions.length) * 100}
                className="mb-4"
              />
              <p className="text-green-600">
                Volte amanhã para um novo desafio!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!quizCompleted ? (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === ""}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {currentQuestion < quizQuestions.length - 1
                ? "Próxima Pergunta"
                : "Finalizar Quiz"}
            </Button>
          ) : (
            <Button
              onClick={resetQuiz}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Reiniciar Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
