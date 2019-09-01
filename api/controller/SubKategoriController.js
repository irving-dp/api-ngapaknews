const mongoose = require('mongoose');
const SubKategori = require('../models/SubKategori');

// get all sub kategori
exports.getData = (req, res, next) => {
    SubKategori.find()
    .exec()
    .then( docs => {
        if( docs.length > 0 ){
            const response = {
                count: docs.length,
                sub_kategori: docs.map( doc => {
                    return {
                        id: doc._id,
                        kategori_id: doc.kategori_id,
                        nama: doc.nama,
                        status: doc.status,
                        request: {
                            type:'GET',
                            url: 'http://localhost:3000/sub-kategori/' + doc._id
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
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//show detail data
exports.getDataById = (req, res, next) => {
    const id    = req.params.id;
    SubKategori.findById(id)
    .exec()
    .then( doc => {
        if(doc){
            const response = {
                sub_kategori: {
                        id: doc._id,
                        kategori_id: doc.kategori_id,
                        nama: doc.nama,
                        status: doc.status                        
                    },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/sub-kategori/'
                }                  
            } 
            res.status(200).json(response);               
        }else{
            res.status(404).json({
                message: "No entries found !"
            });
        }
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//store data
exports.store = (req, res, next) => {
    const sub_kategori = new SubKategori({
        _id         : new mongoose.Types.ObjectId(),
        kategori_id : req.body.kategori_id,
        nama        : req.body.nama,
        status      : req.body.status
    });

    sub_kategori.save()
    .then( result => {
        res.status(201).json({
            message: "Created data sucessfuly",
            created_data:{
                id: result._id,
                nama: result.nama,
                status: result.status,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/sub-kategori/' + result._id
                }
            }
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//update data
exports.update = (req, res, next) => {
    const id = req.params.id;
    const UpdateOps = {};
    for( const ops of req.body ){
        UpdateOps[ops.propName] = ops.value;
    }

    SubKategori.update({_id: id}, {$set:UpdateOps})
    .exec()
    .then( result => {
        res.status(200).json({
            message:"Data Updated !",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/sub-kategori/' + id
            } 
        })   
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
    SubKategori.findById(id)
    .exec()
    .then( doc => {
        if( !doc ){
            return res.status(404).json({
                message:"Data not found !"
            })
        }
        SubKategori.remove({ _id:id})
        .exec()
        .then( result => {
            res.status(200).json({
                message:"Data has deleted !",
                request:{
                    type:"POST",
                    url: "http://localhost:3000/sub-kategori/",
                    body: {
                        nama: "String"
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
