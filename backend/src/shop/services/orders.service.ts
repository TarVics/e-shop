import { plainToInstance } from 'class-transformer';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { PageDto, PageMetaDto, PageOptionsDto } from '../../core/dtos';
import { OrderEnum, I18nLocale } from '../../core/enums';
import { getApiModelProperties } from '../../core/utils';

import { AuthUser } from '../../auth/entities';
import { AuthRole } from '../../auth/enums';
import { AuthUsersService } from '../../auth/services';

import { ProfileService } from '../../profile/profile.service';

import { MailService } from '../../mail/mail.service';

import {
  OptionsRefDto,
  ViewAllRefsDto,
  ViewCategoryDto,
  ViewCollectionDto,
  ViewColorDto,
  ViewCurrencyDto,
  ViewOrderStateDto,
  ViewPaymentMethodDto,
  ViewRefDto,
  ViewShippingMethodDto,
} from '../../refs/dto';
import { OrderStateEnum, SortOrderEnum } from '../../refs/enums';
import { RefsService } from '../../refs/services';

import {
  CreateOrderDto,
  OptionsOrderPageDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
  ViewAllCartDto,
  ViewAllCartItemDto,
  ViewAllOrderDto,
  ViewAllProductDto,
  ViewCartItemDto,
  ViewOrderDto,
} from '../dto';
import { CartEntity, OrderEntity } from '../entities';

