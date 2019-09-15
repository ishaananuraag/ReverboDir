require.config({
	paths:{
		'sidebarView': '../views/sidebarView/javascripts/sidebarView',
		'homepageView': '../views/homepageView/javascripts/homepageView',
		'eventbus': '../javascripts/EventBus'
		
	}
	
	
})

define(['eventbus'],function(EventBus){
	window.eventBus=new EventBus();
	require(['sidebarView','homepageView'],function(){
	
		IUI.makeUI();
	
	});
});