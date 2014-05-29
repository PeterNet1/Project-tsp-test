function World(context2D, width, height, isWorldEnabled) {
	var self = this;
	var level = null;
	var physiques = new Physics();
	var characters = Array();

	var isEnabled = isWorldEnabled;

	this.setEnabled = function(isWorldEnabled) {
		isEnabled = isWorldEnabled;
	}

	this.addCharacter = function(character) {
		characters.push(character);
		character.getRigidBody().connectToPhysicalSystem(physiques);
	}

	this.removeCharacter = function(character) {
		characters.removeByValue(character);
		character.getRigidBody().disconnectFromPhysicalSystem();
	}

	this.removeCharacterByPlayerName = function(playerName) {
		for (var i = 0 ; i < characters.length; i++) {
			if (characters[i].getModel().name == playerName) {
				self.removeCharacter(characters[i]);
				break;
			}
		}
	}

	this.setLevel = function(newLevel) {
		if (level) {
			var rigidBodies = level.getRigidBodies();
			for (var i = 0; i < rigidBodies.length; i++) {
				var rigidBody = rigidBodies[i];
				rigidBody.disconnectFromPhysicalSystem();
			}
		}
		level = newLevel;
		var rigidBodies = level.getRigidBodies();
		for (var i = 0; i < rigidBodies.length; i++) {
			var rigidBody = rigidBodies[i];
			rigidBody.connectToPhysicalSystem(physiques);
		}
	}

	this.draw = function(delta) {
		if (isEnabled) {
			context2D.fillStyle = '#000000'; 
			context2D.fillRect(0, 0, width, height);
			if (level) {
				level.draw(delta);
			}
			characters.forEachElementInArray(function(character){
				character.draw(delta);
			});
		}
	}

}