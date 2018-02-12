export function isCurrencyValid(value: string): RegExpMatchArray {
    return value.match(/^\d+\.?(\.\d{1,2})?$/);
}
