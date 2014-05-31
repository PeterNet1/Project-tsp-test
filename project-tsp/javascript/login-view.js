function LoginView(context2D, baseModel, x, y, width, height, isEnabled) {
	var self = this;
	Rectanguler(UIComponent(self, isEnabled));
	self.setDimensions(x, y, width, height);

	var usernameButtonWidth = self.width/2;
	var usernameButtonHeight = self.height/12;

	var usernameButtonX = self.x + (self.width - usernameButtonWidth) / 2;
	var usernameButtonY = self.y + (self.height - usernameButtonHeight) / 4;

	var usernameButtonLabel = "Todor";

	var usernameButton = new ButtonComponent(context2D, true, usernameButtonX, usernameButtonY, usernameButtonWidth, usernameButtonHeight, usernameButtonLabel);

	var openedDialogButton = null;

	var showEnterUsername = function() {
		openedDialogButton = usernameButton;
		CocoonJS.App.showTextDialog( "Username", "Please Enter Your Username", baseModel.playerName, CocoonJS.App.KeyboardType.TEXT, "Cancel", "Ok" );
	}

	usernameButton.addCallback('onClick', function(point, object) {
		showEnterUsername();
	});

	var passwordButtonWidth = self.width/2;
	var passwordButtonHeight = self.height/12;

	var passwordButtonX = self.x + (self.width - passwordButtonWidth) / 2;
	var passwordButtonY = self.y + (self.height - passwordButtonHeight) / 3 + passwordButtonHeight / 3;

	var passwordButtonLabel = "1234";

	var passwordButton = new ButtonComponent(context2D, true, passwordButtonX, passwordButtonY, passwordButtonWidth, passwordButtonHeight, passwordButtonLabel);

	var openedDialogButton = null;

	var showEnterPassword = function() {
		openedDialogButton = passwordButton;
		CocoonJS.App.showTextDialog( "Password", "Please Enter Your Password", passwordButton.getLabel(), CocoonJS.App.KeyboardType.TEXT, "Cancel", "Ok" );
	}

	passwordButton.addCallback('onClick', function(point, object) {
		showEnterPassword();
	});
	
// New Code starts from here:	
	var serverButtonWidth = self.width/2;
	var serverButtonHeight = self.height/12;

	var serverButtonX = self.x + (self.width - serverButtonWidth) / 2;
	var serverButtonY = self.y + (self.height - serverButtonHeight) / 3 + serverButtonHeight / 1.8 + passwordButtonHeight;

	var serverButtonLabel = "192.168.1.2";

	var serverButton = new ButtonComponent(context2D, true, serverButtonX, serverButtonY, serverButtonWidth, serverButtonHeight, serverButtonLabel);

	var openedDialogButton = null;

	var showEnterServer = function() {
		openedDialogButton = serverButton;
		CocoonJS.App.showTextDialog( "Server", "Please Enter Your Server IP", serverButton.getLabel(), CocoonJS.App.KeyboardType.TEXT, "Cancel", "Ok" );
	}

	serverButton.addCallback('onClick', function(point, object) {
		showEnterServer();
	});
//New Code Ends here.
	
	//TODO at the moment the dialogs are global - create wrappers and organise them, so 
	//the events are fired for particular dialog.
	CocoonJS.App.onTextDialogFinished.addEventListener(
        function(text) {
        	openedDialogButton.setLabel(text);
        }
    );

   CocoonJS.App.onTextDialogCancelled.addEventListener(
	    function() {
	       openedDialogButton = null;
	    }
	);

	self.addChildren([usernameButton, passwordButton, serverButton]);

	var loginButtonWidth = self.width/2;
	var loginButtonHeight = self.height/12;

	var loginButtonX = self.x + (self.width - loginButtonWidth) / 2;
	var loginButtonY = self.y + (self.height - loginButtonHeight) / 1.3 + loginButtonHeight / 3;

	var loginButtonLabel = "Login";

	var loginButton = new ButtonComponent(context2D, false, loginButtonX, loginButtonY, loginButtonWidth, loginButtonHeight, loginButtonLabel);

	loginButton.addCallback('onClick', function(point, object) {
		if (self.onLogin) {
			self.onLogin(usernameButton.getLabel(), passwordButton.getLabel());
		}
	});

	var characterCount = 7;
	var chooseCharacterButtonWidth = width / (characterCount * 2);
	var margin = chooseCharacterButtonWidth / 8;
	var chooseCharacterButtonHeight = self.height/12;

	var chooseCharacterButtonY = self.y + (self.height - chooseCharacterButtonHeight) / 2 + chooseCharacterButtonHeight;

	var fullLength = (margin + chooseCharacterButtonWidth) * characterCount - margin;

	var toogledButton = null;
	var currentCharacterId = null;
	var createToogleButtonCallback = function(characterId, button) {
		return function() {
			if (toogledButton) {
				toogledButton.isToogled = false;
			}
			toogledButton = button;
			toogledButton.isToogled = true;
			currentCharacterId = characterId;
			baseModel.characterId = characterId;
			loginButton.show();
		}
	}

	for (var i = 0; i < characterCount; i++) {
		var chooseCharacterButtonX = self.x + (self.width - fullLength)/2 + i * (chooseCharacterButtonWidth+margin);
		var chooseCharacterButton = new ButtonComponent(context2D, true, chooseCharacterButtonX, chooseCharacterButtonY, chooseCharacterButtonWidth, chooseCharacterButtonHeight, i.toString(), true);
		chooseCharacterButton.addCallback('onClick', createToogleButtonCallback(i, chooseCharacterButton));

		self.addChildren([chooseCharacterButton]);
	}

	var characterHeight = 32;
	var characterWidth = characterHeight;

	var characterX = self.x + (self.width - characterWidth) / 2;
	var characterY = self.y + chooseCharacterButtonY + chooseCharacterButtonHeight + chooseCharacterButtonHeight / 2;

	var heroSprite = new HeroSprite(context2D, 
									1, 
									characterX, 
									characterY, 
									6000/50);
	heroSprite.startAnimation();


	self.addChildren([loginButton]);

	self.doDraw = function (deltaSeconds) {
		context2D.fillStyle = "white";
		context2D.fillRect(self.x, self.y, self.width, self.height);
		if (currentCharacterId != null) {
			heroSprite.setCharacterId(currentCharacterId);
			heroSprite.draw(deltaSeconds);
		}
	}
	/**
	connectButton.addCallback('onClick', function(point, object) {
		self.popEvent("onConnected", [usernameButton.getLabel()]);
	});
	*/
}
