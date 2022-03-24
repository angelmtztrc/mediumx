import { nanoid } from 'nanoid';

/**
 * @param text value that you want to convert to a slug
 * @returns string the slug
 */
export const generateSlug = (text: string): string =>
  `${text} ${nanoid(6)}`
    .replace(/[^a-zA-Z|0-9\s]/g, '')
    .split(' ')
    .join('-')
    .toLowerCase();
