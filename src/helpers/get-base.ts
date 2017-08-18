const globDirSearch = /\*\*/

export function getBase(globString: string, cwd: string): string {
    let result = globString.match(globDirSearch);
    if(result){
        return result[1];
    }
    return "";
}
