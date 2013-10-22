var AppRouter = Backbone.Router.extend({
    routes: {
        ""                  	: "home",
        "courses/page/:page"  	: "pagelist",
    	"upcoming/uni/:uni"	: "upcoming",
    	"upcoming"	    	: "upcoming",
        "courses/add"         	: "addCourse",
        "courses/:id"         	: "courseDetails",
        "courses"		: "list",
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
        var courseList = buildCollection();
	
	courseList.fetch({success: function(){
          	     $("#content").html(new CourseListView({model: courseList, page: p}).el);
        	    }});
        this.headerView.selectMenuItem('home-menu');
    },
    
    pagelist: function(page) {
	console.log("Hit list target");
        var p = page ? parseInt(page, 10) : 1;
        //var courseList = new CourseCollection();
        var courseList = buildCollection();
        courseList.fetch({success: function(){
            $("#content").html(new CourseListView({model: courseList, page: p}).el);
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
            $("#content").html(new CourseListView({model: upcomingCourses, page: 1}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    courseDetails: function (id) {
        var course = new Course({_id: id});
        course.fetch({success: function(){
            $("#content").html(new CourseView({model: course}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addCourse: function() {
        var course = new Course();
        $('#content').html(new CourseView({model: course}).el);
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
    collection =  new CourseCollection();
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
utils.loadTemplate(['UniversitySelectView','HomeView', 'HeaderView', 'CourseView', 'CourseListItemView', 'AboutView'], function() {
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
