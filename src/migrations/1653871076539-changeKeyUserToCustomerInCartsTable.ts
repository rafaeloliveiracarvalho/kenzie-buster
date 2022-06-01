import { MigrationInterface, QueryRunner } from "typeorm";

export class changeKeyUserToCustomerInCartsTable1653871076539 implements MigrationInterface {
    name = 'changeKeyUserToCustomerInCartsTable1653871076539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "userId" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a4393093f31aabad6de1f54b0e9" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a4393093f31aabad6de1f54b0e9"`);
        await queryRunner.query(`ALTER TABLE "carts" RENAME COLUMN "customerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
