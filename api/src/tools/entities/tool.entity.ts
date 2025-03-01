import { Tool } from '@prisma/client';

export class ToolEntity implements Tool {
  id: string;
  name: string;
  link: string;
  description: string;
  categoryID: string;
  suggestedBy: string;

  constructor(partial: Partial<ToolEntity>) {
    Object.assign(this, partial);
  }
}
