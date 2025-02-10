// ================== Part 1 ================
console.log("==== Part 1 ====");
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"],
    },
  },

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  },
};

adventurer.roll();
adventurer.roll();
adventurer.roll();
adventurer.roll();

// ================== Part 2 ================
console.log("==== Part 2 ====");
class Character {
  static MAX_HEALTH = 100;
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.companion.roll();
robin.companion.companion.roll();

// ================== Part 3 ================
console.log("==== Part 3 ====");

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];
  constructor(name, role) {
    super(name);
    // Adventurers have specialized roles
    if (Adventurer.ROLES.find((r) => r.toLowerCase() === role.toLowerCase())) {
      this.role = role;
    }
    // Every adventurer starts with a bedroll and 50 gold coins
    this.inventory.push("bedroll", "50 gold coins");
  }
  // Adventurers have the ability to scout ahead of them
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}

class Companion extends Character {
  constructor(name, type, companionTo) {
    super(name);
    this.type = type;
    this.companionTo = companionTo;
  }
  // Companions can help their adventurers
  help() {
    console.log(`${this.name} is helping out ${this.companionTo.name}`);
    super.roll();
  }
}

const robin1 = new Adventurer("Robin", "Healer");
console.log(robin1);
const leo = new Companion("Leo", "Cat", robin1);
const frank = new Companion("Frank", "Flea", leo);
