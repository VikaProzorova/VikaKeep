// module.exports = {
//     List: require('./List'),
//     Create: require('./Create'),
//     Update: require('./Update')
// }

const requireDirectory = require('require-directory')

module.exports = requireDirectory(module)
