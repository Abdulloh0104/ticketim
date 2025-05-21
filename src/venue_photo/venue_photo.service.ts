import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenuePhoto } from "./schemas/venue_photo.schema";
import mongoose, { Model } from "mongoose";
import { Venue } from "../venue/schemas/venue.schema";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name) private venuePhotoSchema: Model<VenuePhoto>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>
  ) {}
  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { venueId } = createVenuePhotoDto;
    if (!mongoose.isValidObjectId(venueId)) {
      throw new BadRequestException("VenueId noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venueId); // tashqi kalit
    if (!venue) {
      throw new BadRequestException("Bunday venue yo'q");
    }

    return this.venuePhotoSchema.create(createVenuePhotoDto);
  }

  findAll() {
    return this.venuePhotoSchema.find().populate("venueId");
  }

  findOne(id: string) {
    return this.venuePhotoSchema.findById(id).populate("venueId");
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoSchema.findByIdAndUpdate(id, updateVenuePhotoDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venuePhotoSchema.findByIdAndDelete(id);
  }
}
