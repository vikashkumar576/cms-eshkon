import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally merge Tailwind CSS classes.
 * 
 * This function combines `clsx` for conditional class logic (e.g., objects, arrays)
 * and `tailwind-merge` to properly handle Tailwind CSS class conflicts.
 * 
 * @example
 * cn("bg-red-500", condition && "text-white", { "p-4": true })
 * // returns "bg-red-500 text-white p-4" (if condition is true)
 * 
 * @param inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns The merged class string
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
