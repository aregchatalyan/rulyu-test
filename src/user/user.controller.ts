import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetUserQueryDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto, ResponseUsersDto } from './dto/response-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: ResponseUserDto })
  @Post('/create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOkResponse({ type: ResponseUsersDto })
  @Get('get')
  getAll(@Query() query: GetUserQueryDto) {
    return this.userService.getAll(query);
  }

  @ApiOkResponse({ type: ResponseUserDto })
  @Get('/get/:userId')
  get(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.get(userId);
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: ResponseUserDto })
  @Patch('/update/:userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.update(userId, dto);
  }

  @ApiOkResponse({ example: { success: true } })
  @Delete('/delete')
  deleteAll() {
    return this.userService.deleteAll();
  }

  @ApiOkResponse({ type: ResponseUserDto })
  @Delete('/delete/:userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
