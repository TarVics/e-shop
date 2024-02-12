import { extname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MAX_FILE_SIZE: number = 1024 * 1024;

export type FileNamePart = {
  namePart?: string;
  randomPart?: string;
  extPart?: string;
};

export type NameCallback = (
  req: Request,
  file: Express.Multer.File,
  filePart: FileNamePart,
) => string;

export type FolderCallback = (
  req: Request,
  file: Express.Multer.File,
) => string;

export type MulterImageOptions = {
  storeFolder: string | FolderCallback;
  maxFileSize?: number;
  nameCallback?: NameCallback;
  randomLen?: number;
};

export const getMulterImageOptions = (
  options: MulterImageOptions,
): MulterOptions => {
  const {
    storeFolder,
    maxFileSize = MAX_FILE_SIZE,
    nameCallback,
    randomLen,
  } = options;

  return {
    fileFilter: imageFileFilter,
    limits: {
      fileSize: maxFileSize,
    },
    storage: diskStorage({
      destination: buildStoreFolder(storeFolder),
      filename: buildEditFileName(nameCallback, randomLen),
    }),
  };
};

export const imageFileFilter = (
  _: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const makeFileNamePart = (
  file: Express.Multer.File,
  randomLen = 4,
): FileNamePart => {
  const [namePart] = file.originalname.split('.');
  const extPart: string = extname(file.originalname);

  const randomPart: string =
    new Array(randomLen)
      .fill(null)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('') + new Date().getTime().toString(16);

  return { namePart, randomPart, extPart };
};

export const editFileName = (
  _: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void => {
  const { namePart, randomPart, extPart } = makeFileNamePart(file);

  callback(null, `${namePart}-${randomPart}${extPart}`);
};

export const buildEditFileName = (
  nameCallback?: NameCallback,
  randomLen?: number,
) => {
  return (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void => {
    const filePart: FileNamePart = makeFileNamePart(file, randomLen);

    const fileName: string = nameCallback
      ? nameCallback(req, file, filePart)
      : `${filePart.namePart}-${filePart.randomPart}${filePart.extPart}`;

    callback(null, fileName);
  };
};

export const buildStoreFolder = (folderCallback: string | FolderCallback) => {
  return typeof folderCallback === 'string'
    ? folderCallback
    : (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void,
      ): void => {
        const folder = folderCallback(req, file);
        if (!existsSync(folder)) {
          mkdirSync(folder, { recursive: true });
        }
        callback(null, folder);
      };
};
