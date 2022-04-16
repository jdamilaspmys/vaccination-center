import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  nric: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  centerId: { type: Schema.Types.ObjectId, ref: 'vaccination-center' },
},
{
  timestamps: true
}
);

export default model('booking', BookingSchema);
