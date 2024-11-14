import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { FileFolder } from 'src/api/file-folder/entities/file-folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('file')
export class File extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 255, nullable: false })
  path: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string;

  @AutoMap()
  @Column({ type: 'bigint' })
  size: string;

  @AutoMap(() => [FileFolder])
  @OneToMany(() => FileFolder, (fileFolders) => fileFolders.files)
  file_folders: FileFolder[];
}
