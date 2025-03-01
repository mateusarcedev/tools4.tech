import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

describe('SuggestionsController', () => {
  let controller: SuggestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
      providers: [SuggestionsService],
    }).compile();

    controller = module.get<SuggestionsController>(SuggestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
