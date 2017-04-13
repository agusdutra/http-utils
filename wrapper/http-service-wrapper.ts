import {Http, RequestOptionsArgs, XHRBackend, Headers, Response, Request, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Clase que extiende HTTP, hace todas las llamadas igual, pero las wrappea para interceptar
 * las llamadas y poder realizar acciones personalizadas de forma genérica para todas las llamadas al backend.
 */

@Injectable()
export abstract class AbstractHttpService extends Http {


    constructor(backend: XHRBackend,
                defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    /**
     * Performs any type of http request.
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.requestInterceptor(url);
        return super.request(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccess(res);
            }, (error: any) => {
                this.onSubscribeError(error);
            })
            .finally(() => {
                this.onFinally(url);
            });
    }


    /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptorGET(url);
        return super.get(url, this.requestOptionsGET(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccessGET(res);
            }, (error: any) => {
                this.onSubscribeErrorGET(error);
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
        this.requestInterceptorPOST(url);
        return super.post(url, body, this.requestOptionsPOST(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccessPOST(res);
            }, (error: any) => {
                this.onSubscribeErrorPOST(error);
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
        this.requestInterceptorPUT(url);
        return super.put(url, body, this.requestOptionsPUT(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccessPUT(res);
            }, (error: any) => {
                this.onSubscribeErrorPUT(error);
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
        this.requestInterceptorDELETE(url);
        return super.delete(url, this.requestOptionsDELETE(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSubscribeSuccessDELETE(res);
            }, (error: any) => {
                this.onSubscribeErrorDELETE(error);
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
    protected abstract requestInterceptor(url): void;

    protected requestInterceptorGET(url) {
        this.requestInterceptor(url);
    }

    protected requestInterceptorPOST(url) {
        this.requestInterceptor(url);
    }

    protected requestInterceptorPUT(url) {
        this.requestInterceptor(url);
    }

    protected requestInterceptorDELETE(url) {
        this.requestInterceptor(url);
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
    protected abstract onSubscribeSuccess(res: Response): void;

    protected  onSubscribeSuccessGET(res: Response): void {
        this.onSubscribeSuccess(res);
    }

    protected  onSubscribeSuccessPOST(res: Response): void {
        this.onSubscribeSuccess(res);
    }

    protected  onSubscribeSuccessPUT(res: Response): void {
        this.onSubscribeSuccess(res);
    }

    protected  onSubscribeSuccessDELETE(res: Response): void {
        this.onSubscribeSuccess(res);
    }

    /**
     * Intercepta errores de llamada
     * @param error
     */
    protected abstract onSubscribeError(error: any): void;

    protected onSubscribeErrorGET(error: any): void {
        this.onSubscribeError(error);
    }

    protected onSubscribeErrorPOST(error: any): void {
        this.onSubscribeError(error);
    }

    protected onSubscribeErrorPUT(error: any): void {
        this.onSubscribeError(error);
    }

    protected onSubscribeErrorDELETE(error: any): void {
        this.onSubscribeError(error);
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
