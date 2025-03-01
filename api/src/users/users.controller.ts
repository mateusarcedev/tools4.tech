import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createOrUpdate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOrUpdateUser(createUserDto);
  }

  @Get(":githubId")
  findOne(@Param("githubId") githubId: number) {
    return this.usersService.findOne(githubId);
  }

  @Patch(":githubId")
  update(
    @Param("githubId") githubId: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(githubId, updateUserDto);
  }

  @Delete(":githubId")
  remove(@Param("githubId") githubId: number) {
    return this.usersService.remove(githubId);
  }
}
