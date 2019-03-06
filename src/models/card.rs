extern crate mongodb;
extern crate serde;
extern crate bson;

#[path="../lib/mod.rs"]
mod lib;

use std::io::Error;
use std::option::Option;

use serde::{Serialize, Deserialize};

use bson::oid::ObjectId;
use mongodb::ordered::OrderedDocument;

use mongodb::ThreadedClient;
use mongodb::db::ThreadedDatabase;

#[derive(Serialize, Deserialize)]
pub struct Targeting {
  pub asset_id: String,
  pub radius: f32
}

#[derive(Serialize, Deserialize)]
pub struct Slot {
  pub x: i32,
  pub property: String,
  pub value: f32
}

#[derive(Serialize, Deserialize)]
pub struct Evolve {
  pub star_level: i32,
  pub slots: Vec<Slot>
}

#[derive(Serialize, Deserialize)]
pub struct TechTree2 {
  pub slots: Vec<Slot>,
  pub evolve: Vec<Evolve>
}

#[derive(Serialize, Deserialize)]
pub struct Requirements {
  pub min_episode_completed: i32,
  pub min_player_level: i32,
  pub min_pvp_rank: i32
}

#[derive(Serialize, Deserialize)]
pub struct Model {
  pub id: i32,
  pub visible: bool,
  pub can_attack: bool,
  pub name: Vec<String>,
  pub description: String,
  pub image: String,
  pub mana_cost: i32,
  pub damage: i32,
  pub health: i32,
  pub health_loss: i32,
  pub r#type: String,
  pub targeting: Targeting,
  pub character_type: String,
  pub ingame: String,
  pub attack_range: f32,
  pub time_to_reach_max_velocity: f32,
  pub max_velocity: f32,
  pub time_in_between_attacks: f32,
  pub power_duration: i32,
  pub power_heal: i32,
  pub power_hero_heal: i32,
  pub power_max_hp_gain: i32,
  pub power_max_hp_loss: i32,
  pub power_summon_level: i32,
  pub power_damage: i32,
  pub power_hero_damage: i32,
  pub power_poison_amount: i32,
  pub power_hero_poison: i32,
  pub power_attack_boost: i32,
  pub power_attack_decrease: i32,
  pub agro_range_multiplier: f32,
  pub knockback_impulse: i32,
  pub knockback_angle_deg: f32,
  pub charged_power_regen: f32,
  pub charged_power_radius: f32,
  pub charged_power_reticle: String,
  pub rarity: i32,
  pub theme: String,
  pub tech_tree_2: TechTree2,
  pub requirements: Requirements,
  pub aoe_attack_type: bool,
  pub aoe_damage_percentage: f32,
  pub aoe_radius: f32,
  pub aoe_knockback_percentage: f32,
  pub targeting_type: String,
  pub pre_attack_delay: f32,
  pub cast_area: String,
  pub child_unit_limit: i32
}

impl Model {
  pub fn to_ordered(&self) -> OrderedDocument {
    mongodb::from_bson(mongodb::to_bson(&self).unwrap()).unwrap()
  }

  pub fn create(&self) -> Result<Option<OrderedDocument>, Error> {
    let client = lib::mongo::connect();
    let collection = client.db("sppd").collection("cards");
    collection.insert_one(self.to_ordered(), None).ok().expect("Failed to insert document.");

    let response_document = collection.find_one(Some(self.to_ordered().clone()), None).ok().expect("Failed to execute find.");

    Ok(response_document)
  }
}

pub fn find(name: String, theme: String, rarity: String, page: u32, limit: u32) -> () {
  
}

pub fn find_one(id: String) -> Result<Option<OrderedDocument>, Error> {
  let client = lib::mongo::connect();
  let collection = client.db("sppd").collection("cards");

  let id = ObjectId::with_string(&id).unwrap();

  let response_document = collection.find_one(Some(doc! { "_id" => id }), None).ok().expect("Failed to execute find.");

  Ok(response_document)
}
