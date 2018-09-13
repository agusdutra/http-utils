# http-utils

Extensión de @angular/http con puntos de intercepción para métodos GET, POST, PUT y DELETE.

Desde la versión 4.3  de angular y el HttpClientModule con interceptores, no tiene sentido la utilización de este proyecto.

> npm install http-utils


----------


**AbstractHttpService**

Clase que extiende HTTP, hace todas las llamadas de la misma forma, pero las wrappea para tener puntos de intercepción en las llamadas, de forma de que se puedan realizar acciones personalizadas de forma genérica para todas las Requests HTTP, o separandolas por tipo. Además se pueden agregar Headers de forma genérica para todas las llamadas.

**Puntos de Intercepción:**


	onBefore(url)

	onSuccess(url)

	onError(url)

	onFinally(url)

**LoaderService**

	beginCall(url?: string);
	endCall(url?: string);

	addExcludedPath(url: string);
	removeExcludedPath(url: string);

**BlockLoaderComponent**
*Inputs:*
	[enabled]: set true cuando no se quiere mostrar el loader por más que se esté realizando una llamada.
	[iconClasses]: clases que se utilizan para el icono que se muestra como loader.
