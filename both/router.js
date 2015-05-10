if (Meteor.isClient) {

  /**
   *
   */
  var isUserLoggedInWithRoles = function(roles) {

    // Need to load user like this because Meteor.user() might only have id.
    var user = Meteor.user();

    // console.log(userId + "," + user);

    if (user != null && Roles.userIsInRole(user, roles)) {
      return true;
    }

    return false;
  };

  /**
   *
   */
  var isAdminLoggedIn = function() {
    return isUserLoggedInWithRoles(["admin"], "home");
  };

  /**
   *
   */
  var isUserLoggedIn = function() {
    return isUserLoggedInWithRoles(["admin","user"], "home");
  };

  /**
   *
   */
  var routeHome = function() {
    console.log("route home");
    Router.go("home");
  };

  /**
   *
   */
  Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
  });

  // /**
  //  *
  //  */
  // Router.onBeforeAction(function () {
  //   // all properties available in the route function
  //   // are also available here such as this.params
  //
  //   if (Meteor.loggingIn()) {
  //     this.render('home');
  //   }
  //   else {
  //     // otherwise don't hold up the rest of hooks or our route/action function
  //     // from running
  //     this.next();
  //   }
  // });

  Router.route('/', {

    name: 'home',

    template: 'home',

    waitOn: function() {
      return Meteor.subscribe("clients-subscription");
    },

    data: function() {
      return {
        clients: Clients.find()
      };
    },

    onBeforeAction: function() {

      if (!isUserLoggedIn()) {
        this.render("welcome");
      }
      else {
        this.next();
      }
    },

    action: function() {
      this.render();
    }
  });

  Router.route('/tutorial', {

    name: 'tutorial',

    template: 'tutorial',

    waitOn: function() {

    },

    data: function() {

    },

    onBeforeAction: function() {
      if (!isUserLoggedIn()) {
        this.render("welcome");
      }
      else {
        this.next();
      }
    },

    action: function() {
      this.render();
    }
  });

  // Router.route('/admin2/accounts', {
  //
  //   name: 'admin.accounts',
  //
  //   template: 'accounts',
  //
  //   waitOn: function() {
  //
  //   },
  //
  //   onBeforeAction: function() {
  //
  //     console.log('on before action');
  //
  //     if (!isAdminLoggedIn()) {
  //       Router.go('home');
  //     }
  //     else {
  //       this.next();
  //     }
  //   },
  //
  //   action: function() {
  //     this.render();
  //   }
  // });
}
