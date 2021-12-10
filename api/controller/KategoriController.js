const mongoose = require('mongoose');
const Kategori = require('../models/Kategori');

//get all kategori berita
exports.getData = (req, res, next) => {
    Kategori.find()
    .exec()
    .then( docs => {
        if( docs.length > 0 ){
            const response = {
                count: docs.length,
                kategori : docs.map(doc => {
                    return {
                        id: doc._id,
                        nama:doc.nama,
                        created_at: doc.created_at,
                        request:{
                            type:'GET',
                            url: 'http://localhost:3000/kategori/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }else{
            res.status(204).json({
                message:"No entries found !"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//show detail data
exports.getDataById = (req, res, next) => {
    const id = req.params.id;
    Kategori.findById(id)
    .exec()
    .then( doc => {
        if(doc){
            res.status(200).json({
                kategori: doc,
                request: {
                    type:'GET',
                    url: 'http://localhost:3000/kategori/'
                }
            })
        }else {
            res.status(404).json({
                message: "No entries found !"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//store data
exports.store = (req, res, next) => {
    const kategori = new Kategori({
        _id: new mongoose.Types.ObjectId(),
        nama: req.body.nama
    });

    kategori.save()
    .then( result => {
        res.status(201).json({
            message: "Created Data Successfuly !",
            created_kategori:{
                id: result._id,
                nama: result.nama,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/kategori/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//update data 
exports.update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName] = ops.value;
    } 

    Kategori.update({_id: id}, {$set:updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message:"Data Updated !",
            
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err 
        });
    });
}

//delete data
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Kategori.findById(id)
    .exec()
    .then( doc => {
        if( !doc ){
            return res.status(404).json({
                message:"Data Not Found !"
            })
        }
        Kategori.remove( {_id: id} )
        .exec()
        .then( result => {
            res.status(200).json({
                message:"Data Has Deleted !",
                request:{
                    type:"POST",
                    url: "http://localhost:3000/kategori/",
                    body:{
                        nama:"String"
                    }
                }
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
