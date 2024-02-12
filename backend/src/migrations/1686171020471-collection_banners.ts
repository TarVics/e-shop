import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class CollectionBanners1686171020471 implements MigrationInterface {
  name = 'CollectionBanners1686171020471';

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
    await queryRunner.query(`CREATE TABLE \`collection_banners\` (
\`id\` int NOT NULL AUTO_INCREMENT, 
\`collection_id\` int NOT NULL, 
\`banner\` varchar(255) NOT NULL, 
\`kind\` enum (
'deals-column', 
'home-large', 
'home-normal', 
'hot-large', 
'hot-normal', 
'latest-column', 
'navigation-column', 
'navigation-row') NOT NULL, 
\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
\`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`collection_banners\` ADD CONSTRAINT \`FK_5531e98a29288843a88935d59d2\` FOREIGN KEY (\`collection_id\`) REFERENCES \`collections\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'collection_banners.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`collection_banners\` DROP FOREIGN KEY \`FK_5531e98a29288843a88935d59d2\``,
    );
    await queryRunner.query(`DROP TABLE \`collection_banners\``);
  }
}
