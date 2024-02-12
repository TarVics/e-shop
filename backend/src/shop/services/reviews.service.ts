import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { PageDto, PageMetaDto, PageOptionsDto } from '../../core/dtos';
import { OrderEnum } from '../../core/enums';

import { AuthUser } from '../../auth/entities';
import { SortOrderEnum } from '../../refs/enums';
import { ProductsService } from '../../refs/services';

import {
  CreateReviewDto,
  OptionsReviewPageDto,
  UpdateReviewDto,
  ViewReviewDto,
} from '../dto';
import { ReviewEntity } from '../entities';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productsService: ProductsService,
  ) {}

  /**
   * Convert ReviewEntity into ViewReviewDto
   * @param entity
   * @param uid
   * @param productUid
   */
  convertEntityToView(
    entity: ReviewEntity,
    uid: string,
    productUid: string,
  ): ViewReviewDto {
    return plainToInstance(
      ViewReviewDto,
      {
        uid,
        product: productUid,
        author: entity.author,
        email: entity.email,
        text: entity.text,
        rating: entity.rating,
        createdAt: entity.createdAt,
      },
      { enableImplicitConversion: true },
    );
  }

  /**
   * Make ReviewEntity from UpdateReviewDto
   * @param updateReviewDto
   * @param productId
   * @param user
   */
  makeEntity(
    updateReviewDto: UpdateReviewDto,
    productId: number,
    user: AuthUser,
  ): ReviewEntity {
    return this.reviewRepository.create({
      ...updateReviewDto,
      productId,
      userId: user.id,
      author: user.fullName,
      email: user.email,
    });
  }

  /**
   * Find ReviewEntity by uid
   * @param uid
   */
  async findOneEntity(uid: string): Promise<ReviewEntity | null> {
    return await this.reviewRepository.findOne({
      where: { uid },
      select: { product: { uid: true } },
      relations: ['product'],
    });
  }

  /**
   * Create Review item
   * @param user
   * @param createReviewDto
   */
  async create(
    user: AuthUser,
    createReviewDto: CreateReviewDto,
  ): Promise<ViewReviewDto | null> {
    const { product: productUid, ...dto } = createReviewDto;
    const productId: number = await this.productsService.findIdByUid(
      productUid,
    );
    if (!productId) return null;

    const entity: ReviewEntity = this.makeEntity(dto, productId, user);
    const res: ReviewEntity = await this.reviewRepository.save(entity);

    return this.convertEntityToView(res, res.uid, productUid);
  }

  /**
   * Read all Review items
   * @param reviewsPageOptionsDto
   */
  public async findAll(
    reviewsPageOptionsDto: OptionsReviewPageDto,
  ): Promise<PageDto<ViewReviewDto>> {
    const pageOptionsDto: PageOptionsDto = new PageOptionsDto({
      order:
        reviewsPageOptionsDto.order === SortOrderEnum.DESC
          ? OrderEnum.DESC
          : OrderEnum.ASC,
      page: reviewsPageOptionsDto.page,
      take: (reviewsPageOptionsDto.take + 1) * 10,
    });

    const queryBuilder: SelectQueryBuilder<ReviewEntity> =
      this.reviewRepository.createQueryBuilder('t');

    const select = [
      't.`uid`',
      'p.uid AS product',
      't.`author`',
      't.`email`',
      't.`text`',
      't.`rating`',
      't.created_at AS createdAt',
    ];

    queryBuilder
      .select(select)
      .innerJoin('t.product', 'p')
      .where('p.uid = :product', { product: reviewsPageOptionsDto.product })
      .orderBy('t.created_at', pageOptionsDto.order)
      // .skip(pageOptionsDto.skip)
      // .take(pageOptionsDto.take)
      .offset(pageOptionsDto.skip)
      .limit(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    // const { entities } = await queryBuilder.getRawAndEntities();
    const entities = await queryBuilder.getRawMany();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return new PageDto(
      plainToInstance(ViewReviewDto, entities, {
        enableImplicitConversion: true,
      }),
      pageMetaDto,
    );
  }

  /**
   * Read Review item by uid
   * @param uid
   */
  async findOne(uid: string): Promise<ViewReviewDto | null> {
    const entity = await this.findOneEntity(uid);
    return entity
      ? this.convertEntityToView(entity, entity.uid, entity.product.uid)
      : null;
  }

  /**
   * Update Review item by uid
   * @param uid
   * @param user
   * @param updateReviewDto
   */
  async update(
    uid: string,
    user: AuthUser,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ViewReviewDto | null> {
    const prevEntity = await this.findOneEntity(uid);
    if (!prevEntity) return null;
    if (prevEntity.userId !== user.id) throw new ForbiddenException();

    const entity: ReviewEntity = this.makeEntity(
      updateReviewDto,
      prevEntity.productId,
      user,
    );
    const res: UpdateResult = await this.reviewRepository.update(
      prevEntity.id,
      entity,
    );

    return res.affected
      ? this.convertEntityToView(entity, uid, prevEntity.product.uid)
      : null;
  }

  /**
   * Remove Review item by uid
   * @param uid
   * @param user
   */
  async remove(uid: string, user: AuthUser): Promise<boolean> {
    const entity = await this.reviewRepository.findOneBy({ uid });
    if (!entity) return false;
    if (entity.userId !== user.id) throw new ForbiddenException();

    const res: DeleteResult = await this.reviewRepository.delete(entity.id);
    return !!res.affected;
  }
}
