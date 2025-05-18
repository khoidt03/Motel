const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Giá thuê
  area: { type: Number }, // Diện tích m2
  location: {
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String },
    street: { type: String },
    exactAddress: { type: String },
    // Adding coordinates for geospatial queries
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  images: [{ type: String }], // Danh sách URL ảnh
  videos: [{ type: String }], // URL video (nếu có)
  amenities: [{ type: String }], // Tiện ích: ["wifi", "nong-lanh",...]
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  contactPhone: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'rented', 'hidden'],
    default: 'pending' 
  },
  reviewBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Review'
    // Removed 'required: true' since reviews may not exist at post creation
  },
  viewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }, // Tin nổi bật
  featuredExpiry: { type: Date }, // Ngày hết hạn nổi bật
  createdAt: { type: Date, default: Date.now }
});

postSchema.index({ 'location.coordinates': '2dsphere' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 