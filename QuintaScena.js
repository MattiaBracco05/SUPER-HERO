let PlayerLife = 1000;
let score = 0;
let left = false;
let scoreEnemy = 6000;
let CollisioneBoss = 0;
let firstTime = 1;
let disableExp = 0;
let fireDisableNow = 0;
let CollisioneLayer = 0
let flagFirstKey = 0;
let damage1 = true;
let damage50 = false;
let damage100 = false;
let flagLife = 0;
let piantaNo = false
let piantaYes = false
let spawnOneTime = 1;
let timer = 120;
let i = 0;
let invincibile = 0;
let oneTimeInvincibile = 1;
let TimerInvincibile = 4;
let y = 0;
let death = false;
let oneTimeCrown = 1;
let win = 0;

class QuintaScena extends Phaser.Scene{

    constructor(){
        super("QuintaScena")
    }

    preload(){
        this.load.image('TileMap', './Assets/Sfondo.png');
        this.load.image('LifeBar', './Assets/LifeBar.jpg');
        this.load.image('player', './Assets/player.png');
        this.load.image('level5', './Assets/Livello5.png');
        this.load.image('bullets', './Assets/Proj2.png');
        this.load.image('Enemy3', './Assets/Enemy3.png');
        this.load.image('FinalBoss', './Assets/FinalBoss.png');
        this.load.image('LifeBarEnemy', './Assets/LifeBarEnemy.png');
        this.load.image('ExoplosionProj', './Assets/ExplosionProj.png');
        this.load.image('FireDragon', './Assets/FireDragon.png');
        this.load.image('Chest', './Assets/Chest.png');
        this.load.image('Key', './Assets/Key.png');
        this.load.image('proj3', './Assets/Proj3.png');
        this.load.image('OneBrick', './Assets/OneBrick.png');
        this.load.image('Life', './Assets/life.png');
        this.load.image('Tubo', './Assets/Tubo.png');
        this.load.image('Pianta', './Assets/Pianta.png');
        this.load.image('Shield', './Assets/Shield.png');
        this.load.image('Brick', './Assets/Brick.png');
        this.load.image('Crown', './Assets/Crown.png');
    }

    create(){
        this.tastiera = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, -1150, 5395, 1998);
        this.physics.world.setBounds(0, 0, 5395, 1998);
        this.cameras.main.fadeIn(1100);
        this.cameras.main.flash();

