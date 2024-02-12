import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Reviews1692299417329 implements MigrationInterface {
  name = 'Reviews1692299417329';

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
      `CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(32) NOT NULL, \`product_id\` int NOT NULL, \`user_id\` int NOT NULL, \`author\` varchar(255) NOT NULL, \`email\` varchar(128) NOT NULL, \`text\` text NOT NULL, \`rating\` decimal(4,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_d3b0d4755fa5510f2a4041ffc8\` (\`created_at\`), UNIQUE INDEX \`IDX_411b3f6aa2ff3873389a83b8dc\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_9482e9567d8dcc2bc615981ef44\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_728447781a30bc3fcfe5c2f1cdf\` FOREIGN KEY (\`user_id\`) REFERENCES \`auth_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'reviews.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_728447781a30bc3fcfe5c2f1cdf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_9482e9567d8dcc2bc615981ef44\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_411b3f6aa2ff3873389a83b8dc\` ON \`reviews\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d3b0d4755fa5510f2a4041ffc8\` ON \`reviews\``,
    );
    await queryRunner.query(`DROP TABLE \`reviews\``);
  }
}
