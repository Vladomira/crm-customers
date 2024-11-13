const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.set("view engine", "pug");
app.use(express.static("css"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
   try {
      const customers = await axios.get("http://localhost:3001/customers");
      const { data } = await axios.get("http://localhost:3001/total");

      const limit = 8;
      const offset = 1;
      const pagesQuantity = data / limit;

      res.render("index", {
         customers: customers.data,
         pages: {
            total: data,
            limit,
            offset,
            pagesQuantity,
         },
         user: "Evano",
         position: "Project Manager",
      });
   } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).send("Error fetching customer data");
   }
});

app.listen(3000, () => {
   console.log(`Listening on port 3000...http://localhost:3000`);
});
