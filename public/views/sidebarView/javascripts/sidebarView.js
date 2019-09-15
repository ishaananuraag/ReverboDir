define(function(){
	

	var directoryMart =new IUI.DataMart({
		data:	[],
		name: 'sidebar-datamart',
		fetch: function(e){
			eventBus.publish('SIDEBAR_SELECTION', e.data[0]);
		}
	});	
	
	var getData = function(){
		
		$.ajax({
			url: '/data/sidebardata',
			success: function(data){
				directoryMart.fetch(data)
			}
		});
				
	}
	
	
	new IUI.EventGroup({
		name: "sidebar-events",
		append:  function(){
			getData();
			
		}		
	});
	
	
	console.log('loaded-homepage')
	var container = IUI.makeUI($('<view padding="1rem"  eventgroup="sidebar-events" overflow="visible" name="sidebar-view" templateurl="/views/sidebarView/templates/sidebarView.html"></view>'));
	
	
	
	container._initPromise.then(function(){
		container.$el.on('click', '.sidebar-folders ', function(e){
			eventBus.publish('SIDEBAR_SELECTION', {name: $(e.currentTarget).text()});
		});
	
		
	});

});