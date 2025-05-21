export class CreateBookingDto {
  created_at: Date;
  finished: Date;
  discount_coupon: string;
  status: string;
  cardId: string;
  paymentMethodId: string;
  deliveryMethodId: string;
}
