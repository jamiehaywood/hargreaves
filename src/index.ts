import { HL } from "./hl";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
const port = 5000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let secureNumber = req.body.secureNumber;
  let dateOfBirth = req.body.dateOfBirth;

  let hl = new HL();
  await hl.authenticate(username, password, dateOfBirth, secureNumber);
  res.send(await hl.getInDepth());
});

app.listen(port, () => console.log(`HL API listening on port ${port}!`));
