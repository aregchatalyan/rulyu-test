import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get([ 'get', 'get/:userId' ])
  get(
    @Param('userId') userId?: number,
    @Query('role') role?: string
  ) {
    return this.userService.get(userId, role);
  }

  @Patch('/update/:userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(userId, dto);
  }

  @Delete([ '/delete', '/delete/:userId' ])
  delete(
    @Param('userId') userId?: number
  ) {
    return this.userService.delete(userId);
  }
}
