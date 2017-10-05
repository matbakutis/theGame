const game = new Phaser.Game(960, 640, Phaser.AUTO, 'theGame', { preload: preload, create: create, update: update, render: render });
let fireBall;
let char;
let enemies1;
let round = 0;
let caveTheme;
let soundManager;
function preload() {
	game.load.tilemap('cave', '/images/jsonMaps/caveMap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles1', '/images/tilesets/hyptosis_tile-art-batch-1.png');
	game.load.image('tiles2', '/images/tilesets/hyptosis_til-art-batch-2.png');
	game.load.image('tiles3', '/images/tilesets/hyptosis_tile-art-batch-3.png');
	game.load.image('tiles4', '/images/tilesets/hyptosis_tile-art-batch-4.png');
	game.load.image('tiles5', '/images/tilesets/hyptosis_tile-art-batch-5.png');
	game.load.spritesheet('femaleMage', '/images/sprites/characters/Heroes/Mage-F-01.png', 24, 32, 12);
	game.load.spritesheet('fireBall', '/images/fireballoga/red/spritesheet-red.png', 512, 197, 6);
	game.load.spritesheet('iceBall', '/images/fireballoga/blue/spritesheet-blue.png', 512, 197, 6);
	game.load.spritesheet('laserBall', '/images/fireballoga/pink/spritesheet-pink.png', 512, 197, 6);
	game.load.spritesheet('redEnemy', '/images/sprites/redSprite/enemySpriteSheet.png', 535, 495, 2);
  game.load.audio('caveTheme', '/sounds/caveTheme.mp3');
  game.load.audio('spell1', '/sounds/launches/flaunch.wav');
  game.load.audio('spell2', '/sounds/launches/iceball.wav');
  game.load.audio('spell3', '/sounds/launches/rlaunch.wav');
}

function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);
	  let map = game.add.tilemap('cave');
	  this.map = map;

    soundManager = new Phaser.SoundManager(game);
    spell1 = soundManager.add('spell1');
    spell2 = soundManager.add('spell2');
    spell3 = soundManager.add('spell3');
    caveTheme = soundManager.add('caveTheme');
    soundManager.setDecodedCallback('caveTheme', function(){
      caveTheme.play();
      this.play()
      console.log('loaded');
    }, this); 
    

    console.log(caveTheme, ' after playe')

	  map.addTilesetImage('tiles1', 'tiles1');
	  map.addTilesetImage('tiles2', 'tiles2');
	  map.addTilesetImage('tiles3', 'tiles3');
	  map.addTilesetImage('tiles4', 'tiles4');
	  map.addTilesetImage('tiles5', 'tiles5');

	  map.createLayer('ground');
	  map.createLayer('rocks');

	  let collisionLayer = map.createLayer('collision');
	  this.collisionLayer = collisionLayer;
    let enemyCollision = map.createLayer('enemyCollision');
    this.enemyCollision = enemyCollision;

	  collisionLayer.visible = false;
	  map.setCollisionByExclusion([], true, this.collisionLayer);
    enemyCollision.visible = false;
    map.setCollisionByExclusion([], true, this.enemyCollision);

	  char = game.add.sprite(480, 320, 'femaleMage', 7);
	  char.scale.setTo(1.5, 1.5)
	  char.anchor.set(0.5, 0.5);
	  char.health = 100;
	  char.animations.add('up', [0, 1, 2, 1], 8, true);
	  char.animations.add('right', [3, 4, 5, 4], 8, true);
	  char.animations.add('down', [6, 7, 8, 7], 8, true);
	  char.animations.add('left', [9, 10, 11, 10], 8, true);
	  game.physics.enable(char, Phaser.Physics.ARCADE);

	  fireBall = game.add.group();
	  fireBall.fireRate = 1000;
	  fireBall.nextFire = 0;
   	  fireBall.enableBody = true;
      fireBall.physicsBodyType = Phaser.Physics.ARCADE;
      fireBall.createMultiple(50, 'fireBall');
      fireBall.setAll('checkWorldBounds', true);
      fireBall.setAll('outOfBoundsKill', true);
      fireBall.setAll('damage', 30);
      fireBall.callAll('scale.set', 'scale', 0.1, 0.1);
      fireBall.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
      fireBall.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5], 5, true);
      fireBall.callAll('play', null, 'fire');

      iceBall = game.add.group();
      iceBall.fireRate = 5000;
      iceBall.nextFire = 0;
   	  iceBall.enableBody = true;
      iceBall.physicsBodyType = Phaser.Physics.ARCADE;
      iceBall.createMultiple(50, 'iceBall');
      iceBall.setAll('checkWorldBounds', true);
      iceBall.setAll('outOfBoundsKill', true);
      iceBall.setAll('damage', 70);
      iceBall.callAll('scale.set', 'scale', 0.15, 0.15);
      iceBall.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
      iceBall.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5], 5, true);
      iceBall.callAll('play', null, 'fire');

      laserBall = game.add.group();
      laserBall.fireRate = 10000;
      laserBall.nextFire = 0;
   	  laserBall.enableBody = true;
      laserBall.physicsBodyType = Phaser.Physics.ARCADE;
      laserBall.createMultiple(50, 'laserBall');
      laserBall.setAll('checkWorldBounds', true);
      laserBall.setAll('outOfBoundsKill', true);
      laserBall.setAll('damage',100);
      laserBall.callAll('scale.set', 'scale', 0.2, 0.2);
      laserBall.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
      laserBall.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5], 5, true);
      laserBall.callAll('play', null, 'fire');

      enemies1 = game.add.group();
      enemies1.enableBody = true;
      enemies1.physicsBodyType = Phaser.Physics.ARCADE;
      for (let i = 0; i < 50; i++){
      	let theEnemy = game.add.sprite(480, 320, 'redEnemy', 1);
      	theEnemy.scale.setTo(.075, .075);
      	theEnemy.anchor.set(.5, .5);
      	theEnemy.animations.add('idle', [0,1], 4, true);
      	theEnemy.animations.play('idle');
      	theEnemy.damage = 10;
      	enemies1.add(theEnemy);
      };
      enemies1.killAll();
      
    timer = game.time.create(false);
    timer.start();

	  
	  map.createLayer('foreground');
	  console.log(this);
	  this.char = char;
	  this.fireBall = fireBall;
	  this.enemies1 = enemies1;
}

