window.CourseView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteCourse",
        "drop #picture" : "dropHandler",
	"click #vid"    : "showVideo"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveCourse();
        return false;
    },

    saveCourse: function () {
    /* Do nothing
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('courses/' + model.id, false);
                utils.showAlert('Success!', 'Course saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
	*/
    },

    deleteCourse: function () {
	
	    /* Do Nothing
        this.model.destroy({
            success: function () {
                alert('Course deleted successfully');
                window.history.back();
            }
        });
	*/
        return false;
    },

    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    },
    
    showVideo: function(event) {
	if ($(event.currentTarget).attr('data-video') != "http://www.youtube.com/embed/") {
		    var thevideo = '<iframe style="width: 180px;text-align: center;width:100%;margin: 0px auto;" src="'+ $(event.currentTarget).attr('data-video') +'"></iframe>';
		    alert(thevideo);
		    $(event.currentTarget).replaceWith(thevideo);
	}
    }

});
