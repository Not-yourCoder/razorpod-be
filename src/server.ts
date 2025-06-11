import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const BASE_URL = "https://dummyjson.com";

// Route to fetch products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const { limit, skip } = req.query;
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { limit, skip },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to fetch single product by ID
app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

// Route to fetch categories
app.get("/api/categories", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
