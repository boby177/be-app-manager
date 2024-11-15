import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupDbSchema1731659414886 implements MigrationInterface {
    name = 'SetupDbSchema1731659414886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder" ADD "folderParentId" uuid`);
        await queryRunner.query(`ALTER TABLE "folder" ADD CONSTRAINT "FK_7b24c84bc9fe9fec4a4da447731" FOREIGN KEY ("folderParentId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder" DROP CONSTRAINT "FK_7b24c84bc9fe9fec4a4da447731"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP COLUMN "folderParentId"`);
    }

}
