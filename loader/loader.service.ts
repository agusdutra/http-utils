import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
/**
 * Created by agusdutra on 28/1/17.
 *
 * Servicio al cual se subscriben los componentes loaders para saber el estado en el cual se encuentra
 * la aplicación con respecto a las llamadas HTTP
 *
 */
@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    private _excludedPaths: string[] = [];

    loaderState = this.loaderSubject.asObservable();
    callingCount = 0;

    get excludedPaths(): string[] {
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
        if (!this.excludedPaths.find(f => f === url)) {
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
        if (!this.excludedPaths.find(f => f === url)) {
            this.callingCount--;
            this.loaderSubject.next(<LoaderState>{callingCount: this.callingCount});
        }
    };

    addExcludedPath(url: string) {
        this.excludedPaths.push(url);
    }

    removeExcludedPath(url: string) {
        this.excludedPaths.push(url);
    }
}

export class LoaderState {

    show(): boolean {
        return this.callingCount !== 0;
    }

    callingCount = 0;

}
