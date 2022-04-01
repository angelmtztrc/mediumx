import * as argon from 'argon2';

/**
 * @param hash the string that represents the hash as string
 * @param plainText the string that you want to compare
 * @returns boolean
 */
export const compareHash = async (hash: string, plainText: string) => argon.verify(hash, plainText);
