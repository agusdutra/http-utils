import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
/**
 * Created by agusdutra on 28/1/17.
 *
 * Servicio al cual se subscriben los componentes loaders para saber el estado en el cual se encuentra
 * la aplicación con respecto a las llamadas HTTP
 *
 */
export const ID_PATTERN = ':id'
export const HTTP_PATTERN = 'http://';
export const HTTPS_PATTERN = 'https://';
export const BASE_PATTERN = 'baseUrl';
export interface Paths {
    base: string;
    children: Paths[];
}
@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    private _excludedPaths: Paths[] = [];

    loaderState = this.loaderSubject.asObservable();
    callingCount = 0;

    get excludedPaths(): Paths[] {
        return this._excludedPaths;
    }

    constructor() {
        this._excludedPaths = [];
        this.callingCount = 0;
    }

    /**
     * Funcionalidad que es llamada cuando comienza ejecución de una request HTTP a un servicio.
     * Si recibe path a traves de parámetro y el mismo no se encuentra en la lista de excluidos, aumenta el contador y notifica a los subscriptores.
     *
     */
    beginCall(url?: string) {
        if (!this.isExcluded(url)) {
            this.callingCount++;
            this.loaderSubject.next(<LoaderState>{callingCount: this.callingCount});
        }
    };

    /**
     * Funcionalidad que es llamada cuando finaliza la ejecución de una request HTTP a un servicio.
     * Si recibe path a traves de parámetro y el mismo no se encuentra en la lista de excluidos,
     * reduce el contador y notifica a los subscriptores.
     */
    endCall(url?: string) {
        if (!this.isExcluded(url)) {
            this.callingCount--;
            this.loaderSubject.next(<LoaderState>{callingCount: this.callingCount});
        }
    };

    public addExcludedPath(url: string) {
        let pathArray = this.splitUrl(url);

        this.addPathRecursive(pathArray, this.excludedPaths);
    }

    removeExcludedPath(url: string) {
        let pathArray = this.splitUrl(url);
        this.removeExcludedPathRecurisve(pathArray, this.excludedPaths);
    }

    private isExcluded(url): boolean {
        if (url && this.excludedPaths.length > 0) {
            let pathArray = this.splitUrl(url);
            return this.isExcludedRecursive(pathArray, this.excludedPaths);
        } else {
            return false;
        }
    }

    private isExcludedRecursive(path: string[], excludedPaths: Paths[]): boolean {
        let base = path.shift();
        if (base) {
            if (!isNaN(parseInt(base))) {
                base = ID_PATTERN;
            }
            let excluded: Paths = excludedPaths.find(f => f.base == base);
            if (excluded && excluded.children && excluded.children.length > 0) {
                return this.isExcludedRecursive(path, excluded.children);
            } else if (excluded && ( !excluded.children || excluded.children.length == 0)) {
                return true;
            } else {
                return false;
            }
        }
    }

    private addPathRecursive(path: string[], excludedPaths: Paths[]) {
        let base = path.shift();
        if (base) {
            if (!isNaN(parseInt(base))) {
                base = ID_PATTERN;
            }
            let excluded: Paths = excludedPaths.find(f => f.base == base);
            if (!excluded) {
                excluded = {base: base, children: []};
                excludedPaths.push(excluded);
            }
            this.addPathRecursive(path, excluded.children);
        }
    }


    private removeExcludedPathRecurisve(path: string[], excludedPaths: Paths[]) {
        let base = path.shift();
        if (base) {
            if (!isNaN(parseInt(base))) {
                base = ID_PATTERN;
            }
            let excluded: Paths = excludedPaths.find(f => f.base == base);
            if (excluded) {
                this.removeExcludedPathRecurisve(path, excluded.children);
                if (!excluded.children || excluded.children.length == 0) {
                    excludedPaths.splice(excludedPaths.findIndex(f => f.base == base));
                }

            }
        }
    }

    private splitUrl(url: string): string[] {
        if (url) {
            url = url.replace(HTTP_PATTERN, '');
            url = url.replace(HTTPS_PATTERN, '');
            let pathArray: string[] = url.split('/');
            return pathArray;
        } else {
            return null;
        }
    }
}

export class LoaderState {

    show(): boolean {
        return this.callingCount !== 0;
    }

    callingCount = 0;

}
