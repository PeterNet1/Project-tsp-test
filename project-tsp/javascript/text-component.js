function TextStyle(obj) {
	var self = this;
	
	var setProperty = function(propertyName, defaultValue) {
		if (obj[propertyName]) {
			self[propertyName] = obj[propertyName]
		} else {
			self[propertyName] = defaultValue;
		}
	}
	
	setProperty('fontSize', 12);
	setProperty('fontFamily', 'sans-serif');
	setProperty('color', 'black');
	setProperty('backgroundColor', 'rgba(255, 255, 255, 0)');
	setProperty('orientation', "left");
}

function TextAlignment() {

	var measureText = function(context2D, text) {
		var textWidth = context2D.measureText(text).width;
		return textWidth;
	}

	this.center = function(context2D, text, rect) {
		var textWidth = measureText(context2D, text);
		var textX = rect.point.x + rect.width/2 - textWidth/2;
		return new Point(textX, rect.point.y);
	}
	
	this.left = function(context2D, text, rect) {
		return new Point(rect.point.x, rect.point.y);
	}
	
	this.right = function(context2D, text, rect) {
		var textWidth = context2D.measureText(text).width;
		var textX = rect.point.x + rect.width - textWidth;
		return new Point(rect.point.x, rect.point.y);
	}
}

var TEXT_ALIGNMENT = new TextAlignment();

var TextDrawing = {

	drawText: function(context2D, textStyle, text, rect) {
		context2D.font = textStyle.fontSize+ "px " + textStyle.fontFamily;
		var textCoordinates  = TEXT_ALIGNMENT[textStyle.orientation](context2D, text, rect);
		context2D.fillStyle = textStyle.color;
		context2D.fillText(text, textCoordinates.x, textCoordinates.y + textStyle.fontSize);
	}
}

function TextComponent(context2D, text, rectArea, txStyle, isEnabled) {
	var self = this;
	Rectanguler(UIComponent(self, isEnabled));
	if (rectArea) {
		self.setRect(rectArea);
	}
	var textStyle = txStyle;
	var componentText = text;
	
	this.setValue = function(text) {
		componentText = text
	}
	
	this.getValue = function() {
		return componentText;
	}
	
	var drawText = function() {
		TextDrawing.drawText(context2D, textStyle, self.getValue(), self.getRect());
	}
	
	this.drawBackground = function() {
		context2D.fillStyle = textStyle.backgroundColor;
		context2D.fillRect(self.x, self.y, self.width, self.height);
	}

	this.doUpdate = function(deltaSeconds, update) {
		self.setRect(update.rect);
		textStyle = update.textStyle;
	}
	
	this.doDraw = function(deltaSeconds) {
		self.drawBackground();
		drawText();
	}
}