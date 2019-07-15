const mongoose = require('mongoose');
const KategoriBerita = require('../models/KategoriBerita');

//get all kategori berita
exports.getAll = (req, res, next) => {
    KategoriBerita.find()
    .exec()
    .then( docs => {
        if( docs.length > 0 ){
            const response = {
                count: docs.length,
                kategori_berita : docs.map(doc => {
                    return {
                        id: doc._id,
                        nama:doc.nama,
                        created_at: doc.created_at,
                        request:{
                            type:'GET',
                            url: 'http://localhost:3000/kategori-berita/' + doc._id
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
exports.show = (req, res, next) => {
    const id = req.params.kategori_berita_id;
    KategoriBerita.findById(id)
    .exec()
    .then( doc => {
        if(doc){
            res.status(200).json({
                kategori_berita: doc,
                request: {
                    type:'GET',
                    url: 'http://localhost:3000/kategori-berita/'
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
    const kategori_berita = new KategoriBerita({
        _id: new mongoose.Types.ObjectId(),
        nama: req.body.nama
    });

    kategori_berita.save()
    .then( result => {
        res.status(201).json({
            message: "Created Data Successfuly !",
            created_kategori_berita:{
                id: result._id,
                nama: result.nama,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/kategori-berita/' + result._id
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
    const id = req.params.kategori_berita_id;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName] = ops.value;
    } 

    KategoriBerita.update({_id: id}, {$set:updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message:"Data Updated !",
            request:{
                type: 'GET',
                url: 'http://localhost:3000/kategori-berita/' + id
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

//delete data
exports.delete = (req, res, next) => {
    const id = req.params.kategori_berita_id;
    KategoriBerita.findById(id)
    .exec()
    .then( doc => {
        if(!doc){
            return res.status(404).json({
                message:"Data Not Found !"
            })
        }
        KategoriBerita.remove( {_id: id} )
        .exec()
        .then( result => {
            res.status(200).json({
                message:"Data Has Deleted !",
                request:{
                    type:"POST",
                    url: "http://localhost:3000/kategori-berita/",
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
