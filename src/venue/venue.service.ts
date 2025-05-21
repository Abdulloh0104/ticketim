import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "../district/schemas/district.schema";
import { Region } from "../region/schemas/region.schema";
import mongoose, { Model } from "mongoose";
import { Venue } from "./schemas/venue.schema";

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}
  async create(createVenueDto: CreateVenueDto) {
    const { regionId, districtId } = createVenueDto;
    if (!mongoose.isValidObjectId(regionId)) {
      throw new BadRequestException("RegionId noto'g'ri");
    }
    const region = await this.regionSchema.findById(regionId); // tashqi kalit
    if (!region) {
      throw new BadRequestException("Bunday region yo'q");
    }

    if (!mongoose.isValidObjectId(districtId)) {
      throw new BadRequestException("districtId noto'g'ri");
    }
    const district = await this.districtSchema.findById(districtId); // tashqi kalit
    if (!district) {
      throw new BadRequestException("Bunday district yo'q");
    }

    return this.venueSchema.create(createVenueDto);
  }

  findAll() {
    return this.venueSchema
      .find()
      .populate("regionId")
      .populate("districtId")
      // .populate("types")
      // .populate("venues");
  }

  findOne(id: string) {
    return this.venueSchema.findById(id);
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.venueSchema.findByIdAndUpdate(id, updateVenueDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venueSchema.findByIdAndDelete(id, { new: true });
  }
}
