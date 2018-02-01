"use strict";
module.exports = (controller) => {
    return {
        'get /': controller.user.user,
        'get /userinfo': controller.user.userInfo
    };
};
