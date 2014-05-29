function UIComponent(object, isEnabled, parent) {

	if (isEnabled == false) {
		object.isEnabled = false;
	} else {
		object.isEnabled = true;
	}
	if (parent) {
		object.parent = parent;
	}

	object.isVisible = function() {
		return isEnabled;
	}

	object.addChildren = function (uiComponentArray) {
		if (!object.children) {
			object.children = Array();
		}
		uiComponentArray.forEachElementInArray(function(element){
			element.parent = object;
		});

		object.children = object.children.concat(uiComponentArray);
		return object;
	}

	object.removeChild = function (child) {
		child.parent = null;
		object.children.removeByValue(child);
	}
//New Code starts here:
	object.getChild = function (childIndex) {
		for(var i = 0; i < object.children.length; i++) {
			if(i == childIndex) {
				return object.children[i];
			}
		}
		return null;
	}
//New Code ends here.

	/**
		Pops event on the parent child hiararchy
	*/
	object.popEvent = function(functionName, parameterArray) {
		var popUp = true;
		var functor = object[functionName];
		if (functor) {
			popUp = functor.apply(object, parameterArray);
		} 

		if (object.parent && popUp) {
			object.parent.popEvent(functionName, parameterArray);
		}
	}

	object.getEventHandler = function(handlerName, point) {
		return function() {
			if (object[handlerName]) {
				return object[handlerName](point, object);
			} else {
				return true;
			}
		}
	}

	object.addCallback = function (eventType, callback) {
		object[eventType] = callback;
		return object;
	}

	object.show = function() {
		object.isEnabled = true;
	}

	object.hide = function() {
		object.isEnabled = false;
	}

	object.pushDownEvent = function(handlerName, point) {
		var propagate = true;
		if (object.isEnabled) {
			
			if (propagate && object.children) {
				for (var i = 0; (i < object.children.length) && propagate; i++) {
					propagate = object.children[i].pushDownEvent(handlerName, point);
				};
			}

			var callback = object.getEventHandler(handlerName, point);
			if (callback && propagate) {
				propagate = callback();
			}

		}

		return propagate;
	}

	var constructEventCallbacks = function() {
		var callbacks = {};
		foreachOwnPropertyInObject(GeneralTouchEvent, function(key, value) {
			var generalEventName = value;
			var handlerName = "on" + generalEventName.capitalize();
			callbacks[generalEventName] = function(point) {
				object.pushDownEvent(handlerName, point);
			}
		});

		return callbacks;
	}

	object.eventCallbacks = constructEventCallbacks();

	object.draw = function(delta) {
		if (object.isEnabled) {
			if (object.doDraw) {
				object.doDraw(delta);
			}

			if (object.children) {
				for (var i = object.children.length-1; i >= 0; i--) {
					var child = object.children[i];
					if (child.draw) {
						child.draw(delta);
					}

					if (object.onChildDrawn) {
						object.onChildDrawn(child);
					}
				}
			}

			if (object.onChildrenDrawn) {
				object.onChildrenDrawn();
			}
		}
	}
	
	object.update = function(deltaSeconds, update) {
		if ((object.isEnabled == true) && (object.doUpdate)) {
			object.doUpdate(deltaSeconds, update);
		}
	}
	
	return object;
}