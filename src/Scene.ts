import { Container, Sprite } from "pixi.js";
import { Ryuorb } from "./Ryuorb";

export class Scene extends Container {
    constructor()
    {
        super();

        /*fondo
        entiendo que debería definir mejor el anchor para ubicarlo mas facil
        ni se si hay un método para definir fondos [] */
        const background: Sprite = Sprite.from("stage2");
        background.anchor.set(0.5);
        background.x = 400;
        background.y = 245;
        this.addChild(background);
        //podria crear una clase "Background" o "Stage" para esto tambien []
        
        /*creo objeto tipo Ryuorb
        ahora en vez de señalarlo tipo container directamente lo señalo tipo Ryuorb */
        const characterAcc: Ryuorb = new Ryuorb();
        //agrega el container a la pantalla
        this.addChild(characterAcc);
    }
}