import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { FileFolder } from 'src/api/file-folder/entities/file-folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('folder')
export class Folder extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @AutoMap(() => [FileFolder])
  @OneToMany(() => FileFolder, (folderFiles) => folderFiles.folders)
  folder_files: FileFolder[];
}
