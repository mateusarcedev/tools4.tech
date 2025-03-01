import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { FavoritesService } from "./favorites.service";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get("check")
  checkFavorite(
    @Query("userId") userId: string,
    @Query("toolId") toolId: string
  ) {
    return this.favoritesService.checkFavorite(parseInt(userId), toolId);
  }

  @Get("user/:userId")
  getFavoritesByUserId(@Param("userId") userId: string) {
    return this.favoritesService.getFavoritesByUserId(userId);
  }

  @Post("toggle")
  toggleFavorite(@Body() body: { userId: number; toolId: string }) {
    return this.favoritesService.toggleFavorite(body.userId, body.toolId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.favoritesService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.favoritesService.remove(id);
  }
}
