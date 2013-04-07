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
      fut.ret jpeg
      jpeg = body.toString('base64')
    # pause until binaries are fully loaded
    return fut.wait()