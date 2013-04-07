Meteor.startup ->
  token = 'BAACEdEose0cBAI6bgZAcWUARH8LvMbUd2ZAVAf4VayTOxUC0SyZCuchYpZBJZCsoi17rOBBQopZC5i34agc71DQuGvbajE9mZAKssgSp9JGfzndbSgAxoJu'
  Session.set 'token', token
  added = 0
  query = Images.find({})
  query.observe
    added: (image) ->
      added++
      if added is Session.get 'urls_length' then console.log 'FUCK YES MAN' 

image_to_canvas = (binary) ->
  console.log(binary)
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
    _.each friendlist, (friend) ->
      Meteor.http.get 'https://graph.facebook.com/'+friend.id+'/Picture?redirect=false&access_token='+token, (err, result) ->
        throw err if err
        content = JSON.parse result.content
        unless content.data.is_silhouette
          urls.push content.data.url
        if friend is friendlist[friendlist.length-1] then Session.set 'img_urls', urls

Deps.autorun () ->
  if Session.get 'img_urls'
    urls = Session.get 'img_urls'
    get_images urls
    Session.set 'urls_length', urls.length

get_images = (urlArray) ->
  Meteor.call 'get_image', urlArray.pop(), (error, result) ->
    Images.insert body: result
    get_images urlArray
