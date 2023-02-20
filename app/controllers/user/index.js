const db    =  require('../../models/index.js')
const User  = db.user

const UserController = {

    getAllUser  : async (req,res) => {
        await User.findAll().then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send({message: err.message})
        });
    }
}
module.exports = UserController