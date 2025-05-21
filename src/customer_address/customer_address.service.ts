import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { CustomerAddress } from "./schemas/customer_address.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "../district/schemas/district.schema";
import { Region } from "../region/schemas/region.schema";
import { CreateDistrictDto } from "../district/dto/create-district.dto";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private customerAddressSchema: Model<CustomerAddress>,
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}
  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const { regionId } = createCustomerAddressDto;
    if (!mongoose.isValidObjectId(regionId)) {
      throw new BadRequestException("RegionId noto'g'ri");
    }
    const region = await this.regionSchema.findById(regionId); // tashqi kalit
    if (!region) {
      throw new BadRequestException("Bunday region yo'q");
    }

    const { districtId } = createCustomerAddressDto;
    if (!mongoose.isValidObjectId(districtId)) {
      throw new BadRequestException("v noto'g'ri");
    }
    const district = await this.districtSchema.findById(districtId); // tashqi kalit
    if (!district) {
      throw new BadRequestException("Bunday district yo'q");
    }

    return this.customerAddressSchema.create(createCustomerAddressDto)
  }

  findAll() {
    return this.customerAddressSchema
      .find()
      .populate("regionId")
      .populate("districtId");
  }

  findOne(id: string) {
    return this.customerAddressSchema.findById(id)
  }

 async update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    const one = await this.customerAddressSchema.findByIdAndUpdate(
      id,
      updateCustomerAddressDto
    );
    return one;  
  }

  remove(id: string) {
    return this.customerAddressSchema.findByIdAndDelete(id)
  }
}