        this.LifeBar = this.add.image(120, 30, 'LifeBar').setScale(0.7).setDepth(1).setScrollFactor(0); 
        this.Shield = this.add.image(1400, 30, 'Shield').setScale(0.1).setDepth(1).setScrollFactor(0); 
        this.TimerInvincibileText = this.add.text(1355, 50, '00:' + '0' +  TimerInvincibile, { fontSize: '30px', fill: '#FFFF00' }).setDepth(2).setScrollFactor(0);
        this.ShieldText = this.add.text(1392, 15, '1', { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.LifeText = this.add.text(100, 13.5, PlayerLife, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.ScoreText = this.add.text(1700, 13.5, 'Punti:' + score, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.TimerText = this.add.text(550, 13.5, 'Tempo: ' + timer, { fontSize: '30px', fill: '#00000' }).setDepth(2).setScrollFactor(0); 
        this.levels = this.add.image(1002, 30, 'level5').setScale(0.7).setDepth(2).setScrollFactor(0);

        const level = [
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,1, 2, 3, 0, 0, 0, 1, 2, 3,0,0,0,1,2,3,0,0,15,15,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3,0,0,0,1,2,3 ],
            [  0,5, 6, 7, 0, 0, 0, 5, 6, 7,0,0,0,5,6,7,0,0,15,15,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7,0,0,0,5,6,7 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,21,0,0,0,0,0,0,0,0,0,39,39,39,39,39,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,15,15,15,15,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,15,15,0,0,0,15,15,0,0,0,15,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,20,21,0,0,0,0,0,0,0,0,26,27,0,0,15,0,0,15,0,0,0,0,0,0,0,0,0,39 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 15,15,0,0,15,15,15,15,15,15,15,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0,0,0,0,26,27,0,0,15,0,0,15,0,0,0,0,0,0,0,0,0,0 ],
            [  0,0, 0, 0, 0, 0, 0, 0, 0, 15,15,0,0,15,15,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,26,27,0,0,0,0,0,0,0,0,26,27,0,0,15,15,15,15,0,0,0,39,39,39,39,39,0,0 ],
            [  0,0,0,0,0,0,0,0,0,15,15,0,0,15,15,0,0,0,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0,0,0,0,26,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]
        ];

        const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
        const tiles = map.addTilesetImage("TileMap");
        const layer = map.createLayer(0, tiles, 0, 0).setScale(4.82);
        this.player = this.physics.add.sprite(770, 580, 'player').setScale(1.5).setDepth(1);
        //  5000, 510

        this.cameras.main.startFollow(this.player);

        this.player.setCollideWorldBounds(true);
    
        layer.setCollision([35,36,37,39,13,20,21,26,27]);
        layer.setCollisionBetween(14,15);

        this.physics.add.collider(this.player,layer)

        this.bullet = this.physics.add.image(this.player.body.position.x, this.player.body.position.y - 20, 'bullets').setScale(1).setDepth(1);
        this.bullet.body.allowGravity = false;
        this.speed = Phaser.Math.GetSpeed(1500,3);
        this.bullet.setVisible(false);

        this.Boss = this.physics.add.image(10, 600, 'FinalBoss').setScale(7).setDepth(1);
        this.Boss.body.allowGravity = false;
        this.speed2 = Phaser.Math.GetSpeed(1500,3);

        this.explosionProj = this.add.image(this.bullet.body.position.x, this.bullet.body.position.y, 'ExoplosionProj').setScale(0.7).setDepth(2)
        this.explosionProj.setVisible(false);

        this.physics.add.overlap(this.bullet, this.Boss,(primo,secondo)=>{
            if(this.bullet.visible == true){
                disableExp = 0;
                this.bulletDamage()

                this.explosionProj.x = this.bullet.body.position.x - 50;
                this.explosionProj.y = this.bullet.body.position.y;
                this.explosionProj.setVisible(true);

                const myTimeout = setTimeout(explosionProjDisable, 300);
                function explosionProjDisable(){
                    disableExp = 1;
                }
            }

            this.bullet.x = this.player.body.position.x;
            this.bullet.y = this.player.body.position.y + 50;
            this.bullet.setVisible(false);
            CollisioneBoss = 1;
            this.fires = false
        })

        this.physics.add.overlap(this.bullet,layer,(primo,secondo)=>{
            if(secondo.index == 15 || secondo.index == 26 || secondo.index == 27 || secondo.index == 20 ||secondo.index == 21){
                if(this.bullet.visible == true){
                    disableExp = 0;

                    this.explosionProj.x = this.bullet.body.position.x;
                    this.explosionProj.y = this.bullet.body.position.y;
                    this.explosionProj.setVisible(true);

                    const myTimeout = setTimeout(explosionProjDisable, 300);
                    function explosionProjDisable(){
                        disableExp = 1;
                    }
                }
                this.bullet.x = this.player.body.position.x;
                this.bullet.y = this.player.body.position.y + 50;
                this.bullet.setVisible(false);
                CollisioneLayer = 1
                this.fires = false
            }

            layer.setCollision([35,36,37,39,13,20,21,26,27]);
            layer.setCollisionBetween(14,15);
        })

        this.ScoreTextEnemy = this.add.text(180,160, scoreEnemy, { fontSize: '27px', fill: '#00000' }).setDepth(2).setScrollFactor(0,1); 
        this.LifeBarEnemy = this.add.image(190, 173, 'LifeBarEnemy').setScale(0.25).setDepth(1).setScrollFactor(0,1); 

        this.physics.add.collider(this.player,this.Boss,()=>{
            PlayerLife -= 1000
            this.LifeText.setText(PlayerLife)
        })

        this.physics.add.overlap(layer,this.Boss,(primo,secondo)=>{
            if(secondo.index == 15 || secondo.index == 26 || secondo.index == 27 || secondo.index == 20 ||secondo.index == 21){
                map.removeTile(secondo, 0, false); 
            }
        })

        //prima palla di fuoco
        this.FireDragon = this.physics.add.image(this.Boss.body.position.x + 350, 428, 'FireDragon').setScale(7).setDepth(1)
        this.FireDragon.body.allowGravity = false;
        this.speed3 = Phaser.Math.GetSpeed(600,3);

        this.explosionFire = this.add.image(this.FireDragon.body.position.x, this.FireDragon.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
        this.explosionFire.setVisible(false);

        this.physics.add.overlap(this.player,this.FireDragon,()=>{
            fireDisableNow = 0;
            this.FireDragon.x = this.Boss.body.position.x + 800;
            this.FireDragon.setVisible(true)

            this.damageFireBall()

            this.explosionFire.x = this.player.body.position.x + 40;
            this.explosionFire.y = this.FireDragon.body.position.y + 30;
            this.explosionFire.setVisible(true);

            const myTimeout = setTimeout(fireDisable, 300);
            function fireDisable(){
                fireDisableNow = 1;
            }
        })

        this.physics.add.overlap(this.FireDragon,layer,(primo,secondo)=>{
            if(secondo.index == 15){
                fireDisableNow = 0;
                map.removeTile(secondo, 0, false); 
                this.FireDragon.x = this.Boss.body.position.x + 800;
                this.FireDragon.setVisible(true)

                this.explosionFire.x = this.FireDragon.body.position.x + 200;
                this.explosionFire.y = this.FireDragon.body.position.y;
                this.explosionFire.setVisible(true);

                const myTimeout = setTimeout(fireDisable, 300);
                function fireDisable(){
                    fireDisableNow = 1;
                }
            }

            layer.setCollision([35,36,37,39,13,20,21,26,27]);
            layer.setCollisionBetween(14,15);
        })
        //fine palla di fuoco

        //seconda palla di fuoco
        this.FireDragon2 = this.physics.add.image(this.Boss.body.position.x + 350, 275, 'FireDragon').setScale(7).setDepth(1)
        this.FireDragon2.body.allowGravity = false;
        this.speed4 = Phaser.Math.GetSpeed(600,3);

        this.explosionFire2 = this.add.image(this.FireDragon2.body.position.x, this.FireDragon2.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
        this.explosionFire2.setVisible(false);

        this.physics.add.overlap(this.player,this.FireDragon2,()=>{
            fireDisableNow = 0;
            this.FireDragon2.x = this.Boss.body.position.x + 800;
            this.FireDragon2.setVisible(true)

            this.damageFireBall()

            this.explosionFire2.x = this.player.body.position.x + 40;
            this.explosionFire2.y = this.FireDragon2.body.position.y + 30;
            this.explosionFire2.setVisible(true);

            const myTimeout2 = setTimeout(fireDisable2, 300);
            function fireDisable2(){
                fireDisableNow = 1;
            }
        })

        this.physics.add.overlap(this.FireDragon2,layer,(primo,secondo)=>{
            if(secondo.index == 15){
                fireDisableNow = 0;
                map.removeTile(secondo, 0, false); 
                this.FireDragon2.x = this.Boss.body.position.x + 800;
                this.FireDragon2.setVisible(true)

                this.explosionFire2.x = this.FireDragon2.body.position.x + 200;
                this.explosionFire2.y = this.FireDragon2.body.position.y;
                this.explosionFire2.setVisible(true);

                const myTimeout2 = setTimeout(fireDisable2, 300);
                function fireDisable2(){
                    fireDisableNow = 1;
                }
            }

            layer.setCollision([35,36,37,39,13,20,21,26,27]);
            layer.setCollisionBetween(14,15);
        })

        //fine seconda palla di fuoco

        //Terza palla di fuoco
        this.FireDragon3 = this.physics.add.image(this.Boss.body.position.x + 350, 650, 'FireDragon').setScale(7).setDepth(1)
        this.FireDragon3.body.allowGravity = false;
        this.speed5 = Phaser.Math.GetSpeed(600,3);

        this.explosionFire3 = this.add.image(this.FireDragon3.body.position.x, this.FireDragon3.body.position.y, 'ExoplosionProj').setScale(1.5).setDepth(2)
        this.explosionFire3.setVisible(false);

        this.physics.add.overlap(this.player,this.FireDragon3,()=>{
            fireDisableNow = 0;
            this.FireDragon3.x = this.Boss.body.position.x + 800;
            this.FireDragon3.setVisible(true)

            this.damageFireBall()

            this.explosionFire3.x = this.player.body.position.x + 40;
            this.explosionFire3.y = this.FireDragon3.body.position.y + 30;
            this.explosionFire3.setVisible(true);

            const myTimeout3 = setTimeout(fireDisable3, 300);
            function fireDisable3(){
                fireDisableNow = 1;
            }
        })

        this.physics.add.overlap(this.FireDragon3,layer,(primo,secondo)=>{
            if(secondo.index == 15){
                fireDisableNow = 0;
                map.removeTile(secondo, 0, false); 
                this.FireDragon3.x = this.Boss.body.position.x + 800;
                this.FireDragon3.setVisible(true)

                this.explosionFire3.x = this.FireDragon3.body.position.x + 200;
                this.explosionFire3.y = this.FireDragon3.body.position.y;
                this.explosionFire3.setVisible(true);

                const myTimeout3 = setTimeout(fireDisable3, 300);
                function fireDisable3(){
                    fireDisableNow = 1;
                }
            }

            layer.setCollision([35,36,37,39,13,20,21,26,27]);
            layer.setCollisionBetween(14,15);
        })

        //fine Terza palla di fuoco

        this.Key = this.physics.add.sprite(2120, 600, 'Key').setScale(0.08).setDepth(1);
        this.physics.add.collider(this.Key,layer)

        this.physics.add.overlap(this.player,this.Key,(player,Key)=>{
            this.Key.destroy()
            flagFirstKey = 1
        }); 

        this.Chest = this.physics.add.sprite(2120, 320, 'Chest').setScale(0.4).setDepth(1).setSize(215, 180)
        this.Chest.body.allowGravity = false;
        this.Chest.body.immovable = true;

        this.physics.add.collider(this.player,this.Chest,(player,chest)=>{
            if(flagFirstKey == 1){
                this.Chest.destroy()

                this.Brick = this.physics.add.image(2800, 420, 'OneBrick').setScale(0.7).setDepth(1).setSize(108, 106)
                this.Brick.body.allowGravity = false;
                this.Brick.body.immovable = true;
                this.physics.add.collider(this.player, this.Brick)
            }
        })

        this.ProjUpgrade1 = this.physics.add.image(3020, 270, 'proj3').setScale(1).setDepth(1);
        this.ProjUpgrade1.body.allowGravity = false

        this.physics.add.overlap(this.player,this.ProjUpgrade1,()=>{
            score += 1;
            this.ScoreText.setText('Punti:' + score)
            this.ProjUpgrade1.destroy();

            damage50 = true;
            damage100 = false;
            damage1 = false;
        });

        this.Life = this.physics.add.sprite(2970, 600, 'Life').setScale(2).setDepth(1);
        this.physics.add.collider(this.Life,layer)

        this.physics.add.overlap(this.player,this.Life,()=>{
            this.Life.destroy()

            score += 1
            this.ScoreText.setText('Punti:' + score)

            if(PlayerLife > 900){
                flagLife = 1000 - PlayerLife
                PlayerLife += flagLife
                this.LifeText.setText(PlayerLife)
            } else {
                PlayerLife += 100
                this.LifeText.setText(PlayerLife)
            }

        }); 

        this.ProjUpgrade2 = this.physics.add.image(4470, 620, 'proj3').setScale(1).setDepth(1);
        this.ProjUpgrade2.body.allowGravity = false

        this.physics.add.overlap(this.player,this.ProjUpgrade2,()=>{
            score += 1;
            this.ScoreText.setText('Punti:' + score)
            this.ProjUpgrade2.destroy();

            damage50 = false;
            damage100 = true;
            damage1 = false;
        });

    }

    update(time, delta){
        //timer alla rovescia
        i++
        if(i == 165){
            timer -=1
            this.TimerText.setText('Tempo: ' + timer)
            i = 0
        }
        //fine timer alla rovescia

        if(this.tastiera.left.isDown){
            this.player.setVelocityX(-290);
            this.player.setFlipX(true)
            left = true
        }
        else if(this.tastiera.right.isDown){
            this.player.setVelocityX(290);
            this.player.setFlipX(false)
            left = false
        }
        else{
            this.player.setVelocityX(0);
        }
        if((this.tastiera.up.isDown) && this.player.body.blocked.down){
            this.player.setVelocityY(-380);
        }

        if(this.tastiera.down.isDown && oneTimeInvincibile == 1){
            invincibile = 1
            this.ShieldText.setText('0')

            const myTimeout5 = setTimeout(NotInvincibile, 4000);
            function NotInvincibile(){
                invincibile = 0
            }
            oneTimeInvincibile = 0
        }

        if(invincibile == 1){
            y++
            if(y == 165){
                TimerInvincibile -=1
                this.TimerInvincibileText.setText('00:' + '0' + TimerInvincibile)
                
                y = 0
            }
        }

        if(PlayerLife == 0 || PlayerLife < 0 || timer == 0){
            this.scene.start('GameOver');

            PlayerLife = 1000;
            score = 0;
            left = false;
            scoreEnemy = 6000;
            CollisioneBoss = 0;
            firstTime = 1;
            disableExp = 0;
            fireDisableNow = 0;
            CollisioneLayer = 0
            flagFirstKey = 0;
            damage1 = true;
            damage50 = false;
            damage100 = false;
            flagLife = 0;
            piantaNo = false
            piantaYes = false
            spawnOneTime = 1;
            timer = 120;
            i = 0;
            invincibile = 0;
            oneTimeInvincibile = 1;
            TimerInvincibile = 4;
            y = 0;
            oneTimeCrown = 1;
            win = 0;
            death = false;
        }

        if(this.player.body.position.y > 870 ){
            this.scene.start('GameOver');

            PlayerLife = 1000;
            score = 0;
            left = false;
            scoreEnemy = 6000;
            CollisioneBoss = 0;
            firstTime = 1;
            disableExp = 0;
            fireDisableNow = 0;
            CollisioneLayer = 0
            flagFirstKey = 0;
            damage1 = true;
            damage50 = false;
            damage100 = false;
            flagLife = 0;
            piantaNo = false
            piantaYes = false
            spawnOneTime = 1;
            timer = 120;
            i = 0;
            invincibile = 0;
            oneTimeInvincibile = 1;
            TimerInvincibile = 4;
            y = 0;
            oneTimeCrown = 1;
            win = 0;
            death = false;
        }

        if (this.tastiera.space.isDown && CollisioneBoss == 1 && left == true){ 
            CollisioneBoss = 0
            this.fire()
            this.fires = true
        } else if(this.tastiera.space.isDown && firstTime == 1 && left == true){
            this.fire()
            this.fires = true
            firstTime = 0;
        } else if(this.tastiera.space.isDown && this.bullet.x < 0 && left == true){
            this.fire()
            this.fires = true
        } else if(this.tastiera.space.isDown && CollisioneLayer == 1 && left == true){
            CollisioneLayer = 0
            this.fire()
            this.fires = true
        }

        if(this.fires == true){
            this.bullet.x -= this.speed * delta;
        }
        
        if(death == false){
            if(this.player.body.position.x > this.Boss.body.position.x){
                if(this.Boss.body.position.x > this.player.body.position.x - 1400){
                    this.Boss.body.stop()
                } else {
                    this.Boss.x += this.speed2 * delta;
                }
            }
        }

        if(disableExp == 1){
            this.explosionProj.setVisible(false)
        }

        if(fireDisableNow == 1){
            this.explosionFire.setVisible(false)
            this.explosionFire2.setVisible(false)
            this.explosionFire3.setVisible(false)
        }

        if(death == false){
            this.FireDragon.x += this.speed3 * delta;
            if(this.FireDragon.x >= this.player.body.position.x + 400){
                this.FireDragon.x = this.Boss.body.position.x + 800;
            }
        }

        if(death == false){
            this.FireDragon2.x += this.speed4 * delta;
            if(this.FireDragon2.x >= this.player.body.position.x + 400){
                this.FireDragon2.x = this.Boss.body.position.x + 800;
            }
        }

        if(death == false){
            this.FireDragon3.x += this.speed5 * delta;
            if(this.FireDragon3.x >= this.player.body.position.x + 400){
                this.FireDragon3.x = this.Boss.body.position.x + 800;
            }
        }

        if(score == 2 && spawnOneTime == 1){
            this.Tubo = this.physics.add.sprite(3700, 650, 'Tubo').setScale(1.3).setDepth(1);
            this.Tubo.body.immovable = true;
            this.Tubo.body.allowGravity = false
            this.physics.add.collider(this.Tubo,this.player)

            this.Pianta = this.physics.add.sprite(3700, 395, 'Pianta').setScale(0.3).setDepth(1);
            this.Pianta.body.allowGravity = false
            this.Pianta.body.immovable = true;

            const myTimeoutNot = setTimeout(PiantaNotVisible, 3500);
            function PiantaNotVisible(){
                piantaNo = true;
            }

            this.physics.add.overlap(this.Pianta,this.player,(pianta,player)=>{
                if(this.Pianta.visible == true){
                    this.damagePianta()
                }
            })

            spawnOneTime = 0;
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

        if(scoreEnemy == 0 && oneTimeCrown == 1 || scoreEnemy < 0 && oneTimeCrown == 1){
            death = true
            this.Boss.destroy()
            this.FireDragon.destroy()
            this.FireDragon2.destroy()
            this.FireDragon3.destroy()
            this.ScoreTextEnemy.destroy()
            this.LifeBarEnemy.destroy()

            this.Brick = this.physics.add.image(4400, 733, 'Brick').setScale(0.7).setDepth(1).setSize(314, 106)
            this.Brick.body.allowGravity = false;
            this.Brick.body.immovable = true;
            this.physics.add.collider(this.player, this.Brick)

            this.Crown = this.physics.add.sprite(4400, 600, 'Crown').setScale(0.0500).setDepth(1);
            this.physics.add.collider(this.Crown,this.Brick)
            this.physics.add.overlap(this.Crown,this.player,()=>{
                this.Crown.destroy()
                win = 1;
            })

            oneTimeCrown = 0;
        }

        if(win == 1){
            this.scene.start("ScenaWin")

            PlayerLife = 1000;
            score = 0;
            left = false;
            scoreEnemy = 6000;
            CollisioneBoss = 0;
            firstTime = 1;
            disableExp = 0;
            fireDisableNow = 0;
            CollisioneLayer = 0
            flagFirstKey = 0;
            damage1 = true;
            damage50 = false;
            damage100 = false;
            flagLife = 0;
            piantaNo = false
            piantaYes = false
            spawnOneTime = 1;
            timer = 120;
            i = 0;
            invincibile = 0;
            oneTimeInvincibile = 1;
            TimerInvincibile = 4;
            y = 0;
            oneTimeCrown = 1;
            win = 0;
            death == false
        }
    
    }

    fire(){
        this.bullet.x = this.player.body.position.x;
        this.bullet.y = this.player.body.position.y + 50;
        this.bullet.setVisible(true);
    }
    
    bulletDamage(){
        if(damage1 == true){
            scoreEnemy -= 10
            this.ScoreTextEnemy.setText(scoreEnemy)
        } else if(damage50 == true){
            scoreEnemy -= 50
            this.ScoreTextEnemy.setText(scoreEnemy)
        } else if(damage100 == true){
            scoreEnemy -= 100
            this.ScoreTextEnemy.setText(scoreEnemy)
        }
    }

    damageFireBall(){
        if(invincibile != 1){
            PlayerLife -= 80;
            this.LifeText.setText(PlayerLife)
        } 
    }

    damagePianta(){
        if(invincibile != 1){
            PlayerLife = PlayerLife - 17;
            this.LifeText.setText(PlayerLife);
        }
    }

}

export default QuintaScena;