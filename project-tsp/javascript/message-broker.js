/**
	Message Broker
*/
function MessageBroker() {
	var self = this;	
	var handlers = new Object();

	this.brokeMessage = function(string, separator) {
		var separationRegex = separator;
		var pattern = "";
		if (separationRegex == " ") {
			pattern = '[^\\s"\']+|"([^"]*)"|\'([^\']*)\'';
		} else {
			throw new Error("Not implemented yet");
		}
		
		return string.match(new RegExp(pattern, 'g'));
	}
	
	/**
		Registers handler. The handler should accept list of arguments 
		as input.
		
		retruns - the name of the message for which the callback is being registered
	**/
	this.registerHandler = function(forMessage, callback) {
		
		if (handlers[forMessage]) {
			throw new Error("Cannor register handler that is already registered");
		} else {
			handlers[forMessage] = callback;
		}
	}
	
	this.unregisterHandler = function(forMessage) {
		if (handlers[forMessage]) {
			var oldHandler = handlers[forMessage];
			handlers[forMessage] = null;
			return oldHandler;
		} else {
			return null;
		}
	}
	
	this.stream = function(input, separator) {
		brokenStream = self.brokeMessage(input, separator);
		if (brokenStream && (brokenStream.length > 0)) {
			console.debug('commandName:'+brokenStream[0]);
			if (handlers[brokenStream[0]]) {
				handlers[brokenStream[0]](brokenStream);
				return brokenStream[0];
			} else {
				return undefined;
			}
		} else {
			throw  new Error("Error broking input message");
		}
	}
}
//Message broker end