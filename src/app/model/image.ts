export interface ImageData {
  fileName: string;
  viewPortHeight: number; // in percent
  distanceTop: number; // in px
  distanceLeft: number; // in px
  zIndex: number;
  velocity: number; // for move down between 0 - 100% and for move up between 100% - 500%
  movement: keyof typeof EMovement; // true when the image moves down with scroll down, opposite otherwise
  description: string;
}

export enum EMovement {
  down,
  up,
  static,
}

export interface DialogData {
  image: ImageData;
  heightBigger: boolean;
}

export interface ImagesDto {
  portraitFileName: string;
  images: ImageData[];
  pageHeight: number;
}
