# SPPD API v1
If you plan to use this API for your project, please let us know what you're working on and how to contact you. You can find us on our discord server: https://discord.feinwaru.com. If you have any questions about the API, are interested in what we're doing, or just want to help out, don't be afraid to talk to us!

The in-depth info for individual routes can be seen here: https://github.com/feinwarusoftware/sppd/blob/master/docs/cards.md.

Below are the general concepts that you'll need to keep in mind while using this API.
```
NOTE: All API responses are JSON.
```

- ## Base URL
  ```
  /api/v1
  ```
- ## Authentication
  Currently there is no authentication needed for the public section of our API.
  ```
  IMPORTANT: We will use API tokens in the future. As this is a breaking change, it will feature in api v2 or later.
  ```
- ## Breaking Changes
  Any changes which break current requests will be added to new API versions, e.g. v2. Old API versions will be deprecated after a certain amount of time after a new version has become stable.
  ```
  NOTE: This time period is still TBD.
  ```
- ## Non-Breaking Changes
  Any API changelogs will be posted on the sppd website, https://sppd.feinwaru.com, in the news section. We will also be posting announcements on our Discord server: https://discord.feinwaru.com.
- ## Success Responses
  ```json
  {
    "code": 200,
    "success": true,
    "data": {
      "total": 119,
      "matched": 1,
      "cards": [
        // ...
      ]
    },
    "error": null
  }
  ```
  ```
  NOTE: You will receive this response from any 'search' routes, i.e. ones that return multiple results.
  ```
  OR
  ```json
  {
    "code": 200,
    "success": true,
    "data": [
      // ...
    ],
    "error": null
  }
  ```
  ```
  NOTE: You will receive this response from any routes where all database objects are returned, i.e. total is equal to data.length.
  ```
  OR
  ```json
  {
    "code": 200,
    "success": true,
    "data": {
      // ...
    },
    "error": null
  }
  ```
  ```
  NOTE: You will receive this response from any 'unique id' routes, i.e. ones that always return a single card.
  ```
  OR
  ```json
  {
    "code": 404,
    "success": true,
    "data": null,
    "error": null
  }
  ```
  ```
  NOTE: Although this returns a 404, it is still a successful response and as so, 'success' is set to true.
  ```
- ## Error Responses
  ```json
  {
    "code": 500,
    "success": false,
    "data": null,
    "error": "..."
  }
  ```
  ```
  NOTE: This is a generic 500 error response from the API.
  NOTE: This is the only error you should encounter in the public section of our API.
  NOTE: The 'success' field is always set to false in error responses.
  ```
