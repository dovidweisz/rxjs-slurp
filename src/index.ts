import { globParser$ } from 'helpers/globParser';



export function init$(globArg: string | string[]) {
    return globParser$(globArg);
}
