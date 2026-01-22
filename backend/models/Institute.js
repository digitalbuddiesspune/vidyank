import mongoose from 'mongoose';

/**
 * Institute Schema
 * Defines the structure for institute documents
 * Placeholder for future institute management features
 */
const instituteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an institute name'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Institute = mongoose.model('Institute', instituteSchema);

export default Institute;
