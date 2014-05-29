function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Rectangle(point, width, height) {
	if (point instanceof Point) {
		this.point = point;
	} else {
		throw new Error("point should be of type Point");
	}
	this.width = width;
	this.height = height;
}