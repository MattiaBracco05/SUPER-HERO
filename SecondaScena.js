let PlayerLife = 200;
let score = 0;
let SingleStar = 1;
let flagKey = 0;
let openDoor = 0;
let fine = 0;
let livello3Sbloccato = 3;
let fireDisableNow = 0;
let visibleBullet2 = false;
let visibleBullet3 = false;

class SecondaScena extends Phaser.Scene{

    constructor(){
        super("SecondaScena")
    }

    preload(){
        this.load.image('TileMap', './Assets/Sfondo.png');
        this.load.image('LifeBar', './Assets/LifeBar.jpg');
        this.load.image('player', './Assets/player.png');
        this.load.image('cannon', './Assets/cannon2.png');
        this.load.image('bullet', './Assets/Bullet2.png');
        this.load.image('Enemy2', './Assets/Enemy2.png');
        this.load.image('Chest', './Assets/Chest.png');
        this.load.image('Key', './Assets/Key.png');
        this.load.image('Brick', './Assets/Brick.png');
        this.load.image('Star', './Assets/star.png');
        this.load.image('level2', './Assets/Livello2.png');
        this.load.image('genio', './Assets/Genio.png');
        this.load.image('OneBrick', './Assets/OneBrick.png');
        this.load.image('cannon1', './Assets/cannon1.png');
        this.load.image('bullet2', './Assets/Proj.png');
        this.load.image('door', './Assets/door.png');
        this.load.image('ExoplosionProj', './Assets/ExplosionProj.png');
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
        this.levels = this.add.image(1002, 30, 'level2').setScale(0.7).setDepth(2).setScrollFactor(0);
       

        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0,  0,  0,  0, 0 , 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0,   0,  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,  0,  0,  0,  1, 2, 3,  0,  0,  0,  1, 2, 3, 0, 0, 0 , 1, 2, 3,0,0,0,1, 2, 3,0,0,0,0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0,   0,  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,  0,  0,  0,  5, 6, 7,  0,  0,  0,  5, 6, 7, 0, 0, 0, 5, 6, 7,0,0,0,5, 6, 7,0,0,0,0 ],
            [  0,   0,   0,   0,  0,  0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   14,   14,   14,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ,  0,  0,   0,   14,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0 ,0 ,0 , 0 , 0 , 0,  0 ,0 ,0 ,0 ,0 ,0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,  0,  0,  14,  13,   14,   0,   0,   0,   14,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   ,   0,   0,   0,   0,   0,   0,  0,    0,   0,   0,   0,   0,   0,   0,   0,   0, 0,  0,  0,  0, 0,  0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  20,   21,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0, 0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  26,   27,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0 ],
            [ 39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39 ]
        ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("TileMap");
        const layer = map.createLayer(0, tiles, 0, 0).setScale(4.82);

        this.player = this.physics.add.sprite(50, 570, 'player').setScale(1.5).setDepth(1);

        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
    
        layer.setCollision([35,36,37,39,13,20,21,26,27]);
        layer.setCollisionBetween(14,15);

        this.cannon = this.physics.add.image(3456, 707, 'cannon').setScale(0.7).setDepth(1).setSize(190, 190);
        this.cannon.body.allowGravity = false;
        this.cannon.body.immovable = true;
        
        this.cannon.setDepth(1)
        this.physics.add.collider(this.player, this.cannon);

        this.bullet = this.physics.add.image(3456, 680, 'bullet').setScale(0.08).setDepth(1).setSize(1380, 900);
        this.bullet.body.allowGravity = false;
        this.speed = Phaser.Math.GetSpeed(1500,3);

        this.Chest = this.physics.add.sprite(1427, 270, 'Chest').setScale(0.4).setDepth(1).setSize(215, 180)
        this.Chest.body.immovable = true;

        this.bullet2 = this.physics.add.image(2392, 20, 'bullet2').setOrigin(0).setScale(1).setDepth(10);
        this.bullet2.body.allowGravity = false
        this.speed2 = Phaser.Math.GetSpeed(1800,3);
        this.bullet2.setVisible(false);

        this.bullet3 = this.physics.add.image(2592, 20, 'bullet2').setOrigin(0).setScale(1).setDepth(10);
        this.bullet3.body.allowGravity = false
        this.speed3 = Phaser.Math.GetSpeed(1800,3);
        this.bullet3.setVisible(false);

