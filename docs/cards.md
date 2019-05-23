# Search Cards
Returns basic JSON data for up to 12 cards.

- ### URL:
  ```
  /cards
  ```
- ### Method:
  ```
  GET
  ```
- ### URL Params:
  Required:
  ```
  null
  ```
  Optional:
  ```
  name=[string]
  - NOTE: card.name.includes(name) determines if the card is included
  - NOTE: Non string values are converted to strings

  theme=[string]
  - (general | adventure | mystical | sci-fi | fantasy)
  - NOTE: Values other than those above will return an empty array

  rarity=[integer]
  - (0 | 1 | 2 | 3)
  - NOTE: 0 is common, 3 is legendary
  - NOTE: Values other than those above will return an empty array

  sort=[string]
  - (name | theme | rarity | energy | health | damage)
  - NOTE: Any other fields that can be sorted should work as well
  - NOTE: Values that cannot be sorted by will be ignored

  order=[integer]
  - (1 | -1)
  - NOTE: 1 is ascending, -1 is descending
  - NOTE: Values other than those above will return an error

  page=[integer]
  - any valid integer
  - NOTE: Negative values will cause an error
  - NOTE: Values larger than ceil(total / limit) will return an empty array

  limit=[integer]
  - any valid integer
  - NOTE: The absolute value of limit will be used
  - NOTE: Values larger than 12 will default to 12
  ```
- ### Data Params:
  ```
  null
  ```
- ### Success Response:
  ```json
  {
    "code": 200,
    "success": true,
    "data": {
      "total": 119,
      "matched": 1,
      "cards": [
        {
          "aliases": [],
          "description": "It's beautiful. I've looked at this for 5 hours now.",
          "image": "OshinoShinobu",
          "mana_cost": 2,
          "damage": 49,
          "health": 49,
          "type": "character",
          "character_type": "assassin",
          "rarity": 3,
          "theme": "fantasy",
          "health_loss": null,
          "cast_area": "own_side",
          "max_velocity": 1.35,
          "time_to_reach_max_velocity": 0.1,
          "agro_range_multiplier": 2.99,
          "can_attack": true,
          "attack_range": 0.67,
          "pre_attack_delay": 0.0333333,
          "knockback": 0,
          "knockback_angle": 45,
          "time_between_attacks": 0.5,
          "has_aoe": false,
          "aoe_type": null,
          "aoe_damage_percentage": null,
          "aoe_knockback_percentage": null,
          "aoe_radius": null,
          "min_episode_completed": 3,
          "min_pvp_rank": 0,
          "min_player_level": 40,
          "updated_at": "2019-05-23T12:23:44.496Z",
          "_id": "5cab3bc67af55f15c8f99705",
          "name": "Oshino Shinobu",
          "powers": [
            {
              "type": "power_damage",
              "amount": 27,
              "duration": null,
              "is_charged": false,
              "charged_regen": null,
              "radius": null,
              "locked": false
            }
          ]
        }
      ]
    },
    "error": null
  }
  ```
  ```
  NOTE: The 'powers' array can either be empty, or contain 1 or 2 objects.
  NOTE: To get the 'image' url, use the following template: https://sppd.feinwaru.com/<image>.jpg.
  NOTE: All of the images are .jpg files.
  ```
- ### Error Response:
  ```json
  {
    "code": 500,
    "success": false,
    "data": null,
    "error": "..."
  }
  ```
- ### Sample Call:
  ```js
  fetch("https://sppd.feinwaru.com/api/v1/cards?name=shinobu")
    .then(res => JSON.parse(res))
    .then(res => {
      // use the response
    })
    .catch(error => {
      // handle the error
    });
  ```

# Card Details
Returns complete json data for 1 card.
```
Note: Ids may change and as so, should not be hard-coded or cached.
```

- ### URL:
  ```
  /cards/:id
  ```
- ### Method:
  ```
  GET
  ```
- ### URL Params:
  Required:
  ```
  null
  ```
  Optional:
  ```
  null
  ```
- ### Data Params:
  ```
  null
  ```
- ### Success Response:
  ```json
  {
    "code": 200,
    "success": true,
    "data": {
      "aliases": [],
      "description": "It's beautiful. I've looked at this for 5 hours now.",
      "image": "OshinoShinobu",
      "mana_cost": 2,
      "damage": 49,
      "health": 49,
      "type": "character",
      "character_type": "assassin",
      "rarity": 3,
      "theme": "fantasy",
      "health_loss": null,
      "cast_area": "own_side",
      "max_velocity": 1.35,
      "time_to_reach_max_velocity": 0.1,
      "agro_range_multiplier": 2.99,
      "can_attack": true,
      "attack_range": 0.67,
      "pre_attack_delay": 0.0333333,
      "knockback": 0,
      "knockback_angle": 45,
      "time_between_attacks": 0.5,
      "has_aoe": false,
      "aoe_type": null,
      "aoe_damage_percentage": null,
      "aoe_knockback_percentage": null,
      "aoe_radius": null,
      "min_episode_completed": 3,
      "min_pvp_rank": 0,
      "min_player_level": 40,
      "updated_at": "2019-05-23T12:23:44.496Z",
      "_id": "5cab3bc67af55f15c8f99705",
      "name": "Oshino Shinobu",
      "powers": [
        {
          "type": "power_damage",
          "amount": 27,
          "duration": null,
          "is_charged": false,
          "charged_regen": null,
          "radius": null,
          "locked": false
        }
      ],
      "tech_tree": {
        "slots": [
          {
            "property": "stat_max_health",
            "value": 9
          },
          {
            "property": "stat_damage",
            "value": 4
          },
          // ...
        ],
        "levels": [
          {
            "slots": [
              {
                "property": "stat_max_health",
                "value": 54
              },
              {
                "property": "stat_damage",
                "value": 12
              }
            ]
          },
          {
            "slots": [
              {
                "property": "stat_max_health",
                "value": 163
              },
              {
                "property": "stat_damage",
                "value": 36
              }
            ]
          },
          // ...
        ]
      }
    },
    "error": null
  }
  ```
  ```
  NOTE: The upgrades and levels arrays have been cut short for convenience.
  ```
