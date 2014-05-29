/**
	Resource Manager Singleton
*/
function ResourceManagerClass() {
	var self = this;
	var imagePath = "assets/"
	this.images = Array();

	var loadImage = function(name) {
		var image = new Image();
		image.src = imagePath+name;
		self.images[name] = image;
	}

	var loadImages = function() {
		loadImage("sprites/heroes/heroes.png");
		loadImage("sprites/levels/stone-wall.jpg");
		loadImage("sprites/levels/floor.png");
	}

	this.loadResources = function() {
		loadImages();
	}

	this.getImage = function(name) {
		return self.images[name];
	}
}

var ResourceManagerSingleton = new ResourceManagerClass();