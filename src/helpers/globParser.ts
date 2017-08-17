import { readFile } from 'fs';
import { Observable } from 'rxjs/Observable';
import * as glob from 'glob';
import * as Vinyl from 'vinyl';

import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

const glob$$ = Observable.bindNodeCallback(glob);
const fs_readFile$$ = Observable.bindNodeCallback(readFile);

export function globParser$$(globArg: string | string[]): Observable<Vinyl> {
    if(typeof globArg === 'string'){
        globArg = [globArg as string];
    }
    return Observable.from(globArg)
        .mergeMap(globString => _stringGlobParser$$(globString));
}

function _stringGlobParser$$(globString: string): Observable<Vinyl>{
    return glob$$(globString)
        .mergeMap((files: string[]) => Observable.from(files))
        .mergeMap(filePath =>
            fs_readFile$$(filePath)
                .map(fileContents =>
                    new Vinyl({
                        cwd: process.cwd(),
                        base: '',
                        path: filePath,
                        contents: fileContents,
                    })
                )
        );
}

