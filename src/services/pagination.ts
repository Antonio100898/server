import { IImage } from "../models/IImage";

//returns sliced array (page) requested by client
export const getElementsByPage = (
  elements: IImage[],
  pageSize: number,
  pageNum: number
) => {
  const start = (pageNum - 1) * pageSize;
  const end = pageNum * pageSize;

  return elements.slice(start, end);
};
