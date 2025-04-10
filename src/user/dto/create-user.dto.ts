import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @Length(2, 20)
  full_name: string;

  @IsString()
  role: string;

  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
