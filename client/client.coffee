Meteor.startup ->
  token = 'AAACEdEose0cBAMoYg1ZCk4GjQl7YIjWuipI2OcbiXCLrk15FoHhwOue3ZCkt1jKiPZCodifL8UjLPooY2lN8IVZBndchTWOMRreMcAkNauMK24ZAJHxIg'
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
    Meteor.call "get_access_token", (error, accessToken) ->
      throw error if error
      token = accessToken
    # get profile pic of user
      Meteor.http.get 'https://graph.facebook.com/me/Picture?redirect=false&access_token='+token, (err, result) ->
        throw err if err
        content = JSON.parse result.content
        Session.set 'user_image', content.data.url
      # get friends profile pics
      Meteor.http.get 'https://graph.facebook.com/me/friends?access_token='+token, (err, result) ->
        throw err if err
        friendlist = result.data.data
        urls = []
        length = 0
        # for each friend, grab the url to their profile pic
        _.each friendlist, (friend) ->
          Meteor.http.get 'https://graph.facebook.com/'+friend.id+'/Picture?redirect=false&access_token='+token, (err, result) ->
            throw err if err
            content = JSON.parse result.content
            unless content.data.is_silhouette
              urls.push content.data.url
              length++
            if length is urls.length
              # put the full array of friend urls in the DB
              get_images urls

# this function pops one url at a time and tells the server to save jpeg to DB
get_images = (urlArray) ->
  Meteor.call 'get_image', urlArray.pop(), (error, result) ->
    console.log result
    Images.insert body: result
    if urlArray.length
      get_images urlArray
    else
      console.log 'done'

share = (name) ->
  if not name then name is 'Mosaic'
  try
    img = window.canvas.toDataURL("image/jpeg", 0.9).split(",")[1]
  catch e
    img = window.canvas.toDataURL().split(",")[1]
  Meteor.http.post "https://api.imgur.com/3/image",
    headers:
      'Authorization': 'Client-ID d838931eecf2cf8'
    data:
      type: "base64"
      name: name
      image: img
  , (err, data) ->
    if err then console.error err
    data = JSON.parse(data.content)
    Session.set 'link', data.data.link
