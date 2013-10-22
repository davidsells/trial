window.Wine = Backbone.Model.extend({

    urlRoot: "/wines",

    idAttribute: "_id",

    initialize: function () {
    },


    defaults: {
        _id: null,
    }
});

window.University = Backbone.Model.extend({

    urlRoot: "/universities",

    idAttribute: "_id",
    uniAttribute: "_uni",

    initialize: function () {
    },


    defaults: {
        _id: null,
    }
});

window.Universities = Backbone.Collection.extend({
    model: University,
    url: "/universities"
});

window.UpcomingCourses = Backbone.Collection.extend({
    model: Wine,
    url: '/upcoming',
    
    
/*
    url: '/upcoming?uni=Exploratorium',
    
   urlRoot: '/upcoming',

  url: function() {
    // send the url along with the serialized query params
//    return this.urlRoot+'/uni/Exploratorium';
    return '#upcoming/uni/Exploratorium';
  }
    urlRoot : "/upcoming",

    url: function() {
      var base = _.result(this, 'urlRoot');
    //  if (this.isNew()) return base;
        
      return base + 
          '/' + encodeURIComponent(this.get('uni'));
    }
    */
});


window.Filter = Backbone.Collection.extend({
    model: Wine,
    url: "/upcoming"
/*
    urlRoot : "/upcoming",

    url: function() {
      var base = _.result(this, 'urlRoot');
    //  if (this.isNew()) return base;
        
      return base + 
          '/' + encodeURIComponent(this.get('uni'));
    }
    */
});
window.WineCollection = Backbone.Collection.extend({
    model: Wine,
    url: "/wines"
});
