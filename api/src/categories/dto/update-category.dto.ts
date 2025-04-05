import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: 'The name of the category', example: 'Frontend', required: false })
  name?: string;

  @ApiProperty({ description: 'The description of the category', example: 'Tools for frontend development', required: false })
  description?: string;
}
