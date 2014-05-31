function InputHandler(mainCanvas, eventCallbacks) {
	var self = this;

	var extractClientCoordinates = function(target) {
		var x = target.clientX;
		var y = target.clientY;
		return new Point(x, y);
	}

	var extractTouchCoordinates = function(event) {
		var touch = event.touches[0];
		return extractClientCoordinates(touch);
	}

	var extractTouchChangeCoordinates = function(event) {
		var touch = event.changedTouches[0];
		return extractClientCoordinates(touch);
	}

	var translateTouchEvent = function(generalTouchFunction, extractor) {
		return function(event) {
			var point = extractor(event);
			generalTouchFunction(point);
		};
	}

	var generalEventExtractorPair = function(generalEvent, extractor) {
		return {'generalEvent':generalEvent, 'extractor':extractor};
	}

	var mapTouchTo = function (generalEvent) {
		return generalEventExtractorPair(generalEvent, extractTouchCoordinates);
	}

	var mapTouchEndTo = function (generalEvent) {
		return generalEventExtractorPair(generalEvent, extractTouchChangeCoordinates);
	}

	var mapMouseTo = function (generalEvent) {
		return generalEventExtractorPair(generalEvent, extractClientCoordinates);
	}

	var events = {
		'touchstart' : mapTouchTo(eventCallbacks[GeneralTouchEvent.START]),
		'touchend' : mapTouchEndTo(eventCallbacks[GeneralTouchEvent.END]), 
		'touchmove' : mapTouchTo(eventCallbacks[GeneralTouchEvent.MOVE]),
		'mousedown' : mapMouseTo(eventCallbacks[GeneralTouchEvent.START]),
		'mouseup' : mapMouseTo(eventCallbacks[GeneralTouchEvent.END]),
		'mousemove' : mapMouseTo(eventCallbacks[GeneralTouchEvent.MOVE]), 
	}

	var addEvents = function(mainCanvas) {
		foreachOwnPropertyInObject(events, function(key, value) {
			var touchEvent = key;
			var generalEvent = value['generalEvent'];
			if (generalEvent) {
				var extractor = value['extractor'];
				console.log(touchEvent + '-' + generalEvent + '-' + extractor);
				mainCanvas.addEventListener(touchEvent, translateTouchEvent(generalEvent, extractor));
				//mainCanvas.addEventListener('touchmove', function(event){console.log("Event:" + event.changedTouches[0].clientX)});
			} else {
				console.warn('No generalEvent registered to handle:' + touchEvent);
			}
		});
		/*mainCanvas.addEventListener("keydown", function(event) {
			if(event.keyCode == 37) {
				console.log("LEFT");	
			}
			if(event.keyCode == 38) {
				console.log("UP");	
			}
			if(event.keyCode == 39) {
				console.log("RIGHT");	
			}
			if(event.keyCode == 40) {
				console.log("DOWN");	
			}
		});*/
	}

	var construct = function() {
		addEvents(mainCanvas);
	}

	construct();
}
