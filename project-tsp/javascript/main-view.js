function MainView(context2D, x, y, width, height, isEnabled) {
	var isMobile = {
	    	Android: function() {
			return navigator.userAgent.match(/Android/i);
	    	},
	    	BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
	    	},
	    	iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    	},
	    	Opera: function() {
	    	    return navigator.userAgent.match(/Opera Mini/i);
	    	},
	    	Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
	    	},
	    	any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    	}
	};
 	
	var self = this;
	Rectanguler(UIComponent(self, isEnabled));
	self.setDimensions(x, y, width, height);

	var gameControlsButtonsWidth = 100;
	var gameControlsButtonsHeight = 100; 

	var createControllerButtons = function() {
		self.leftButton = new ButtonComponent(context2D, 
										true, 
										self.x + self.width - gameControlsButtonsWidth*3,
										self.y + self.height - gameControlsButtonsHeight*2, 
										gameControlsButtonsWidth, 
										gameControlsButtonsHeight, 
										"<");

		self.rightButton = new ButtonComponent(context2D, 
										true, 
										self.x + self.width - gameControlsButtonsWidth,
										self.y + self.height - gameControlsButtonsHeight*2, 
										gameControlsButtonsWidth, 
										gameControlsButtonsHeight, 
										">");

		self.upButton = new ButtonComponent(context2D, 
										true, 
										self.x + self.width - gameControlsButtonsWidth*2,
										self.y + self.height - gameControlsButtonsHeight*3, 
										gameControlsButtonsWidth, 
										gameControlsButtonsHeight, 
										"^");

		self.downButton = new ButtonComponent(context2D, 
										true, 
										self.x + self.width - gameControlsButtonsWidth*2,
										self.y + self.height - gameControlsButtonsHeight, 
										gameControlsButtonsWidth, 
										gameControlsButtonsHeight, 
										"v");
	}

	var attachStartedEndedCallbackPair = function (button, eventType) {
		button.onTouchStarted = createEventCallbackForController(eventType, 'Started');
		button.onTouchEnded = createEventCallbackForController(eventType, 'Ended');
	}

	var createEventCallbackForController = function(eventType, type) {
		var callbackName = "on"+eventType+type;
		return function(point, object) {
			if (self[callbackName]) {
				self[callbackName]();
			}
		}
	}

	var addEventListeners = function() {
		attachStartedEndedCallbackPair(self.downButton, 'Down');
		attachStartedEndedCallbackPair(self.upButton, 'Up');
		attachStartedEndedCallbackPair(self.leftButton, 'Left');
		attachStartedEndedCallbackPair(self.rightButton, 'Right');
	}

	var addChildren = function() {
		self.addChildren([self.leftButton, 
						  self.rightButton, 
						  self.upButton, 
						  self.downButton]);
	}

	var construct = function() {
		if ( isMobile.any() ) {
			createControllerButtons();	
			addEventListeners();
			addChildren();
		}else {
			console.log('TODO: Keyboard listeners');
		}	
	}

	construct();
}
