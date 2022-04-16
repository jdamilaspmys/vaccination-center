import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const VaccinationCenterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
  }
},
{
  timestamps: true
}
);

export default model('vaccination-center', VaccinationCenterSchema);
