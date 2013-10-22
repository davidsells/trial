 var map = function() {
         if((typeof this.courses === 'undefined' || this.courses.length < 1 || this.courses[0].start_day == null ) ||  (typeof this.categories === 'undefined' || this.categories.length < 1 || this.categories[0].name == null ) ){
         } else {
emit(this._id,{
          icon_photo: this.small_icon_hover
        , large_photo:this.photo
        , short_description: this.short_description
        , name:this.name
	, video:this.video
        , category: this.categories[0].name
        , university:this.universities[0].name
        , start_day:this.courses[0].start_day
        , start_year:this.courses[0].start_year
        , start_month:this.courses[0].start_month
});
         }
 }

var reduce = function(key, values){
  var res = [];
  var i = 0;
  db.wow.insert(values);
  values.forEach(function(v){
          res[i] = (v); i = i + 1;
  });
  return {a:values};
}

// This is run with:  db.courses.mapReduce(map,reduce,{out:"a"});
// afterwords the script below is run to put the collection into the correct form.



db.a.find().forEach( function(result) {
    var value = result.value;
    delete value._id;
    db.a.update({_id: result._id}, value);
    db.a.update({_id: result.id}, {$unset: {value: 1}} )
} );



//  ------------------------ Upcoming Courses

 var map = function() {
         if((typeof this.courses === 'undefined' || this.courses.length < 1 || this.courses[0].start_day == null ) ||  (typeof this.categories === 'undefined' || this.categories.length < 1 || this.categories[0].name == null ) ){
         } else {
	  	var start_year=this.courses[0].start_year
       	  	var start_month=this.courses[0].start_month

	 	if(greater(start_year,year) && greater(start_month,month)) {
			emit(this._id,{
		          icon_photo: this.small_icon_hover
		        , large_photo:this.photo
		        , short_description: this.short_description
		        , name:this.name
			, video:this.video
		        , category: this.categories[0].name
		        , university:this.universities[0].name
		        , start_day:this.courses[0].start_day
		        , start_year:this.courses[0].start_year
		        , start_month:this.courses[0].start_month
			});
         	}

 	}
 }

use coursera
db.upcoming.remove();

 var map = function() {
         if((typeof this.courses === 'undefined' || this.courses.length < 1 || this.courses[0].start_day == null ) ||  (typeof this.categories === 'undefined' || this.categories.length < 1 || this.categories[0].name == null ) ){
         } else {
		var month  = 9;
		var year = 2013;
	  	var start_year=this.courses[0].start_year
       	  	var start_month=this.courses[0].start_month

	 	if((start_year!==null) && (start_year>=year) && (start_month !== null) && (start_month>=month)) {
			emit(this._id,{
		          icon_photo: this.small_icon_hover
		        , large_photo:this.photo
		        , short_description: this.short_description
		        , name:this.name
			, video:this.video
		        , category: this.categories[0].name
		        , university:this.universities[0].name
		        , start_day:this.courses[0].start_day
		        , start_year:this.courses[0].start_year
		        , start_month:this.courses[0].start_month
			});
         	}

 	}
 }

var reduce = function(key, values){
  return {upcoming:values};
}

db.courses.mapReduce(map,reduce,{out:"upcoming"});

// This is run with:  db.courses.mapReduce(map,reduce,{out:"upcoming"});
// afterwords the script below is run to put the collection into the correct form.

db.upcoming.find().forEach( function(result) {
    var value = result.value;
    delete value._id;
    db.upcoming.update({_id: result._id}, value);
    db.upcoming.update({_id: result.id}, {$unset: {value: 1}} )
} );

Universities
-----------------

db.universities.remove();

 var map = function() {
			emit(this.universities[0].name,{ university:this.universities[0].name });
 }

var reduce = function(key, values){
  return {university:key};
}

db.courses.mapReduce(map,reduce,{out:"universities"});

// This is run with:  db.courses.mapReduce(map,reduce,{out:"universities"});
// afterwords the script below is run to put the collection into the correct form.

db.universities.find().forEach( function(result) {
    var value = result.value;
    delete value._id;
    db.universities.update({_id: result._id}, value);
    db.universities.update({_id: result.id}, {$unset: {value: 1}} )
} );

