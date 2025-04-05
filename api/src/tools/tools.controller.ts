import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) { }

  @Post()
  @ApiBearerAuth()
  create(@Body() createToolDto: CreateToolDto) {
    // Fix: Pass as an array if the service expects an array
    return this.toolsService.create([createToolDto]);
  }

  @Public()
  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(id, updateToolDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.toolsService.remove(id);
  }
}
