//importa las clases? lol no programo hace 4 años
import { Application, Loader, Sprite } from 'pixi.js'
//crea objeto clase Application
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1240,
	height: 720
});

//haremos "responsivo" el tamaño de la pantalla 
//esta funcion hará que se nos avise cuando la ventana del navegador cambie de tamaño
window.addEventListener("resize",()=>{
	console.log("resized!");
	/*base al ancho y alto que le dimos a pixi en "app"
	y a las dimensiones de la ventana del navegador
	hacemos regla de tres para calcular cuantas veces deberia agrandarse o achicarse la pantalla */
	const swidth = window.innerWidth / app.screen.width;
	const sheight = window.innerHeight / app.screen.height;
	/*calculamos las dos escalas porque se tiene que escalar uniformemente usando solo una
	para que encastre justo en la pantalla debemos usar la menor de las dos
	y lo sabremos a traves de esta funcion */
	const scale = Math.min(swidth, sheight);
	/*aplico el ajuste al tamaño actual de pantalla
	primero consulto y multiplico los valores y luego se los aplico a la variable
	redondeo los valores para que no joda en px */
	const rewidth = Math.round(app.screen.width * scale);
	const reheight = Math.round(app.screen.height * scale);
	app.view.style.width = rewidth + "px"; //tiene que indicarse en pixeles, no un simple numero
	app.view.style.height = reheight + "px";
	
	/*falta que la pantalla quede centrada y no con esa barra negra
	el margen es la diferencia entre tamaño de ventana y de la pantalla del juego
	necesito saber cual es la mitad de cada margen (vert y horiz)
	uso "floor" para que no se me escape ni medio pixel de la pantalla caso de quedar 0.5*/
	const marginHor = Math.floor((window.innerWidth - rewidth) / 2);
	const marginVert = Math.floor((window.innerHeight - reheight) / 2);
	//ahora defino los margenes en la pantalla asignando estas mitades
	app.view.style.marginLeft = marginHor + "px";
	app.view.style.marginRight = marginHor + "px";
	app.view.style.marginTop = marginVert + "px";
	app.view.style.marginBottom = marginVert + "px";
})
/*y ahora despacho un evento "resize" para que se aplique desde un principio
y no solo tras gatillar el evento */
window.dispatchEvent(new Event("resize"));

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
	background.x = 400;
	background.y = 245;
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
	character.x = app.screen.width / 2; //se puede usar .position.set(x,y)
	character.y = app.screen.height - 225;
	character.scale.x = 0.9; //se puede usar .scale.set(0.9,0.9) para setear x,y a la vez
	character.scale.y = 0.9;
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
