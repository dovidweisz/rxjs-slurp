import * as Vinyl from 'vinyl';

export function logVinlyFile(file: Vinyl) {
    console.log(`path: ${file.path}`);
    return file;
}