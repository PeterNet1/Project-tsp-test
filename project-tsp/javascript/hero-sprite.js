/**
	animation speed is measured in ms per frame
*/
function HeroSprite(context2D, characterId, positionX, positionY, animationSpeed) {
	var frame = 0;
	var animationRow = 0;
	var lastUpdateTime = 0;
	var acDelta = 0;
	var animationFrames = 3;
	var drawingFunction = null;

	//Extract to class sprite information
	var heroImage = ResourceManagerSingleton.getImage("sprites/heroes/heroes.png");
	var herosPerRow = 4;
	var heroRows = 2;
	var heroWidth = 32;
	var heroHeight = 32;
	var animationsCount = 4;

	var spriteX = positionX;
	var spriteY = positionY;

	var redraw = function() {

		var heroRow = Math.floor(characterId/herosPerRow);
		var heroColumn = characterId % herosPerRow;

		var heroPositionX = (frame + heroColumn * animationFrames) * heroWidth;
		var heroPositionY = (animationRow + heroRow * animationsCount) * heroHeight;

		ctx.drawImage(heroImage, 
					  heroPositionX, heroPositionY,
					  heroWidth, heroHeight, 
					  spriteX, spriteY, 
					  heroWidth, heroHeight);
	}

	var animationDrawingFunction = function() {
		var delta = Date.now() - lastUpdateTime; 
		if (acDelta > animationSpeed) { 
			acDelta = 0; 
			frame++; 
			if (frame >= animationFrames) { 
				frame = 0; 
			}
		} else { 
			acDelta += delta; 
		}
		redraw(); 
		lastUpdateTime = Date.now();
	}

	this.setCharacterId = function(id) {
		characterId = id;
	}

	this.setX = function(position) {
		spriteX = position;
	}

	this.getX = function() {
		return spriteX;
	}

	this.setY = function(position) {
		spriteY = position;
	}

	this.getY = function() {
		return spriteY;
	}

	this.getWidth = function() {
		return heroWidth;
	}

	this.getHeight = function() {
		return heroHeight;
	}

	this.startAnimation = function() {
		//lastUpdateTime = Date.now();
		//acDelta = 0;
		drawingFunction = animationDrawingFunction;
		//console.log("startingAnimation");
	}

	this.stopAnimation = function() {
		drawingFunction = redraw;
	}

	this.lookDown = function() {
		animationRow = 0;
	}

	this.lookLeft = function() {
		animationRow = 1;
	}

	this.lookRight = function() {
		animationRow = 2;
	}

	this.lookUp = function() {
		animationRow = 3;
	}

	this.draw = function(deltaSeconds) {
		drawingFunction();
	}

	var construct = function() {
		drawingFunction = redraw;
	}

	construct();
}
