import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//get the random single recipe of a cocktail
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL+"/random.php");
    res.render("index.ejs", { recipes: result.data.drinks });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

//get the list of cocktail drinks as per search 
app.post("/search", async (req, res) => {
  try {
    const result = await axios.post(API_URL+"/search.php?s="+req.body.drinkName);
    res.render("index.ejs", { recipes: result.data.drinks });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { error: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
