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

    show = false;
    private subscription: Subscription;

    @Input()
    enabled: boolean = true;

    @Input()
    showIcon: boolean = false;


    @Input()
    overlayBackground: string = "#BABABA";

    @Input()
    iconClasses: string = "fa fa-circle-o-notch fa-spin fa-3x fa-fw";


    constructor(private loaderService: LoaderService) {
        this.enabled = true;
        this.showIcon = false;
    }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
            this.show = state.callingCount != 0;
            this.showIcon = this.show && this.enabled;
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
