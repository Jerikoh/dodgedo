//importa las clases? lol no programo hace 4 años
import { Application, Sprite } from 'pixi.js'
//crea objeto clase Application
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1024,
	height: 720
});
/*crea objeto tipo sprite (no se por que const y no let)
en vez de crear con "new Sprite({" pixi tiene metodo estatico "Sprite.from" */
const clampy: Sprite = Sprite.from("clampy.png");
/*define ancla o punto de referencia en el sprite para manipular posicion
lo que no entiendo es que valor es ese 0.5, un eje? */
clampy.anchor.set(0.5);
/*define posición del sprite en pantalla, al caso al centro via dividir por 2 sus medidas X Y
las coordenadas 0,0 serían arriba a la izquierda */
clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;
/*agrega el sprite a la pantalla, no se que sería "stage"[]
y si el "addChild" tiene que ver con alguna estructura clasica */
app.stage.addChild(clampy);