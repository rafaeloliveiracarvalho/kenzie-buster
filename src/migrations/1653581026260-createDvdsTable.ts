import { MigrationInterface, QueryRunner } from "typeorm";

export class createDvdsTable1653581026260 implements MigrationInterface {
    name = 'createDvdsTable1653581026260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dvds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dvds"`);
    }

}
