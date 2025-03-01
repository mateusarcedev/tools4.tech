import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the user who favorites the tool',
    example: 'user-uuid',
  })
  userId: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'The ID of the tool being favorited',
    example: 'tool-uuid',
  })
  toolId: string;
}
