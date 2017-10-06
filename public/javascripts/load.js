let loadState = {
	preload: function(){
		game.load.tilemap('cave', '/images/jsonMaps/caveMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles1', '/images/tilesets/hyptosis_tile-art-batch-1.png');
		game.load.image('tiles2', '/images/tilesets/hyptosis_til-art-batch-2.png');
		game.load.image('tiles3', '/images/tilesets/hyptosis_tile-art-batch-3.png');
		game.load.image('tiles4', '/images/tilesets/hyptosis_tile-art-batch-4.png');
		game.load.image('tiles5', '/images/tilesets/hyptosis_tile-art-batch-5.png');
		game.load.spritesheet('femaleMage', '/images/sprites/characters/Heroes/Mage-F-01.png', 24, 32, 12);
		game.load.spritesheet('maleMage', '/images/sprites/characters/Heroes/Mage-M-01.png', 24, 32, 12);
		game.load.spritesheet('femaleRanger', '/images/sprites/characters/Heroes/Ranger-F-01.png', 24, 32, 12);
		game.load.spritesheet('maleRanger', '/images/sprites/characters/Heroes/Ranger-M-01.png', 24, 32, 12);
		game.load.spritesheet('fireBall', '/images/fireballoga/red/spritesheet-red.png', 512, 197, 6);
		game.load.spritesheet('iceBall', '/images/fireballoga/blue/spritesheet-blue.png', 512, 197, 6);
		game.load.spritesheet('laserBall', '/images/fireballoga/pink/spritesheet-pink.png', 512, 197, 6);
		game.load.spritesheet('redEnemy', '/images/sprites/redSprite/enemySpriteSheet.png', 535, 495, 2);
		game.load.audio('caveTheme', '/sounds/caveTheme.mp3');
		game.load.audio('spell1', '/sounds/launches/flaunch.wav');
		game.load.audio('spell2', '/sounds/launches/iceball.wav');
		game.load.audio('spell3', '/sounds/launches/rlaunch.wav');
		game.load.image('menuBackground', "/images/backgrounds/startScreen.jpg");
		game.load.image('deathBackground', "/images/backgrounds/deathScreen.jpg");
	},

	create: function(){
		game.state.start('menu');
	}
};