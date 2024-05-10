let PlayerLife = 300;
let score = 0;
let brkKey = 0;
let Hammer = 0;
let flag = 1;
let fine = 0;
let livello4Sbloccato = 4;
let fireDisableNow = 0;

class TerzaScena extends Phaser.Scene{

    constructor(){
        super("TerzaScena")
    }

    preload(){
        this.load.image('TileMap', './Assets/Sfondo.png');
        this.load.image('LifeBar', './Assets/LifeBar.jpg');
        this.load.image('player', './Assets/player.png');
        this.load.image('level3', './Assets/Livello3.png');
        this.load.image('corvo', './Assets/Corvo.png');
        this.load.image('door', './Assets/door.png');
        this.load.image('Star', './Assets/star.png');
        this.load.image('Enemy3', './Assets/Enemy3.png');
        this.load.image('DoubleBrick', './Assets/DoubleBrick.png');
        this.load.image('Hammer', './Assets/Hammer.png');
        this.load.image('Key', './Assets/Key.png');
        this.load.image('cannon', './Assets/cannon2.png');
        this.load.image('bullet', './Assets/Bullet2.png');
        this.load.image('Brick', './Assets/Brick.png');
        this.load.image('portal', './Assets/Portal.png');
        this.load.image('OneBrick', './Assets/OneBrick.png');
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
        this.levels = this.add.image(1002, 30, 'level3').setScale(0.7).setDepth(2).setScrollFactor(0);
       

        const level = [
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,1, 2, 3, 0, 0, 0, 1, 2, 3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,18,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,0 ],
            [  0,5, 6, 7, 0, 0, 0, 5, 6, 7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  15,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,15,15,15,0,0,0,20,21,0,0,0,20,21,0,0,0,0,0,0,0,0,0,0,15,15,0 ],
            [  15,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,20,21,0,0,0,15,0,0,15,0,0,0,26,27,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,15,0 ],
            [  15,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,20,21,0,0,0,0,26,27,0,0,0,0,0,0,15,0,0,0,26,27,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  15,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,26,27,0,0,0,0,26,27,0,0,0,0,0,0,15,0,0,0,26,27,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [ 39,39,39,39,39,39,39,39,39,0,0,0,26,27,0,0,0,0,26,27,0,0,,15,15,15,15,0,0,0,26,27,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,0 ]
        ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("TileMap");
        const layer = map.createLayer(0, tiles, 0, 0).setScale(4.82);

        this.player = this.physics.add.sprite(200, 570, 'player').setScale(1.5).setDepth(1);

        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
    
        layer.setCollision([35,36,37,39,13,20,21,26,27]);
        layer.setCollisionBetween(14,15);
        this.physics.add.collider(this.player,layer)

        this.Corvo = this.physics.add.image(1360, 420, 'corvo').setScale(0.25).setDepth(1).setSize(592, 450)
        this.Corvo.body.allowGravity = false;
        this.Corvo.body.immovable = true;

        this.tweens.add({
            targets: this.Corvo,
            props: {
                x: { value: 200, duration: 1830, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.player, this.Corvo,(player,corvo)=>{
            PlayerLife -= 10
            this.LifeText.setText(PlayerLife)
        })

        this.door = this.physics.add.image(38, 408, 'door').setScale(0.78).setDepth(1).setSize(100, 140)
        this.door.body.allowGravity = false;
        this.door.body.immovable = true;

        this.physics.add.collider(this.door,layer)

        this.physics.add.overlap(this.door,this.player,(door,player)=>{
            if(this.tastiera.down.isDown){
                fine = 1;
            }
        })

        this.star = this.physics.add.sprite(1465,530, 'Star').setScale(0.05).setDepth(1);
        this.physics.add.collider(this.star,layer)

        this.physics.add.overlap(this.player, this.star,(player,Star)=>{
            score += 1
            this.ScoreText.setText('Punti:' + score)
            this.star.destroy();
        })

        this.Enemy3 = this.physics.add.sprite(1800, 400, 'Enemy3').setScale(1.3).setDepth(1);
        this.physics.add.collider(this.Enemy3,layer)

        this.tweens.add({
            targets: this.Enemy3,
            props: {
                x: { value: 2050, duration: 1300, flipX: true },
            },
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.Enemy3,this.player,(enemy3,player)=>{
            PlayerLife -= 6
            this.LifeText.setText(PlayerLife)
        })

        this.star2 = this.physics.add.sprite(1950,400, 'Star').setScale(0.05).setDepth(1);
        this.physics.add.collider(this.star2,layer)

        this.physics.add.overlap(this.player, this.star2,(player,Star)=>{
            score += 1
            this.ScoreText.setText('Punti:' + score)
            this.star2.destroy();
        })

        this.DoubleBrick = this.physics.add.image(1815, 695, 'DoubleBrick').setScale(0.75).setDepth(1).setSize(105, 207)
        this.DoubleBrick.body.allowGravity = false;
        this.DoubleBrick.body.immovable = true;

        this.physics.add.collider(this.player, this.DoubleBrick,(player,DoubleBrick)=>{
            if(brkKey == 1){
                DoubleBrick.destroy()
            }
        })

        this.star3 = this.physics.add.sprite(2790,400, 'Star').setScale(0.05).setDepth(1);
        this.physics.add.collider(this.star3,layer)

        this.physics.add.overlap(this.player, this.star3,(player,Star)=>{
            score += 1
            this.ScoreText.setText('Punti:' + score)
            this.star3.destroy();
        })
        
        this.Key = this.physics.add.sprite(1970, 695, 'Key').setScale(0.08).setDepth(1);
        this.physics.add.collider(this.Key,layer)

        this.cannon = this.physics.add.image(3670, 400, 'cannon').setScale(0.7).setDepth(1).setSize(190, 190);
        this.cannon.body.allowGravity = false;
        this.cannon.body.immovable = true;
        
        this.cannon.setDepth(1)
        this.physics.add.collider(this.player, this.cannon);

        this.bullet = this.physics.add.image(3670, 380, 'bullet').setScale(0.08).setDepth(1).setSize(1380, 900);
        this.bullet.body.allowGravity = false;
        this.speed = Phaser.Math.GetSpeed(1400,3);

        this.explosionFire = this.add.image(this.bullet.body.position.x, this.bullet.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
        this.explosionFire.setVisible(false);

        this.physics.add.overlap(this.player,this.bullet,(player,bullet)=>{
            fireDisableNow = 0;
            bullet.setVisible()
            this.bullet.x = 3656;
            this.bullet.setVisible(true)

            PlayerLife = PlayerLife-20;
            this.LifeText.setText(PlayerLife);

            this.explosionFire.x = this.player.body.position.x + 40;
            this.explosionFire.y = this.bullet.body.position.y + 30;
            this.explosionFire.setVisible(true);

            const myTimeout = setTimeout(fireDisable, 300);
            function fireDisable(){
                fireDisableNow = 1;
            }
        });     

        this.physics.add.overlap(this.player, this.Key,(player,Key)=>{
            score += 1
            this.ScoreText.setText('Punti:' + score)
            this.Key.destroy();

            this.Portal3 = this.physics.add.image(1600, 805, 'portal').setScale(0.2).setDepth(1).setSize(260, 420)
            this.Portal3.body.allowGravity = false;
            this.Portal3.body.immovable = true;

            this.physics.add.overlap(this.player, this.Portal3,(player,Portal)=>{
                player.setPosition(2350,100)
            })
        })

        this.physics.add.overlap(this.player, layer,(primo,secondo)=>{
            if(secondo.index == 18){
                score += 1
                this.ScoreText.setText('Punti:' + score)
                map.removeTile(secondo, 0, false); 

                this.Brick2 = this.physics.add.image(187, 735, 'Brick').setScale(0.7).setDepth(1).setSize(314, 106)
                this.Brick2.body.allowGravity = false;
                this.Brick2.body.immovable = true;
                this.physics.add.collider(this.player, this.Brick2)

                this.DoubleBrick2 = this.physics.add.image(115, 620, 'DoubleBrick').setScale(0.75).setDepth(1).setSize(105, 207)
                this.DoubleBrick2.body.allowGravity = false;
                this.DoubleBrick2.body.immovable = true;
                this.physics.add.collider(this.player, this.DoubleBrick2)

                this.OneBrick = this.physics.add.image(192, 660, 'OneBrick').setScale(0.7).setDepth(1).setSize(108, 106)
                this.OneBrick.body.allowGravity = false;
                this.OneBrick.body.immovable = true;
                this.physics.add.collider(this.player, this.OneBrick)
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

            PlayerLife = 300;
            score = 0;
            brkKey = 0;
            Hammer = 0;
            flag = 1;
            fine = 0;
            fireDisableNow = 0;
        }

        if(this.player.body.position.y > 870 ){
            this.scene.start('GameOver');

            PlayerLife = 300;
            score = 0;
            brkKey = 0;
            Hammer = 0;
            flag = 1;
            fine = 0
            fireDisableNow = 0;
        }

        if(score == 5 && fine == 1){
            this.scene.start("ScenaWin",{liv4: livello4Sbloccato})

            PlayerLife = 300;
            score = 0;
            brkKey = 0;
            Hammer = 0;
            flag = 1;
            fine = 0;
            fireDisableNow = 0;
        }

        if(Hammer == 1 ){
            brkKey = 1;
        }

        if (score == 3 && flag == 1){
            this.keyFinale()
            brkKey = 1;
            flag = 0;
        }

        this.bullet.x -= this.speed * delta;
        if (this.bullet.x < 2750){
            this.bullet.x = 3670;
        }

        if(fireDisableNow == 1){
            this.explosionFire.setVisible(false)
        }
    }

    keyFinale(){
        this.Hammer = this.physics.add.sprite(3300,680, 'Hammer').setScale(0.1).setDepth(1);
        
        this.Brick = this.physics.add.image(3300, 810, 'Brick').setScale(0.7).setDepth(1).setSize(314, 106)
        this.Brick.body.allowGravity = false;
        this.Brick.body.immovable = true;

        this.physics.add.collider(this.player, this.Brick)
        this.physics.add.collider(this.Hammer,this.Brick)

        this.physics.add.overlap(this.player, this.Hammer,(player,Hammer)=>{
            Hammer.destroy();

            this.Portal = this.physics.add.image(2950, 805, 'portal').setScale(0.2).setDepth(1).setSize(260, 420)
            this.Portal.body.allowGravity = false;
            this.Portal.body.immovable = true;

            this.Portal2 = this.physics.add.image(2350, 100, 'portal').setScale(0.2).setDepth(1).setSize(260, 420)
            this.Portal2.body.allowGravity = false;
            this.Portal2.body.immovable = true;

            this.physics.add.overlap(this.player, this.Portal,(player,Portal)=>{
                player.setPosition(2350,100)
            })
        })
    }
}

export default TerzaScena;