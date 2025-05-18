const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['new_message', 'listing_view', 'review', 'system'], 
    required: true 
  },
  content: { type: String, required: true },
  relatedTo: {
    model: { type: String, enum: ['Post', 'Message', 'Review', 'User'] },
    id: { type: mongoose.Schema.Types.ObjectId }
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification; 