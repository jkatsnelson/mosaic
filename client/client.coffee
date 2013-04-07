Meteor.startup ->
  token = 'AAACEdEose0cBAMoYg1ZCk4GjQl7YIjWuipI2OcbiXCLrk15FoHhwOue3ZCkt1jKiPZCodifL8UjLPooY2lN8IVZBndchTWOMRreMcAkNauMK24ZAJHxIg'
  Session.set 'token', token
  added = 0
  query = Images.find({})
  query.observe
    added: (image) ->
      console.log added++
      if Session.get 'urls_length'
        if added is Session.get 'urls_length' then console.log 'FUCK YES MAN'

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
    # get profile pic of user
    Meteor.http.get 'https://graph.facebook.com/me/Picture?redirect=false&access_token='+token, (err, result) ->
      throw err if err
      content = JSON.parse result.content
      Session.set 'user_image', content.data.url
    # get friends profile pics
    Meteor.http.get 'https://graph.facebook.com/me/friends?access_token='+token, (err, result) ->
      throw err if err
      friendlist = result.data.data
      token = Session.get 'token'
      urls = []
      length = 0
      _.each friendlist, (friend) ->
        Meteor.http.get 'https://graph.facebook.com/'+friend.id+'/Picture?redirect=false&access_token='+token, (err, result) ->
          throw err if err
          content = JSON.parse result.content
          unless content.data.is_silhouette
            urls.push content.data.url
            length++
          if length is urls.length
            get_images urls

get_images = (urlArray) ->
  Meteor.call 'get_image', urlArray.pop(), (error, result) ->
    Images.insert body: result
    if urlArray.length
      get_images urlArray
    else
      console.log 'done'
