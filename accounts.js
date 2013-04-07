Meteor.methods({
  getAccessToken : function() {
    try {
      console.log(Meteor.users.find({_id: Meteor.user()._id}).fetch());
      return Meteor.user().services.facebook.accessToken;
    } catch(e) {
      // console.log(e);
    }
  }
});

// client
// Meteor.call("getAccessToken", function(error, accessToken){
//    console.log(accessToken);
// })