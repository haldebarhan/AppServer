const fs = require('fs')

const fileGuard = (filename) => {
    const rootPath = __dirname.concat('/')

    fs.unlink(rootPath+ filename, (err)=>{
        if (err) {
            return 0
        }
    })
}

module.exports = fileGuard