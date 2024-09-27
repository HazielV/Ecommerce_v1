'use client'

import { icons } from 'lucide-react'

type IconName = keyof typeof icons
interface props {
  name: IconName
  size?: number
}
export default function Lucide_Icon({ name, size = 24 }: props) {
  const LucideIcon = icons[name]

  return <LucideIcon size={size} strokeWidth={2.1} />
}
