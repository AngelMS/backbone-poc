// ####################################################
// ####################################################
// _.js templates have the following syntax:
// _.template(templateString, [data], [settings])

// where in the templateString you use the place holder <%= %> 
// and <%- %> to dynamically insert data.
// The later allows for HTML escape while the first one doesn’t. 

// Moreover, you can use <% %> to run any javascript code.
// ####################################################

$(function() {
    var AppView = Backbone.View.extend({
        // el - stands for element. Every view has a element associate in with HTML
        //      content will be rendered.
        el: $('#container-template'),
        // template which has the placeholder 'who' to be substitute later
        template: _.template("<h3>Hello <%= who %></h3>"),
        // It's the first function called when this view it's instantiated.
        initialize: function(){
            this.render();
        },
        // $el - it's a cached jQuery object (el), in which you can use jQuery functions
        //       to push content. Like the Hello World in this case.
        render: function(){
            // render the function using substituting the varible 'who' for 'world!'.
            this.$el.html(this.template({who: 'there!!'}));
            //***Try putting your name instead of world.
        }
    });
    
    var appView = new AppView();
    
});
