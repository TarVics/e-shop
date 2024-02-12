import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";

import {
  CreateCategoryDto,
  UpdateCategoryBannerDto,
  UpdateCategoryDto
} from "../dto";
import { CategoryEntity } from "../entities";

@Injectable()
export class CategoriesService {
  public static readonly FILE_DIRECTORY: string = "./files/categories";
  public static readonly BANNER_MASK: RegExp =
    // /^[0-9,a-f]{15,20}\.(?:jpg|jpeg|png|gif)$/gm;
    new RegExp("^[0-9,a-f]{15,20}\\.(?:jpg|jpeg|png|gif)$");

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly refsRepository: Repository<CategoryEntity>
  ) {
  }

  /**
   * Create Category item
   * @param createCategoryDto
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const ref = await this.refsRepository.save(createCategoryDto);
    return this.refsRepository.create(ref);
  }

  /**
   * Read all Category items
   */
  findAll(): Promise<CategoryEntity[]> {
    return this.refsRepository.find();
  }

  /**
   * Read Category item by id
   * @param id
   */
  findOne(id: number): Promise<CategoryEntity | null> {
    return this.refsRepository.findOneBy({ id });
  }

  /**
   * Update Category item by id
   * @param id
   * @param updateCategoryDto
   */
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto & UpdateCategoryBannerDto
  ): Promise<CategoryEntity | null> {
    const res: UpdateResult = await this.refsRepository.update(
      { id },
      updateCategoryDto
    );
    return res.affected
      ? this.refsRepository.create({ ...updateCategoryDto, id })
      : null;
  }

  /**
   * Remove Category item by id
   * @param id
   */
  async remove(id: number): Promise<boolean> {
    const res: DeleteResult = await this.refsRepository.delete(id);
    return !!res.affected;
  }
}
