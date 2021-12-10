const mongoose = require('mongoose');

const SubKategoriSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId, 
    kategori_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori'},
    nama        : { type: String, required: true },
    status      : { type: Number, default: 0 },
    created_at  : { type: Date, default: Date.now },
    updated_at  : { type: Date, default: null } 
});

module.exports = mongoose.model('SubKategori', SubKategoriSchema);