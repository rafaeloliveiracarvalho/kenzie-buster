import { MigrationInterface, QueryRunner } from "typeorm";

export class changeRelationship1NToNNBetweenDvdsAndCarts1653939371648 implements MigrationInterface {
    name = 'changeRelationship1NToNNBetweenDvdsAndCarts1653939371648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`CREATE TABLE "carts_dvds_dvds" ("cartsId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_214606f61aa69591967a4c0fc82" PRIMARY KEY ("cartsId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e127a7b4e2b6b60df4bd45a04" ON "carts_dvds_dvds" ("cartsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7be727e5908ad31dc1a490cff5" ON "carts_dvds_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_3e127a7b4e2b6b60df4bd45a04b" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_7be727e5908ad31dc1a490cff57" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_7be727e5908ad31dc1a490cff57"`);
        await queryRunner.query(`ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_3e127a7b4e2b6b60df4bd45a04b"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "dvdId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7be727e5908ad31dc1a490cff5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e127a7b4e2b6b60df4bd45a04"`);
        await queryRunner.query(`DROP TABLE "carts_dvds_dvds"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
