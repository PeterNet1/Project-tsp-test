function PropertyChangedDispatcher(object) {
	
	var listeners = Array();
	
	object.setProperty = function(propertyName, propartyValue) {
		var oldValue = object[propertyName];
		object[propertyName] = propartyValue;
		object.dispatchEvent(object, propertyName, propartyValue, oldValue);
	}
	
	object.setProperties = function(properties) {
		for (prop in properties) {
			object.setProperty(prop, properties[prop]);
		}
	}
	
	object.dispatchEvent = function(eventObject, propertyName, newValue, oldValue){
		if (object.onPropertyChanged) {
			object.onPropertyChanged(eventObject, propertyName, newValue, oldValue);
		}
		
		for (i = 0; i < listeners.length; i++) {
			listeners[i](eventObject, propertyName, newValue, oldValue);
		}
	}
	
	object.addPropertyChangedListener = function(listener) {
		listeners.push(listener);
	}
	
	object.removePropertyChangedListener = function(listener) {
		listeners.removeByValue(listener);
	}
	
	return object;
}

var PCD = PropertyChangedDispatcher;