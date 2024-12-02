import BoasPraticas from "@/components/boas-praticas";
import { DailyQuiz } from "@/components/daily-quiz";
import SanitationGame from "@/components/sanitization-game/sanitation-game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WaterConservationGame from "@/components/water-conservation-game/water-conservation-game";
import WaterQualityGuide from "@/components/water-quality-guide";
import { AnimatePresence, motion } from "framer-motion";
import { Droplet, Recycle, Trash2, Waves } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-300">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex justify-between items-center py-4"
      >
        <motion.img
          src="/assets/icon_agua.png"
          alt="Logo"
          className="w-16 h-16 rounded-full border-4 border-yellow-400"
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      <main className="container mx-auto mt-8 px-4">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-blue-800 mb-4"
            variants={fadeInUp}
          >
            Aventuras na Terra da Água!
          </motion.h1>
          <motion.p className="text-xl text-blue-700 mb-8" variants={fadeInUp}>
            Venha aprender sobre água, higiene e saneamento de um jeito super
            divertido!
          </motion.p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Água Potável e Saneamento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              <motion.div
                key="economia-agua"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg h-full">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Droplet className="mr-2" />
                      Economia de Água
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="list-disc list-inside space-y-2 text-blue-800">
                      <motion.li variants={fadeInUp}>
                        Cada gota importa: pequenas ações diárias podem
                        economizar muitos litros
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        No jogo, você aprenderá a identificar ações que
                        desperdiçam ou conservam água
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Descubra quanto cada ação pode economizar em sua casa
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Aprenda dicas práticas que você pode aplicar no dia a
                        dia
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Torne-se um guardião da água e inspire outros a fazer o
                        mesmo
                      </motion.li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                key="saneamento-basico"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg h-full">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Recycle className="mr-2" />
                      Saneamento Básico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="list-disc list-inside space-y-2 text-green-800">
                      <motion.li variants={fadeInUp}>
                        Aprenda a diferenciar boas e más práticas de saneamento
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        No jogo, você será desafiado a tomar decisões corretas
                        para proteger o meio ambiente
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Entenda como suas escolhas afetam a saúde da comunidade
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Descubra por que o tratamento de água e esgoto é tão
                        importante
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Torne-se um defensor do saneamento básico em sua região
                      </motion.li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Impacto Global
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              <motion.div
                key="escassez-agua"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg h-full">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Waves className="mr-2" />
                      Escassez de Água
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="list-disc list-inside space-y-2 text-yellow-800">
                      <motion.li variants={fadeInUp}>
                        2,2 bilhões de pessoas não têm acesso a água potável
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        A escassez de água afeta 40% da população mundial
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Até 2025, metade da população viverá em áreas com
                        escassez de água
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        A agricultura consome 70% da água doce disponível
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Mudanças climáticas agravam a escassez de água
                      </motion.li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="falta-saneamento"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg h-full">
                  <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <CardTitle className="flex items-center text-2xl">
                      <Trash2 className="mr-2" />
                      Falta de Saneamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="list-disc list-inside space-y-2 text-red-800">
                      <motion.li variants={fadeInUp}>
                        4,2 bilhões de pessoas não têm acesso a saneamento
                        seguro
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        673 milhões ainda praticam defecação a céu aberto
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Doenças relacionadas à água matam mais de 3,4 milhões
                        por ano
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        80% das águas residuais retornam ao ecossistema sem
                        tratamento
                      </motion.li>
                      <motion.li variants={fadeInUp}>
                        Falta de saneamento custa US$ 260 bilhões anualmente à
                        economia global
                      </motion.li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            Qualidade da Água em Casa
          </h2>
          <WaterQualityGuide />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <DailyQuiz />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <BoasPraticas />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-16"
        >
          <SanitationGame />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mb-16"
        >
          <WaterConservationGame />
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-800 text-white py-8"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>
              &copy;{new Date().getFullYear()} Aventuras na Terra da Água. Todos
              os direitos reservados.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
