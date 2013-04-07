request = Npm.require 'request'
Future = Npm.require 'fibers/future'

Meteor.methods
  get_image : (url) ->
    fut = new Future()
    options =
      url: url
      encoding: null
    # Get raw JPG binaries
    request.get options, (error, result, body) ->
      throw error if error
      jpeg = body.toString('base64')
      fut.ret jpeg
    # pause until binaries are fully loaded
    return fut.wait()
  get_access_token: () ->
    try
      return Meteor.user().services.facebook.accessToken
    catch e
      throw e
  share_walgreens : () ->
    fut = new Future()
    console.log 'got through'
    api_key = 'a61e8e47ca83e86a2b8c705899ae9f6d'
    affiliate_id = 'hackathon'
    base_url = 'https://services-qa.walgreens.com/api/util/v2.0/mweb5url'
    url = 'http://i.imgur.com/PhvTsqJ.jpg'

    request_block = 
      "transaction": "photoCheckoutv2",
      "apikey": api_key,
      "devinf": "web",
      "appver": "3.1",
      "act": "mweb5UrlV2",
      "view": "mweb5UrlV2JSON",
      "affId": affiliate_id,
      "expiryTime": "04-04-2013 03:11:36",
      "images": [url],
      "lat": "42.138199",
      "lng": "-87.945799",
      "customer": {
        "firstName": "Joe",
        "lastName": "Shmoe",
        "email": "joe@shmoe.com",
        "phone": "415-555-5555"
      },
      "channelInfo": "",
      "callBackLink": "",
      "prodGroupId": ""

    Meteor.http.post base_url, 'data' : request_block, (err, data) ->
      console.log 'hit'
      if err then console.error err
      data = JSON.parse data.content
      landingURL = data.landingUrl
      token = data.token
      link = landingURL + '&token=' + token
      console.log link
      fut.ret link

    fut.wait()