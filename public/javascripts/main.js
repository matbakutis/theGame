const game = new Phaser.Game(960, 640, Phaser.AUTO, 'theGame', { preload: preload, create: create, update: update, render: render });
let fireBall;
let char;
let enemies1;
let round = 1;
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
}

function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);
	  let map = game.add.tilemap('cave');
	  this.map = map;

	  map.addTilesetImage('tiles1', 'tiles1');
	  map.addTilesetImage('tiles2', 'tiles2');
	  map.addTilesetImage('tiles3', 'tiles3');
	  map.addTilesetImage('tiles4', 'tiles4');
	  map.addTilesetImage('tiles5', 'tiles5');

	  map.createLayer('ground');
	  map.createLayer('rocks');

	  let collisionLayer = map.createLayer('collision');
	  this.collisionLayer = collisionLayer;

	  collisionLayer.visible = false;

	  map.setCollisionByExclusion([], true, this.collisionLayer);

	  char = game.add.sprite(480, 320, 'femaleMage', 7);
	  char.scale.setTo(1.5, 1.5)
	  char.anchor.set(0.5, 0.5);
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
      fireBall.callAll('scale.set', 'scale', 0.25, 0.25);
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
      iceBall.callAll('scale.set', 'scale', 0.25, 0.25);
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
      laserBall.callAll('scale.set', 'scale', 0.25, 0.25);
      laserBall.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
      laserBall.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5], 5, true);
      laserBall.callAll('play', null, 'fire');

      enemies1 = game.add.group();
      enemies1.enableBody = true;
      enemies1.physicsBodyType = Phaser.Physics.ARCADE;
      for (let i = 0; i < 10; i++){
      	let theEnemy = game.add.sprite(950, 200, 'redEnemy', 1);
      	theEnemy.scale.setTo(.25, .25);
      	theEnemy.animations.add('idle', [0,1], true);
      	theEnemy.animations.play('idle');
      	enemies1.add(theEnemy);
      };
      
	  
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
    if (game.input.keyboard.isDown(Phaser.KeyCode.FIVE)){

        startTheGame(round++);
    }
    
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
    }

}

function render() {
    game.debug.spriteInfo(this.char, 20, 32);

}

function startTheGame(round) {
	for (let i = 0; i < round; i++){
		let enemy = enemies1.getFirstDead();
		let randNum = 0;
		if (randNum === 0){
        	enemy.reset(718, 654);
        	game.physics.arcade.moveToPointer(enemy, 500);
        	randNum = 1;
		}else if (randNum === 1){
        	enemy.reset(236, 654);
        	game.physics.arcade.moveToPointer(enemy, 500);
        	randNum = 0;
		}
    }
}




























