
export function wrapFilterFragment(filterFragment: string) {
    if (!filterFragment.includes('return '))
        filterFragment = `return (${filterFragment})`;
    return filterFragment;
}

export function injectFindFunc(fullFilterCode: string) {
    const code = fullFilterCode;
    if (!code.includes('find'))
        return code;


    const regexFindPropGlobal = /findProp\('(.*?)'\)/g;
    const regexFindProp = /findProp\('(.*?)'\)/;

    // Find the group of occurrences
    const findPropOccurences = code.match(regexFindPropGlobal) || [];

    findPropOccurences.forEach(occurence => {
        // Extract the attributes or keys from the string
        const keysMatch = occurence.match(regexFindProp) || [];
        const keys = keysMatch[1]?.split('.') ?? [];

        // Map it from 'key.key' into ['key']['key']
        const replacedKeys = keys.map(key => `['${key}']`);
        const replacedString = `value${replacedKeys.join('')}`;

        // Replace the code with the replaced string
        // From: findProp('key.key')
        // To: value['key']['key']
        // code = code.replace(occurence, replacedString);
    });
}

export function sanitizeString(input: string) {
    return encodeURIComponent(input).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode(parseInt('0x' + p1, 16));
        });
}