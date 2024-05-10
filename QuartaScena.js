let PlayerLife = 400;
let score = 0;
let piantaNo = false
let piantaYes = false
let piantaNo2 = false
let piantaYes2 = false
let canOpenChest = 0;
let oneTimeBounce = 0;
let destroyBox = 0;
let oneStar = 1;
let spawnOneTime = 1
let dragoOneTime = 1;
let livello5Sbloccato = 5;

class QuartaScena extends Phaser.Scene{

    constructor(){
        super("QuartaScena")
    }

    preload(){
        this.load.image('TileMap', './Assets/Sfondo.png');
        this.load.image('LifeBar', './Assets/LifeBar.jpg');
        this.load.image('player', './Assets/player.png');
        this.load.image('level4', './Assets/Livello4.png');
        this.load.image('Pianta', './Assets/Pianta.png');
        this.load.image('Star', './Assets/star.png');
        this.load.image('ChestLocked', './Assets/ChestLocked.png');
        this.load.image('Key', './Assets/Key.png');
        this.load.image('Trampolino', './Assets/Trampolino.png');
        this.load.image('Enemy3', './Assets/Enemy3.png');
        this.load.image('Tubo', './Assets/Tubo.png');
        this.load.image('Box', './Assets/box.png');
        this.load.image('Hammer', './Assets/Hammer.png');
        this.load.image('Crown', './Assets/Crown.png');
        this.load.image('BabyDragon', './Assets/BabyDragon.png');
        this.load.image('door', './Assets/door.png');     
    }

    create(){
        this.tastiera = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, -1150, 3780, 1998);
        this.physics.world.setBounds(0, 0, 3780, 1998);
        this.cameras.main.fadeIn(1100);
        this.cameras.main.flash();

