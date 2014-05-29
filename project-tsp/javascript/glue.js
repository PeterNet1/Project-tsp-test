
function createStartingPlayerModel(characterId, playerName, startingX, startingY) {
	var playerModel = new PlayerModel();
	playerModel.characterRectX = startingX;
	playerModel.characterRectY = startingY;
	playerModel.movement = Movement.HOLD;
	playerModel.characterId = characterId;
	playerModel.name = playerName;
	playerModel.characterSpeed = 120; //pixels pers second

	return playerModel;
}

/**
	The Main function
*/
function Glue() {
	var self = this;
	var serverIP = null;
	
	this.canvas = document.createElement('canvas');
	document.body.appendChild(this.canvas);
	this.canvas.width = window.innerWidth; 
	this.canvas.height = window.innerHeight;
 
	this.ctx = canvas.getContext("2d");

	ResourceManagerSingleton.loadResources();

	this.webSocketConnection = new WebSocketConnection();
	this.messageBroker = new MessageBroker();
	
	this.serverProtocol = new ServerProtocol(this.webSocketConnection, this.messageBroker);
	this.baseModel = new BaseModel();
	this.loginView = new LoginView(this.ctx, baseModel, 0, 0, this.canvas.width, this.canvas.height, true);
	serverIP = this.loginView.getChild(2);
	this.serverProtocol.init('ws://' + serverIP.getLabel() + ':8888/websockets');

	//basemodel previous position

	this.world = new World(this.ctx, this.canvas.width, this.canvas.height, false);
	var levelOne = LoadLevelOne(this.ctx, this.canvas.width, this.canvas.height);
	this.world.setLevel(levelOne);

	this.mainView = new MainView(this.ctx, 0, 0, this.canvas.width, this.canvas.height, false);
	var mainViewHandler = new InputHandler(this.canvas, this.mainView.eventCallbacks);

	this.gameController = new GameController(this.baseModel, this.serverProtocol);

	this.mainView.onUpStarted = this.gameController.moveUp;
	this.mainView.onLeftStarted = this.gameController.moveLeft;
	this.mainView.onRightStarted = this.gameController.moveRight;
	this.mainView.onDownStarted = this.gameController.moveDown;

	this.mainView.onUpEnded = this.gameController.onHold;
	this.mainView.onLeftEnded= this.gameController.onHold;
	this.mainView.onRightEnded = this.gameController.onHold;
	this.mainView.onDownEnded = this.gameController.onHold;

	//loginview
	var loginViewHandler = new InputHandler(this.canvas, this.loginView.eventCallbacks);

	this.loginView.onLogin = gameController.login;

	this.baseModel.addPropertyChangedListener(function(eventObject, propertyName, newValue, oldValue) {
		if (propertyName == 'loggedIn') {
			if (newValue) {
				console.debug("LoggedIn changed");
				self.loginView.hide();
				self.mainView.show();
				var playerName =  self.baseModel.playerName;
				var characterId = self.baseModel.characterId;
				var startingX = 150;
				var startingY = 150;
				var playerModel = createStartingPlayerModel(characterId, playerName, startingX, startingY);
				self.baseModel.players[playerName] = playerModel;
				var character = new Character(self.ctx, playerModel);
				character.onCharacterMovement = function(x, y, movement) {
					gameController.move(playerName, x, y, movement);
				}
				self.world.addCharacter(character);
				gameController.playerStart(playerName, characterId, startingX, startingY, playerModel.movement);
				self.world.setEnabled(true);
			} else {
				self.mainView.hide();
				self.world.setEnabled(false);
				self.loginView.show();
			}
		} 
	});

	gameController.onPlayerStarted = function(username, characterId, x, y) {
		var playerModel = createStartingPlayerModel(characterId, username, parseInt(x), parseInt(y));
		self.baseModel.players[username] = playerModel;
		var newCharacter = new Character(self.ctx, self.baseModel.players[username]);

		self.world.addCharacter(newCharacter);	
	}

	gameController.onExitGame = function(username) {
		self.world.removeCharacterByPlayerName(username);
		self.baseModel.players[username] = null;
	}

	this.gameLoop = new GameLoop();
	//Objects will be drawn in the order specified here
	this.gameLoop.addFrameListener(this.world.draw);
	this.gameLoop.addFrameListener(this.mainView.draw);
	this.gameLoop.addFrameListener(this.loginView.draw);

	this.gameLoop.startGameLoop(); 

	console.log("All ok");
}