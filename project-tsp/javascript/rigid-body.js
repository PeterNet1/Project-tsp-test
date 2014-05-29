function RigidBody(x, y, width, height) {
	var self = this;
	Rectanguler(self);
	self.setDimensions(x, y, width, height);

	var physicalSystem = null;

	this.connectToPhysicalSystem = function(physics) {
		physicalSystem = physics;
		physicalSystem.manage(self);
	}

	this.disconnectFromPhysicalSystem = function() {
		if (physicalSystem) {
			physicalSystem.unmanage(self);
			physicalSystem = null;
		}
	}

	this.doesCollide = function(x, y) {
		if (physicalSystem) {
			return physicalSystem.collides(self);
		}

		return null;
	}

	this.intersectsBody = function(rigidBody) {
		return self.intersects(rigidBody);
	}
}