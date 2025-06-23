import { clsx } from "clsx"
import { twMerge } from "tailwind-merge" // 👈 CORRETO AGORA

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

