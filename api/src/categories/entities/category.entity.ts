import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ description: 'The unique identifier of the category' })
  id: string;

  @ApiProperty({ description: 'The name of the category' })
  name: string;

  @ApiProperty({ description: 'The description of the category' })
  description: string;
}
