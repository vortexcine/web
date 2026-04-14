import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const baseUrl = import.meta.env.BASE_URL ?? '/'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetUrl(path: string) {
  // Codifica cada segmento del path para que coincida con los nombres originales
  const normalized = path.replace(/^\/\/+/, '').replace(/^web\//, '');
  const encoded = normalized
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${baseUrl}${encoded}`;
}
