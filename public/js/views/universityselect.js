window.UniversitySelectView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },
  events: {
        "change .here": "universitySelected" 
    },

    universitySelected: function (event) {

        // Apply the change to the model
        var value = $(event.target).val();
        console.log("Select: "+value);
        $('#filter').text($(event.target).val());
        //change[target.name] = target.value;
        //window.location.href=$(this).val();
        console.log("Selected: "+value);
        location.href='#upcoming/uni/'+value;
    },
/*
    render:function () {
        var universities = this.model.models;
        var len = universities.length;

        $(this.el).html('<select class="here" onchange="location = this.options[this.selectedIndex].value;">');

        for (var i = 0; i < len; i++) {
           var value = universities[i]['id'];
           $('.here', this.el).append('<option value=#upcoming/uni/"'+value+'">'+value+'</option>');
        }
        $('.here', this.el).append('</select>');

        return this;
    }
    */
    render:function () {
        var universities = this.model.models;
        var len = universities.length;

        $(this.el).html('<select class="here"></ul>');

        for (var i = 0; i < len; i++) {
           var value = universities[i]['id'];
           $('.here', this.el).append('<option value="'+value+'">'+value+'</option>');
        }
        $('.here', this.el).append('</select>');

        return this;
    }

});