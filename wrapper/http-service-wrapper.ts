import {Http, RequestOptionsArgs, XHRBackend, Headers, Response, Request, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Clase que extiende HTTP, hace todas las llamadas de la misma forma, pero las wrappea para tener puntos de intercepción
 * en las llamadas, de forma de que se puedan realizar acciones personalizadas de forma genérica para todas las Requests HTTP,
 * o separandolas por tipo. Además se pueden agregar Headers de forma genérica para todas las llamadas.
 */

@Injectable()
export abstract class AbstractHttpService extends Http {


    constructor(backend: XHRBackend,
                defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.onBeforeGET(url);
        return super.get(url, this.requestOptionsGET(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccessGET(res);
            }, (error: any) => {
                this.onErrorGET(error);
            })
            .finally(() => {
                this.onFinallyGET(url);
            });
    }


    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.onBeforePOST(url);
        return super.post(url, body, this.requestOptionsPOST(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccessPOST(res);
            }, (error: any) => {
                this.onErrorPOST(error);
            })
            .finally(() => {
                this.onFinallyPOST(url);
            });
    }


    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<>}
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.onBeforePUT(url);
        return super.put(url, body, this.requestOptionsPUT(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccessPUT(res);
            }, (error: any) => {
                this.onErrorPUT(error);
            })
            .finally(() => {
                this.onFinallyPUT(url);
            });
    }


    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.onBeforeDELETE(url);
        return super.delete(url, this.requestOptionsDELETE(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccessDELETE(res);
            }, (error: any) => {
                this.onErrorDELETE(error);
            })
            .finally(() => {
                this.onFinallyDELETE(url);
            });
    }

    /**
     * Request options.
     * Hace set de los parametros que se envian como argumentos de las RequestOptions,
     * esta incluye los Headers, parametros
     * Puede recibir desde la llamada o se puede implementar
     * para que todas las llamadas en general, o de cada uno de los tipos de Requests, tengan los mismos headers.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    protected abstract requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs;

    protected  requestOptionsGET(options?: RequestOptionsArgs): RequestOptionsArgs {
        return this.requestOptions(options);
    };

    protected  requestOptionsPOST(options?: RequestOptionsArgs): RequestOptionsArgs {
        return this.requestOptions(options);
    };

    protected  requestOptionsPUT(options?: RequestOptionsArgs): RequestOptionsArgs {
        return this.requestOptions(options);
    };

    protected  requestOptionsDELETE(options?: RequestOptionsArgs): RequestOptionsArgs {
        return this.requestOptions(options);
    };


    /**
     * Intercepta la llamada, muestra preloader
     */
    protected abstract onBefore(url): void;

    protected onBeforeGET(url) {
        this.onBefore(url);
    }

    protected onBeforePOST(url) {
        this.onBefore(url);
    }

    protected onBeforePUT(url) {
        this.onBefore(url);
    }

    protected onBeforeDELETE(url) {
        this.onBefore(url);
    }


    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    /**
     * Intercepta la llamada cuando retorna success
     * @param res
     */
    protected abstract onSuccess(res: Response): void;

    protected  onSuccessGET(res: Response): void {
        this.onSuccess(res);
    }

    protected  onSuccessPOST(res: Response): void {
        this.onSuccess(res);
    }

    protected  onSuccessPUT(res: Response): void {
        this.onSuccess(res);
    }

    protected  onSuccessDELETE(res: Response): void {
        this.onSuccess(res);
    }

    /**
     * Intercepta errores de llamada
     * @param error
     */
    protected abstract onError(error: any): void;

    protected onErrorGET(error: any): void {
        this.onError(error);
    }

    protected onErrorPOST(error: any): void {
        this.onError(error);
    }

    protected onErrorPUT(error: any): void {
        this.onError(error);
    }

    protected onErrorDELETE(error: any): void {
        this.onError(error);
    }

    /**
     * onFinally
     */
    protected abstract onFinally(url): void;

    protected onFinallyGET(url): void {
        this.onFinally(url);
    }

    protected onFinallyPOST(url): void {
        this.onFinally(url);
    }

    protected onFinallyPUT(url): void {
        this.onFinally(url);
    }

    protected onFinallyDELETE(url): void {
        this.onFinally(url);
    }


}
