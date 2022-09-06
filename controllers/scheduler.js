
const cron = require("node-cron");
const VideoModel = require("../models/video");
const { fetchVideos } = require("./fetch-videos");

const secrets = require("../utils/secrets");

module.exports = () => {
  cron.schedule("* * * * *", async () => {
    try {
      let done = false;
      // console.log(secrets.YOUTUBE_API_KEY)
      for (const apiKey of secrets.YOUTUBE_API_KEY.split(",")) {
        try {
          if (done) {
            break;
          }
          // console.log(apiKey)
          const videos = await fetchVideos(
            apiKey,
            secrets.YOUTUBE_SEARCH_QUERY
          );

          await VideoModel.create(videos);
          done = true;
        } catch (err) {
          console.error("Error saving videos to DB", {
            error: err,
          });
        }
      }

      if (!done) {
        throw new Error("Quota exhausted for all keys");
      }
    } catch (err) {
      /* Handle the error */
      console.log("all keys")
      console.error("Quota exhausted for all keys", {
        error: err,
      });
    }
  });
};
