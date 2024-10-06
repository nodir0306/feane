import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models';
import { UserService } from './user.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Users")
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @ApiOperation({ summary: 'Yangi user yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'User yaratish' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.createUser({ ...payload, image });
  }

  @Delete('/delete/:userId')
  @ApiOperation({ summary: "Userni o'chirish" })
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.service.deleteUser(userId);
  }
}
