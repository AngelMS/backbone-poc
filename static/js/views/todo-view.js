$(function() {
    
    // renders individual todo items list (li)
    app.TodoView = Backbone.View.extend({
        // Notice that our view is using a tagName: li instead of the just el from before. 
        // This means that the new render elements will be wrapped around a <li></li>
        tagName: 'li',
        template: _.template($('#item-template').html()),
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this; // enable chained calls
        },
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
        },  
        events: {
            'dblclick label' : 'edit',
            'keypress .edit' : 'updateOnEnter',
            'blur .edit' : 'close',
            'click .toggle': 'toggleCompleted',
            'click .destroy': 'destroy'
        },
        edit: function(){
            this.$el.addClass('editing');
            this.input.focus();
        },
        close: function(){
            var value = this.input.val().trim();
            if(value) {
                this.model.save({title: value});
            }
            this.$el.removeClass('editing');
        },
        updateOnEnter: function(e){
            if(e.which == 13){
                this.close();
            }
        },
        toggleCompleted: function(){
            this.model.toggle();
        },
        destroy: function(){
            this.model.destroy();
        }
    });
    
    
    // When we instanciate a Backbone View, it can receive any parameter that we need.
    // In this case, since we call the parameter model, it's instanciated with a Backbone Model (e.g. todo) from "views/todo-events.js":
    
    // addOne: function(todo){
    //     var view = new app.TodoView({model: todo});    <--- HERE IT IS!
    //     $('#todo-list').append(view.render().el);
    // },
    
});
