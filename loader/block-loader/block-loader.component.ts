import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LoaderService, LoaderState} from "../loader.service";


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
@Component({
    selector: 'block-loader',
    templateUrl: './block-loader.component.html',
    styleUrls: ['./block-loader.component.scss']
})
export class BlockLoaderComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    /**
     * set true cuando no se quiere mostrar el loader por más que se esté realizando una llamada.
     * @type {boolean}
     */
    @Input()
    enabled: boolean = true;

    showLoader: boolean = false;

    /*    @Input()
     overlayBackground: string = "#BABABA";*/

    /**
     * clases que se utilizan para el icono que se muestra como loader.
     * @type {string}
     */
    @Input()
    iconClasses: string = "fa fa-circle-o-notch fa-spin fa-3x fa-fw";


    constructor(private loaderService: LoaderService) {
        this.enabled = true;
        this.showLoader = false;
    }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
            this.showLoader = state.callingCount != 0 && this.enabled;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    enable() {
        this.enabled = true;
    }

    disable() {
        this.enabled = false;
    }
}
