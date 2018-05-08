$(function() {
    
    // renders individual todo items list (li)
    app.TodoView = Backbone.View.extend({
        // Notice that our view is using a tagName: li instead of the just el from before. 
        // This means that the new render elements will be wrapped around a <li></li>
        tagName: 'li',
        template: _.template($('#item-template').html()),
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this; // enable chained calls
        }
    });
    
    
    // When we instanciate a Backbone View, it can receive any parameter that we need.
    // In this case, since we call the parameter model, it's instanciated with a Backbone Model (e.g. todo) from "views/todo-events.js":
    // addOne: function(todo){
    //     var view = new app.TodoView({model: todo});    <--- HERE IT IS!
    //     $('#todo-list').append(view.render().el);
    // },
    
});
