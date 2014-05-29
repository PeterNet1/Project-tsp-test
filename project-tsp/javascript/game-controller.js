function GameController(baseModel, protocol) {
	var self = this;
	var model = baseModel;

	var setCurrentPlayerMovement = function(movement) {
		model.players[model.playerName].movement = movement;
	}

	self.setModel = function(baseModel) {
		model = baseModel;
	}

	self.moveUp = function() {
		setCurrentPlayerMovement(Movement.UP);
	}

	self.moveDown = function() {
		setCurrentPlayerMovement(Movement.DOWN);
	}

	self.moveLeft = function() {
		setCurrentPlayerMovement(Movement.LEFT);
	}

	self.moveRight = function() {
		setCurrentPlayerMovement(Movement.RIGHT);
	}

	self.onHold = function() {
		setCurrentPlayerMovement(Movement.HOLD);
	}

	self.login = function(username, password) {
		protocol.login(username, password);
	}

	self.move = function(playerName, x, y, movement) {
		protocol.move(playerName, x, y, movement);
	}

	self.playerStart = function (username, characterId, x, y, movement) {
		protocol.playerStart(username, characterId, x, y, movement);
	}

	var onIdentify = function() {
		baseModel.setProperty('loggedIn', false);
	}

	var onSuccessfulAuthentication = function(playerName) {
		baseModel.setProperty('playerName', playerName);
		baseModel.setProperty('loggedIn', true);
	}

	var onPlayerStarted = function(username, characterId, x, y) {
		if (self.onPlayerStarted) {
			self.onPlayerStarted(username, characterId, x, y);
		}
	}

	var onPlayerMove = function(username, x, y, movement) {
		model.players[username].movement = movement;
		model.players[username].characterRectX = parseInt(x);
		model.players[username].characterRectY = parseInt(y);
	}

	var onBadCredentials = function() {
		//TODO add error message in the login view
	}

	var onPlayerLoggedIn = function(playerName, x, y) {
		
	}

	var onExitGame = function(username) {
		if (self.onExitGame) {
			self.onExitGame(username)
		}
	}

	protocol.onIdentify = onIdentify;
	protocol.onSuccessfulAuthentication = onSuccessfulAuthentication;
	protocol.onBadCredentials = onBadCredentials;
	protocol.onPlayerLoggedIn = onPlayerLoggedIn;
	protocol.onPlayerStarted = onPlayerStarted;
	protocol.onPlayerMove = onPlayerMove;
	protocol.onExitGame = onExitGame;
}