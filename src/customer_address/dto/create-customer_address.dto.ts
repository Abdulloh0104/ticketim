import mongoose from "mongoose";

export class CreateCustomerAddressDto {
  name: string;

  street: string;

  house: string;

  flat: string;

  location: string;

  post_index: string;

  info: string;

  regionId: mongoose.Schema.Types.ObjectId;

  districtId: mongoose.Schema.Types.ObjectId;
}
