import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const baseUrl = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetUrl(path: string) {
  // Remove leading slashes so we never generate protocol-relative URLs like //images/...
  const normalized = path.replace(/^\/+/, '').replace(/^web\//, '');
  const encoded = normalized
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  return `${baseUrl}/${encoded}`;
}
