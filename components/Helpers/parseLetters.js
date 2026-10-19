export function parseLetters(string) {
    return string.replace(/[^a-z0-9]/gi,'');
}