import { Injectable } from '@nestjs/common';
import multer from 'multer';
import path from 'path';

@Injectable()
export class StorageService {
  async uploadFile(file: Express.Multer.File) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // Specify the directory where files will be saved
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        // Use original filename with timestamp for uniqueness
        const fileExtension = path.extname(file.originalname);
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName); // Save with a unique name
      },
    });
  }
}
