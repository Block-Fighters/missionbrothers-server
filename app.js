const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

dotenv.config();

const Router = require("./routes");
const app = express();

app.set("port", process.env.PORT || 8000);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: process.env.DEPLOY_URL,
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use(express.static(path.join(__dirname, "")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", Router);

/* 404 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

/* error 처리 */
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  console.log(err.status);
  res.status(err.status || 500).json({ err });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
