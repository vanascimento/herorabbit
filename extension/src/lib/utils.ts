// Added by https://ui.shadcn.com/
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a random color given a seed string.
 * @param seed string for hash algorithm to select a color
 * @returns a random color in hex format
 */
export const getRandomColor = (seed?: string) => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  let hash = 0;
  if (seed) {
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
  } else {
    hash = Math.floor(Math.random() * 0xffffff);
  }

  for (let i = 0; i < 6; i++) {
    color += letters[(hash >> (i * 4)) & 0xf];
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
