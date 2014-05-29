function Physics() {
	var rigidBodies = Array();

	this.manage = function(body) {
		rigidBodies.push(body);
	}

	this.unmanage = function(body) {
		rigidBodies.removeByValue(body);
	}

	/* 
		Returns the element with which the body collides or null if no collision exists
	*/
	this.collides = function(body) {
		for (var i = 0; i < rigidBodies.length; i++) {
			var element = rigidBodies[i];
			if (element != body && element.intersectsBody(body)) {
				return element; 
			}
		}

		return null;
	}
}