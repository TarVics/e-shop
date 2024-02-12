import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { DataSource, Repository } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { ObjectType } from "typeorm/common/ObjectType";
import { Cache } from "cache-manager";
import ms from "ms";

import { AppConfig } from "../../app/app.options";
import { I18nLocale } from "../../core/enums";

import {
  ViewAllRefsDto,
  ViewProductsSummaryDto,
  ViewCategoryDto,
  ViewCollectionDto,
  ViewColorDto,
  ViewCurrencyDto,
  ViewPaymentMethodDto,
  ViewRefDto,
  ViewShippingMethodDto,
  ViewOrderStateDto
} from "../dto";
import {
  BrandEntity,
  CategoryEntity,
  CollectionBannerEntity,
  CollectionEntity,
  ColorEntity,
  CurrencyEntity,
  GenderEntity,
  ModelEntity,
  OrderStateEntity,
  PaymentMethodEntity,
  ShippingMethodEntity,
  SizeEntity
} from "../entities";
import { BannerKind, SortKindEnum } from "../enums";
import { ProductsService } from "./products.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RefsService {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly app: ConfigType<typeof AppConfig>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly dataSource: DataSource,
    private readonly productsService: ProductsService
  ) {
  }

  /**
   * Read directory by its type
   * @param type
   * @param locale
   */
  async readRef<Entity extends ObjectLiteral>(
    type: ObjectType<Entity>,
    locale: I18nLocale
  ): Promise<any> {
    const repository: Repository<Entity> = this.dataSource.getRepository(type);
    const selection: string[] = ["t.id AS id"];
    const where: ObjectLiteral = {};
    const lang: string = locale.slice(0, 2);

    switch (type.prototype) {
      case CategoryEntity.prototype:
        selection.push(`t.name_${lang} AS name`);
        selection.push("t.parent_id AS parentId");
        selection.push("t.collection_id AS collectionId");
        selection.push("t.banner_image AS bannerImage");
        selection.push(`t.banner_name_${lang} AS bannerName`);

        const records = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        const result: any[] = [];

        records.forEach((item) => {
          if (item.parentId) {
            const parent = records.find((value) => value.id === item.parentId);
            if (parent) {
              if (!parent.children) {
                parent.children = [];
              }

              parent.children.push(item);
            }
          } else {
            result.push(item);
          }
        });

        return plainToInstance(ViewCategoryDto, result, {
          enableImplicitConversion: true
        });

      // break;
      case CollectionEntity.prototype:
        const bannersRepository: Repository<CollectionBannerEntity> =
          this.dataSource.getRepository(CollectionBannerEntity);

        const banners: CollectionBannerEntity[] =
          await bannersRepository.find();

        selection.push(`t.name_${lang} AS name`);
        selection.push(`t.description_${lang} AS description`);
        selection.push("t.is_hot AS isHot");

        const collections = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        collections.forEach((item) => {
          item.banners = banners
            .filter((banner) => banner.collectionId === item.id)
            .map(({ banner, kind }) => ({ banner, kind }));
        });

        return plainToInstance(ViewCollectionDto, collections, {
          enableImplicitConversion: true
        });

      case ColorEntity.prototype:
        selection.push(`t.name_${lang} AS name`);
        selection.push("t.color AS color");

        const colors = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        return plainToInstance(ViewColorDto, colors, {
          enableImplicitConversion: true
        });

      case CurrencyEntity.prototype:
        selection.push("t.name AS name");
        selection.push("t.sign AS sign");
        selection.push(`t.tail_${lang} AS tail`);
        selection.push("t.rate AS rate");

        const currencies = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        return plainToInstance(ViewCurrencyDto, currencies, {
          enableImplicitConversion: true
        });

      case OrderStateEntity.prototype:
        selection.push(`t.name_${lang} AS name`);
        selection.push("t.code AS code");

        const states = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        return plainToInstance(ViewOrderStateDto, states, {
          enableImplicitConversion: true
        });

      case PaymentMethodEntity.prototype:
        selection.push("t.method AS method");
        selection.push(`t.name_${lang} AS name`);
        selection.push(`t.info_${lang} AS info`);
        Object.assign(where, { active: true });

        const payMethods = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        return plainToInstance(ViewPaymentMethodDto, payMethods, {
          enableImplicitConversion: true
        });

      case ShippingMethodEntity.prototype:
        selection.push("t.method AS method");
        selection.push("t.price AS price");
        selection.push(`t.name_${lang} AS name`);
        selection.push(`t.info_${lang} AS info`);
        Object.assign(where, { active: true });

        const shipMethods = await repository
          .createQueryBuilder("t")
          .select(selection)
          .where(where)
          .getRawMany();

        return plainToInstance(ViewShippingMethodDto, shipMethods, {
          enableImplicitConversion: true
        });

      default:
        selection.push(`t.name_${lang} AS name`);
    }

    const items = repository
      .createQueryBuilder("t")
      .select(selection)
      .where(where)
      .getRawMany();

    return plainToInstance(ViewRefDto, items, {
      enableImplicitConversion: true
    });
  }

  /**
   * Read collection banner images
   */
  async readBanners(): Promise<
    Omit<ViewProductsSummaryDto, "dealsProducts" | "latestProducts" | "picked">
  > {
    const repository: Repository<CollectionBannerEntity> =
      this.dataSource.getRepository(CollectionBannerEntity);

    const records: Array<{ id: number; kind: BannerKind }> = await repository
      .createQueryBuilder("t")
      .select(["t.id AS id, t.kind AS kind"])
      .getRawMany();

    const fieldNames: Record<BannerKind, string> = {
      [BannerKind.homeLarge]: "homeCollectionLarge",
      [BannerKind.homeNormal]: "homeCollectionNormal",
      [BannerKind.dealsColumn]: "dealsCollectionColumn",
      [BannerKind.hotLarge]: "hotCollectionLarge",
      [BannerKind.hotNormal]: "hotCollectionNormal",
      [BannerKind.latestColumn]: "latestCollectionColumn",
      [BannerKind.navigationColumn]: "navigationColumn",
      [BannerKind.navigationRow]: "navigationRow"
    };

    const result: Record<string, Array<number>> = {
      homeCollectionLarge: [],
      homeCollectionNormal: [],
      dealsCollectionColumn: [],
      hotCollectionLarge: [],
      hotCollectionNormal: [],
      latestCollectionColumn: [],
      navigationColumn: [],
      navigationRow: []
    };

    records.forEach((item) => result[fieldNames[item.kind]].push(item.id));

    return plainToInstance(ViewProductsSummaryDto, result, {
      enableImplicitConversion: true
    });
  }

  async findAll(locale: I18nLocale): Promise<ViewAllRefsDto> {
    const cacheKey: string = "refs?" + locale;
    const value = await this.cacheManager.get(cacheKey);

    if (value) {
      Logger.log("Reading cache value", "HTTP");
      return value as ViewAllRefsDto;
    }

    const [
      brands,
      categories,
      collections,
      colors,
      currencies,
      genders,
      models,
      orderStates,
      paymentMethods,
      shippingMethods,
      sizes,
      banners,
      dealsProducts,
      latestProducts,
      picked
    ] = await Promise.all([
      this.readRef(BrandEntity, locale),
      this.readRef(CategoryEntity, locale),
      this.readRef(CollectionEntity, locale),
      this.readRef(ColorEntity, locale),
      this.readRef(CurrencyEntity, locale),
      this.readRef(GenderEntity, locale),
      this.readRef(ModelEntity, locale),
      this.readRef(OrderStateEntity, locale),
      this.readRef(PaymentMethodEntity, locale),
      this.readRef(ShippingMethodEntity, locale),
      this.readRef(SizeEntity, locale),
      this.readBanners(),
      // Обираємо товари з максимальною знижкою. Найбільша "HOT" знижка буде у позиції 0
      this.productsService.findSummaryView(SortKindEnum.SALE, locale),
      // Обираємо товари, які були додані пізніше всього
      this.productsService.findSummaryView(SortKindEnum.POSITION, locale),
      // Обираємо товари, які мають найбільший рейтинг
      this.productsService.findSummaryView(SortKindEnum.RATING, locale)
    ]);

    const summary: ViewProductsSummaryDto = {
      ...banners,
      dealsProducts,
      latestProducts,
      picked
    };

    const res: ViewAllRefsDto = {
      brands,
      categories,
      collections,
      colors,
      currencies,
      genders,
      models,
      orderStates,
      paymentMethods,
      shippingMethods,
      sizes,
      summary
    };

    const cacheTTL: number = ms(this.app.refsTTL);

    Logger.log(`Setting cache value for ${cacheTTL / 1000} sec`, "HTTP");
    await this.cacheManager.set(cacheKey, res, cacheTTL);

    return res;
  }

  /**
   * Read order states
   * @param locale
   */
  async findOrderStates(locale: I18nLocale): Promise<ViewRefDto> {
    const cacheKey: string = "order-state?" + locale;
    const value = await this.cacheManager.get(cacheKey);

    if (value) {
      Logger.log("Reading cache value", "HTTP");
      return value as ViewRefDto;
    }

    const res = await this.readRef(OrderStateEntity, locale);

    const cacheTTL: number = ms(this.app.refsTTL);

    Logger.log(`Setting cache value for ${cacheTTL / 1000} sec`, "HTTP");
    await this.cacheManager.set(cacheKey, res, cacheTTL);

    return res;
  }
}
