import {NgModule} from "../node_modules/@angular/core/src/metadata/ng_module";
import {BlockLoaderComponent} from "./block-loader/block-loader.component";
import {BrowserModule} from "../node_modules/@angular/platform-browser/src/browser";
import {HttpModule} from "../node_modules/@angular/http/src/http_module";
import {LoaderService} from "./loader.service";
/**
 * Created by agusdutra on 28/1/17.
 *
 * Modulo en el cual se agrupan todos los loaders que se quieran crear
 * Los loaders son componentes que tienen como objetivo mostrarse en el momento en el cual se están haciendo llamadas al servidor
 *
 */
@NgModule({
    declarations: [
        BlockLoaderComponent],
    imports: [BrowserModule, HttpModule
    ],
    exports: [BlockLoaderComponent],
    entryComponents: [BlockLoaderComponent],
    providers: [LoaderService],
    bootstrap: [BlockLoaderComponent]

})
export class LoaderModule {
}
