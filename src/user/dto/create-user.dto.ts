import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Джон Уик' })
  @Length(2, 100)
  full_name: string;

  @ApiProperty({ example: 'boogeyman' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
