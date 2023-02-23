const db                =  require('../../models/index.js');
const ErrorResponse     = require('../../utils/errorResponse.js');
const User              = db.user

const UserController = {

    getAllUser  : async (req,res) => {
        await User.findAll().then((result) => {
            res.status(200).send({
                success: true,
                data: result
            });
        }).catch((err) => {
            res.status(err.status || 500).json({
                success : false,
                error: err.message || "Server Error"
            })
        });
    },
    
    create : async(req, res,next) => {
        const post  = new User({
            firstname   : req.body.firstname,
            lastname    : req.body.lastname,
            email       : req.body.email,
            password    : req.body.password
        })

        const email         =  req.body.email
        const password      = req.body.password

        if(!email || !password){
            return next( new ErrorResponse("form tidak boleh kosong"))
        }

        try {
            await post.save(post)
            res.json({
                success : true,
                message : " Berhasil menambahkan user baru"
            })
        } catch (err) {
            res.status(err.status || 500).json({
                success : false,
                error: err.message || "Server Error"
            })
        }
    },

    findOne : async(req, res) => {
        const id            = req.params.id
        await User.findByPk(id)
        .then((result) => {
            res.status(200).send({
                success : true,
                data : result
            })
        }).catch((err) => {
            res.status(err.status || 500).json({
                success : false,
                error: err.message || "Server Error"
            })
        });
    },

    update : async(req, res, next) => {
        const id            = req.params.id
        const form          = {
            firstname   : req.body.firstname,
            lastname    : req.body.lastname,
            email       : req.body.email
        }

        const form1         = {
            firstname   : req.body.firstname,
            lastname    : req.body.lastname,
            email       : req.body.email,
            password    : req.body.password,
        }

        if(req.body.password === '' || !req.body.password){
            await User.findByPk(id)
            .then((result) => {
                result.update(form)
                res.send({
                    success : true,
                    message : "Berhasil mengubah data user"
                })
            }).catch((err) => {
                res.status(err.status || 500).json({
                    success : false,
                    error: err.message || "Server Error"
                })
            });
        }else{
            await User.findByPk(id)
            .then((result) => {
                result.update(form1)
                res.send({
                    success : true,
                    message : "Berhasil mengubah data user"
                })
            }).catch((err) => {
                res.status(err.status || 500).json({
                    success : false,
                    error: err.message || "Server Error"
                })
            });
        }
    },

    delete :async(req, res) => {
        const id    = req.params.id
        await User.findByPk(id)
        .then((result) => {
            result.destroy()
            res.send({
                success : true,
                message : "data berhasil di hapus"
            })
        }).catch((err) => {
            res.status(err.status || 500).json({
                success : false,
                error: err.message || "Server Error"
            })
        });
    }
}
module.exports = UserController