        this.LifeBar = this.add.image(120, 30, 'LifeBar').setScale(0.7).setDepth(1).setScrollFactor(0); 
        this.LifeText = this.add.text(100, 13.5, PlayerLife, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.ScoreText = this.add.text(1700, 13.5, 'Punti:' + score, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.levels = this.add.image(1002, 30, 'level4').setScale(0.7).setDepth(2).setScrollFactor(0);
       

        const level = [
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,1, 2, 3, 0, 0, 0, 1, 2, 3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,0 ],
            [  0,5, 6, 7, 0, 0, 0, 5, 6, 7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,0 ],
            [  15,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,15,15,0,0,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,15,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 13, 14, 0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,15,15,0,0,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 20, 21, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,0,0,0,0,0,0,26,27,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 26, 27, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0,0,26,27,0,0,0,0 ],
            [ 39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39 ]
        ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("TileMap");
        const layer = map.createLayer(0, tiles, 0, 0).setScale(4.82);

        this.player = this.physics.add.sprite(50, 500, 'player').setScale(1.5).setDepth(1);

        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
    
        layer.setCollision([35,36,37,39,13,20,21,26,27]);
        layer.setCollisionBetween(14,15);

        this.physics.add.collider(this.player,layer,(primo,secondo)=>{
            oneTimeBounce = 0;
            if(secondo.index == 13 && oneStar == 1){
                this.star = this.physics.add.sprite(this.player.body.position.x,this.player.body.position.y-100 , 'Star').setScale(0.05).setDepth(1);
                this.physics.add.collider(this.star,layer)

                this.tweens.add({
                    targets: this.star,
                    props: {
                        x: { value: 700, duration: 2000, flipX: true },
                    },
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });

                this.physics.add.overlap(this.player, this.star,(player,fungo)=>{
                    score = score + 1;
                    this.ScoreText.setText('Punti:' + score)
                    this.star.destroy();
                }); 

                oneStar = 0;
            }

        })

        this.Pianta = this.physics.add.sprite(620, 560, 'Pianta').setScale(0.3).setDepth(1);
        this.physics.add.collider(this.Pianta,layer)
        const myTimeoutNot = setTimeout(PiantaNotVisible, 3500);
        function PiantaNotVisible(){
            piantaNo = true;
        }

        this.physics.add.overlap(this.Pianta,this.player,(pianta,player)=>{
            if(this.Pianta.visible == true){
                PlayerLife = PlayerLife - 15;
                this.LifeText.setText(PlayerLife);
            }
        })

        this.ChestLocked = this.physics.add.sprite(2030, 200, 'ChestLocked').setScale(0.275).setDepth(1);
        this.physics.add.collider(layer,this.ChestLocked)
        this.physics.add.overlap(this.player,this.ChestLocked,()=>{
            if(canOpenChest == 1){
                this.ChestLocked.destroy()

                this.Box = this.physics.add.sprite(2500,200 , 'Box').setScale(0.8).setDepth(1);
                this.Box.body.allowGravity = false
                this.Box.body.immovable = true;

                this.Hammer = this.physics.add.sprite(200,750, 'Hammer').setScale(0.1).setDepth(1);
                this.physics.add.collider(this.Hammer,layer)

                this.physics.add.overlap(this.Hammer,this.player,(enemy3,Hammer)=>{
                    this.Hammer.destroy();
                    destroyBox = 1;
                })

                this.physics.add.collider(this.Box,this.player,(Box,Player)=>{
                    if(destroyBox == 1){
                        this.Box.destroy();

                        this.star3 = this.physics.add.sprite(2500,200 , 'Star').setScale(0.05).setDepth(1);
                        this.star3.body.allowGravity = false
                        this.star3.body.immovable = true;

                        this.physics.add.overlap(this.player, this.star3,(player,fungo)=>{
                            score = score + 1;
                            this.ScoreText.setText('Punti:' + score)
                            this.star3.destroy();
                        }); 
                    }
                })
            }
        })

        this.Key = this.physics.add.sprite(1500, 450, 'Key').setScale(0.08).setDepth(1);
        this.physics.add.collider(layer,this.Key)

        this.physics.add.overlap(this.player,this.Key,(player,Key)=>{
            this.Key.destroy()
            canOpenChest = 1
        });

        this.Tramp = this.physics.add.sprite(1780, 700, 'Trampolino').setScale(0.275).setDepth(1);
        this.Tramp.body.immovable = true;
        this.physics.add.collider(layer,this.Tramp)
        this.physics.add.collider(this.player,this.Tramp,(player,tramp)=>{
            oneTimeBounce = 1
        })

        this.Enemy3 = this.physics.add.sprite(1500, 400, 'Enemy3').setScale(0.8).setDepth(1);
        this.physics.add.collider(this.Enemy3,layer)

        this.tweens.add({
            targets: this.Enemy3,
            props: {
                x: { value: 1700, duration: 2100, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.Enemy3,this.player,(enemy3,player)=>{
            PlayerLife -= 8
            this.LifeText.setText(PlayerLife)
        })

        this.Enemy4 = this.physics.add.sprite(1890, 400, 'Enemy3').setScale(0.8).setDepth(1);
        this.physics.add.collider(this.Enemy4,layer)

        this.tweens.add({
            targets: this.Enemy4,
            props: {
                x: { value: 2050, duration: 2100, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.Enemy4,this.player,(enemy3,player)=>{
            PlayerLife -= 8
            this.LifeText.setText(PlayerLife)
        })

        this.Tramp2 = this.physics.add.sprite(2050, 450, 'Trampolino').setScale(0.095).setDepth(1);
        this.physics.add.collider(layer,this.Tramp2)
        this.physics.add.collider(this.player,this.Tramp2,(player,tramp)=>{
           this.Tramp2.destroy() 

            this.Tramp3 = this.physics.add.sprite(1200, 700, 'Trampolino').setScale(0.275).setDepth(1);
            this.Tramp3.body.immovable = true;
            this.physics.add.collider(layer,this.Tramp3)
            this.physics.add.collider(this.player,this.Tramp3,(player,tramp)=>{
                oneTimeBounce = 2;
            })
        })

        this.star2 = this.physics.add.sprite(1775,100 , 'Star').setScale(0.05).setDepth(1);
        this.star2.body.allowGravity = false
        this.star2.body.immovable = true;
        this.physics.add.collider(this.star2,layer)

        this.physics.add.overlap(this.player, this.star2,(player,fungo)=>{
            score = score + 1;
            this.ScoreText.setText('Punti:' + score)
            this.star2.destroy();
        }); 

        this.Tubo = this.physics.add.sprite(3100, 400, 'Tubo').setScale(1).setDepth(1);
        this.Tubo.body.immovable = true;
        this.physics.add.collider(this.Tubo,layer)
        this.Tubo.setVisible(false)

        this.Crown = this.physics.add.sprite(40, 100, 'Crown').setScale(0.0500).setDepth(1);
        this.physics.add.collider(this.Crown,layer)

        this.star4 = this.physics.add.sprite(3700, 100 , 'Star').setScale(0.05).setDepth(1);
        this.physics.add.collider(layer,this.star4)

        this.physics.add.overlap(this.player, this.star4,(player,fungo)=>{
            score = score + 1;
            this.ScoreText.setText('Punti:' + score)
            this.star4.destroy();
        }); 

        this.door = this.physics.add.staticGroup({
            key: "door",
            setXY: {
                x: 50,
                y: 700,
            },
            setScale: {
                x: 1
            }
        });
        this.physics.add.collider(this.door,layer)
        this.door.setVisible(false)
    
    }

    update(time, delta){
        if(this.tastiera.left.isDown){
            this.player.setVelocityX(-290);
            this.player.setFlipX(true)
        }
        else if(this.tastiera.right.isDown){
            this.player.setVelocityX(290);
            this.player.setFlipX(false)
        }
        else{
            this.player.setVelocityX(0);
        }
        if((this.tastiera.up.isDown) && this.player.body.blocked.down){
            if(oneTimeBounce == 0){
                this.player.setVelocityY(-380);
            } else if (oneTimeBounce == 1) {
                this.player.setVelocityY(-480);
            } else if(oneTimeBounce == 2){
                this.player.setVelocityY(-700);
            }
            
        }

        if(PlayerLife == 0 || PlayerLife < 0){
            this.scene.start('GameOver');

            PlayerLife = 400;
            score = 0;
            piantaNo = false
            piantaYes = false
            piantaNo2 = false
            piantaYes2 = false
            canOpenChest = 0;
            oneTimeBounce = 0;
            destroyBox = 0;
            oneStar = 1;
            spawnOneTime = 1
            dragoOneTime = 1;
            livello5Sbloccato = 5;
        }

        if(piantaNo == true){
            this.Pianta.setVisible(false)
            const myTimeoutYes = setTimeout(PiantaVisible, 3500);

            function PiantaVisible(){
                piantaNo = false;
                piantaYes = true;
            }

        } else if(piantaYes == true) {
            this.Pianta.setVisible(true)
            const myTimeoutNot = setTimeout(PiantaNotVisible, 3500);

            function PiantaNotVisible(){
                piantaYes = false
                piantaNo = true;
            }
        }

        if(piantaNo2 == true){
            this.Pianta2.setVisible(false)
            const myTimeoutYes2 = setTimeout(PiantaVisible2, 3500);

            function PiantaVisible2(){
                piantaNo2 = false;
                piantaYes2 = true;
            }

        } else if(piantaYes2 == true) {
            this.Pianta2.setVisible(true)
            const myTimeoutNot2 = setTimeout(PiantaNotVisible2, 3500);

            function PiantaNotVisible2(){
                piantaYes2 = false
                piantaNo2 = true;
            }
        }

        if(score == 3 && spawnOneTime == 1){
            this.Tubo.setVisible(true)
            this.physics.add.collider(this.Tubo,this.player)
            this.Pianta2 = this.physics.add.sprite(3100, 408, 'Pianta').setScale(0.3).setDepth(1);
            this.Pianta2.body.allowGravity = false
            this.Pianta2.body.immovable = true;
            
            const myTimeoutNot2 = setTimeout(PiantaNotVisible2, 3500);
            function PiantaNotVisible2(){
                piantaNo2 = true;
            }
    
            this.physics.add.overlap(this.Pianta2,this.player,(pianta,player)=>{
                if(this.Pianta2.visible == true){
                    PlayerLife = PlayerLife - 17;
                    this.LifeText.setText(PlayerLife);
                }
            })

            spawnOneTime = 0;
        }

        if(score == 4 && dragoOneTime == 1){
            this.BabyDragon = this.physics.add.image(50, 200, 'BabyDragon').setScale(2.1).setDepth(1)
            this.BabyDragon.body.allowGravity = false

            this.speed = Phaser.Math.GetSpeed(1500,3);
            dragoOneTime = 0;

            this.Crown.destroy();

            this.door.setVisible(true)
            this.physics.add.overlap(this.player, this.door,(player,door)=>{
                this.scene.start("ScenaWin",{liv5: livello5Sbloccato})
            }); 


        }

        if(dragoOneTime == 0){
            this.BabyDragon.x += this.speed * delta;
        }

    }

    
}

export default QuartaScena;