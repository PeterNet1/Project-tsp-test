String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.removeByValue = function(value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === value) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}

Array.prototype.contains = function(value) {
  for (var i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true;
        }
    }

    return false;
}

Array.prototype.forEachElementInArray = function (callback) {
   for (var i = 0; i < this.length; i++) {
      callback(this[i]);
   }
}

 function foreachOwnPropertyInObject(object, callbackFunction) {
   for (var property in object) {
      if(object.hasOwnProperty(property)){
        callbackFunction(property, object[property]);
      }
   }

}