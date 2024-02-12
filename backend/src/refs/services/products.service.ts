import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository, SelectQueryBuilder } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { plainToInstance } from "class-transformer";

import { PageDto, PageMetaDto, PageOptionsDto } from "../../core/dtos";
import { OrderEnum, I18nLocale } from "../../core/enums";
import { getApiModelProperties } from "../../core/utils";

import { PageTakeEnum } from "../enums";

import {
  CreateProductDto,
  OptionsProductsPageDto,
  UpdateProductDto,
  UpdateProductImageColumnDto,
  ViewProductDto, ViewProductQuickDto
} from "../dto";
import { SortKindEnum, SortOrderEnum } from "../enums";
import { ProductEntity, ProductImageEntity } from "../entities";

@Injectable()
export class ProductsService {
  public static readonly FILE_DIRECTORY: string = "./files/products";
  public static readonly IMAGE_MASK: RegExp =
    // /^(?:column|main|thumb)-[0-9,a-f]{15,20}\.(?:jpg|jpeg|png|gif)$/gm;
    new RegExp("^(?:column|main|thumb)-[0-9,a-f]{15,20}\\.(?:jpg|jpeg|png|gif)$");

  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {
  }

  /**
   * Make ViewProductDto from ProductEntity
   * @param product
   * @param locale
   * @param byModel
   */
  makeView(
    product: ProductEntity,
    locale: I18nLocale = I18nLocale.en_US,
    byModel: ProductEntity[] = []
  ): ViewProductDto {
    const lang: string = locale.slice(0, 2);

    const view: Record<string, any> = {};

    getApiModelProperties(ViewProductDto)
      .forEach((name: string): void => {
        if (name === "images" && Array.isArray(product.images)) {
          view[name] = product.images.map((image) => ({
            imageMain: image.imageMain,
            imageThumb: image.imageThumb
          }));
        } else {
          const key: keyof ProductEntity = [
            "name",
            "brief",
            "description",
            "details"
          ].includes(name)
            ? ((name + "_" + lang) as keyof ProductEntity)
            : (name as keyof ProductEntity);

          view[name] = product[key];
        }
      });

    if (byModel && byModel.length) {
      view.byModel = byModel.map(product => this.makeQuickView(product, locale));
    }

    return plainToInstance(ViewProductDto, view, { enableImplicitConversion: true });
  }

  /**
   * Make ViewProductQuickDto from ProductEntity
   * @param product
   * @param locale
   */
  makeQuickView(
    product: ProductEntity,
    locale: I18nLocale = I18nLocale.en_US
  ): ViewProductQuickDto {
    const lang: string = locale.slice(0, 2);

    const view: Record<string, any> = {};

    getApiModelProperties(ViewProductQuickDto)
      .forEach((name: string): void => {
        const key: keyof ProductEntity =
          name === "name" ?
            ((name + "_" + lang) as keyof ProductEntity) :
            (name as keyof ProductEntity);

        view[name] = product[key];
      });

    return plainToInstance(ViewProductQuickDto, view, { enableImplicitConversion: true });
  }

  /**
   * Read Product id from uid
   * @param uid
   */
  async findIdByUid(uid: string): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder("t");

    queryBuilder
      .select(["t.`uid`, t.`id`"])
      .where("t.uid = :uid", { uid: uid });

    const result = await queryBuilder.getRawOne();

