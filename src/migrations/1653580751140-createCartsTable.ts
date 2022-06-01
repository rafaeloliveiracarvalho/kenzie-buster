import { MigrationInterface, QueryRunner } from "typeorm";

export class createCartsTable1653580751140 implements MigrationInterface {
  name = "createCartsTable1653580751140";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "carts"`);
  }
}
