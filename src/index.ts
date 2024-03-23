import express from "express";
import dotenv from "dotenv";
import imagesRouter from "./routes/images";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//main route to get images array from pixabay
app.use("/images", imagesRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
