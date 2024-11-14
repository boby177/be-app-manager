import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupDbSchemaAppManager1731557701887 implements MigrationInterface {
    name = 'SetupDbSchemaAppManager1731557701887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, "type" character varying(50), "size" bigint NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_folder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "filesId" uuid, "foldersId" uuid, CONSTRAINT "PK_5e4a450a108c94fb03fd0e54899" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "folder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file_folder" ADD CONSTRAINT "FK_f5c9568984c72f03cecb157164c" FOREIGN KEY ("filesId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_folder" ADD CONSTRAINT "FK_1f2b82a7b1210b143e4f0db06d1" FOREIGN KEY ("foldersId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "file_folder" DROP CONSTRAINT "FK_1f2b82a7b1210b143e4f0db06d1"`);
        await queryRunner.query(`ALTER TABLE "file_folder" DROP CONSTRAINT "FK_f5c9568984c72f03cecb157164c"`);
        await queryRunner.query(`DROP TABLE "folder"`);
        await queryRunner.query(`DROP TABLE "file_folder"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
