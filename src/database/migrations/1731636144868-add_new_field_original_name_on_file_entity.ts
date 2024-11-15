import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldOriginalNameOnFileEntity1731636144868 implements MigrationInterface {
    name = 'AddNewFieldOriginalNameOnFileEntity1731636144868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "original_name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "original_name"`);
    }

}
