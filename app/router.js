
exports.default = ({ controller }) => {
    return {
        'get /': controller.user.index
    }
}
