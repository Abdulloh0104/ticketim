import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "./schemas/booking.schema";
import mongoose, { Model } from "mongoose";
import { Card } from "../card/schemas/card.schema";
import { PaymentMethod } from "../payment_method/schemas/payment_method.schema";
import { DeliveryMethod } from "../delivery_method/schemas/delivery_method.schema";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingSchema: Model<Booking>,
    @InjectModel(Card.name) private cardSchema: Model<Card>,
    @InjectModel(PaymentMethod.name)
    private paymentMethodSchema: Model<PaymentMethod>,
    @InjectModel(DeliveryMethod.name)
    private deliveryMethodSchema: Model<DeliveryMethod>
  ) {}
  async create(createBookingDto: CreateBookingDto) {
    const { cardId, paymentMethodId, deliveryMethodId } = createBookingDto;
    if (!mongoose.isValidObjectId(cardId)) {
      throw new BadRequestException("CardId noto'g'ri");
    }
    const card = await this.cardSchema.findById(cardId); // tashqi kalit
    if (!card) {
      throw new BadRequestException("Bunday card yo'q");
    }

    if (!mongoose.isValidObjectId(paymentMethodId)) {
      throw new BadRequestException("paymentMethodId noto'g'ri");
    }
    const paymentMethod =
      await this.paymentMethodSchema.findById(paymentMethodId); // tashqi kalit
    if (!paymentMethod) {
      throw new BadRequestException("Bunday paymentMethod yo'q");
    }

    if (!mongoose.isValidObjectId(deliveryMethodId)) {
      throw new BadRequestException("deliveryMethodId noto'g'ri");
    }
    const deliveryMethod =
      await this.deliveryMethodSchema.findById(deliveryMethodId); // tashqi kalit
    if (!deliveryMethod) {
      throw new BadRequestException("Bunday deliveryMethod yo'q");
    }

    return this.bookingSchema.create(createBookingDto);
  }

  findAll() {
    return this.bookingSchema
      .find()
      .populate("cardId")
      .populate("deliveryMethodId")
      .populate("paymentMethodId");
  }

  findOne(id: string) {
    return this.bookingSchema.findById(id)
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingSchema.findByIdAndUpdate(id,updateBookingDto,{new:true})  }

  remove(id: string) {
    return this.bookingSchema.findByIdAndDelete(id)
  }
}
