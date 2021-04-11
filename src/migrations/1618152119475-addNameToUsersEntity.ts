import {MigrationInterface, QueryRunner} from "typeorm";

export class addNameToUsersEntity1618152119475 implements MigrationInterface {
    name = 'addNameToUsersEntity1618152119475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
