// Added by https://ui.shadcn.com/
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/**
 * Check if an element has children with a specific id.
 * @param element  The element to check.
 * @param id  The id to check.
 * @returns  True if the element has children with the specified id, false otherwise.
 */
export const checkIfElementHasChildrenWithId = (element: Element, id: string) => {
  return Array.from(element.children).some((child) => child.id == id);
};
