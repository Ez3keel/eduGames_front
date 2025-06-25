import type React from "react"
import { Brain, Lightbulb, Trophy, Users } from "lucide-react"

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-white dark:bg-gray-700 rounded-full p-3 mb-4 text-primary dark:text-primary-dark shadow-md">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-white/90">{description}</p>
    </div>
  )
}

export default function GameBenefits() {
  return (
    <div className="bg-gradient-to-r from-secondary to-secondary/80 dark:from-gray-800 dark:to-gray-700 text-white py-10 px-4 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-8">Benefícios dos Nossos Jogos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Benefit
          icon={<Brain size={24} />}
          title="Desenvolvimento Cognitivo"
          description="Estimula o raciocínio lógico, memória e capacidade de resolução de problemas."
        />

        <Benefit
          icon={<Lightbulb size={24} />}
          title="Criatividade"
          description="Incentiva o pensamento criativo e a busca por soluções inovadoras."
        />

        <Benefit
          icon={<Users size={24} />}
          title="Habilidades Sociais"
          description="Promove a colaboração, comunicação e trabalho em equipe."
        />

        <Benefit
          icon={<Trophy size={24} />}
          title="Motivação"
          description="Torna o aprendizado divertido e aumenta o engajamento dos estudantes."
        />
      </div>
    </div>
  )
}