- ### Error Response:
  ```json
  {
    "code": 500,
    "success": false,
    "data": null,
    "error": "..."
  }
  ```
- ### Sample Call:
  ```js
  fetch("https://sppd.feinwaru.com/api/v1/cards/5cab3bc67af55f15c8f99705")
    .then(res => JSON.parse(res))
    .then(res => {
      // use the response
    })
    .catch(error => {
      // handle the error
    });
  ```

# Card Details By Image
Returns complete json data for 1 card.
```
NOTE: This route is slower than an id lookup due to how MongoDB works. Use the 'Card Details' route instead where possible.
```

- ### URL:
  ```
  /cards/image/:image
  ```
- ### Method:
  ```
  GET
  ```
- ### URL Params:
  Required:
  ```
  null
  ```
  Optional:
  ```
  null
  ```
- ### Data Params:
  ```
  null
  ```
- ### Success Response:
  ```json
  {
    "code": 200,
    "success": true,
    "data": {
      "aliases": [],
      "description": "It's beautiful. I've looked at this for 5 hours now.",
      "image": "OshinoShinobu",
      "mana_cost": 2,
      "damage": 49,
      "health": 49,
      "type": "character",
      "character_type": "assassin",
      "rarity": 3,
      "theme": "fantasy",
      "health_loss": null,
      "cast_area": "own_side",
      "max_velocity": 1.35,
      "time_to_reach_max_velocity": 0.1,
      "agro_range_multiplier": 2.99,
      "can_attack": true,
      "attack_range": 0.67,
      "pre_attack_delay": 0.0333333,
      "knockback": 0,
      "knockback_angle": 45,
      "time_between_attacks": 0.5,
      "has_aoe": false,
      "aoe_type": null,
      "aoe_damage_percentage": null,
      "aoe_knockback_percentage": null,
      "aoe_radius": null,
      "min_episode_completed": 3,
      "min_pvp_rank": 0,
      "min_player_level": 40,
      "updated_at": "2019-05-23T12:23:44.496Z",
      "_id": "5cab3bc67af55f15c8f99705",
      "name": "Oshino Shinobu",
      "powers": [
        {
          "type": "power_damage",
          "amount": 27,
          "duration": null,
          "is_charged": false,
          "charged_regen": null,
          "radius": null,
          "locked": false
        }
      ],
      "tech_tree": {
        "slots": [
          {
            "property": "stat_max_health",
            "value": 9
          },
          {
            "property": "stat_damage",
            "value": 4
          },
          // ...
        ],
        "levels": [
          {
            "slots": [
              {
                "property": "stat_max_health",
                "value": 54
              },
              {
                "property": "stat_damage",
                "value": 12
              }
            ]
          },
          {
            "slots": [
              {
                "property": "stat_max_health",
                "value": 163
              },
              {
                "property": "stat_damage",
                "value": 36
              }
            ]
          },
          // ...
        ]
      }
    },
    "error": null
  }
  ```
  ```
  NOTE: The upgrades and levels arrays have been cut short for convenience.
  ```
- ### Error Response:
  ```json
  {
    "code": 500,
    "success": false,
    "data": null,
    "error": "..."
  }
  ```
- ### Sample Call:
  ```js
  fetch("https://sppd.feinwaru.com/api/v1/cards/OshinoShinobu")
    .then(res => JSON.parse(res))
    .then(res => {
      // use the response
    })
    .catch(error => {
      // handle the error
    });
  ```
  ```
  NOTE: The image name is case sensitive.
  ```

# Card List
Returns a list of all card ids, names, images, and update timestamps.

- ### URL:
  ```
  /cards/list
  ```
- ### Method:
  ```
  GET
  ```
- ### URL Params:
  Required:
  ```
  null
  ```
  Optional:
  ```
  null
  ```
- ### Data Params:
  ```
  null
  ```
- ### Success Response:
  ```json
  {
    "code": 200,
    "success": true,
    "data": [
      {
        "image": "SharonAdvCard",
        "updated_at": "2019-05-23T12:23:44.496Z",
        "_id": "5caa0c31239776133c3b9a86",
        "name": "Medicine Woman Sharon"
      },
      {
        "image": "RandyAdvCard",
        "updated_at": "2019-05-23T12:23:44.496Z",
        "_id": "5caa0c31239776133c3b9a87",
        "name": "Pocahontas Randy"
      },
      {
        "image": "StanAdvCard",
        "updated_at": "2019-05-23T12:23:44.496Z",
        "_id": "5caa0c31239776133c3b9a88",
        "name": "Stan of Many Moons"
      },
      // ...
    ],
    "error": null
  }
  ```
  ```
  NOTE: The data array has been cut short for convenience.
  NOTE: This route returns a lot of data and should be cached as to not abuse our servers.

  UPDATE: An 'updated_at' field has been added to each card. This can be compared against a local version to fetch card updates when needed.
  ```
- ### Error Response:
  ```json
  {
    "code": 500,
    "success": false,
    "data": null,
    "error": "..."
  }
  ```
- ### Sample Call:
  ```js
  fetch("https://sppd.feinwaru.com/api/v1/cards/list")
    .then(res => JSON.parse(res))
    .then(res => {
      // use the response
    })
    .catch(error => {
      // handle the error
    });
  ```
