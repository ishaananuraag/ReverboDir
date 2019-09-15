define(function(){
	

	var directoryMart =new IUI.DataMart({
		data:	[],
		name: 'homeview-mart'
	});	
	
	var getData = function(name){
		
		$.ajax({
			url: '/data/dirData/'+name,
			success: function(data){
				directoryMart.fetch(data)
			}
		});
				
	}
	
	
	var populateModelWithContent=function(model){
		
		$.ajax({
			url: '/data/fileContents/?path='+model.fullpath,
			success: function(data){
				model.contents= data;
			}
		});
				
		
	}
	
	eventBus.subscribe( 'SIDEBAR_SELECTION', function(e){
		getData(e.name);
	});
	
	
	console.log('loaded-homepage')
	var container = IUI.makeUI($('<view  id="homepage-view"  overflow="visible" name="homepage-view" templateurl="/views/homepageView/templates/homepageView.html"></view>'));

	container._initPromise.then(function(){
		container.$el.on('click', '.open-file-icon', function(e){
			var listView= container.container.getWidgetById('file-container');
			var model = listView.dataMart.data[$(e.currentTarget).closest('.homepage-file-container').index()];
			if(model.contents){
				model.contents=''
				$(e.currentTarget).removeClass('fa-eye-slash').addClass('fa-eye');
			}else{
				populateModelWithContent(model );
				$(e.currentTarget).addClass('fa-eye-slash').removeClass('fa-eye');
			}
			
		});
	
	});

});