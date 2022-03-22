import * as argon from 'argon2';

/**
 * @param plainText {string} the plain text to hash
 * @returns {string} the generated hash
 */
export const hashPlainText = async (plainText: string): Promise<string> => argon.hash(plainText);
