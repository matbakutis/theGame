const game = new Phaser.Game(960, 640, Phaser.AUTO, 'theGame', { preload: preload, create: create, update: update, render: render });
let fireRate = 1000;
let nextFire = 0;
let fireBall;
let char;
function preload() {
	game.load.tilemap('cave', '/images/jsonMaps/caveMap.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles1', '/images/tilesets/hyptosis_tile-art-batch-1.png');
	game.load.image('tiles2', '/images/tilesets/hyptosis_til-art-batch-2.png');
	game.load.image('tiles3', '/images/tilesets/hyptosis_tile-art-batch-3.png');
	game.load.image('tiles4', '/images/tilesets/hyptosis_tile-art-batch-4.png');
	game.load.image('tiles5', '/images/tilesets/hyptosis_tile-art-batch-5.png');
	game.load.spritesheet('femaleMage', '/images/sprites/characters/Heroes/Mage-F-01.png', 24, 32, 12);
	game.load.spritesheet('fireBall', '/images/fireballoga/red/spritesheet-red.png', 512, 197, 6);
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
   	  fireBall.enableBody = true;
      fireBall.physicsBodyType = Phaser.Physics.ARCADE;
      fireBall.createMultiple(50, 'fireBall');
      fireBall.setAll('checkWorldBounds', true);
      fireBall.setAll('outOfBoundsKill', true);
      fireBall.callAll('scale.set', 'scale', 0.25, 0.25);
      fireBall.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
      fireBall.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5], 5, true);
      fireBall.callAll('play', null, 'fire');
      
	  
	  map.createLayer('foreground');
	  console.log(this);
	  this.char = char;
	  this.fireBall = fireBall;
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
        fire(this);
    }
    
}


function fire(thisthis) {
	
    if (game.time.now > nextFire && fireBall.countDead() > 0){
        nextFire = game.time.now + fireRate;
        let bullet = fireBall.getFirstDead();
        game.physics.arcade.collide(fireBall, thisthis.collisionLayer, ()=>{
			bullet.kill();
			}, null, this);
        if (bullet.visible === false){
    		fireBall.setAll('rotation', game.physics.arcade.angleToPointer(char));
  		}	
        bullet.reset(char.position.x, char.position.y);
        game.physics.arcade.moveToPointer(bullet, 500);
    }

}

function render() {
    game.debug.spriteInfo(this.char, 20, 32);

}