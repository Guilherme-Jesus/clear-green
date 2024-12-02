"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Droplet,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

interface ProblemSolution {
  problem: string;
  symptoms: string[];
  solution: string;
  prevention: string;
}

const waterProblems: ProblemSolution[] = [
  {
    problem: "Água com cloro em excesso",
    symptoms: [
      "Cheiro forte de cloro",
      "Gosto desagradável",
      "Irritação nos olhos ou na pele após o banho",
    ],
    solution:
      "Deixe a água parada em um recipiente aberto por algumas horas antes de consumir. Isso permitirá que o excesso de cloro evapore.",
    prevention:
      "Entre em contato com a companhia de água local para relatar o problema. Use filtros de carvão ativado para reduzir o cloro na água.",
  },
  {
    problem: "Água turva ou com partículas",
    symptoms: ["Aparência nebulosa ou leitosa", "Partículas visíveis na água"],
    solution:
      "Deixe a água descansar por algumas horas para que as partículas assentem. Use um filtro de sedimentos para remover as partículas.",
    prevention:
      "Verifique regularmente os encanamentos para detectar corrosão. Instale um sistema de filtragem na entrada de água da casa.",
  },
  {
    problem: "Água com gosto ou cheiro de terra ou mofo",
    symptoms: ["Sabor terroso", "Odor de mofo ou terra molhada"],
    solution:
      "Use um filtro de carvão ativado para remover os compostos que causam o gosto e o cheiro. Ferva a água antes de consumir.",
    prevention:
      "Limpe regularmente os reservatórios de água. Mantenha as torneiras e chuveiros limpos para evitar o acúmulo de bactérias.",
  },
  {
    problem: "Água avermelhada ou amarelada",
    symptoms: [
      "Coloração avermelhada ou amarelada na água",
      "Manchas em roupas ou louças",
    ],
    solution:
      "Deixe a água correr por alguns minutos antes de usar. Instale um filtro de ferro se o problema for recorrente.",
    prevention:
      "Verifique se há tubulações de ferro enferrujadas em sua casa. Considere substituir encanamentos antigos.",
  },
];

export function WaterQualityGuide() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="w-full bg-white/90 backdrop-blur-sm shadow-lg border-none rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg p-6">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Droplet className="mr-3 h-8 w-8" />
            Guia de Qualidade da Água
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-center text-blue-800 text-lg mb-8">
            Aprenda a identificar e resolver problemas comuns de qualidade da
            água em sua casa.
          </p>
          <div className="space-y-6">
            {waterProblems.map((item, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  backgroundColor:
                    expandedIndex === index
                      ? "rgba(59, 130, 246, 0.1)"
                      : "transparent",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-lg overflow-hidden border border-blue-200"
              >
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-blue-50"
                  onClick={() => toggleExpand(index)}
                >
                  <span className="font-semibold text-blue-700 text-lg">
                    {item.problem}
                  </span>
                  {expandedIndex === index ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </Button>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="mb-4">
                        <h4 className="font-semibold text-blue-600 flex items-center text-lg mb-2">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Sintomas:
                        </h4>
                        <ul className="list-disc list-inside pl-5 space-y-1">
                          {item.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-blue-800">
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-green-600 flex items-center text-lg mb-2">
                          <ThumbsUp className="h-5 w-5 mr-2" />
                          Solução:
                        </h4>
                        <p className="text-green-800 pl-7">{item.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-600 flex items-center text-lg mb-2">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Prevenção:
                        </h4>
                        <p className="text-purple-800 pl-7">
                          {item.prevention}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default WaterQualityGuide;
