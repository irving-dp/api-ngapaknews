const mongoose      = require('mongoose');
const EventKategori = require('../models/EventKategori');

//get all data event kategori
exports.getData = (req, res, next) => {
    EventKategori.find()
    .exec()
    .then( docs => {
        if( docs.length > 0 ){
            const response = {
                count           : docs.length,
                event_kategori  : docs.map( doc => {
                    return {
                        id          : doc.id,
                        kategori_id : doc.kategori_id,
                        nama        : doc.nama,
                        status      : doc.status,
                        request     :{
                            type: 'GET',
                            url: 'http://localhost:3000/event-kategori/' + doc._id
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
    EventKategori.findById(id)
    .exec()
    .then( doc => {
        if(doc){
            const response = {
                sub_kategori:{
                    id          : doc._id,
                    kategori_id : doc.kategori_id,
                    nama        : doc.nama,
                    status      : doc.status
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/event-kategori/'
                }                  
            }
            res.status(200).json(response);               
        }else{
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

exports.store = (req, res, next) => {
    const event_kategori = new EventKategori({
        _id         : new mongoose.Types.ObjectId(),
        kategori_id : req.body.kategori_id,
        nama        : req.body.nama,
        status      : req.body.status
    });

    event_kategori.save()
    .then( result => {
        const response = {
            message: "Created data successfuly !",
            created_data    : {
                id          : result._id,
                kategori_id : result.kategori_id,
                nama        : result.nama,
                status      : result.status,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/event-kategori/' + result._id
                }
            }
        }
        res.status(201).json(response);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
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
    
    EventKategori.update({_id: id}, {$set:UpdateOps})
    .exec()
    .then( result => {
        res.status(200).json({
            message:"Data updated !",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/event-kategori/' + id
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
    EventKategori.findById(id)
    .exec()
    .then( doc => {
        if( !doc ){
            return res.status(404).json({
                message:"Data not found !"
            });
        }
        EventKategori.remove({ _id:id })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "Data has deleted !",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/event-kategori/",
                    body: {
                        nama: "String",
                        status: "Integer"
                    }
                }
            });
        })        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

