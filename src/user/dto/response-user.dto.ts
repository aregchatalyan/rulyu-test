import { ApiProperty } from '@nestjs/swagger';

class IUser {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Джон Уик' })
  full_name: string;

  @ApiProperty({ example: 'boogeyman' })
  role: string;

  @ApiProperty({ example: 100 })
  efficiency: number;
}

class UserListResultDto {
  @ApiProperty({ type: [ IUser ] })
  users: IUser[];
}

export class ResponseUserDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: IUser })
  result: IUser;
}

export class ResponseUsersDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: UserListResultDto })
  result: UserListResultDto;
}
