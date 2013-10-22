window.pag = (function() {

var increment = 0;
var pub = {};
var models;
var length = 0;
var position = 1;
var pages = 0;


var setDisplayText = function() {
   $('#paginationDisplay').text(pub.getDisplayText());
}

var getPages = function() {
	if(pages == 0) {
		pages = Math.ceil(length/increment);
	}
	return pages;
}

pub.init = function(mod, inc) {
	    models = mod;
	    increment = inc;
	    length = mod.length;
};

pub.reset = function() {
            pages = 0;
            position = 1;
}
pub.next = function() {
	    if(position*increment < length) {
		    position = position + 1;
	    }
	    setDisplayText();

	    return position;
};

pub.prev = function() {
	    if(position-1 > 1) {
		    position = position - 1;
	    }
	    setDisplayText();
	    return position;
};

pub.getPathFromUrl = function(url) {
  return url.split("?")[0];
}

pub.getCurrentPosition = function() {
	return position;
}

pub.getNextPosition = function() {
	return position+1;
}

pub.getPrevPosition = function() {
	return position-1;
}

pub.getDisplayText  = function() {
	    return "Page: "+position+" out of "+getPages();
}


return pub;

}());

