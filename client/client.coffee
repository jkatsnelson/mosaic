Meteor.startup ->
  token = 'BAACEdEose0cBAI6bgZAcWUARH8LvMbUd2ZAVAf4VayTOxUC0SyZCuchYpZBJZCsoi17rOBBQopZC5i34agc71DQuGvbajE9mZAKssgSp9JGfzndbSgAxoJu'
  Session.set 'token', token
  urlArray = []

image_to_canvas = (binary) ->
  img = new Image()
  img.src = 'data:image/jpeg;base64,' + binary
  ctx = document.getElementById('c').getContext('2d')
  img.onload = () ->
    ctx.drawImage(img, 0, 0)


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
    Meteor.http.get 'https://graph.facebook.com/'+friendlist[0]["id"]+'/Picture?redirect=false&access_token='+token, (err, result) ->
      throw err if err
      content = JSON.parse result.content
      unless content.data.is_silhouette
        urls.push content.data.url
        Session.set 'imgUrl', urls[0]
      # if friend is friendlist[friendlist.length-1] then Session.set 'imgUrl'

Deps.autorun () ->
  if Session.get 'imgUrl'
    url = Session.get 'imgUrl'
    Meteor.call 'get_image', url, (err, result) ->
      throw err if err
      image_to_canvas result

