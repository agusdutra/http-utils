import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Observable} from "../node_modules/rxjs/Observable";
/**
 * Created by agusdutra on 28/1/17.
 *
 * Servicio al cual se subscriben los componentes loaders para saber el estado en el cual se encuentra la aplicación con respecto a las llamadas HTTP
 *
 * Es llamado desde la implementacion de HTTP propia.
 *
 */
@Injectable()
export class LoaderService {
    get excludedPaths(): string[] {
        return this._excludedPaths;
    }

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();
    callingCount: number = 0;

    private _excludedPaths: string[] = [];

    constructor() {
        this._excludedPaths = [];
        this.callingCount = 0;
    }

    /**
     * Llamada cuando comienza ejecucion de llamada a Servicio. Setea el estado en true
     */
    showPreloader(url?: string) {
        if (!this.excludedPaths.find(f => f == url)) {
            this.callingCount++
            this.loaderSubject.next(<LoaderState>{callingCount: this.callingCount});
        }
    };

    /**
     * Llamado cuando finaliza llamada a Servicio HTTP. Setea el estado en false.
     */
    hidePreloader(url?: string) {
        if (!this.excludedPaths.find(f => f == url)) {
            this.callingCount--;
            this.loaderSubject.next(<LoaderState>{callingCount: this.callingCount});
        }
    };

    addExcludedPath(url: string) {
        this.excludedPaths.push(url);
    }
}

export class LoaderState {

    show(): boolean {
        return this.callingCount != 0;
    }

    callingCount: number = 0;

}