function update() {
	game.physics.arcade.collide(this.char, this.collisionLayer);
	if (game.input.keyboard.isDown(Phaser.KeyCode.A)){
        char.animations.play('left');
        char.body.velocity.x = -100;
    }else if (game.input.keyboard.isDown(Phaser.KeyCode.D)){
        char.animations.play('right');
        char.body.velocity.x = 100;
    }else {
    	char.animations.stop('right');
    	char.animations.stop('left');
 		char.body.velocity.x = 0;
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.W)){
        char.animations.play('up');
        char.body.velocity.y = -100;
    }else if (game.input.keyboard.isDown(Phaser.KeyCode.S)){
        char.animations.play('down');
        char.body.velocity.y = 100;
    }else {
    	char.animations.stop('up');
    	char.animations.stop('down');
 		char.body.velocity.y = 0;
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.ONE)){
        fire(fireBall);
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.TWO)){
        fire(iceBall);
    }
    if (game.input.keyboard.isDown(Phaser.KeyCode.THREE)){
        fire(laserBall);
    }

    if (enemies1.countLiving() === 0){
		  round++;
   		startTheGame(round);
    };
    game.physics.arcade.collide(enemies1);
    game.physics.arcade.collide(enemies1, this.enemyCollision);
    enemies1.forEachAlive(follow, this);
    game.physics.arcade.overlap(fireBall, enemies1, collisionHandler, null, this);
    game.physics.arcade.overlap(iceBall, enemies1, collisionHandler, null, this);
    game.physics.arcade.overlap(laserBall, enemies1, collisionHandler, null, this);
		
}

function collisionHandler(ball, enemy){
	ball.kill();
	enemy.healthPool -= ball.damage;
	if (enemy.healthPool <= 0){
		enemy.kill();
	}
}

function follow(enemy){
	let radians = game.physics.arcade.angleBetween(enemy, char);
	let degrees = radians * (180/Math.PI);
	game.physics.arcade.velocityFromAngle(degrees, 50, enemy.body.velocity);
}


function fire(ball) {
	
    if (game.time.now > ball.nextFire && ball.countDead() > 0){
        ball.nextFire = game.time.now + ball.fireRate;
        let bullet = ball.getFirstDead();
        if (bullet.visible === false){
    		  ball.setAll('rotation', game.physics.arcade.angleToPointer(char));
  		  }	
        bullet.reset(char.position.x, char.position.y);
        game.physics.arcade.moveToPointer(bullet, 500);
        if (bullet.key === 'fireBall'){
          spell1.play();
          ballDown1 = game.add.sprite(375, 630, 'fireBall', 1);
          ballDown1.scale.setTo(.2, .2)
          ballDown1.anchor.set(0.5, 0.5);
          ballDown1.animations.add('idle', [0,1,2,3,4,5], 5, true);
          ballDown1.animations.play('idle');
          timer.add(1000, function(){ballDown1.destroy();}, this);
        }else if (bullet.key === 'iceBall'){
          spell2.play();
          ballDown2 = game.add.sprite(465, 630, 'iceBall', 1);
          ballDown2.scale.setTo(.2, .2)
          ballDown2.anchor.set(0.5, 0.5);
          ballDown2.animations.add('idle', [0,1,2,3,4,5], 5, true);
          ballDown2.animations.play('idle');
          timer.add(5000, function(){ballDown2.destroy();}, this);
        }else if (bullet.key === 'laserBall'){
          spell3.play();
          ballDown3 = game.add.sprite(555, 630, 'laserBall', 1);
          ballDown3.scale.setTo(.2, .2)
          ballDown3.anchor.set(0.5, 0.5);
          ballDown3.animations.add('idle', [0,1,2,3,4,5], 5, true);
          ballDown3.animations.play('idle');
          timer.add(10000, function(){ballDown3.destroy();}, this);        
        };
    }
}

function render() {
    game.debug.spriteInfo(this.char, 20, 32);

}

function startTheGame(round) {
	let y = 654;
	for (let i = 0; i < round * 2; i++){
		if (enemies1.countDead() > 0 && enemies1.countLiving() < round * 2){
			let enemy = enemies1.getFirstDead();
			enemy.healthPool = 100;
			let rand = Math.random();
			y += 30;
			if (rand > .5){
		   		enemy.reset(718, y);
		   	}else if (rand < .5){
		   		enemy.reset(236, y);
		   	};  
		};
	};
}





























