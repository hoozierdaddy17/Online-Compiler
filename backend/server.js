const express = require("express");
const app = express();

const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

// middlewares:

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello You are on Home Page!");
});

app.post("/run", async (req, res) => {
  const { language = "C++", code } = req.body;
  if (code === undefined)
    return res.status(400).json({ success: false, error: "Code is required" });
  try {
    const filePath = await generateFile(language.toLowerCase(), code); //create a file
    const output = await executeCpp(filePath); //run the file and return response
    return res.json({ filePath, output });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(7500, () => {
  console.log("Server is running on port 7500");
});
