import { MigrationInterface, QueryRunner } from "typeorm";

export class changeColumnsName1654028319902 implements MigrationInterface {
    name = 'changeColumnsName1654028319902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_4e550c42a0d81a08a64b7a3d62a"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_c27ec16b451fa73e465667dee15"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "unit_price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "cart_id" uuid`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "dvd_id" uuid`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_7677afd1acd1817f27455a1c1b1" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_14f881710a658f0a8d5faa8204a" FOREIGN KEY ("dvd_id") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_14f881710a658f0a8d5faa8204a"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_7677afd1acd1817f27455a1c1b1"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "dvd_id"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "cart_id"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD "unitPrice" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_c27ec16b451fa73e465667dee15" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_4e550c42a0d81a08a64b7a3d62a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
