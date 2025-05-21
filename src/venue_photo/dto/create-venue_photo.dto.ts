import mongoose from "mongoose";

export class CreateVenuePhotoDto {
  url: string;
  venueId: mongoose.Schema.Types.ObjectId;
}
