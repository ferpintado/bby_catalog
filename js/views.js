function NavBar (){

	var model ;

	function init ( data ){
		model = data;			
	}

	function render(){

		var listElem = [];
		$.each( model , function( i, cat){
			var li = new listItem();
			listElem.push( li.render( cat ) );

			if (i == 0){
				li.renderPage();
			}
		});
		return listElem ;
	}	

	return {
		render : function( data ){
			init(data);
			return render();
		}
	}
}

function listItem (){

	var model, elem, products;

	function init( data ){
		model = data;		
		products = model.getProducts();
	}
	function render (){
		var item = _.template(
			$( "script.navbar-item" ).html()
		);
		elem = $(item( {cat: model} ));
		bindEvents();
		return elem ;
	}	

	function bindEvents(){

		elem.click(renderPage);
	}

	function loadContent(){

		elem.siblings().removeClass('active');
        elem.addClass('active');

		var d = $.Deferred();
		if( products.length == 0){

			$.when(model.requestProducts()).done(function(){
				products = model.getProducts();
				d.resolve();
			})
		}else{
			d.resolve()
		}
		return d.promise();
	}

	function renderPage(){
		$.when(loadContent()).done(function(){
			var page = new productsPage()
			page.render( model );
		})		
		return false;
	}


	return {
		render : function( data ){
			init(data);
			return render();
		},
		renderPage: function(){
			renderPage();
		}
	}
}

function productsPage (){

	var model, elem ;

	function init ( data ){
		model = data;			
	}

	function render(){

		var products = [];
		$.each( model.getProducts(), function( i, product){
			var li = new productView();
			products.push( li.render( product ) );
		});
		$("#content h2").html( model.getName() )
		$("#content .list").html( products )
	}	

	return {
		render : function( data ){
			init(data);
			return render();
		}
	}
}

function productView (){

	var model;

	function init( data ){
		model = data;		

	}
	function render (){
		var item = _.template(
			$( "script.product" ).html()
		);
		elem = $(item( {product: model} ));
		bindEvents();
		return elem ;
	}	

	function bindEvents(){
		elem.click(renderModal);
	}

	function renderModal(){
		var modal = new modalView()
		modal.render( model );
		$('#myModal').modal('show');
		return false;

	}

	return {
		render : function( data ){
			init(data);
			return render();
		}
	}
}

function modalView (){

	var model;

	function init( data ){
		model = data;		

	}
	function render (){
		var item = _.template(
			$( "script.modal" ).html()
		);
		elem = $(item( {product: model} ));
		$('.modal-content').html(elem);

		return elem ;
	}	


	return {
		render : function( data ){
			init(data);
			return render();
		}
	}
}