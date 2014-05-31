function Character(ctx, playerModel) {
	var self = this;

	var heroSprite = new HeroSprite(this.ctx, 
									playerModel.characterId, 
									playerModel.characterRectX, 
									playerModel.characterRectY, 
									6000/playerModel.characterSpeed); 
	self.getRect = function() {
		return new Rectangle(new Point(heroSprite.getX(), heroSprite.getY()), heroSprite.getWidth(), heroSprite.getHeight());
	}

	var characterRect = self.getRect();
	var characterBody = new RigidBody(characterRect.point.x, 
									  characterRect.point.y, 
									  characterRect.width, 
									  characterRect.height);

	self.getRigidBody = function() {
		return characterBody;
	}

	self.getModel = function() {
		return playerModel;
	}

	var orientationFunctions = Array();
	var isMoving = false;

	var calculateElapsedLength = function(delta) {
		return delta * playerModel.characterSpeed / 1000
	}

	orientationFunctions[Movement.UP] = function(delta) {
		isMoving = true;
		heroSprite.lookUp();
		var newY = playerModel.characterRectY - calculateElapsedLength(delta);
		characterBody.y = newY;
		var collisionBody = characterBody.doesCollide();
		if (collisionBody) {
			newY = collisionBody.y + collisionBody.height;
			characterBody.y = newY;
		} 

		playerModel.characterRectY = newY;
		//heroSprite.setY(newY);
		if (self.onCharacterMovement) {
			self.onCharacterMovement(playerModel.characterRectX, playerModel.characterRectY, Movement.UP);
		}
	}

	orientationFunctions[Movement.LEFT] = function(delta) {
		isMoving = true;
		heroSprite.lookLeft();
		var newX = playerModel.characterRectX - calculateElapsedLength(delta);
		characterBody.x = newX;
		var collisionBody = characterBody.doesCollide();
		if (collisionBody) {
			newX = collisionBody.x + collisionBody.width;
			characterBody.x = newX;
		} 
		
		playerModel.characterRectX = newX;
		//heroSprite.setX(newX);
		if (self.onCharacterMovement) {
			self.onCharacterMovement(playerModel.characterRectX, playerModel.characterRectY, Movement.LEFT);
		}
	}

	orientationFunctions[Movement.RIGHT] = function(delta) {
		isMoving = true;
		heroSprite.lookRight();
		var newX = playerModel.characterRectX + calculateElapsedLength(delta);
		characterBody.x = newX;
		var collisionBody = characterBody.doesCollide();
		if (collisionBody) {
			newX = collisionBody.x - characterBody.width;
			characterBody.x = newX;
		} 

		playerModel.characterRectX = newX;
		//heroSprite.setX(newX);
		if (self.onCharacterMovement) {
			self.onCharacterMovement(playerModel.characterRectX, playerModel.characterRectY, Movement.RIGHT);
		}
	}

	orientationFunctions[Movement.DOWN] = function(delta) {
		isMoving = true;
		heroSprite.lookDown();
		var newY = playerModel.characterRectY + calculateElapsedLength(delta);
		characterBody.y = newY;
		var collisionBody = characterBody.doesCollide();
		if (collisionBody) {
			newY = collisionBody.y - characterBody.height;
			characterBody.y = newY;
		} 
		playerModel.characterRectY = newY;
		//heroSprite.setY(newY);
		if (self.onCharacterMovement) {
			self.onCharacterMovement(playerModel.characterRectX, playerModel.characterRectY, Movement.DOWN);
		}
	}

	orientationFunctions[Movement.HOLD] = function(delta) {
		if (isMoving && self.onCharacterMovement) {
			self.onCharacterMovement(playerModel.characterRectX, playerModel.characterRectY, Movement.HOLD);
		}
		isMoving = false;
	}

	var updateHeroSprite = function() {
		heroSprite.setX(playerModel.characterRectX);
		heroSprite.setY(playerModel.characterRectY);
	}

	var updateAnimation = function() {
		if (playerModel.movement == Movement.HOLD) {
			heroSprite.stopAnimation();
		} else {
			heroSprite.startAnimation();
		}
	}

	var processChanges = function(delta) {
		updateAnimation();
		orientationFunctions[playerModel.movement](delta);
		updateHeroSprite();
	}

	self.draw = function(delta) {
		processChanges(delta);

		heroSprite.draw();

		//ctx.fillStyle = "white";
		//ctx.fillRect(characterBody.x, characterBody.y, characterBody.width, characterBody.height);
	};

	
}
