## Fampay Assignment

### Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

### Basic Functionalities

- Cron Job to constantly fetch data in the background every minute
- GET API, `/videos` for fetching videos supporting options like sorting, fuzzy searching and pagination
- Search API which also supports fuzzy matching for situations like `How to make a tea?` matched with `tea how`
- Dashboard to access the videos with options to filter and search

### Development

1. Clone the project

`git clone https://github.com/olive-green/fampay-assignment/`

2. Create a .env file, can refer env-examples.txt

```
# For default values, refer `.env.defaults` file
NODE_ENV = 

# Server Properties
PORT =

# MONGODB
MONGODB_URI = 

# YOUTUBE API
YOUTUBE_API_KEY =
YOUTUBE_SEARCH_QUERY =
```
You will need a YOUTUBE DATA API key in order to run this app. Follow the instructions on [this page](https://developers.google.com/youtube/v3/getting-started) to get one.

> **Note:** 
> - In case of multiple API keys, provide them as "," delimited list of keys like so:

```
YOUTUBE_API_KEY = "<API_KEY1>, <API_KEY2>..."
```

3. Install dependencies

`npm install`

4. Run in development mode

`npm run dev`

### Resources

1. https://developers.google.com/youtube/v3

