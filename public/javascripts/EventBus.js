define(function(){
	
	var EventBus = function(){
		this._eventMap={};
	}
	
	EventBus.prototype.subscribe = function(eventName, handler){
		if(!this._eventMap[eventName]){
			this._eventMap[eventName]=[];
		}
		this._eventMap[eventName].push(handler);
	}
	EventBus.prototype.publish = function(eventName, data){
		if(!this._eventMap[eventName]){
			return;
		}	
		this._eventMap[eventName].forEach(function(handler){
			handler(data);
		});
	}
	
	return EventBus;


});