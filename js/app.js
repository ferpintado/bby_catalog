var App = (function(){

	var categories = new Categories();

	function bindEvents(){		

		var request = categories.requestAll();
		$.when( request ).done(function(){
			initialRender();
		});

	}

	function initialRender(){
		
		$('#sidebar ul').append( new NavBar().render( categories.getCategories() ) )

	}

	return function(){
		bindEvents();

	};
})();

