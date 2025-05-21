import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";
import { Region } from "../../region/schemas/region.schema";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  @Prop({ unique: true })
  name: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  regionId: Region;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  })
  districtId: District;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
