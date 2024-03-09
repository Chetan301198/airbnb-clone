import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String, default: null },
    favoriteIds: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  },
  { timestamps: true }
);

export const user = models.User || model("User", userSchema);

const listingSchema = new Schema({
  title: String,
  description: String,
  imageSrc: String,
  category: String,
  currency: String,
  roomCount: Number,
  bathroomCount: Number,
  guestCount: Number,
  location: String,
  userId: String,
  price: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

export const listing = models.Listing || model("Listing", listingSchema);

const reservationSchema = new Schema({
  userId: String,
  listingId: String,
  startDate: String,
  endDate: String,
  totalPrice: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
});

export const reservation =
  models.Reservation || model("Reservation", reservationSchema);
