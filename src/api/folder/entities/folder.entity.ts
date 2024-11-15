import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { FileFolder } from 'src/api/file-folder/entities/file-folder.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('folder')
export class Folder extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Folder, (sub_folder) => sub_folder.folder_parent)
  sub_folder: Folder[];

  @ManyToOne(() => Folder, (folder) => folder.sub_folder)
  @JoinColumn()
  folder_parent: Folder;

  @AutoMap(() => [FileFolder])
  @OneToMany(() => FileFolder, (folderFiles) => folderFiles.folders)
  folder_files: FileFolder[];
}
