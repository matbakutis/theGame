initTilemap() {
  //  The 'tavern' key here is the Loader key given in game.load.tilemap
  let map = game.add.tilemap('cave');
  // store a reference so we can access it elsewhere on this class
  this.map = map;

  // The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
  // The second parameter maps this name to the Phaser.Cache key 'tiles'
  map.addTilesetImage('tilesetHouse', 'tiles');
  map.addTilesetImage('Hints', 'hints');

  // create the base layer, these are the floors, walls
  // and anything else we want behind any sprites
  map.createLayer('Base');

  // next create the collision layer
  let collisionLayer = map.createLayer('Collision');
  this.collisionLayer = collisionLayer;

  // we don't want the collision layer to be visible
  collisionLayer.visible = false;

  // inform phaser that our collision layer is our collision tiles
  // in our case, since we separated out the collision tiles into its own layer
  // we pass an empty array and passing in true to enable collision
  map.setCollisionByExclusion([], true, this.collisionLayer);

  //  This resizes the game world to match the layer dimensions
  collisionLayer.resizeWorld();

  // we will have to initialize our player here
  // so it's sprite will show between the base and foreground tiles
  this.initPlayer();

  // creating the foreground layer last after all moving sprites
  // ensures that this layer will stay above during depth sorting
  map.createLayer('Foreground');

  // pull the exit area from the object layer
  // we will be using this one during update to check if our player has moved into the exit area
  let exit = this.map.objects.Meta.find( o => o.name == 'exit');
  this.exitRect = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
}