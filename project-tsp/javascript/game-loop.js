function GameLoop() {
	var self = this;

	var listeners = Array();

	var requestAnimFrame = (	function () { 
								var func = window.requestAnimationFrame || 
								window.webkitRequestAnimationFrame || 
								window.mozRequestAnimationFrame || 
								window.oRequestAnimationFrame || 
								window.msRequestAnimationFrame || 
								function (callback, element) { 
									window.setTimeout(callback, 1000 / this.fps);
								};  

								return function (callback, element) {	
									func.apply(window, [callback, element]); 
								}; 
							}	)();

	self.addFrameListener = function(listener) {
		listeners.push(listener);
	}

	var lastUpdateTime = null;
	var delta = 0;
	self.startGameLoop = function(timestamp) {
		delta = timestamp - (lastUpdateTime || timestamp);
		requestAnimFrame(self.startGameLoop);

		listeners.forEachElementInArray(function(listener){
			listener(delta);	
		});

		lastUpdateTime = timestamp;
	}

}