import { readFile } from 'fs';
import { Observable } from 'rxjs/Observable';
import * as Vinyl from 'vinyl';

import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { globParser$, getBase } from './helpers/index';


const fs_readFile$$ = Observable.bindNodeCallback(readFile);



export function init$(globArg: string | string[]): Observable<Vinyl> {
    if(typeof globArg === 'string'){
        return _globToVinyl$(globArg);
    }
    return Observable.from(globArg)
        .mergeMap(globString => _globToVinyl$(globString) );
}

function _globToVinyl$(globString: string): Observable<Vinyl>{
    return globParser$(globString)
        .mergeMap((filePath: string) => {
            const cwd = process.cwd();
            const base = getBase(globString, cwd);
            return fs_readFile$$(filePath)
                .map(fileContents =>
                    new Vinyl({
                        cwd,
                        base,
                        path: filePath,
                        contents: fileContents,
                    }));
        });
}
