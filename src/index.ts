//importa las clases? lol no programo hace 4 años
import { Application, Loader, Sprite } from 'pixi.js'
//crea objeto clase Application
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1024,
	height: 720
});

/*implemento loaders, mas abajo dice proposito
no se si es mejor implementarlos al momento de agregarlos o todos al principio
podré escribir solo "stage2.png"? [] */
Loader.shared.add({url: "./stage2.png", name: "stage2"});
Loader.shared.add({url: "./ryu-hq.gif", name: "ryu"});
/* esto es para que cuando termine o se carguen esas imgs se ejecute esto
ni idea cuando se usa esta "funcion flechita" y no "function (){}" */
Loader.shared.onComplete.add(()=>{
	//escribo en consola JS
	console.log("Implementando background...");

	/*fondo
	entiendo que debería definir mejor el anchor para ubicarlo mas facil
	ni se si hay un método para definir fondos [] */
	const background: Sprite = Sprite.from("stage2");
	background.anchor.set(0.5);
	background.x = 300;
	background.y = 240;
	app.stage.addChild(background);

	console.log("Implementando character...");

	/*crea objeto tipo sprite (no se por que const y no let)
	en vez de crear con "new Sprite({" pixi tiene metodo estatico "Sprite.from" */
	const character: Sprite = Sprite.from("ryu");
	/*define ancla o punto de referencia en el sprite para manipular posicion
	lo que no entiendo es que valor es ese 0.5, un eje?
	por defecto es arriba a la izquierda */
	character.anchor.set(0.5);
	/*define posición del sprite en pantalla, al caso al centro via dividir por 2 sus medidas X Y
	las coordenadas 0,0 serían arriba a la izquierda */
	character.x = app.screen.width / 2;
	character.y = app.screen.height - 250;
	/*agrega el sprite a la pantalla, no se que sería "stage" []
	y si el "addChild" tiene que ver con alguna estructura clasica */
	app.stage.addChild(character);

	
	console.log("Todos los sprites implementados.");
	console.log("Background",background.width,"x",background.height);
	console.log("Character",character.width,"x",character.height);
	/*tira que sus dimensiones son 1x1, porque todavía no se cargó la imagen
	para hacer que consulte un sprite cargado, usamos un loader (clase de pixi)
	usando su nombre en lugar de una URL al crear un sprite lograremos el cometido
	no se que es una "referencia" de Loader cuando habla de .shared
	se puede crear un loader no compartido (no se en que casos convendría)
	algunas ventajas de usar el loader:
	- usamos el nombre del elemento en vez de su dirección URL
	- evitamos tener que escribir toda una url (lol idem) */
});

/*asi inicio el Loader y su efecto "onComplete"
tiene que ir todo dentro del loader? */
Loader.shared.load();
