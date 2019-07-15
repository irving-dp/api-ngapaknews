const mongoose = require('mongoose');

const KatergoriBeritaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nama: {type:String, required:true },
    status_aktif: { type: Number, default:0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null }
});

module.exports = mongoose.model('KategoriBerita', KatergoriBeritaSchema);