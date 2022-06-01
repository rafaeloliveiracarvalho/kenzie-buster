import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from "dotenv";
import { hashSync } from "bcrypt";

dotenv.config();

export class createUsersTable1653576383808 implements MigrationInterface {
  name = "createUsersTable1653576383808";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" 
                (
                    "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                    "name" character varying NOT NULL, 
                    "email" character varying NOT NULL, 
                    "password" character varying NOT NULL, 
                    "is_admin" boolean NOT NULL DEFAULT false, 
                    CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
                    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                )
    `);
    await queryRunner.query(`
                    INSERT INTO "users"
                        (name, email, password, is_admin)
                    VALUES
                        (
                            '${process.env.ADM_NAME}',
                            '${process.env.ADM_EMAIL}',
                            '${hashSync(process.env.ADM_PWD, 10)}',
                            true
                        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
