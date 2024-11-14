import { Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { File } from 'src/api/file/entities/file.entity';
import { Folder } from 'src/api/folder/entities/folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('file_folder')
export class FileFolder extends BaseEntity {
  @AutoMap()
  @ManyToOne(() => File, (file) => file.file_folders, {
    onDelete: 'CASCADE',
  })
  files: File;

  @AutoMap()
  @ManyToOne(() => Folder, (folder) => folder.folder_files, {
    onDelete: 'CASCADE',
  })
  folders: Folder;
}
