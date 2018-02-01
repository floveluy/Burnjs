module.exports = ({ controller }) => {
    return {
        'get /': controller.user.index
    }
}