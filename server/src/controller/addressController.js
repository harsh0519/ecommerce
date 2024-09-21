import UserAuthModel from "../models/userAuthModel.js"

const addAddress = async(req,res) => {
    try {
        const newAddress = await UserAuthModel.findByIdAndUpdate({_id : req.params.id}, {$push : {addressList : {address : req.body.newAddress}}},{new :true})
        res.status(200).send({
            newAddress
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding address"
        })
    }
}

const getAddress = async(req,res) => {
    try {
        const addresslist = await UserAuthModel.findById({_id : req.params.id})
        if(addresslist){
            let list = addresslist.addressList
            let lists = list.map((e) => e )
            res.status(200).send({
                lists
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting address"
        })
    }
}

const editAddress = async(req,res) => {
    try {
        const modifiedAddress = await UserAuthModel.updateOne({_id : req.params.id, "addressList._id" : req.params.addressId}, {$set : {"addressList.$.address" : req.body.newAddress}},{new :true})
        res.status(200).send({
            modifiedAddress
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding address"
        })
    }
}

const deleteAddress = async(req,res) => {
    try {
        const removedAddress = await UserAuthModel.findByIdAndUpdate({_id : req.params.id},{$pull : {addressList : {_id : req.params.addressId }}},{new :true})
        res.status(200).send({
            removedAddress
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting address"
        })
    }
}

export default {
    addAddress,
    getAddress,
    editAddress,
    deleteAddress
}