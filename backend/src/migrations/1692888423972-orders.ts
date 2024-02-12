import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from "node:fs";
import { join } from "node:path";

export class Orders1692888423972 implements MigrationInterface {
  name = 'Orders1692888423972';

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
      `CREATE TABLE \`order_states\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` enum ('new', 'processing', 'delivery', 'done', 'cancelled') NOT NULL, \`name_uk\` varchar(255) NOT NULL, \`name_en\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a740328e0eb243ecc7611ee149\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(32) NOT NULL, \`user_id\` int NOT NULL, \`zip_code\` varchar(10) NULL, \`country\` varchar(64) NULL, \`city\` varchar(64) NULL, \`address\` varchar(255) NULL, \`shipping_id\` int NOT NULL DEFAULT '1', \`payment_id\` int NOT NULL DEFAULT '1', \`cart_id\` int NOT NULL, \`state_id\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_c884e321f927d5b86aac7c8f9e\` (\`created_at\`), UNIQUE INDEX \`IDX_78e1a58a407bd3211bd9043967\` (\`uid\`), UNIQUE INDEX \`REL_f42b1d95404c45b10bf2451d81\` (\`cart_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`auth_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a89d985ed97296e5d5f47c9be26\` FOREIGN KEY (\`shipping_id\`) REFERENCES \`shipping_methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_5b3e94bd2aedc184f9ad8c10439\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payment_methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f42b1d95404c45b10bf2451d814\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f5af72ce935e9dcdf3fc7249f55\` FOREIGN KEY (\`state_id\`) REFERENCES \`order_states\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await this.insertData(queryRunner, 'order_states.sql');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f5af72ce935e9dcdf3fc7249f55\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f42b1d95404c45b10bf2451d814\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_5b3e94bd2aedc184f9ad8c10439\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a89d985ed97296e5d5f47c9be26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f42b1d95404c45b10bf2451d81\` ON \`orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78e1a58a407bd3211bd9043967\` ON \`orders\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c884e321f927d5b86aac7c8f9e\` ON \`orders\``,
    );
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a740328e0eb243ecc7611ee149\` ON \`order_states\``,
    );
    await queryRunner.query(`DROP TABLE \`order_states\``);
  }
}
