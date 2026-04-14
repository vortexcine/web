import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const baseUrl = import.meta.env.BASE_URL ?? '/'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetUrl(path: string) {
  // Only normalize leading slashes and remove duplicate 'web/' if present
  const normalized = path.replace(/^\/\/+/, '').replace(/^web\//, '')
  return `${baseUrl}${normalized}`
}
