let livello1 = 0; 
let livello2 = 0; 
let livello3 = 0; 
let livello4 = 0; 
let livello5 = 0; 
let livello2Sbloccato = 0
let livello3Sbloccato = 0
let livello4Sbloccato = 0
let livello5Sbloccato = 0


class Home extends Phaser.Scene{

    constructor(){
        super("Home")
    }

    preload(){
        this.load.image('screen', './Assets/Menu.png');
        this.load.image('lvl1', './Assets/Lvl_01.png');
        this.load.image('lvl2', './Assets/Lvl_02.png');
        this.load.image('lvl3', './Assets/Lvl_03.png');
        this.load.image('lvl4', './Assets/Lvl_04.png');
        this.load.image('lvl5', './Assets/Lvl_05.png');
    }

    create(){
        this.screen = this.add.image(915, 425, 'screen').setDepth(10).setScale(2);
        this.LVL1 = this.add.image(400, 200, 'lvl1').setDepth(10).setScale(1);
        this.LVL2 = this.add.image(900, 200, 'lvl2').setDepth(10).setScale(1);
        this.LVL3 = this.add.image(1400, 200, 'lvl3').setDepth(10).setScale(1);
        this.LVL4 = this.add.image(600, 500, 'lvl4').setDepth(10).setScale(1);
        this.LVL5 = this.add.image(1200, 500, 'lvl5').setDepth(10).setScale(1);

        this.LVL1.setInteractive().on('pointerup', function(pointer){
            livello1 = 1;
        });

        this.LVL2.setInteractive().on('pointerup', function(pointer){
            livello2 = livello2Sbloccato;
        });

        this.LVL3.setInteractive().on('pointerup', function(pointer){
            livello3 = livello3Sbloccato;
        });

        this.LVL4.setInteractive().on('pointerup', function(pointer){
            livello4 = livello4Sbloccato;
        });

        this.LVL5.setInteractive().on('pointerup', function(pointer){
            livello5 = livello5Sbloccato;
        });

    }

    update(time,delta){
        if(livello1 == 1){
            this.scene.start('PrimaScena');

            livello1 = 0;
        }

        if(livello2 == 2){
            this.scene.start('SecondaScena');

            livello2 = 0;
        }

        if(livello3 == 3){
            this.scene.start('TerzaScena');

            livello3 = 0;
        }

        if(livello4 == 4){
            this.scene.start('QuartaScena');

            livello4 = 0;
        }

        if(livello5 == 5){
            this.scene.start('QuintaScena');

            livello5 = 0;
        }

    }

    init (data){
        if(data.liv2 != undefined){
            livello2Sbloccato = data.liv2
        }
        if(data.liv3 != undefined){
            livello3Sbloccato = data.liv3
        }
        if(data.liv4 != undefined){
            livello4Sbloccato = data.liv4
        }
        if(data.liv5 != undefined){
            livello5Sbloccato = data.liv5
        }
    }

}

export default Home;
