import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category', example: 'Frontend' })
  name: string;

  @ApiProperty({ description: 'The description of the category', example: 'Tools for frontend development' })
  description: string;
}
