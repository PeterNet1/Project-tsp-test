function Rectanguler(object) {
	var self = this;
	object.width = 0;
	object.height = 0;
	
	object.setDimensions = function(x, y, width, height) {
		object.x = x;
		object.y = y;
		object.width = width;
		object.height = height;
	}
	
	object.setRect = function (rectangle) {
		object.x = rectangle.point.x;
		object.y = rectangle.point.y;
		object.width = rectangle.width;
		object.height = rectangle.height;
	}
	
	object.getRect = function() {
		return new Rectangle(new Point(object.x, object.y), object.width, object.height);
	}

	object.containsPoint = function(point) {
		var x1 = object.x;
		var x2 = x1+object.width;

		var y1 = object.y;
		var y2 = y1+object.height;

		if ((x1 <= point.x) && (point.x <= x2) && (y1 <= point.y) && (point.y <= y2)) {
			return true;
		}

		return false;
	}

	object.intersects = function(rectenguler) {
  		if ((rectenguler.x < object.x + object.width) && (object.x < rectenguler.x + rectenguler.width) && (rectenguler.y < object.y + object.height)) {
    		return (object.y < rectenguler.y + rectenguler.height);
  		} else {
    		return false;
		}
	}
	
	return object;
}