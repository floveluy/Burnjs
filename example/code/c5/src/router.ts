module.exports = (controller: any) => {

    return {
        'get /': controller.user.user,
        'get /userinfo': controller.user.userInfo
    }
}