        this.physics.add.collider(this.player,layer,(primo,secondo)=>{
            if(secondo.index == 13 && SingleStar == 1){
                this.star = this.physics.add.sprite(this.player.body.position.x,this.player.body.position.y-100 , 'Star').setScale(0.05).setDepth(1);
                this.physics.add.collider(this.star,layer)

                this.tweens.add({
                    targets: this.star,
                    props: {
                        x: { value: this.player.body.position.x+300, duration: 2000, flipX: true },
                    },
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });

                this.physics.add.overlap(this.player, this.star,(player,Star)=>{
                    score += 1
                    this.ScoreText.setText('Punti:' + score)
                    this.star.destroy();
                }); 

                SingleStar = 0;
            }

            if(secondo.index == 20 && score == 3 || secondo.index == 21 && score == 3 ){
                if(this.tastiera.down.isDown){
                    fine = 1;
                }
            }
        })

        this.physics.add.collider(this.bullet,layer)

        this.physics.add.collider(this.Chest,layer)

        this.physics.add.collider(this.player,this.Chest,(player,chest)=>{
            if(flagKey == 1){
                this.Chest.destroy()

                this.Brick = this.physics.add.image(1876, 345, 'Brick').setScale(0.7).setDepth(1).setSize(314, 106)
                this.Brick.body.allowGravity = false;
                this.Brick.body.immovable = true;
                this.physics.add.collider(this.player, this.Brick)

                this.star2 = this.physics.add.sprite(1876,290, 'Star').setScale(0.05).setDepth(1);
                this.physics.add.collider(this.star2,this.Brick)

                this.physics.add.overlap(this.player, this.star2,(player,Star)=>{
                    score += 1
                    this.ScoreText.setText('Punti:' + score)
                    this.star2.destroy();

                    this.Brick2 = this.physics.add.image(2376, 345, 'Brick').setScale(0.7).setDepth(1).setSize(314, 106)
                    this.Brick2.body.allowGravity = false;
                    this.Brick2.body.immovable = true;
                    this.physics.add.collider(this.player, this.Brick2)

                    this.Genio = this.physics.add.sprite(2400, 250, 'genio').setScale(1.3).setDepth(1);
                    this.physics.add.collider(this.Genio, this.Brick2)

                    this.physics.add.overlap(this.player, this.Genio,(player,genio)=>{
                        genio.destroy()
                        this.Brick2.destroy()
                        player.setPosition(2500, 500)

                        this.OneBrick = this.physics.add.image(2500, 345, 'OneBrick').setScale(0.7).setDepth(1).setSize(108, 106)
                        this.OneBrick.body.allowGravity = false;
                        this.OneBrick.body.immovable = true;
                        this.physics.add.collider(this.player, this.OneBrick)

                        this.cannon1T  = this.add.image(2400, 10, 'cannon1').setScale(0.7).setDepth(1)
                        this.bullet2.setVisible(true);

                        this.explosionFire2 = this.add.image(this.bullet2.body.position.x, this.bullet2.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
                        this.explosionFire2.setVisible(false);

                        this.physics.add.overlap(this.player,this.bullet2,(player,bullet2)=>{
                            fireDisableNow = 1;
                            bullet2.setVisible()
                            this.bullet2.y = 20;
                            this.bullet2.setVisible(true)

                            PlayerLife -= 10;
                            this.LifeText.setText(PlayerLife)

                            this.explosionFire2.x = this.player.body.position.x + 40;
                            this.explosionFire2.y = this.bullet2.body.position.y + 30;
                            this.explosionFire2.setVisible(true);

                            const myTimeout3 = setTimeout(fireDisable3, 300);
                            function fireDisable3(){
                                fireDisableNow = 1;
                                visibleBullet2 = true
                            }
                        });

                        this.cannon2T  = this.add.image(2600, 10, 'cannon1').setScale(0.7).setDepth(1)
                        this.bullet3.setVisible(true);

                        this.explosionFire3 = this.add.image(this.bullet3.body.position.x, this.bullet3.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
                        this.explosionFire3.setVisible(false);

                        this.physics.add.overlap(this.player,this.bullet3,(player,bullet3)=>{
                            fireDisableNow = 1;
                            bullet3.setVisible()
                            this.bullet3.y = 20;
                            this.bullet3.setVisible(true)

                            PlayerLife -= 10;
                            this.LifeText.setText(PlayerLife)

                            this.explosionFire3.x = this.player.body.position.x + 40;
                            this.explosionFire3.y = this.bullet3.body.position.y + 30;
                            this.explosionFire3.setVisible(true);

                            const myTimeout2 = setTimeout(fireDisable2, 300);
                            function fireDisable2(){
                                fireDisableNow = 1;
                                visibleBullet3 = true
                            }
                        });

                        this.Key2 = this.physics.add.sprite(2500, 280, 'Key').setScale(0.08).setDepth(1);
                        this.physics.add.collider(this.Key2,layer)
                        this.physics.add.collider(this.Key2,this.OneBrick)

                        this.door = this.physics.add.staticGroup({
                            key: "door",
                            setXY: {
                                x: 3650,
                                y: 700,
                            },
                            setScale: {
                                x: 1
                            }
                        });
                        this.physics.add.collider(this.door,layer)

                        this.physics.add.overlap(this.player,this.Key2,(player,Key)=>{
                            Key.destroy()
                            openDoor = 1;
                        });  

                        this.physics.add.collider(this.player,this.door,(player,door)=>{
                            if(openDoor == 1){
                                door.destroy()

                                this.star3 = this.physics.add.sprite(890,400, 'Star').setScale(0.05).setDepth(1);
                                this.physics.add.collider(this.star3,layer)

                                this.physics.add.overlap(this.player, this.star3,(player,Star)=>{
                                    score += 1
                                    this.ScoreText.setText('Punti:' + score)
                                    this.star3.destroy();
                                })
                            }
                        })

                    })
                }); 
            }
        });

        

        this.Key = this.physics.add.sprite(1376, 690, 'Key').setScale(0.08).setDepth(1);
        this.physics.add.collider(this.Key,layer)

        this.physics.add.overlap(this.player,this.Key,(player,Key)=>{
            this.Key.destroy()
            flagKey = 1
        });  

        this.explosionFire = this.add.image(this.bullet.body.position.x, this.bullet.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
        this.explosionFire.setVisible(false);

        this.physics.add.overlap(this.player,this.bullet,(player,bullet)=>{
            fireDisableNow = 0;
            bullet.setVisible()
            this.bullet.x = 3456;
            this.bullet.setVisible(true)

            PlayerLife = PlayerLife-50;
            this.LifeText.setText(PlayerLife)

            this.explosionFire.x = this.player.body.position.x + 40;
            this.explosionFire.y = this.bullet.body.position.y + 30;
            this.explosionFire.setVisible(true);

            const myTimeout = setTimeout(fireDisable, 300);
            function fireDisable(){
                fireDisableNow = 1;
            }
        });     

        this.Enemy2 = this.physics.add.sprite(1200, 700, 'Enemy2').setScale(1.3).setDepth(1);
        this.physics.add.collider(this.Enemy2,layer)

        this.tweens.add({
            targets: this.Enemy2,
            props: {
                x: { value: 1700, duration: 1250, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.player, this.Enemy2,(primo,secondo)=>{
            PlayerLife -= 4;
            this.LifeText.setText(PlayerLife)
        })
        
    }

    update(time, delta){
        // console.log(this.player.body.position.y + " " + this.player.body.position.x)
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
            this.player.setVelocityY(-380);
        }

        if(PlayerLife == 0 || PlayerLife < 0){
            this.scene.start('GameOver');
            PlayerLife = 200;
            score = 0;
            SingleStar = 1;
            flagKey = 0;
            openDoor = 0;
            fine = 0;
            fireDisableNow = 0;
            visibleBullet2 = false;
            visibleBullet3 = false;
        }

        if(score == 3 && fine == 1){
            this.scene.start("ScenaWin",{liv3: livello3Sbloccato})
            PlayerLife = 200;
            score = 0;
            SingleStar = 1;
            flagKey = 0;
            openDoor = 0;
            fine = 0;
            fireDisableNow = 0;
            visibleBullet2 = false;
            visibleBullet3 = false;
        }

        this.bullet.x -= this.speed * delta;
        if (this.bullet.x < 500){
            this.bullet.x = 3456;
        }

        this.bullet2.y += this.speed2 * delta;
        if(this.bullet2.y >= 700){
            this.bullet2.y = 20;
        }

        this.bullet3.y += this.speed3 * delta;
        if(this.bullet3.y >= 700){
            this.bullet3.y = 20;
        }

        if(fireDisableNow == 1){
            this.explosionFire.setVisible(false)
            if(visibleBullet2 == true){
                this.explosionFire2.setVisible(false)
                visibleBullet2 = false;
            }
            if(visibleBullet3 == true){
                this.explosionFire3.setVisible(false)
                visibleBullet3 = false;
            }
            
        }
        
    }
}

export default SecondaScena;