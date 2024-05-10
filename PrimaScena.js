let PlayerLife = 200;
let fungo = 1;
let Normale = 0;
let gigant = 0;
let score = 0;
let fine = 0;
let HitPlayer = true;
let enemy1Spawnato = 0;
let livello2Sbloccato = 2;

class PrimaScena extends Phaser.Scene{
    constructor(){
        super("PrimaScena")
    }

    preload(){
        this.load.image('TileMap', './Assets/Sfondo.png');
        this.load.image('player', './Assets/player.png');
        this.load.image('LifeBar', './Assets/LifeBar.jpg');
        this.load.image('Fungo', './Assets/Fungo.jpg');
        this.load.image('Star', './Assets/star.png');
        this.load.image('Enemy1', './Assets/Enemy1.png');
        this.load.image('Enemy1Knock', './Assets/Enemy1Knock.png');
        this.load.image('level1', './Assets/Livello1.png');
    }

    create(){
        this.cameras.main.setBounds(0, -1150, 3780, 1998);
        this.physics.world.setBounds(0, 0, 3780, 1998);
        this.cameras.main.fadeIn(1100);
        this.cameras.main.flash();

        this.LifeBar = this.add.image(120, 30, 'LifeBar').setScale(0.7).setDepth(1).setScrollFactor(0); 
        this.LifeText = this.add.text(100, 13.5, PlayerLife, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.ScoreText = this.add.text(1700, 13.5, 'Punti:' + score, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.levels = this.add.image(1002, 30, 'level1').setScale(0.7).setDepth(2).setScrollFactor(0);

        this.tastiera = this.input.keyboard.createCursorKeys();

        const level = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0,  0,  0,  0, 0 , 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0,   0,  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,  0,  0,  0,  1, 2, 3,  0,  0,  0,  1, 2, 3, 0, 0, 0 , 1, 2, 3,0,0,0,1, 2, 3,0,0,0,0 ],
            [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0,   0,  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,  0,  0,  0,  5, 6, 7,  0,  0,  0,  5, 6, 7, 0, 0, 0, 5, 6, 7,0,0,0,5, 6, 7,0,0,0,0 ],
            [  0,   0,   0,   0,  14,  13,   14,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,20,21,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ,  0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0 ,0 ,0 , 0 , 0 , 0,  0 ,0 ,0 ,0 ,0 ,0, 0,0,0,39,39,39,39,0,0,0,0,0,0 ],
            [  0,   0,   0,  14,  14,  14,  14,   14,   0,   0,   0,   0,  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,  0,  0,  0, 0, 0,  0,  0,  14,  13, 14, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  0,    0,   0,   0,   0,   0,   0,   0,   0,   0, 0,  0,  0,  0, 0,  0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,8,9,0,0,0,19,0,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   20, 21,   0,   0,   0,   0,   0,   0,   0,   0,   0, 15, 0,  0,  0, 15, 0,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,12,0,0,19,32,19,0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   26, 27,   0,   0,   0,   0,   0,   0,   0,   0,   15, 15,0,  0,  0, 15, 15,  0,  0,  0,  0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,16,0,0,22,38,24 ],
            [ 39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,0,0,0,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39 ]
        ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("TileMap");
        const layer = map.createLayer(0, tiles, 0, 0).setScale(4.82);

        this.player = this.physics.add.sprite(50, 730, 'player').setScale(1.5).setDepth(1);
        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
    
        layer.setCollision([35,36,37,39,13,20,21,26,27]);
        layer.setCollisionBetween(14,15);

        this.physics.add.collider(this.player,layer,(primo,secondo)=>{
            if(secondo.index == 13 && fungo == 1){
                this.fungo = this.physics.add.sprite(this.player.body.position.x,this.player.body.position.y-100 , 'Fungo').setScale(0.3).setDepth(1);
                this.physics.add.collider(this.fungo,layer)

                this.tweens.add({
                    targets: this.fungo,
                    props: {
                        x: { value: this.player.body.position.x+300, duration: 2000, flipX: true },
                    },
                    ease: 'Linear',
                    yoyo: true,
                    repeat: -1
                });

                this.physics.add.overlap(this.player, this.fungo,(player,fungo)=>{
                    this.fungo.destroy();
                    score = score + 1;
                    this.ScoreText.setText('Punti:' + score)

                    this.player.setPosition(this.player.body.position.x,this.player.body.position.y-50)
                    this.player.setScale(2.5);
                    gigant = 1;
                    HitPlayer = false;

                    const myTimeout = setTimeout(playerGrandezzaNormale, 10000);
                    function playerGrandezzaNormale(){
                        Normale = 1;
                        gigant = 0;
                    }
                }); 
                fungo = 0;
                this.pos1 = secondo.x

            } else if(secondo.index == 13){
                this.pos2 = secondo.x
                if(this.pos2 != this.pos1 && fungo == 0){
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

                    this.physics.add.overlap(this.player, this.star,(player,fungo)=>{
                        score = score + 1;
                        this.ScoreText.setText('Punti:' + score)
                        this.star.destroy();
                    }); 

                    fungo = 2;
                }

            }

            if(secondo.index == 15 && gigant == 1 
            || secondo.index == 14 && gigant == 1 
            ){
                map.removeTile(secondo, 0, false); 
            }
            layer.setCollision([35,36,37,39,13,20,21,26,27]);
            layer.setCollisionBetween(14,15);

            if(secondo.index == 20 || secondo.index == 21 ){
                if(this.tastiera.down.isDown){
                    this.player.setPosition(3160,240)
                }
            }

        })

        this.star3 = this.physics.add.sprite(3360,300, 'Star').setScale(0.05).setDepth(1);
        this.physics.add.collider(this.star3,layer)

        this.physics.add.overlap(this.player, this.star3,(player,Star)=>{
            score += 1
            this.ScoreText.setText('Punti:' + score)
            this.star3.destroy();
        })
        
        this.star2 = this.physics.add.image(1880, 450, 'Star').setScale(0.05).setDepth(1);
        this.star2.body.allowGravity = false

        this.physics.add.overlap(this.player,this.star2,(primo,star)=>{
            score += 1;
            this.ScoreText.setText('Punti:' + score)
            this.star2.destroy();
        });

        this.Enemy1 = this.physics.add.sprite(2700, 730, 'Enemy1').setScale(1.5).setDepth(1);
        this.physics.add.collider(this.Enemy1,layer)
        this.tweens.add({
            targets: this.Enemy1,
            props: {
                x: { value: 3150, duration: 2000, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.Enemy1Knock = this.physics.add.sprite(2700, 730, 'Enemy1Knock').setScale(2).setDepth(1);
        this.physics.add.collider(this.Enemy1Knock,layer)
        this.Enemy1Knock.setVisible(false);

        this.physics.add.overlap(this.player, this.Enemy1,(primo,secondo)=>{
            this.VitaEnemy()

            if(HitPlayer == true && enemy1Spawnato == 1){
                PlayerLife -= 8;
                this.LifeText.setText(PlayerLife)
            }
        })

        this.physics.add.overlap(this.player, layer,(primo,secondo)=>{
            if(secondo.index == 38 && score == 4){
                fine = 1;
            }
        })

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
            this.player.setVelocityY(-380);
        }

        if(PlayerLife == 0 || PlayerLife < 0){
            this.scene.start('GameOver');
            PlayerLife = 200;
            fungo = 1;
            Normale = 0;
            gigant = 0;
            score = 0;
            fine = 0;
            HitPlayer = true;
            enemy1Spawnato = 0;
            livello2Sbloccato = 2;
        } 
        
        if(score == 4 && fine == 1){
            this.scene.start("ScenaWin",{liv2: livello2Sbloccato})
            PlayerLife = 200;
            fungo = 1;
            Normale = 0;
            gigant = 0;
            score = 0;
            fine = 0;
            HitPlayer = true;
            enemy1Spawnato = 0;
            livello2Sbloccato = 2;
        }

        if(this.player.body.position.y > 870 ){
            this.scene.start('GameOver');
            PlayerLife = 200;
            fungo = 1;
            Normale = 0;
            gigant = 0;
            score = 0;
            fine = 0;
            HitPlayer = true;
            enemy1Spawnato = 0;
            livello2Sbloccato = 2;
        }

        if(Normale == 1){
            this.player.setScale(1.5)
            Normale = 0;
            
            HitPlayer = true;
            if(enemy1Spawnato == 1){
                this.VitaEnemy();
            }
        }
        
    }

    VitaEnemy(){
        if(HitPlayer == true && enemy1Spawnato == 1){
            this.Enemy1Knock.setVisible(false)
            this.Enemy1.setVisible(true);
            
        } else if(HitPlayer == true){
            PlayerLife -= 8;
            this.LifeText.setText(PlayerLife)
            
        } else if(HitPlayer == false && enemy1Spawnato == 0){
            this.Enemy1.setVisible(false);
            this.Enemy1Knock.setVisible(true);
            enemy1Spawnato = 1
        }
        
    }

}

export default PrimaScena;