import mongoose from 'mongoose';

/**
 * Subscription Schema
 * Defines the structure for subscription documents
 * Placeholder for future subscription management features
 */
const subscriptionSchema = mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institute',
      required: true,
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

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
