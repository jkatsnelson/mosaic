Template.facebook.events
  'click .pull_data': (e)->
    e.preventDefault()
    Meteor.http.get 'https://graph.facebook.com/me/friends', access_token: token, (err, result) ->
      throw err if err
      console.log result

token = 'BAACEdEose0cBAJYPMAinf7IiqQQgHKbBeoPJmrLYfUOmYkrE2CNT7bp5UiuWhq4ZBUpZAu1ahrbA2gM3ldZA7SZAsKBOqYd67vdoUErTgP8PZCtZCLY2iY'
