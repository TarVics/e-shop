import { Repository } from "typeorm";
import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";

import { I18nLocale } from "../../core/enums";

import { ProductEntity } from "../../refs/entities";
import { ProductsService } from "../../refs/services";

import {
  CreateCartDto,
  UpdateCartDto,
  UpdateCartItemDto,
  ViewCartDto,
  ViewCartItemDto
} from "../dto";
import { CartEntity, CartItemEntity } from "../entities";
import { AuthUser } from "../../auth/entities";
import { AuthRole } from "../../auth/enums";
import { OptionsRefDto } from "../../refs/dto";

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly productsService: ProductsService
  ) {
  }

  /**
   * Sum similar cart product quantities
   * @param items
   */
  sumSimilarProducts<T extends UpdateCartItemDto>(items: Array<T>): Array<T> {
    return items.reduce((acc, val) => {
      const existEl = acc.find((el) => el.product === val.product);
      acc.push(
        existEl ? { ...val, quantity: val.quantity + existEl.quantity } : val
      );
      return acc;
    }, [] as Array<T>);
  }

  /**
   * Convert CartEntity into ViewCartDto
   * @param entity
   * @param locale
   */
  convertEntityToView(entity: CartEntity, locale: I18nLocale): ViewCartDto {
    const items: Array<ViewCartItemDto> = entity.items.map(
      (cartItem: CartItemEntity) => {
        return {
          price: cartItem.price,
          quantity: cartItem.quantity,
          product: this.productsService.makeView(cartItem.product, locale)
        };
      }
    );

    return plainToInstance(
      ViewCartDto,
      { uid: entity.uid, total: entity.total, items },
      { enableImplicitConversion: true }
    );
  }

  /**
   * Save Cart
   * @param prevCart
   * @param newItems
   * @param locale
   */
  protected async saveCartView(
    prevCart: CartEntity,
    newItems: Array<UpdateCartItemDto>,
    locale: I18nLocale
  ): Promise<ViewCartDto> {
    const itemsDto: UpdateCartItemDto[] = this.sumSimilarProducts(newItems);

    const productsUidDto: string[] = itemsDto.map(
      (item: UpdateCartItemDto) => item.product
    );

    const productsDto: ProductEntity[] =
      await this.productsService.findByUidList(productsUidDto);

    productsUidDto.forEach((uid) => {
      if (
        !productsDto.find(
          (productDto: ProductEntity): boolean => productDto.uid === uid
        )
      ) {
        throw new NotFoundException(`Product ${uid} not found`);
      }
    });

    // Elements that exist in DB but do not exist in DTO
    const deleteItems: CartItemEntity[] =
      prevCart.items?.filter(
        (cartItem: CartItemEntity) =>
          !productsDto.find(
            (productDto: ProductEntity): boolean =>
              productDto.id === cartItem.productId
          )
      ) || [];

    const cartItems: Array<CartItemEntity> = [];

    itemsDto.forEach((itemDto: UpdateCartItemDto) => {
      const product = productsDto.find(
        (productDto: ProductEntity): boolean =>
          productDto.uid === itemDto.product
      );

      if (!product) return;

      const prevItem = prevCart.items?.find(
        (cartItem: CartItemEntity): boolean =>
          cartItem.productId === product.id
      );

      if (!prevItem) {
        if (itemDto.quantity) {
          cartItems.push(
            this.cartItemRepository.create({
              cartId: prevCart.id,
              quantity: itemDto.quantity,
              product
            })
          );
        }
      } else if (!itemDto.quantity) {
        deleteItems.push(prevItem);
      } else {
        cartItems.push(
          this.cartItemRepository.create({
            ...prevItem,
            quantity: itemDto.quantity
          })
        );
      }
    });

    const entity: CartEntity = this.cartRepository.create({
      ...prevCart,
      items: cartItems
    });

    if (prevCart.id && deleteItems.length) {
      await this.cartItemRepository.remove(deleteItems);
    }

    entity.generateTotal();

    const cart: CartEntity = await this.cartRepository.save(entity);

    if (prevCart.id) {
      await this.cartRepository.update(cart.id, {}); // updated_at
    }

    const items: Array<ViewCartItemDto> = cart.items.map(
      (cartItem: CartItemEntity) => {
        const product = productsDto.find(
          (productDto: ProductEntity): boolean =>
            productDto.id === cartItem.productId
        );

        if (!product) throw new BadRequestException("Product not found");

        return {
          price: cartItem.price,
          quantity: cartItem.quantity,
          product: this.productsService.makeView(product, locale)
        };
      }
    );

    return plainToInstance(
      ViewCartDto,
      { uid: cart.uid, total: cart.total, items },
      { enableImplicitConversion: true }
    );
  }

  /**
   * Create Cart
   * @param createCartDto
   * @param options
   */
  async createCartView(
    createCartDto: CreateCartDto,
    options: OptionsRefDto
  ): Promise<ViewCartDto> {
    const prevCart: CartEntity = this.cartRepository.create();
    return this.saveCartView(prevCart, createCartDto.items, options.lang);
  }

  /**
   * Update Cart
   * @param updateCartDto
   * @param options
   * @param user
   */
  async updateCartView(
    updateCartDto: UpdateCartDto,
    options: OptionsRefDto,
    user: AuthUser | null = null
  ): Promise<ViewCartDto | null> {
    const prevCart = await this.cartRepository.findOne({
      where: { uid: updateCartDto.uid },
      relations: { items: { product: { images: true } }, order: true }
    });

    if (!prevCart) return null;

    if ((!user || user.role === AuthRole.User) && prevCart.order) {
      throw new ForbiddenException("Order is already created");
    }

    return this.saveCartView(prevCart, updateCartDto.items, options.lang);
  }

  /**
   * Find Cart by uid
   * @param uid
   */
  findCart(uid: string): Promise<CartEntity | null> {
    return this.cartRepository.findOne({
      where: { uid },
      relations: { items: { product: { images: true } } }
    });
  }

  /**
   * Find Cart by uid
   * @param uid
   * @param options
   */
  async findCartView(
    uid: string,
    options: OptionsRefDto
  ): Promise<ViewCartDto | null> {
    const cart = await this.findCart(uid);
    if (!cart) return null;

    const items: Array<ViewCartItemDto> = cart.items.map((item) => ({
      price: item.price,
      quantity: item.quantity,
      product: this.productsService.makeView(item.product, options.lang)
    }));

    return plainToInstance(
      ViewCartDto,
      { uid: cart.uid, total: cart.total, items },
      { enableImplicitConversion: true }
    );
  }

  /**
   * Remove Cart by uid
   * @param uid
   */
  async removeCart(uid: string): Promise<boolean> {
    const entity = await this.cartRepository.findOne({
      where: { uid },
      relations: { order: true }
    });
    if (!entity) return false;

    if (entity.order) {
      throw new ForbiddenException("Order is already created");
    }

    const res: DeleteResult = await this.cartRepository.delete({ uid });
    return !!res.affected;
  }

  /**
   * Remove Cart by id
   * @param id
   */
  async removeById(id: number): Promise<boolean> {
    const res: DeleteResult = await this.cartRepository.delete({ id });
    return !!res.affected;
  }
}
