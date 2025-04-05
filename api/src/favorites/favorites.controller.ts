import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get('user/:userId')
  @ApiBearerAuth()
  getFavoritesByUserId(@Param('userId') userId: string) {
    return this.favoritesService.getFavoritesByUserId(userId);
  }

  @Post('toggle')
  @ApiBearerAuth()
  toggleFavorite(@Body() body: { userId: number; toolId: string }) {
    return this.favoritesService.toggleFavorite(body.userId, body.toolId);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
