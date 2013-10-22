window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {
        var items = this.model.models;
	pag.init(items,8);
	$(this.el).html("<span>"
		+"<button onClick='pag.prev();location.href=\"#courses/page/"+pag.getPrevPosition()+"\";'>&lt;</button>"
		+ "<button type='button' id='paginationDisplay' >"+pag.getDisplayText() + "</button>"
		+"<button onClick='pag.next();location.href=\"#courses/page/"+pag.getNextPosition()+"\";'>&gt;</button></span>");
        return this;
    }

});
