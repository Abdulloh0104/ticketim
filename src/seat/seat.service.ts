import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Venue } from "../venue/schemas/venue.schema";
import mongoose, { Model } from "mongoose";
import { SeatType } from "../seat_type/schemas/seat_type.schema";
import { Seat } from "./schemas/seat.schema";

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatSchema: Model<Seat>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(SeatType.name) private seatTypeSchema: Model<SeatType>
  ) {}
  async create(createSeatDto: CreateSeatDto) {
    const { venueId, seat_type_id } = createSeatDto;
    if (!mongoose.isValidObjectId(venueId)) {
      throw new BadRequestException("VenueId noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venueId); // tashqi kalit
    if (!venue) {
      throw new BadRequestException("Bunday venue yo'q");
    }

    if (!mongoose.isValidObjectId(seat_type_id)) {
      throw new BadRequestException("seat_type_id noto'g'ri");
    }
    const seatType = await this.seatTypeSchema.findById(seat_type_id); // tashqi kalit
    if (!seatType) {
      throw new BadRequestException("Bunday seat type yo'q");
    }

    return this.seatSchema.create(createSeatDto);
  }

  findAll() {
    return this.seatSchema
    .find()
    .populate("seat_type_id")
    .populate("venueId");
  }

  findOne(id: string) {
    return this.seatSchema.findById(id)
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatSchema.findByIdAndUpdate(id,updateSeatDto,{new:true})
  }

  remove(id: string) {
    return this.seatSchema.findByIdAndDelete(id)
  }
}
