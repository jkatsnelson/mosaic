request = Npm.require 'request'
Future = Npm.require 'fibers/future'

Meteor.methods
  get_image: (url) ->
    fut = new Future()
    options =
      url: url
      encoding: null
    # Get raw JPG binaries
    request.get options, (error, result, body) ->
      if error then return console.error error
      jpeg = body.toString('base64')
      fut.ret jpeg
    # pause until binaries are fully loaded
    return fut.wait()