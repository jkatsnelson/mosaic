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