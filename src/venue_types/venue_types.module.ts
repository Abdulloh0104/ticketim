import { Module } from '@nestjs/common';
import { VenueTypesService } from './venue_types.service';
import { VenueTypesController } from './venue_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VenueType, VenueTypeSchema } from './schemas/venue_type.schema';
import { Venue, VenueSchema } from '../venue/schemas/venue.schema';
import { Type, TypeSchema } from '../types/schemas/type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VenueType.name, schema: VenueTypeSchema },
      { name: Venue.name, schema: VenueSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
})
export class VenueTypesModule {}
