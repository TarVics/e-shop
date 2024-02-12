import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { ProfileModule } from '../profile/profile.module';
import { RefsModule } from '../refs/refs.module';

import {
  CartEntity,
  CartItemEntity,
  OrderEntity,
  ReviewEntity,
} from './entities';
import {
  CartsController,
  OrdersController,
  ProductsController,
  ReviewsController,
} from './controllers';
import { CartsService, OrdersService, ReviewsService } from './services';

@Module({
  imports: [
    AuthModule,
    MailModule,
    ProfileModule,
    RefsModule,
    TypeOrmModule.forFeature([
      CartEntity,
      CartItemEntity,
      OrderEntity,
      ReviewEntity,
    ]),
  ],
  controllers: [
    CartsController,
    OrdersController,
    ProductsController,
    ReviewsController,
  ],
  providers: [CartsService, OrdersService, ReviewsService],
})
export class ShopModule {}
