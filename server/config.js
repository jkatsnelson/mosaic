Accounts.loginServiceConfiguration.remove({
    service: "facebook"
})

Accounts.loginServiceConfiguration.insert({
    service: "facebook",
    clientid: "483074125063030",
    secret: "e0ac540687c8c593529db8710f34104f"
})

Accounts.onCreateUser(function(options, user){
    console.log(user)
    var accessToken = user.services.facebook.accessToken,
    result,
    profile;

    result = Meteor.http.get("http://facebook.com/api", {
        params: {
            access_token: accessToken
        }
    });

    if(result.error)
        throw result.error

    profile = _.pick(result.data,
        "login",
        "name",
        "profile_url",
        "etc",
        "etc");

    user.profile = profile;

    return user;
})