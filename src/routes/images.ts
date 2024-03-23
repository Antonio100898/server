import { Router } from "express";
import { PixabayService } from "../services/pixabay-service";
import { getElementsByPage } from "../services/pagination";
import { IImage } from "../models/IImage";

const router = Router();

router.get("/", async (req, res) => {
  const api_key = process.env.API_KEY || "";
  
  //this service provides methods to call pixabay api and get response
  const service = new PixabayService(api_key);

  // 'q' param is not required. if not provided - the response will be an array of images without filtering by category
  // 'page' param is not required. if not provided - automatically response with page number 1
  const { q, page } = req.query;

  try {
    const data = await service.getImages(q?.toString());

    if (!data) {
      res
        .status(500)
        .send(
          `Something went wrong while server was trying to fetch images from Pixabay. API_KEY: ${service.api_key}`
        );
    } else {
      //always return required by client page or page number 1 by default
      let paginated: IImage[];
      const pageSize = 9;
      switch (page) {
        case undefined:
          paginated = getElementsByPage(data, pageSize, 1);
          break;
        default:
          const pageNum = Number(page);
          if (pageNum < 1) {
            res
              .status(401)
              .send("Provided query parameter 'page' is not valid");
          }
          paginated = getElementsByPage(data, pageSize, pageNum);
          break;
      }

      res.status(200).send({
        data: paginated,
        page: page,
        pagesCount: Math.ceil(data.length / pageSize),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
