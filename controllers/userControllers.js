const fs = require('fs');

const tours =JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));



exports.getAllUsers = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}

exports.createUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}



exports.getUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}



exports.updateUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}


exports.deleteUser = (rep,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this rout is not yet defined'

    })
}