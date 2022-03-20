import { Container, Sprite } from "pixi.js";

/*creo una clase para manipular o llamar esa disposicion de assets y aprolijar el index
como no es un objeto de pixie no lo podria usar y poner en pantalla
por lo que uso "extends" para señalar que se trata de tal?
-> "this interface inherits the properties and methods of the class" */
export class Ryuorb extends Container{
    //un constructor para esta clase, es para llamar al constructor padre de Container
    constructor()
    {
        super();
        /*crea objeto tipo sprite (no se por que const y no let)
        en vez de crear con "new Sprite({" pixi tiene metodo estatico "Sprite.from" */
        const character: Sprite = Sprite.from("ryu");
        /*define ancla o punto de referencia en el sprite para manipular posicion
        lo que no entiendo es que valor es ese 0.5, un eje?
        por defecto es arriba a la izquierda */

        /*estoy creando un "accesorio" del personaje en un mismo plano
        por eso defino el personaje en dimensiones por defecto
        y ajusto el accesorio a este, para luego manipular ambos juntos como containers */
        const orb: Sprite = Sprite.from("orb");
        orb.position.set(-60,-80);

        //agrego al container los sprites en orden
        //con this señalo contexto, "al objeto de esta clase le agrego"...
        this.addChild(character);
        this.addChild(orb);
    }
}