import { Module } from "@nestjs/common";
import { CustomerAddressService } from "./customer_address.service";
import { CustomerAddressController } from "./customer_address.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./schemas/customer_address.schema";
import { District, DistrictSchema } from "../district/schemas/district.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerAddress.name,
        schema: CustomerAddressSchema,
      },
      {
        name: District.name,
        schema: DistrictSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
