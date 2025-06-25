import {
  Book,
  Brain,
  ListOrdered,
  Search,
  Music,
  Grid,
  Mountain,
  Map,
  Zap,
  Leaf,
  Flag,
  Activity,
  Globe,
  Triangle,
  Move,
  Puzzle,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import type { JSX } from "react"

interface GameCardProps {
  name: string
  icon: string
  id: number
  url?: string
  internal?: boolean
}

export default function GameCard({ name, icon, id, url, internal = false }: GameCardProps) {
  // Função para gerar uma cor de fundo baseada no ID do jogo
  const getBackgroundColor = () => {
    const colors = [
      "from-blue-500 to-blue-400",
      "from-green-500 to-green-400",
      "from-purple-500 to-purple-400",
      "from-yellow-500 to-yellow-400",
      "from-pink-500 to-pink-400",
      "from-indigo-500 to-indigo-400",
      "from-red-500 to-red-400",
      "from-teal-500 to-teal-400",
      "from-orange-500 to-orange-400",
      "from-cyan-500 to-cyan-400",
      "from-lime-500 to-lime-400",
      "from-emerald-500 to-emerald-400",
      "from-fuchsia-500 to-fuchsia-400",
      "from-amber-500 to-amber-400",
      "from-violet-500 to-violet-400",
      "from-rose-500 to-rose-400",
    ]
    return colors[(id - 1) % colors.length]
  }

  const getIcon = (): JSX.Element => {
    const iconMap: Record<string, LucideIcon> = {
      book: Book,
      brain: Brain,
      puzzle: Puzzle,
      "list-ordered": ListOrdered,
      search: Search,
      music: Music,
      grid: Grid,
      mountain: Mountain,
      map: Map,
      zap: Zap,
      leaf: Leaf,
      flag: Flag,
      activity: Activity,
      globe: Globe,
      triangle: Triangle,
      move: Move,
    }

    const IconComponent = iconMap[icon] || Book
    return <IconComponent className="h-10 w-10 text-white" />
  }

  // Determinar as propriedades do link com base no tipo (interno ou externo)
  const linkProps = url
    ? internal
      ? { href: url } // Link interno
      : { href: url, target: "_blank", rel: "noopener noreferrer" } // Link externo
    : { href: "#" } // Sem link

  return (
    <Link {...linkProps} className="block transition-transform hover:scale-105 group">
      <Card className="h-full border-2 hover:border-primary dark:hover:border-primary-dark overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
        <CardContent className="p-0 h-full flex flex-col">
          <div
            className={`bg-gradient-to-br ${getBackgroundColor()} p-6 flex justify-center items-center relative h-32`}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Image
              src={`/placeholder.svg?height=120&width=120&text=${encodeURIComponent(name)}`}
              alt={name}
              width={120}
              height={120}
              className="absolute opacity-20 right-0 bottom-0"
            />
            <div className="z-10">{getIcon()}</div>
          </div>
          <div className="p-4 text-center dark:text-gray-200">
            <h3 className="font-medium">{name}</h3>
            {url && (
              <p className="text-xs text-primary dark:text-primary-dark mt-1">
                {internal ? "Jogar agora" : "Abrir em nova aba"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
