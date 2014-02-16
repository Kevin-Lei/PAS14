// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // group Model
  // ----------

  // Our basic **group** model has `title`, `order`, and `done` attributes.
  var group = Backbone.Model.extend({

    // Default attributes for the group item.
    defaults: function() {
      return {
        title: "empty group...",
      };
    },

    // Ensure that each group created has `title`.
    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

  });

  // group Collection
  // ---------------

  // The collection of groups is backed by *localStorage* instead of a remote
  // server.
  var groupList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: group,

    // Save all of the group items under the `"groups-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("groups-backbone"),

  });

  // Create our global collection of **groups**.
  var groups = new groupList;

  // group Item View
  // --------------

  // The DOM element for a group item...
  var groupView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item1-template').html()),

    // The DOM events specific to an item.
    events: {
      "dblclick .view"  : "edit",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    // The groupView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **group** and a **groupView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-render the titles of the group item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
	  if (groups.length) {
        $('#main1').show();
        $('#header1').hide();
      } else {
        $('#main1').hide();
        $('#header1').show();
      }
      return this;
    },
    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the group.
    close: function() {
      var value = this.input.val().toUpperCase();
      if (!value) {
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },



  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#groupapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-group":  "createOnEnter"
    },

    // At initialization we bind to the relevant events on the `groups`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting groups that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$("#new-group");

      this.listenTo(groups, 'add', this.addOne);
      this.listenTo(groups, 'reset', this.addAll);
      this.listenTo(groups, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main1');

      groups.fetch();
    },

    // Add a single group item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(group) {
      var view = new groupView({model: group});
	  this.$("#group-list").empty();
      this.$("#group-list").append(view.render().el);
    },

    // Add all items in the **groups** collection at once.
    addAll: function() {
      groups.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **group** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
	  groups.empty();
      groups.create({title: this.input.val().toUpperCase()});
      this.input.val('');
    },

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

    } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
