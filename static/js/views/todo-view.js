$(function() {
    // Events are written in the following format:
    // {"<EVENT_TYPE> <ELEMENT_ID>": "<CALLBACK_FUNTION>"}
    // 
    // E.g.
    // events: {'keypress #new-todo': 'createTodoOnEnter'}
    // 
    // in jQuery it would be something like:
    // $('#new-todo').keypress(createTodoOnEnter);
    
    
    
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
    
    
    
    
    
    // ### NOTE ON EVENTS
    // Backbone.Events can be mixed with any object and give it the pub/sub (observer patter) behaviour. 
    // Events provides a couple of methods from which we are going to discuss: on, off and trigger. 
    // (If this you are familiar with then in jQuery, they will work the same way + some nice built-in features)
    
    // Subscribing to Events with on "object.on(event, callback, [context])"
    
    // Also called bind. It binds an object to an event and a callback. When that event it’s triggered it executes the callback.
    
    // E.g. 
    // "todoList.on('add', this.addAll, this);"
    
    // Everytime a new item is added to a Backbone.Collection the built-in event add (docs for add is triggered. In the example above, after the custom event is triggered, the todoList’s callback addAll() is executed and the current object is passed with this as a context.
    
    
    // Events can also be set on arbitrary objects using underscore.js extend function:
    
    // var object = {},
    // callback = function(msg) { console.log("Triggered " + msg); };
    // _.extend(object, Backbone.Events);
    // object.on("my_event", callback);
    // object.trigger("my_event", "my custom event");
    
    
});
