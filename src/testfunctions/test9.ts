const alphabet = 'abcdefghijklmnopqrstuvwxyz';
export function isPangram(sentence: string): boolean {
    const sentenceInLowerCase = sentence.toLowerCase();

    for (const letter of alphabet) {
        if (!sentenceInLowerCase.includes(letter)) {
            return false;
        }
    }
    return true;
}
