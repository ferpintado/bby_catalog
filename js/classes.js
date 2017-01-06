function Categories(){
	categories = [];

	this.addCategory = function( cat ){
		categories.push( cat );
	}

	this.getCategories = function(){
		return categories;
	}
}

Categories.prototype.requestAll = function (){
	var request = $.Deferred();
	var self = this;

	var url = 'http://www.bestbuy.ca/api/v2/json/category/Departments'
	$.ajax({
	    type: "GET",
	    url: url,
	    contentType: "application/json; charset=utf-8",
	    dataType: 'jsonp',
	    ifModified: true,
	    cache:true,
	    ProcessData: true,
	    success: function(data){
	    	var all = new Category();
    		all.init( "departments", "All");
    		self.addCategory( all );	

	    	$.each( data.subCategories, function( i, subcat ){
	    		var cat = new Category();
	    		cat.init( subcat.id, subcat.name);
	    		self.addCategory( cat );	    		
	    	});
	        request.resolve();
	    }
	    ,
	    error: function(error, data){
	        request.reject();
	    }
	})     
	return request.promise();

}


function Category(){
	var id, name;
	var products = [];

	this.setId = function(id){
		this.id = id;
	}
	this.getId = function(id){
		return this.id;
	}
	this.setName = function(name){
		this.name = name;
	}
	this.getName = function(name){
		return this.name;
	}	
	this.addProduct = function ( product ){
		products.push( product );
	}
	this.getProducts = function (){
		return products;
	}


}

Category.prototype.init = function( id, name){
	this.setId(id);
	this.setName(name);
}

Category.prototype.requestProducts = function(){
	var request = $.Deferred();
	var self = this;
	var url = 'http://www.bestbuy.ca/api/v2/json/search?categoryid=' + this.getId()
	$.ajax({
	    type: "GET",
	    url: url,
	    contentType: "application/json; charset=utf-8",
	    dataType: 'jsonp',
	    ifModified: true,
	    cache:true,
	    ProcessData: true,
	    success: function(data){
	    	$.each(data.products, function(i , product){
	    		var p = new Product();
	    		p.init(product.sku, product.name, product.thumbnailImage, product.shortDescription);

	    		self.addProduct(p);
	    	})
	        request.resolve();
	    }
	    ,
	    error: function(error, data){
	        request.reject();
	    }
	})     
	return request.promise();
}

function Product(){
	var sku, name, thumbnailImage, shortDescription;
	var products = [];

	this.setSku = function(sku){
		this.sku = sku;
	}
	this.getSku = function(){
		return this.sku;
	}
	this.setName = function(name){
		this.name = name;
	}
	this.getName = function(name){
		return this.name;
	}	
	this.setThumbnailImage = function(thumbnailImage){
		this.thumbnailImage = thumbnailImage;
	}
	this.getThumbnailImage = function(){
		return this.thumbnailImage;
	}
	this.setShortDescription = function(shortDescription){
		this.shortDescription = shortDescription;
	}
	this.getShortDescription = function(){
		return this.shortDescription;
	}
}

Product.prototype.init = function( sku, name, thumbnailImage, shortDescription ){
	this.setSku(sku);
	this.setName(name);
	this.setThumbnailImage(thumbnailImage);
	this.setShortDescription(shortDescription);
}