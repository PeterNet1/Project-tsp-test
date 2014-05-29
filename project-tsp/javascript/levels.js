function Level(context2D, width, height, levelModel) {
	var columnsCount = levelModel.columnsCount;
	var mapGrid = levelModel.tileGrid;

	var rowsCount = mapGrid.length / columnsCount;

	var textureWidth = width / columnsCount;
	var textureHeight = height / rowsCount;

	var rigidBodies = Array();
	var collidables = levelModel.collidables;

	for (var i = 0; i < mapGrid.length; i++) {
		if (collidables.contains(mapGrid[i])) {
			var column = i % columnsCount;
			var row = Math.floor(i / columnsCount);

			rigidBodies.push(new RigidBody(column*textureWidth, row*textureHeight, textureWidth, textureHeight));
		}
	}

	var textures = levelModel.textures;

	this.getRigidBodies = function() {
		return rigidBodies;
	}

	this.draw = function(deltaSeconds) {
		
		for (var i = 0; i < mapGrid.length; i++) {
			var textureImage = textures[mapGrid[i]];
			var column = i % columnsCount;
			var row = Math.floor(i / columnsCount);

			ctx.drawImage(textureImage, 
						  column*textureWidth, row*textureHeight, 
						  textureWidth, textureHeight);
		
		};
	}
}

var LoadLevelOne = function(context2D, width, height) {
	var levelOneModel = new LevelModel();
	levelOneModel.tileGrid =   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
						   		1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
								1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
							    1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
							    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
							    1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
						    	1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
							    1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
							    1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
							    1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1,
							    1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1,
							    1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
							    1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,
							    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	levelOneModel.columnsCount = 20;
	levelOneModel.collidables = [1];

	var textures = Array();
	textures[0] = ResourceManagerSingleton.getImage("sprites/levels/floor.png");
	textures[1] = ResourceManagerSingleton.getImage("sprites/levels/stone-wall.jpg");

	levelOneModel.textures = textures;

	return new Level(context2D, width, height, levelOneModel);
}