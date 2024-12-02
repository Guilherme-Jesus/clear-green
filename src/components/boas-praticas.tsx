"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Droplet, DropletsIcon, LeafIcon, RecycleIcon } from "lucide-react";
import { useEffect, useState } from "react";

const dailyTips = [
  {
    icon: <DropletsIcon className="h-5 w-5 text-blue-600" />,
    title: "Tome banhos mais curtos",
    description: "Reduza o tempo do seu banho para 5 minutos.",
    category: "agua",
    savingAmount: 20,
  },
  {
    icon: <LeafIcon className="h-5 w-5 text-green-600" />,
    title: "Reutilize a água da chuva",
    description: "Colete água da chuva para regar suas plantas.",
    category: "agua",
    savingAmount: 50,
  },
  {
    icon: <RecycleIcon className="h-5 w-5 text-blue-600" />,
    title: "Recicle a água",
    description: "Reutilize a água da máquina de lavar roupa.",
    category: "agua",
    savingAmount: 30,
  },
  {
    icon: <DropletsIcon className="h-5 w-5 text-blue-600" />,
    title: "Feche a torneira",
    description:
      "Ao escovar os dentes ou fazer a barba, mantenha a torneira fechada.",
    category: "agua",
    savingAmount: 15,
  },
  {
    icon: <LeafIcon className="h-5 w-5 text-green-600" />,
    title: "Lave o carro com balde",
    description: "Evite usar mangueira para lavar o carro.",
    category: "agua",
    savingAmount: 40,
  },
  {
    icon: <RecycleIcon className="h-5 w-5 text-blue-600" />,
    title: "Conserte vazamentos",
    description: "Verifique e conserte torneiras pingando.",
    category: "agua",
    savingAmount: 45,
  },
];

const BoasPraticas = () => {
  const [waterSaved, setWaterSaved] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("waterSaved");
      return saved ? parseInt(saved) : 0;
    }
    return 0;
  });

  const [implementedTips, setImplementedTips] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("implementedTips");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("waterSaved", waterSaved.toString());
    localStorage.setItem("implementedTips", JSON.stringify(implementedTips));
  }, [waterSaved, implementedTips]);

  const toggleTip = (index: number) => {
    setImplementedTips((prev: Record<number, boolean>) => {
      const newImplementedTips = { ...prev, [index]: !prev[index] };
      setWaterSaved(
        Object.entries(newImplementedTips).reduce(
          (total, [idx, implemented]) => {
            return implemented
              ? total + dailyTips[parseInt(idx)].savingAmount
              : total;
          },
          0
        )
      );
      return newImplementedTips;
    });
  };

  const getTotalPossibleSaving = () => {
    return dailyTips.reduce((total, tip) => total + tip.savingAmount, 0);
  };

  const waterSavedPercentage = (waterSaved / getTotalPossibleSaving()) * 100;

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
            <Droplet className="mr-2" />
            Boas Práticas de Economia de Água
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-6">
            <Progress value={waterSavedPercentage} className="w-full h-3" />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-blue-800">
                {waterSaved} litros economizados
              </p>
              <Badge
                variant="outline"
                className="text-sm bg-blue-100 text-blue-800"
              >
                {waterSavedPercentage < 30
                  ? "Iniciante"
                  : waterSavedPercentage < 60
                  ? "Intermediário"
                  : waterSavedPercentage < 90
                  ? "Avançado"
                  : "Mestre da Economia"}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 text-center">
              Meta Diária: {getTotalPossibleSaving()} litros
            </p>
          </div>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {dailyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-3 bg-blue-50 p-3 rounded-lg">
                    <Checkbox
                      id={`tip-${index}`}
                      checked={implementedTips[index] || false}
                      onCheckedChange={() => toggleTip(index)}
                      className="mt-1"
                    />
                    <div className="flex-grow">
                      <label
                        htmlFor={`tip-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center text-blue-800"
                      >
                        {tip.icon}
                        <span className="ml-2">{tip.title}</span>
                      </label>
                      <p className="text-sm text-blue-600 mt-1">
                        {tip.description}
                      </p>
                      {tip.category === "agua" && (
                        <p className="text-xs text-green-600 mt-1">
                          Economia: {tip.savingAmount} litros
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BoasPraticas;
