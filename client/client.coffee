Meteor.startup ->
  token = 'BAACEdEose0cBAJYPMAinf7IiqQQgHKbBeoPJmrLYfUOmYkrE2CNT7bp5UiuWhq4ZBUpZAu1ahrbA2gM3ldZA7SZAsKBOqYd67vdoUErTgP8PZCtZCLY2iY'
  Session.set 'token', token
  urlArray = []

Template.facebook.events
  'click .pull_data': (e) ->
    e.preventDefault()
    token = Session.get 'token'
    Meteor.http.get 'https://graph.facebook.com/me/Picture?redirect=false&access_token='+token, (err, result) ->
      throw err if err
      content = JSON.parse result.content
      Session.set 'user_image', content.data.url
    Meteor.http.get 'https://graph.facebook.com/me/friends?access_token='+token, (err, result) ->
      throw err if err
      Session.set 'friendlist', result.data.data

Deps.autorun ->
  if Session.get 'friendlist'
    friendlist = Session.get 'friendlist'
    token = Session.get 'token'
    urls = []
    _.each friendlist, (friend) ->
      Meteor.http.get 'https://graph.facebook.com/'+friend.id+'/Picture?redirect=false&access_token='+token, (err, result) ->
        throw err if err
        content = JSON.parse result.content
        unless content.data.is_silhouette
          urls.push content.data.url
        if friend is friendlist[friendlist.length-1] then console.log urls
