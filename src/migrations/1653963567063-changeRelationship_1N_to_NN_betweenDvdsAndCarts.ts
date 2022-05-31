import { MigrationInterface, QueryRunner } from "typeorm";

export class changeRelationship1NToNNBetweenDvdsAndCarts1653963567063 implements MigrationInterface {
    name = 'changeRelationship1NToNNBetweenDvdsAndCarts1653963567063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`CREATE TABLE "carts_dvds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unitPrice" double precision NOT NULL, "cartId" uuid, "dvdId" uuid, CONSTRAINT "PK_a4ee74390ee71d5bd233cbaa676" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_4e550c42a0d81a08a64b7a3d62a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" ADD CONSTRAINT "FK_c27ec16b451fa73e465667dee15" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_c27ec16b451fa73e465667dee15"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds" DROP CONSTRAINT "FK_4e550c42a0d81a08a64b7a3d62a"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "dvdId" uuid`);
        await queryRunner.query(`DROP TABLE "carts_dvds"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
