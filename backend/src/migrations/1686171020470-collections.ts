import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Collections1686171020470 implements MigrationInterface {
  name = 'Collections1686171020470';

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
    await queryRunner.query(`
        CREATE TABLE \`collections\` (
    \`id\` int NOT NULL AUTO_INCREMENT, 
    \`name_uk\` varchar(255) NOT NULL, 
    \`name_en\` varchar(255) NOT NULL, 
    \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
    \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
    \`description_uk\` varchar(255) NULL, 
    \`description_en\` varchar(255) NULL, 
    \`is_hot\` tinyint NOT NULL DEFAULT 0, 
    
    PRIMARY KEY (\`id\`)) ENGINE=InnoDB
    `);

    await this.insertData(queryRunner, 'collections.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`collections\``);
  }
}
