#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate mongodb;
#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

mod lib;
mod models;
mod controllers;

fn main() {
  rocket::ignite().mount("/api/v1", routes![controllers::api::create, controllers::api::get]).launch();
}