    return result ? result.id : null;
  }

  /**
   * Read Product id from uid list
   * @param uid
   */
  async findByUidList(uid: Array<string>): Promise<Array<ProductEntity>> {
    if (!Array.isArray(uid) || !uid.length) return [];

    // return this.repository.findBy({ uid: In(uid) });
    return this.repository.find({
      where: { uid: In(uid) },
      relations: { images: true }
    });
  }

  /**
   * Create Product item
   * @param createProductDto
   */
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const res = await this.repository.save(createProductDto);
    return this.repository.create(res);
  }

  /**
   * Read all Editable Product items
   * @param pageOptionsDto
   */
  public async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ProductEntity>> {
    const queryBuilder = this.repository.createQueryBuilder("t");

    queryBuilder
      .orderBy("t.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto
    });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Read Product item by id
   * @param id
   */
  findOne(id: number): Promise<ProductEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["images"]
    });
  }

  /**
   * Update Product item by id
   * @param id
   * @param updateProductDto
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto | UpdateProductImageColumnDto
  ): Promise<ProductEntity | null> {
    const res: UpdateResult = await this.repository.update(
      { id },
      updateProductDto
    );
    return res.affected
      ? this.repository.create({ ...updateProductDto, id })
      : null;
  }

  /**
   * Remove Product item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.repository.delete(id);
    return !!res.affected;
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Get Query Builder for Product Items Search
   * @param productsPageOptionsDto
   */
  findQueryBuilder(productsPageOptionsDto: OptionsProductsPageDto): {
    builder: SelectQueryBuilder<ProductEntity>;
    options: PageOptionsDto;
  } {
    const queryBuilder = this.repository.createQueryBuilder("t");
    const locale: I18nLocale = productsPageOptionsDto.lang || I18nLocale.en_US;
    const lang: string = locale.slice(0, 2);

    const selection: string[] = getApiModelProperties(ViewProductDto)
      .filter((name) => name !== "images")
      .map((name) =>
        ["name", "brief", "description", "details"].includes(name)
          ? `t.${name}_${lang} AS ${name}`
          : `t.${name} AS ${name}`
      );

    if (productsPageOptionsDto.query) {
      queryBuilder.andWhere(
        `MATCH(name_${lang}, brief_${lang}, description_${lang}, details_${lang}) ` +
        "AGAINST (:query IN NATURAL LANGUAGE MODE)",
        { query: productsPageOptionsDto.query }
      );
    }

    if (productsPageOptionsDto.sale) {
      queryBuilder.andWhere(
        "t.sale > 0 and (t.sale_stop is null or t.sale_stop >= CURRENT_TIMESTAMP)"
      );
    }

    if (productsPageOptionsDto.category) {
      queryBuilder.andWhere("t.category_id = :category", {
        category: productsPageOptionsDto.category
      });
    }

    if (productsPageOptionsDto.collection) {
      queryBuilder.andWhere("t.collection_id = :collection", {
        collection: productsPageOptionsDto.collection
      });
    }

    if (productsPageOptionsDto.colors) {
      queryBuilder.andWhere("t.color_id IN (:...colors)", {
        colors: productsPageOptionsDto.colors
      });
    }

    if (productsPageOptionsDto.sizes) {
      queryBuilder.andWhere("t.size_id IN (:...sizes)", {
        sizes: productsPageOptionsDto.sizes
      });
    }

    if (productsPageOptionsDto.brands) {
      queryBuilder.andWhere("t.brand_id IN (:...brands)", {
        brands: productsPageOptionsDto.brands
      });
    }

    if (productsPageOptionsDto.min) {
      queryBuilder.andWhere("t.price >= :min", {
        min: productsPageOptionsDto.min
      });
    }

    if (productsPageOptionsDto.max) {
      queryBuilder.andWhere("t.price >= :max", {
        max: productsPageOptionsDto.max
      });
    }

    if (productsPageOptionsDto.genders) {
      queryBuilder.andWhere("t.gender_id IN (:...genders)", {
        genders: productsPageOptionsDto.genders
      });
    }

    const pageOptionsDto: PageOptionsDto = new PageOptionsDto({
      order:
        productsPageOptionsDto.order === SortOrderEnum.DESC
          ? OrderEnum.DESC
          : OrderEnum.ASC,
      page: productsPageOptionsDto.page || 1,
      take: ((productsPageOptionsDto.take || 0) + 1) * 10
    });

    const sortField: string =
      productsPageOptionsDto.sort === SortKindEnum.PRICE
        ? "t.price"
        : productsPageOptionsDto.sort === SortKindEnum.RATING
          ? "t.rating"
          : "t.created_at";

    queryBuilder
      .select(selection)
      .orderBy(sortField, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    return { builder: queryBuilder, options: pageOptionsDto };
  }

  /**
   * Read all Product items
   * @param productsPageOptionsDto
   */
  async findAllView(
    productsPageOptionsDto: OptionsProductsPageDto
  ): Promise<PageDto<ViewProductDto>> {
    const { builder: queryBuilder, options: pageOptionsDto } =
      this.findQueryBuilder(productsPageOptionsDto);

    const itemCount: number = await queryBuilder.getCount();
    // const { entities } = await queryBuilder.getRawAndEntities();
    const items = await queryBuilder.getRawMany();

    const entities = plainToInstance(ViewProductDto, items, {
      enableImplicitConversion: true
    });

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto
    });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Read Product item by uid
   * @param uid
   * @param locale
   * @param models
   */
  async findOneView(
    uid: string,
    locale: I18nLocale = I18nLocale.en_US,
    models: boolean = false
  ): Promise<ViewProductDto | null> {

    const queryBuilder = this.repository.createQueryBuilder("t");

    queryBuilder
      .leftJoinAndMapMany(
        "t.images",
        ProductImageEntity,
        "img",
        "t.id=img.product_id"
      )
      .where("t.uid = :uid", { uid });


    const product = await queryBuilder.getOne();

    if (!product) return null;

    if (!models || !product.modelId) return this.makeView(product, locale);

    const byModelBuilder = this.repository.createQueryBuilder("t");

    byModelBuilder
      .where("t.model_id = :modelId", { modelId: product.modelId })
      .andWhere("t.uid <> :uid", { uid });

    const products = await byModelBuilder.getMany();

    return this.makeView(product, locale, products);
  }

  /**
   * Read Summary Product items
   * @param sort
   * @param locale
   */
  async findSummaryView(
    sort: SortKindEnum,
    locale: I18nLocale
  ): Promise<Array<ViewProductDto>> {
    const productsPageOptionsDto: OptionsProductsPageDto = plainToInstance(
      OptionsProductsPageDto,
      {
        lang: locale,
        take: PageTakeEnum.limit10,
        order: SortOrderEnum.DESC,
        sort
      },
      {
        enableImplicitConversion: true
      }
    );

    const { builder: queryBuilder } = this.findQueryBuilder(
      productsPageOptionsDto
    );

    const items = await queryBuilder.getRawMany();

    return plainToInstance(ViewProductDto, items, {
      enableImplicitConversion: true
    });
  }
}
