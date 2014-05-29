function  ButtonComponent(context2D, isEnabled, x, y, width, height, label, isToogleButton) {
	var self = this;
	Rectanguler(UIComponent(self, isEnabled));
	self.setDimensions(x, y, width, height);

	var toogleBotton = false;
	self.isToogled = false;
	if (isToogleButton) {
		toogleBotton = true;
	}

	var defaultFontSize = 20;
	var defaultLabelStyle = new TextStyle({orientation:"center", color:"black", fontSize:defaultFontSize});

	var labelX = self.x;
	var labelY = self.y + self.height/2 - 3*defaultFontSize/4;
	var labelRect = new Rectangle(new Point(labelX, labelY), self.width, defaultFontSize);
	self.labelComponent = new TextComponent(context2D, label, labelRect, defaultLabelStyle, true);

	self.setLabel = function(label) {
		self.labelComponent.setValue(label);
	}

	self.getLabel = function() {
		return self.labelComponent.getValue();
	}

	var touchStarted = false;

	var triggerClick = function(point, object) {
		if (toogleBotton) {
			self.isToogled = !self.isToogled;
		}

		if (self.onClick) {
			self.onClick(point, object);
		}
		touchStarted = false;
		if (self.onTouchEnded) {
			self.onTouchEnded(point, object);
		}
		return false;
	}

	var buttonTouchStarted = function(point, object) {
		if (self.onTouchStarted) {
			self.onTouchStarted(point, object);
		}
	}

	self.labelComponent.onGeneralTouchStart = function(point, object) {
		if (self.labelComponent.containsPoint(point)) {
			touchStarted = true;
			buttonTouchStarted(point, object);
			return false;
		}
		return true;
	}

	self.labelComponent.onGeneralTouchEnd = function(point, object) {
		if (touchStarted) {
			return triggerClick(point, self);
		}
		return true;
	}

	self.onGeneralTouchStart = function(point, object) {
		if (self.containsPoint(point)) {
			touchStarted = true;
			buttonTouchStarted(point, object);
			return false;
		}
		return true;
	}

	self.onGeneralTouchEnd = function(point, object) {
		if (touchStarted) {
			return triggerClick(point, object);
		}
		return true;
	}

	self.doUpdate = function(delta, update) {
		
	}
	
	self.doDraw = function(delta) {
		context2D.strokeStyle = "black";
		context2D.lineWidth = 3;
		context2D.strokeRect(self.x, self.y, self.width, self.height);
		context2D.fillStyle = "white";
		context2D.fillRect(self.x, self.y, self.width, self.height);
		if (touchStarted || self.isToogled) {
			context2D.strokeStyle = 'rgb(150, 150, 150)';
			context2D.fillStyle = "rgb(200, 200, 200)";
			context2D.fillRect(self.x, self.y, self.width, self.height);
			context2D.lineWidth = 2;
			context2D.strokeRect(self.x+1, self.y+1, self.width-2, self.height-2);
		}
	}

	var createChildren = function() {
		self.addChildren([self.labelComponent]);
	}

	var construct = function () {
		createChildren();
	}

	construct();
}