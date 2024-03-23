import { IImage } from "./IImage";

export interface IPixabayResponse {
  total: number;
  totalHits: number;
  hits: IImage[];
}
