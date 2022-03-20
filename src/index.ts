//importa las clases? lol no programo hace 4 años
import { Application, Loader } from 'pixi.js'
import { assets } from './assets';
import { Scene } from './Scene';
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
Loader.shared.add(assets);
/* esto es para que cuando termine o se carguen esas imgs se ejecute esto
ni idea cuando se usa esta "funcion flechita" y no "function (){}" */
Loader.shared.onComplete.add(()=>{
	//creo el objeto clase scene y lo dispongo en pantalla
	const sceneyep = new Scene();
	app.stage.addChild(sceneyep);
});	

/*asi inicio el Loader y su efecto o evento "onComplete"
tiene que ir todo dentro del loader? */
Loader.shared.load();