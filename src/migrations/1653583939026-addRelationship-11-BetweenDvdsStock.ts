import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelationship11BetweenDvdsStock1653583939026 implements MigrationInterface {
    name = 'addRelationship11BetweenDvdsStock1653583939026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" ADD "stockId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "UQ_d1e620c0f75aa0d8341f2c768ac" UNIQUE ("stockId")`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "UQ_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "stockId"`);
    }

}
