import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LoaderService, LoaderState} from "../../../servicios/Http/loader.service";

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
export class BlockLoaderComponent implements OnInit {
  //atributo que si está en true es porque se está realizando alguna llamada al servidor.
  show = false;
  //atributo que indica si el loader está habilitado. Se activa/desactiva desde los componentes que usan el loader.
  enabled: boolean = true;

  showIcon: boolean = false;

  private subscription: Subscription;

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
