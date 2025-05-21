import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schema";
import mongoose, { Model } from "mongoose";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}

 async create(createDistrictDto: CreateDistrictDto) {
  const {regionId} =createDistrictDto;
  if (!mongoose.isValidObjectId(regionId)){
    throw new BadRequestException("RegionId noto'g'ri");
  }
  const region= await this.regionSchema.findById(regionId); // tashqi kalit
  if(!region){
    throw new BadRequestException("Bunday region yo'q")
  }

  const district = await this.districtSchema.create(createDistrictDto);
  region.districts.push(district)
  await region.save()
  return district
  }

  findAll() {
    return this.districtSchema.find().populate("regionId");
  }

  findOne(id: string) {
    return this.districtSchema.findById(id).populate("regionId");
  }

 async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    const one = await this.districtSchema.findByIdAndUpdate(id, updateDistrictDto);
    return one; 
  }

  remove(id: string) {
    return this.districtSchema.findByIdAndDelete(id)
  }
}
