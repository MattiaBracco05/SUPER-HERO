import Home from "./Home.js";
import PrimaScena from "./PrimaScena.js";
import SecondaScena from "./SecondaScena.js";
import TerzaScena from "./TerzaScena.js";
import QuartaScena from "./QuartaScena.js";
import QuintaScena from "./QuintaScena.js";
import GameOver from "./GameOver.js";
import ScenaWin from "./ScenaWin.js";



let config = {
    width: 1853,
    height: 850,
    parent: 'Scena',
    backgroundColor: 0x6888ff,
    physics:{
        default:"arcade",
        arcade:{gravity:{y:400},debug:false},
        
    },
    scene: [Home,PrimaScena,SecondaScena,TerzaScena,QuartaScena,QuintaScena,GameOver,ScenaWin]
 };

 let game = new Phaser.Game(config);
