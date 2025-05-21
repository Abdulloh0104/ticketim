import { IsMongoId } from "class-validator";

export class CreateVenueTypeDto {
  @IsMongoId()
  venueId: string;

  @IsMongoId()
  typeId: string;
}
