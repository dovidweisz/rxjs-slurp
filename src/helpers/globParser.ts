import { Observable } from 'rxjs/Observable';
import * as glob from 'glob';

import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

const glob$$ = Observable.bindNodeCallback(glob);

export function globParser$(globString: string ): Observable<string> {
    return _stringGlobParser$(globString);
}

function _stringGlobParser$(globString: string): Observable<string>{
    return glob$$(globString)
        .mergeMap((files: string[]) => Observable.from(files));
}

