import { PartialType } from '@nestjs/swagger';
import { CreateSuggestionDto } from './create-suggestion.dto';

export class UpdateSuggestionDto extends PartialType(CreateSuggestionDto) {}
