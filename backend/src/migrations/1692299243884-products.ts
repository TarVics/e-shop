import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Products1692299243884 implements MigrationInterface {
  name = 'Products1692299243884';

  public async insertData(
    queryRunner: QueryRunner,
    queryFile: string,
  ): Promise<void> {
    const queries: string[] = readFileSync(join(__dirname, 'sql', queryFile))
      .toString()
      .split('\n')
      .filter((str) => str.trimStart().startsWith('INSERT '));

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NOT NULL, \`image_main\` varchar(255) NOT NULL, \`image_thumb\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(32) NOT NULL, \`name_uk\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`color_id\` int NULL, \`size_id\` int NULL, \`quantity\` int NOT NULL DEFAULT '0', \`category_id\` int NOT NULL, \`model_id\` int NULL, \`collection_id\` int NULL, \`brand_id\` int NOT NULL, \`gender_id\` int NULL, \`price\` decimal(13,4) NOT NULL, \`sale\` decimal(5,2) NULL, \`sale_stop\` datetime NULL, \`rating\` decimal(4,2) NULL, \`is_new\` tinyint NOT NULL, \`brief_uk\` text NOT NULL, \`brief_en\` text NOT NULL, \`description_uk\` text NOT NULL, \`description_en\` text NOT NULL, \`details_uk\` text NOT NULL, \`details_en\` text NOT NULL, \`image_column\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_0586cb832cc3081ebe2c15543a\` (\`name_en\`, \`brief_en\`, \`description_en\`, \`details_en\`), FULLTEXT INDEX \`IDX_a2428358a0048e2a894e66ce91\` (\`name_uk\`, \`brief_uk\`, \`description_uk\`, \`details_uk\`), UNIQUE INDEX \`IDX_6cab1bfba524743c3588c0ed0c\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_733888c65449d717af1fccaf702\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_fbf3fdfe289a545626b8bc5d0ce\` FOREIGN KEY (\`size_id\`) REFERENCES \`sizes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9d131b8b8db5708fb71500c57d2\` FOREIGN KEY (\`model_id\`) REFERENCES \`models\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_e6c272f6bc9b9182f4311a1de7e\` FOREIGN KEY (\`collection_id\`) REFERENCES \`collections\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_7d45aa29ba1109a087f0f6f19c2\` FOREIGN KEY (\`gender_id\`) REFERENCES \`genders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'products.sql');
    await this.insertData(queryRunner, 'product_images.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_7d45aa29ba1109a087f0f6f19c2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_e6c272f6bc9b9182f4311a1de7e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9d131b8b8db5708fb71500c57d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_fbf3fdfe289a545626b8bc5d0ce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_733888c65449d717af1fccaf702\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6cab1bfba524743c3588c0ed0c\` ON \`products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a2428358a0048e2a894e66ce91\` ON \`products\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0586cb832cc3081ebe2c15543a\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`product_images\``);
  }
}
