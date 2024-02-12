import { PartialType } from '@nestjs/swagger';

import { CreateOrderStateDto } from './create-order-state.dto';

export class UpdateOrderStateDto extends PartialType(CreateOrderStateDto) {}
