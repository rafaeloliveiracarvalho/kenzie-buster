import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelationship1nBetweenDvdsCarts1653581891474 implements MigrationInterface {
    name = 'addRelationship1nBetweenDvdsCarts1653581891474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "dvdId"`);
    }

}
