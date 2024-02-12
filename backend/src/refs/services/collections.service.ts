import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";

import { CreateCollectionDto, UpdateCollectionDto } from "../dto";
import { CollectionEntity } from "../entities";
import { BannerKind } from "../enums";

@Injectable()
export class CollectionsService {
  public static readonly FILE_DIRECTORY: string = "./files/collections";

  // public static readonly  BANNER_MASK: RegExp =
  //   /^(?:column|large|normal|wide)-[0-9,a-f]{15,20}\.(?:jpg|jpeg|png|gif)$/gm;

  public static readonly BANNER_MASK: RegExp = new RegExp(
    "^(?:" +
    Object.values(BannerKind).join("|") +
    ")-[0-9,a-f]{15,20}\\.(?:jpg|jpeg|png|gif)$"
  );

  constructor(
    @InjectRepository(CollectionEntity)
    private readonly refsRepository: Repository<CollectionEntity>
  ) {
  }

  /**
   * Create Collection item
   * @param createCollectionDto
   */
  async create(
    createCollectionDto: CreateCollectionDto
  ): Promise<CollectionEntity> {
    const ref = await this.refsRepository.save(createCollectionDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Collection items
   */
  findAll(): Promise<CollectionEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Collection item by id
   * @param id
   */
  findOne(id: number): Promise<CollectionEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Collection item by id
   * @param id
   * @param updateCollectionDto
   */
  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto
  ): Promise<CollectionEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateCollectionDto
    );
    return res.affected
      ? this.refsRepository.create({ ...updateCollectionDto, id })
      : null;
  }

  /**
   * Remove Collection item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
