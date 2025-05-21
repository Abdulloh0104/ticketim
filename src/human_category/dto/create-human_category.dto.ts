import { Transform } from "class-transformer";
import { IsIn, IsString, Matches } from "class-validator";

export class CreateHumanCategoryDto {
  name: string;

  @IsString()
  @Transform(({ value }) =>
    typeof value === "string" ? value.toLowerCase() : value
  )
  @IsIn(["male", "female", "all"], {
    message: 'gender must be either "male", "female", or "all"',
  })
  gender: string;

  start_age: number;
  finish_age: number;
}
