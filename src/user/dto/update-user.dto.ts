import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Джон Уик' })
  @IsOptional()
  @Length(2, 100)
  full_name: string;

  @ApiProperty({ example: 'boogeyman' })
  @IsOptional()
  @IsString()
  role: string;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
