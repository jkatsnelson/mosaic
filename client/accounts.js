// Template.user_loggedout.events({
//     "click #login": function (e, tmpl) {
//         Meteor.loginWithFacebook({
//             requestPermissions: ['user_photos']
//         }, function (err){
//             if (err) {
//                 console.log(err);
//             }
//         })
//     }
// })

// Template.user_loggedin.events({
//     "click #logout": function (e, tmpl) {
//         Meteor.logout(function(err){
//             console.log(err);
//         })
//     }
// })