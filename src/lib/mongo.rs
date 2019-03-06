extern crate mongodb;

use std;
use std::env;

use mongodb::{Client, ThreadedClient};

const DEFAULT_MONGO_ADDRESS: &'static str = "localhost";

pub fn connect() -> std::sync::Arc<mongodb::ClientInner> {
  let database_url = match env::var("MONGO_ADDRESS") {
    Ok(value) => value,
    Err(_) => DEFAULT_MONGO_ADDRESS.to_string()
  };

  let client = Client::connect(&database_url, 27017).expect("Failed to initialise standalone client.");

  client
}
