let chosenCharacter = "femaleMage";
let menuState = {
	create: function(){
		game.add.tileSprite(0, 0, 960, 640, 'menuBackground');
		const nameLabel = game.add.text(500, 80, "theGame", {font: '80px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10});
		const startLabel = game.add.text(80, game.world.height-80, "Press F to start!", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10});
		const fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
		fKey.onDown.addOnce(this.start, this);
		const mm = game.add.text(650, 300, "Male Mage", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const fm = game.add.text(650, 350, "Female Mage", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness:5});
		const mr = game.add.text(650, 400, "Male Ranger", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const fr = game.add.text(650, 450, "Female Ranger", {font: '30px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness:5});
		const choose = game.add.text(550, 225, "Choose your Character!", {font: '35px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 10});
		mm.inputEnabled = true;
		fm.inputEnabled = true;
		mr.inputEnabled = true;
		fr.inputEnabled = true;
		mm.events.onInputDown.add(function(){chosenCharacter = "maleMage"}, this);
		fm.events.onInputDown.add(function(){chosenCharacter = "femaleMage"}, this);
		mr.events.onInputDown.add(function(){chosenCharacter = "maleRanger"}, this);
		fr.events.onInputDown.add(function(){chosenCharacter = "femaleRanger"}, this);
		const move = game.add.text(30, 300, "W,A,S,D to move", {font: '20px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const attack1 = game.add.text(30, 330, "1 for 30 damage attack (1 sec cooldown)", {font: '20px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const attack2 = game.add.text(30, 360, "2 for 70 damage attack (5 sec cooldown)", {font: '20px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const attack3 = game.add.text(30, 390, "3 for 100 damage attack (10 sec cooldown)", {font: '20px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
		const aim = game.add.text(30, 420, "Mouse cursor to aim", {font: '20px Nothing You Could Do', fill: '#ffffff', stroke: "#000000", strokeThickness: 5});
	},
	start: function(){
		game.state.start('play');
	}
};