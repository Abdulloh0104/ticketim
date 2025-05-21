import { IsString, Matches } from "class-validator";

export class CreateEventDto {
  name: string;
  photo: string;
  start_date: Date;

  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "start_time must be in HH:mm format (00:00 to 23:59)",
  })
  start_time: string;

  finish_date: Date;

  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "finish_time must be in HH:mm format (00:00 to 23:59)",
  })
  finish_time: string;
  
  info: string;
  event_type_id: string;
  human_category_id: string;
  venue_id: string;
  lang_id: string;
  release_date: Date;
}
