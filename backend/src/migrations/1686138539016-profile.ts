import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export class Profile1686138539016 implements MigrationInterface {
  name = 'Profile1686138539016';

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
      `CREATE TABLE \`payment_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`method\` enum ('bank-transfer', 'cheque-payment', 'paypal-system') NOT NULL DEFAULT 'bank-transfer', \`name_uk\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`info_uk\` varchar(255) NOT NULL, \`info_en\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`shipping_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`method\` enum ('free-shipping', 'standard') NOT NULL DEFAULT 'standard', \`price\` decimal(13,4) NOT NULL DEFAULT '0.0000', \`name_uk\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`info_uk\` varchar(255) NOT NULL, \`info_en\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profiles\` (\`id\` int NOT NULL, \`address\` varchar(255) NULL, \`city\` varchar(32) NULL, \`zip_code\` varchar(16) NULL, \`tel\` varchar(32) NULL, \`country\` varchar(32) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shipping_method_id\` int NOT NULL, \`payment_method_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_8e520eb4da7dc01d0e190447c8e\` FOREIGN KEY (\`id\`) REFERENCES \`auth_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_032c5af63eb61e04be167442a2f\` FOREIGN KEY (\`shipping_method_id\`) REFERENCES \`shipping_methods\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_d4c538dd09e00c539a4bf54b8e7\` FOREIGN KEY (\`payment_method_id\`) REFERENCES \`payment_methods\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'payment_methods.sql');
    await this.insertData(queryRunner, 'shipping_methods.sql');
    await this.insertData(queryRunner, 'profiles.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_d4c538dd09e00c539a4bf54b8e7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_032c5af63eb61e04be167442a2f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_8e520eb4da7dc01d0e190447c8e\``,
    );
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(`DROP TABLE \`shipping_methods\``);
    await queryRunner.query(`DROP TABLE \`payment_methods\``);
  }
}
