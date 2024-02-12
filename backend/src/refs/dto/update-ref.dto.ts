import { PartialType } from '@nestjs/swagger';

import { CreateRefDto } from './create-ref.dto';

export class UpdateRefDto extends PartialType(CreateRefDto) {}
