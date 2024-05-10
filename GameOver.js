let flagOver = 0;

class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver")
    }

    preload(){
        this.load.image('screenOver', './Assets/Complete0.png');
        this.load.image('overButton', './Assets/home.png');
    }

    create(){
        this.screen = this.add.image(915, 425, 'screenOver').setDepth(10).setScale(2);
        this.OverButton = this.add.image(940, 710, 'overButton').setDepth(10).setScale(0.2);

        this.OverButton.setInteractive().on('pointerup', function(pointer){
            flagOver = 1;
        });


    }

    update(time,delta){
        if(flagOver == 1){
            this.scene.start('Home');
            flagOver = 0;
        }

    }
}

export default GameOver;