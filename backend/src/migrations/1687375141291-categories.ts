import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Categories1687375141291 implements MigrationInterface {
  name = 'Categories1687375141291';

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
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_uk\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parent_id\` int NULL, \`collection_id\` int NULL, \`banner_image\` varchar(255) NULL, \`banner_name_uk\` varchar(255) NULL, \`banner_name_en\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_5f0cc811adb544a85971019bdbc\` FOREIGN KEY (\`collection_id\`) REFERENCES \`collections\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'categories.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_5f0cc811adb544a85971019bdbc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
