const axios = require("axios");
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, "assets")));
var users = [];


async function main() {
  console.log('inside mailer')
  console.log(users)

  // Generate test SMTP service account from ethereal.email
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
     service: 'gmail',
    auth: {
      user: '*************', 
      pass: '*************' 
    }
  });

  let info = await transporter.sendMail({
    from: `${users[0].email}`, 
    to: `anishiv2002@gmail.com`, 
    subject: ` SUGGESTION    `, 
    text: ` ${users[0].message}    `, 
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


app.get("/", (req, res) => {
  res.render("index", {
    title: "Job Search"
  });
});

app.get("/search", (req, res) => {
  queries = req.query;
  queries['max'] = 15
  console.log(queries)
  let url = `https://indreed.herokuapp.com/api/jobs`;

  if (queries) {
    axios
      .get(url, {
        params: queries
      })
      .then(response => {
        // console.log("inside then axios");
        res.render("search", {
          title: "Job Search",
          jobs: response.data
        });
        // res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    res.render("search", {
      title: "Job Search"
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Job Search"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Job Search"
  });
});

app.post("/feedback", (req, res) => {
  console.log('in feeback server')
  console.log(req.body.name)
  users.push({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    message: req.body.message
  });

  console.log(users)
  main();
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
app.get("//", (req, res) => {
  res.render("index2", {
    title: "Job Searching"
  });
});

module.exports = {
  users
}