import { CartsService } from './carts.service';
import { ViewProfileDto } from "../../profile/dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly usersService: AuthUsersService,
    private readonly cartsService: CartsService,
    private readonly mailService: MailService,
    private readonly profileService: ProfileService,
    private readonly refsService: RefsService,
  ) {}

  /**
   * Convert OrderEntity into ViewOrderDto
   * @param entity
   * @param locale
   */
  convertEntityToView(entity: OrderEntity, locale: I18nLocale): ViewOrderDto {
    const view: Record<string, any> = {};

    getApiModelProperties(ViewOrderDto).forEach((name: string): void => {
      view[name] =
        name === 'cart'
          ? this.cartsService.convertEntityToView(entity[name], locale)
          : entity[name as keyof OrderEntity];
    });

    return plainToInstance(ViewOrderDto, view, {
      enableImplicitConversion: true,
    });
  }

  /**
   * Make OrderEntity from UpdateOrderDto
   * @param updateOrderDto
   * @param cart
   * @param user
   * @param stateId
   * @param id
   */
  makeEntity(
    updateOrderDto: UpdateOrderDto,
    cart: CartEntity,
    user: AuthUser,
    stateId: number,
    id?: number,
  ): OrderEntity {
    return this.orderRepository.create({
      ...updateOrderDto,
      id,
      cart,
      user,
      stateId,
    });
  }

  /**
   * Find OrderEntity by uid
   * @param uid
   * @param user
   */
  async findOneEntity(
    uid: string,
    user: AuthUser,
  ): Promise<OrderEntity | null> {
    return await this.orderRepository.findOne({
      where: user.role === AuthRole.User ? { uid, userId: user.id } : { uid },
      relations: { cart: { items: { product: true } }, state: true },
    });
  }

  /**
   * Get price in selected currency
   * @param currency
   * @param price
   */
  getCurrencyPrice(currency: ViewCurrencyDto, price: number): number {
    return currency ? price / currency.rate : price;
  }

  /**
   * Get price text in selected currency
   * @param currency
   * @param price
   */
  getCurrencyText(currency: ViewCurrencyDto | null, price: number): string {
    if (currency) {
      const text = (price / currency.rate).toFixed(2);
      return currency.tail ? text + ' ' + currency.tail : currency.sign + text;
    } else {
      return price.toFixed(2);
    }
  }

  /**
   * Send email notification on order create
   * @param user
   * @param order
   * @param refs
   * @param options
   */
  async createOrderNotify(
    user: AuthUser,
    order: ViewOrderDto,
    refs: ViewAllRefsDto,
    options: OptionsRefDto,
  ): Promise<void> {
    const currency: ViewCurrencyDto =
      refs.currencies.find((ref) => ref.id === options.curr) ||
      refs.currencies[0];

    const items: Array<ViewAllCartItemDto> = order.cart.items.map(
      (item: ViewCartItemDto): ViewAllCartItemDto => {
        const color = refs.colors.find(
          (ref: ViewColorDto): boolean => ref.id === item.product.colorId,
        );

        const size = refs.sizes.find(
          (ref: ViewRefDto): boolean => ref.id === item.product.sizeId,
        );

        const category = refs.categories.find(
          (ref: ViewCategoryDto): boolean => ref.id === item.product.categoryId,
        );

        const model = refs.models.find(
          (ref: ViewRefDto): boolean => ref.id === item.product.modelId,
        );

        const collection = refs.collections.find(
          (ref: ViewCollectionDto): boolean =>
            ref.id === item.product.collectionId,
        );

        const brand = refs.brands.find(
          (ref: ViewRefDto): boolean => ref.id === item.product.brandId,
        );

        const gender = refs.genders.find(
          (ref: ViewRefDto): boolean => ref.id === item.product.genderId,
        );

        const product: ViewAllProductDto = {
          uid: item.product.uid,
          name: item.product.name,
          color,
          size,
          quantity: item.product.quantity,
          category,
          model,
          collection,
          brand,
          gender,
          price: item.product.price,
          sale: item.product.sale,
          saleStop: item.product.saleStop,
          rating: item.product.rating,
          isNew: item.product.isNew,
          brief: item.product.brief,
          description: item.product.description,
          details: item.product.details,
          imageColumn: item.product.imageColumn,
        };

        return {
          price: this.getCurrencyText(currency, item.price),
          quantity: item.quantity,
          product,
        };
      },
    );

    // refs.currencies.

    const cart: ViewAllCartDto = {
      uid: order.cart.uid,
      total: this.getCurrencyText(currency, order.cart.total),
      items,
    };

    const profile: ViewProfileDto = await this.profileService.findOneById(user);

    const shipping = refs.shippingMethods.find(
      (ref: ViewShippingMethodDto): boolean => ref.id === order.shippingId,
    );

    const payment = refs.paymentMethods.find(
      (ref: ViewPaymentMethodDto): boolean => ref.id === order.paymentId,
    );

    const state = refs.orderStates.find(
      (ref: ViewOrderStateDto): boolean => ref.id === order.stateId,
    );

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const allOrder: ViewAllOrderDto = {
      // id: order.id.toString(),
      uid: order.uid,
      zipCode: order.zipCode,
      country: order.country,
      city: order.city,
      address: order.address,
      addressFull: [order.zipCode, order.city, order.address].join(', '),
      shipping,
      shippingPrice: this.getCurrencyText(currency, shipping?.price || 0),
      payment,
      cart,
      state,
      createdAt: order.createdAt.toLocaleDateString(options.lang, dateOptions),
      updatedAt: order.updatedAt.toLocaleDateString(options.lang, dateOptions),
    };

    const context: ObjectLiteral = {
      options,
      profile: {
        ...profile,
        fullName:
          profile.firstName && profile.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : profile.firstName
            ? profile.firstName
            : profile.lastName,
      },
      order: allOrder,
    };

    this.mailService.sendOrderResult(user, true, context);

    const operators: AuthUser[] = await this.usersService.findByRole(
      AuthRole.Operator,
    );

    operators.forEach((operator) =>
      this.mailService.sendOrderResult(operator, false, context),
    );
  }

  /**
   * Create Order item
   * @param user
   * @param createOrderDto
   * @param options
   */
  async create(
    user: AuthUser,
    createOrderDto: CreateOrderDto,
    options: OptionsRefDto,
  ): Promise<ViewOrderDto | null> {
    const { cart: cartUid, ...dto } = createOrderDto;
    const cart = await this.cartsService.findCart(cartUid);

    if (!cart) return null;

    const refs: ViewAllRefsDto = await this.refsService.findAll(options.lang);

    const state = refs.orderStates.find(
      (item: ViewOrderStateDto): boolean => item.code === OrderStateEnum.NEW,
    );

    if (!state) {
      throw new BadRequestException('State is not found');
    }

    const entity: OrderEntity = this.makeEntity(dto, cart, user, state.id);

    try {
      const res: OrderEntity = await this.orderRepository.save(entity);
      const order: ViewOrderDto = this.convertEntityToView(res, options.lang);

      await this.createOrderNotify(user, order, refs, options);

      return order;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Order is already registered');
      }
      throw e;
    }
  }

  /**
   * Read all Order items
   * @param options
   * @param user
   */
  public async findAll(
    options: OptionsOrderPageDto,
    user: AuthUser,
  ): Promise<PageDto<ViewOrderDto>> {
    const pageOptionsDto: PageOptionsDto = new PageOptionsDto({
      order:
        options.order === SortOrderEnum.DESC ? OrderEnum.DESC : OrderEnum.ASC,
      page: options.page,
      take: (options.take + 1) * 10,
    });

    const findOptions: FindManyOptions<OrderEntity> = {
      relations: { cart: { items: { product: true } } },
      where: { userId: user.id },
    };

    const itemCount = await this.orderRepository.count(findOptions);
    const entities = await this.orderRepository.find({
      ...findOptions,
      order: { createdAt: pageOptionsDto.order },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(
      plainToInstance(
        ViewOrderDto,
        entities.map((entity: OrderEntity) =>
          this.convertEntityToView(entity, options.lang),
        ),
        { enableImplicitConversion: true },
      ),
      pageMetaDto,
    );
  }

  /**
   * Read Order item by uid
   * @param uid
   * @param user
   * @param options
   */
  async findOne(
    uid: string,
    user: AuthUser,
    options: OptionsRefDto,
  ): Promise<ViewOrderDto | null> {
    const entity = await this.findOneEntity(uid, user);
    return entity ? this.convertEntityToView(entity, options.lang) : null;
  }

  /**
   * Update Order item by uid
   * @param uid
   * @param user
   * @param updateOrderDto
   * @param options
   */
  async update(
    uid: string,
    user: AuthUser,
    updateOrderDto: UpdateOrderDto,
    options: OptionsRefDto,
  ): Promise<ViewOrderDto | null> {
    const prevEntity = await this.findOneEntity(uid, user);

    if (!prevEntity) return null;

    if (prevEntity.state.code !== OrderStateEnum.NEW) {
      throw new ForbiddenException('Order is already in work!');
    }

    const entity: OrderEntity = this.makeEntity(
      updateOrderDto,
      prevEntity.cart,
      prevEntity.user,
      prevEntity.stateId,
      prevEntity.id,
    );

    const res: UpdateResult = await this.orderRepository.update(
      prevEntity.id,
      entity,
    );

    return res.affected ? this.convertEntityToView(entity, options.lang) : null;
  }

  /**
   * Update Order state by uid
   * @param uid
   * @param user
   * @param updateOrderStatusDto
   * @param options
   */
  async updateState(
    uid: string,
    user: AuthUser,
    updateOrderStatusDto: UpdateOrderStatusDto,
    options: OptionsRefDto,
  ): Promise<ViewOrderDto | null> {
    const prevEntity = await this.findOneEntity(uid, user);

    if (!prevEntity) return null;

    if (
      [OrderStateEnum.CANCELLED, OrderStateEnum.DONE].includes(
        prevEntity.state.code,
      )
    ) {
      throw new ForbiddenException('Order is already completed!');
    }

    const refs: ViewAllRefsDto = await this.refsService.findAll(options.lang);

    const state = refs.orderStates.find(
      (item: ViewRefDto): boolean => item.id === updateOrderStatusDto.stateId,
    );

    if (!state) {
      throw new BadRequestException('Order state is not exists!');
    }

    const entity: OrderEntity = this.makeEntity(
      {},
      prevEntity.cart,
      prevEntity.user,
      state.id,
      prevEntity.id,
    );

    const res: UpdateResult = await this.orderRepository.update(
      prevEntity.id,
      entity,
    );

    return res.affected ? this.convertEntityToView(entity, options.lang) : null;
  }

  /**
   * Remove Order item by uid
   * @param uid
   * @param user
   */
  async remove(uid: string, user: AuthUser): Promise<boolean> {
    return await this.orderRepository.manager.transaction(
      async (): Promise<boolean> => {
        const entity = await this.findOneEntity(uid, user);
        if (!entity) return false;

        if (
          ![OrderStateEnum.CANCELLED, OrderStateEnum.DONE].includes(
            entity.state.code,
          )
        ) {
          throw new ForbiddenException('Order is still in progress!');
        }

        const res: DeleteResult = await this.orderRepository.delete(entity.id);

        if (!res.affected) return false;

        return this.cartsService.removeById(entity.cartId);
      },
    );
  }
}
