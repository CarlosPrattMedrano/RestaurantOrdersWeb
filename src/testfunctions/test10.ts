export function hey(message: string): string {
    message = message.trim();
    const isAQuestion = message.endsWith('?');
    const noLetters = message.replace(/[^a-zA-Z]/g, '') === '';
    const isYelling = message === message.toUpperCase() && noLetters === false;

    if (message === '') {
        return 'Fine. Be that way!';
    }
    else if (isYelling && isAQuestion) {
        return "Calm down, I know what I'm doing!";
    }
    else if (isAQuestion) {
        return 'Sure.';
    }
    else if (isYelling) {
        return 'Whoa, chill out!';
    }
    else{
        return 'Whatever.';
    }
}