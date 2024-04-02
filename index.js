const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbpath = path.join(__dirname, "image.db");
app.use(express.json());
app.use(cors());
let db = null;
const initialize = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is start! ");
    });
  } catch (e) {
    console.log(`Error message ${e.message}`);
    process.exit(1);
  }
};

initialize();

app.post("/image", async (request, response) => {
  const getDetails = request.body;
  const { id, name, location, imageUrl, description } = getDetails;
  const getImageQuery = `insert into images (id,name,location,image_url,description) 
    values(
        '${id}',
         '${name}',
         '${location}',
         '${imageUrl}',
         '${description}'
    );
    `;
  await db.run(getImageQuery);
  response.send("Image Successfully Added");
});
