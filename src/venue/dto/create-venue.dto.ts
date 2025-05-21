import mongoose from "mongoose";

export class CreateVenueDto {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  schema: string;
  regionId: mongoose.Schema.Types.ObjectId;
  districtId: string;
}
