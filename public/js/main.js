var AppRouter = Backbone.Router.extend({
    routes: {
        ""                  	: "home",
        "wines/page/:page"  	: "pagelist",
    	"upcoming/uni/:uni"	: "upcoming",
    	"upcoming"	    	: "upcoming",
        "wines/add"         	: "addWine",
        "wines/:id"         	: "wineDetails",
        "wines"		    	: "list",
        "about"             	: "about"
    },

    initialize: function () {
	console.log("initilize routes");
        this.headerView = new HeaderView();
        var universities = new Universities();
        universities.fetch({success: function(){
            this.headerView = new HeaderView({model:universities});
            $('.header').html(this.headerView.el);
	    console.log("initialed HeaderView")
            $("#univ").html(new UniversitySelectView({model: universities}).el);
        }});
    },
    
    wow:function (uni) {
        console.log("wow: "+uni);
    },

    home: function (id) {
	console.log("Hit home target");
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },
    
    list: function(uni,page) {
	pag.reset();
	console.log("Hit list target");
        var p = page ? parseInt(page, 10) : 1;
	setCollectionType('all');
        var wineList = buildCollection();
	
	wineList.fetch({success: function(){
          	     $("#content").html(new WineListView({model: wineList, page: p}).el);
        	    }});
        this.headerView.selectMenuItem('home-menu');
    },
    
    pagelist: function(page) {
	console.log("Hit list target");
        var p = page ? parseInt(page, 10) : 1;
        //var wineList = new WineCollection();
        var wineList = buildCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },
    
    upcoming: function(uni) {
	console.log("uni: "+uni);
	pag.reset();
	console.log("Hit upcoming list target");
//        var p = page ? parseInt(page, 10) : 1;
	setCollectionType('upcoming');
        var upcomingCourses = buildCollection();
        upcomingCourses.fetch({success: function(){
            $("#content").html(new WineListView({model: upcomingCourses, page: 1}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

var collectionType = 'all';
function setCollectionType(coll) {
    collectionType = coll;
}

function getCollectionType() {
    return collectionType;
}

function buildCollection() {
   var collection = "";
   if(getCollectionType() === "all") {
    collection =  new WineCollection();
   }else{
    collection =  new UpcomingCourses();
   }
   var filter = getFilters();
   if (typeof filter != 'undefined' && filter!=="") {
	    collection.url = collection.url+filter;
    }
    return collection;
}
/*
 *The problem we are having with searches is that the template view is being
 *obsificted from the search request because of the parameters.
 */
utils.loadTemplate(['UniversitySelectView','HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    console.log("Can we see the loading of the templates");
    app = new AppRouter();
    Backbone.history.start();
});
function getFilters() {
	var result = "";
	var filter = $('#filter').text();
	if (typeof filter != 'undefined' && filter != null && filter !== "") {
	    result = "/uni/"+filter;
	}
	return result;
    }
