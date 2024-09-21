import auth from "../helper/auth.js"
import hash from "../helper/hash.js"
import UserAuthModel from "../models/userAuthModel.js"

const login = async(req,res) => {
    try {
        const { email,password } = req.body
        const userExists = await UserAuthModel.findOne({email : email})
        if(userExists){
            if(await hash.hashCompare(password,userExists.password)){
                const adminLoginToken = await auth.createLoginToken({
                    id : userExists._id,
                    firstName: userExists.firstName,
                    lastName : userExists.lastName,
                    email: userExists.email,
                    isLoggedIn : userExists.isLoggedIn,
                    isAdmin : userExists.isAdmin
                })
                await UserAuthModel.findOneAndUpdate({email : email}, {$set : {isLoggedIn : true}})
                res.status(200).send({
                    message : 'Login Successful',
                    adminLoginToken
                })
            }else{
                res.status(400).send({
                    message : 'Incorrect password'
                })
            }
        }else{
            res.status(400).send({
                message : 'Email-Id not found'
            })
        }        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging In"
        })
    }
}

const register = async(req,res) => {
    try {
        const { email,password } = req.body
        const userExists = await UserAuthModel.findOne({email : email})
        if(!userExists){
            req.body.password = await hash.createHash(password)
            const newUser = await UserAuthModel.create(req.body)
            const adminStatus = await UserAuthModel.findOneAndUpdate({email : email},{$set : {isAdmin : true}},{new : true})
            res.status(200).send({
                newUser
            })
        } else {
            res.status(400).send({
                message : 'Email-Id already exists! Please Login'
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in registering"
        })
    }
}

const logout = async(req,res) => {
    try {
        const user = await UserAuthModel.findById({_id : req.params.id})
        if(user) {
            let logOut = await UserAuthModel.findOneAndUpdate({_id : req.params.id}, {$set : {isLoggedIn : false}},{new : true})
            res.status(200).send({
                message : "Logged Out Successfully"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging out"
        })
    }
}

export default {
    login,
    register,
    logout
}