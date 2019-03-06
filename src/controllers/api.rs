extern crate bson;
extern crate rocket_contrib;
extern crate mongodb;
extern crate serde_json;
extern crate rocket;

#[path="../models/mod.rs"]
mod models; 

use rocket_contrib::json::{Json, JsonValue};

#[post("/card", format="application/json", data="<card>")]
pub fn create(card: Json<models::card::Model>) -> JsonValue {
  let result = card.create();

  match result {
    Ok(card) => {
      json!({
        "code": 201,
        "success": true,
        "data": card,
        "error": ""
      })
    },
    Err(_e) => {
      json!({
        "code": 412,
        "success": false,
        "data": {},
        "error": "An error has occured. I know very helpful, right?"
      })
    }
  }
}

#[get("/card/<id>", format="application/json")]
pub fn get(id: String) -> JsonValue {
  let result = models::card::find_one(id.to_owned());

  match result {
    Ok(card) => {
      json!({
        "code": 200,
        "success": true,
        "data": card,
        "error": ""
      })
    },
    Err(_e) => {
      json!({
        "code": 400,
        "success": false,
        "data": {},
        "error": "An error has occured. I know very helpful, right?"
      })
    }
  }
}
