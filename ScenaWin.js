let flagWin = 0;
let liv2un = 0;
let liv3un = 0;
let liv4un = 0;
let liv5un = 0;

class ScenaWin extends Phaser.Scene{

    constructor(){
        super("ScenaWin")
    }

    init (data){
        if(data.liv2 != undefined){
            liv2un = data.liv2
        }

        if(data.liv3 != undefined){
            liv3un = data.liv3
        }

        if(data.liv4 != undefined){
            liv4un = data.liv4
        }

        if(data.liv5 != undefined){
            liv5un = data.liv5
        }

    }

    preload(){
        this.load.image('TreStelle', './Assets/Complete3.png');
        this.load.image('winButton', './Assets/home.png');
    }

    create(){
        this.TreStelle = this.add.image(915, 425, 'TreStelle').setDepth(10).setScale(2);
        this.WinButton = this.add.image(915, 710, 'winButton').setDepth(10).setScale(0.2);

        this.WinButton.setInteractive().on('pointerup', function(pointer){
            flagWin = 1;
        });

    }

    update(time,delta){
        if(flagWin == 1){
            this.scene.start('Home',{liv2: liv2un, 
                                    liv3: liv3un,
                                    liv4: liv4un, 
                                    liv5: liv5un});
            flagWin = 0;
        }
    }

}

export default ScenaWin;