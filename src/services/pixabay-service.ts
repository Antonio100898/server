import axios, { AxiosInstance } from "axios";
import { IPixabayResponse } from "../models/IPixabayResponse";
import { IImage } from "../models/IImage";

export class PixabayService {
  private api: AxiosInstance;
  public api_key: string;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.api = axios.create({
      baseURL: "https://pixabay.com/api/",
    });
  }

  //returns array of images from pixabay api, or null in case request was not successful
  public async getImages(q: string | undefined): Promise<IImage[] | null> {
    //if param 'q' has not been provided by client, make a request without 'q' query param
    const query = q ? `&q=${q}` : "";
    const url = `?key=${this.api_key}${query}`;

    try {
      const response = await this.api.get<IPixabayResponse>(url);
      if (response.status !== 200) {
        console.log(response.status);
        return null;
      } else {
        //returns sorted by id array of images
        const data = response.data.hits.sort((a, b) => a.id - b.id);
        return data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
