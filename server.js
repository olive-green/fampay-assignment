require("dotenv-defaults").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

const initFetchVideoJob = require("./controllers/scheduler");
const indexRouter = require("./routes/youtube");

const secrets = require("./utils/secrets");

const app = express();

mongoose
    .connect(secrets.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        /* Connected */
        console.log("database connected")
    })
    .catch((err) => {
        if (err) {
            console.log(`Failed to connect to MongoDB: ${err}`);
        }
    });

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");
});

initFetchVideoJob();

//running a server
app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT);
})

