declare module 'http-service-wrapper/http-service-wrapper' {
	import { Http, RequestOptionsArgs, XHRBackend, Response, Request, RequestOptions } from "@angular/http";
	import { Observable } from "rxjs";
	/**
	 * Clase que extiende HTTP, hace todas las llamadas igual, pero las wrappea para interceptar
	 * las llamadas y poder realizar acciones personalizadas de forma genérica para todas las llamadas al backend.
	 * Created by agusdutra on 3/1/17.
	 */
	export abstract class AbstractHttpService extends Http {
	    constructor(backend: XHRBackend, defaultOptions: RequestOptions);
	    /**
	     * Performs any type of http request.
	     * @param url
	     * @param options
	     * @returns {Observable<Response>}
	     */
	    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
	    /**
	     * Performs a request with `get` http method.
	     * @param url
	     * @param options
	     * @returns {Observable<>}
	     */
	    get(url: string, options?: RequestOptionsArgs): Observable<any>;
	    /**
	     * Performs a request with `post` http method.
	     * @param url
	     * @param body
	     * @param options
	     * @returns {Observable<>}
	     */
	    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
	    /**
	     * Performs a request with `put` http method.
	     * @param url
	     * @param body
	     * @param options
	     * @returns {Observable<>}
	     */
	    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any>;
	    /**
	     * Performs a request with `delete` http method.
	     * @param url
	     * @param options
	     * @returns {Observable<>}
	     */
	    delete(url: string, options?: RequestOptionsArgs): Observable<any>;
	    /**
	     * Error handler.
	     * @param error
	     * @param caught
	     * @returns {ErrorObservable}
	     */
	    onCatch(error: any, caught: Observable<any>): Observable<any>;
	    /**
	     * Intercepta la llamada cuando retorna success
	     * @param res
	     */
	    protected abstract onSubscribeSuccess(res: Response): void;
	    protected onSubscribeSuccessGET(res: Response): void;
	    protected onSubscribeSuccessPOST(res: Response): void;
	    protected onSubscribeSuccessPUT(res: Response): void;
	    protected onSubscribeSuccessDELETE(res: Response): void;
	    /**
	     * Intercepta errores de llamada
	     * @param error
	     */
	    protected abstract onSubscribeError(error: any): void;
	    protected onSubscribeErrorGET(error: any): void;
	    protected onSubscribeErrorPOST(error: any): void;
	    protected onSubscribeErrorPUT(error: any): void;
	    protected onSubscribeErrorDELETE(error: any): void;
	    /**
	     * onFinally
	     */
	    protected abstract onFinally(): void;
	    protected onFinallyGET(): void;
	    protected onFinallyPOST(): void;
	    protected onFinallyPUT(): void;
	    protected onFinallyDELETE(): void;
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
	    protected requestOptionsGET(options?: RequestOptionsArgs): RequestOptionsArgs;
	    protected requestOptionsPOST(options?: RequestOptionsArgs): RequestOptionsArgs;
	    protected requestOptionsPUT(options?: RequestOptionsArgs): RequestOptionsArgs;
	    protected requestOptionsDELETE(options?: RequestOptionsArgs): RequestOptionsArgs;
	    /**
	     * Intercepta la llamada, muestra preloader
	     */
	    protected abstract requestInterceptor(): void;
	    protected requestInterceptorGET(): void;
	    protected requestInterceptorPOST(): void;
	    protected requestInterceptorPUT(): void;
	    protected requestInterceptorDELETE(): void;
	    /**
	     * Intercepta la respuesta, oculta preloader
	     */
	    abstract responseInterceptor(): void;
	    responseInterceptorGET(): void;
	    responseInterceptorPOST(): void;
	    responseInterceptorPUT(): void;
	    responseInterceptorDELETE(): void;
	}

}
declare module 'http-service-wrapper/loader/loader.service' {
	import { Observable } from "rxjs";
	/**
	 * Created by agusdutra on 28/1/17.
	 *
	 * Servicio al cual se subscriben los componentes loaders para saber el estado en el cual se encuentra la aplicación con respecto a las llamadas HTTP
	 *
	 * Es llamado desde la implementacion de HTTP propia.
	 *
	 */
	export class LoaderService {
	    readonly excludedPaths: string[];
	    private loaderSubject;
	    loaderState: Observable<LoaderState>;
	    callingCount: number;
	    private _excludedPaths;
	    constructor();
	    /**
	     * Llamada cuando comienza ejecucion de llamada a Servicio. Setea el estado en true
	     */
	    showPreloader(url?: string): void;
	    /**
	     * Llamado cuando finaliza llamada a Servicio HTTP. Setea el estado en false.
	     */
	    hidePreloader(url?: string): void;
	    addExcludedPath(url: string): void;
	}
	export class LoaderState {
	    show(): boolean;
	    callingCount: number;
	}

}
declare module 'http-service-wrapper/loader/block-loader/block-loader.component' {
	import { OnInit, OnDestroy } from '@angular/core';
	import { LoaderService } from 'http-service-wrapper/loader/loader.service';
	/**
	 * Componente Block loader
	 * Este componente debe ser utilizado para que se bloquee el
	 * componente al cual se lo inserta en el momento en el cual se está realizando una llamada HTTP al servidor
	 *
	 * El contenido HTML de este componente es visible solamente cuando show = true.
	 * Show = true cuando la subscripcion al servicio loader está en estado TRUE
	 *
	 * La subscripcion al servicio loader está en true en el momento en el que se está realizando CUALQUIER
	 * llamada al servidor y se está esperando por una respuesta
	 *
	 * Puede ser extendida para utilizar otros HTML que no sean bloquantes, sino que solamente muestren el spinner.. etc.
	 *
	 */
	export class BlockLoaderComponent implements OnInit, OnDestroy {
	    private loaderService;
	    private show;
	    private subscription;
	    enabled: boolean;
	    showIcon: boolean;
	    overlayBackground: string;
	    iconClasses: string;
	    constructor(loaderService: LoaderService);
	    ngOnInit(): void;
	    ngOnDestroy(): void;
	    enable(): void;
	    disable(): void;
	}

}
declare module 'http-service-wrapper/loader/loader.module' {
	/**
	 * Created by agusdutra on 28/1/17.
	 *
	 * Modulo en el cual se agrupan todos los loaders que se quieran crear
	 * Los loaders son componentes que tienen como objetivo mostrarse en el momento en el cual se están haciendo llamadas al servidor
	 *
	 */
	export class LoaderModule {
	}

}
