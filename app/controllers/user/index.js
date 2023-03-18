const db                = require('../../models/index.js');
const ErrorResponse     = require('../../utils/errorResponse.js');
const User              = db.user
const path              = require('path')
const fs                = require('fs')

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
        const email         = req.body.email
        const password      = req.body.password

        if(!email || !password){
            return next( new ErrorResponse("form tidak boleh kosong"))
        }

        if(req.files){
            const FilePath  = 'public/images/users/'
            const image     = req.files.image

            let imageName       = ''

            const allowedType = ['.png' , '.jpg', '.jpeg']

            if(!image){
                return res.status(422).json({
                    success: false, 
                    message : 'File tidak ditemukan.'
                })
            }

            const extImage  = path.extname(image.name)
            imageName       = "Image" + "-" + Date.now() + image.md5 + extImage

            if(!allowedType.includes(extImage.toLowerCase())) return res.status(422).json({success: false, message: "invalid type image"})
            if(image.size > 5000000) return res.status(422).json({ success: false, message: "Image melebihi 5 Mb"})

            image.mv(`${FilePath}${imageName}`, (err) =>{
                if(err) return res.status(500).json({success: false, message: err.message})
            })

            const post  = new User({
                firstname   : req.body.firstname,
                lastname    : req.body.lastname,
                email       : req.body.email,
                password    : req.body.password,
                image       : imageName
            })

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
        }else{
            const post  = new User({
                firstname   : req.body.firstname,
                lastname    : req.body.lastname,
                email       : req.body.email,
                password    : req.body.password
            })

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
        console.log(req.body)
        const id            = req.params.id

        if(req.files){

            const response  = await User.findOne({id})
            if(!response){
                return next(new ErrorResponse("user tidak ditemukan", 404))
            }

            const FilePath  = 'public/images/users/'
            const image     = req.files.image
            const imageOld  = response.image

            let imageName   = ''

            const allowedType = ['.png' , '.jpg', '.jpeg']

            if(!image){
                return res.status(422).json({
                    message : 'File tidak ditemukan.'
                })
            }

            const extImage  = path.extname(image.name)
            imageName       = "Image" + "-" + Date.now() + image.md5 + extImage

            if(!allowedType.includes(extImage.toLowerCase())) return res.status(422).json({message: "invalid type image"})
            if(image.size > 5000000) return res.status(422).json({ message: "Image melebihi 5 Mb"})

            image.mv(`${FilePath}${imageName}`, (err) =>{
                if(err) return res.status(500).json({message: err.message})
            })

            if(imageOld !== '' || imageOld !== nulll){
                try {
                    fs.unlinkSync(`${FilePath}${response.image}`)
                } catch(error) {
                    //
                }
            }

            const post  = {
                firstname   : req.body.firstname,
                lastname    : req.body.lastname,
                email       : req.body.email,
                password    : req.body.password,
                image       : imageName
            }

            await User.findByPk(id)
            .then((result) => {
                result.update(post)
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
        else{
            const post  = {
                firstname   : req.body.firstname,
                lastname    : req.body.lastname,
                email       : req.body.email,
                password    : req.body.password
            }

            await User.findByPk(id)
            .then((result) => {
                result.update(post)
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

    destroy :async(req, res) => {
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