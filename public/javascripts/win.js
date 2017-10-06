let winState = {
	create: function(){
		game.add.tileSprite(0, 0, 960, 640, 'deathBackground');
		const winLabel = game.add.text(80, 80, "You died. You scored " + score + " points!", {font: '50px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10});
		const restartLabel = game.add.text(80, game.world.height-80, "Press F to restart!", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10});
		const fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
		fKey.onDown.addOnce(this.restart, this);
		const quote = game.add.text(80, 200, "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.   ~ Mark Twain", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10, wordWrap: true, wordWrapWidth: 500, align: 'left'});
	},

	restart: function(){
		location.reload();
	}
};
