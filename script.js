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
    //console.log(`${this.name} rolled a ${result}.`);
    return result;
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

  //==== Part 6 ====
  // Create an additional method, duel(), for the Adventurer class with the following functionality:
  // Accept an Adventurer as a parameter.
  // Use the roll() functionality to create opposing rolls for each adventurer.
  // Subtract 1 from the adventurer with the lower roll.
  // Log the results of this “round” of the duel, including the rolls and current health values.
  // Repeat this process until one of the two adventurers reaches 50 health.
  // Log the winner of the duel: the adventurer still above 50 health.
  duel(adventurer) {
    while (this.health >= 50 && adventurer.health >= 50) {
      const opponentRoll = adventurer.roll();
      const roll = super.roll();
      if (roll < opponentRoll) {
        this.health--;
      } else {
        adventurer.health--;
      }
      console.log(
        `Your opponent ${adventurer.name} rolled ${opponentRoll}. You rolled ${roll}. Your opponent has ${adventurer.health} health, and you have ${this.health} health.`
      );
    }

    if (this.health < 50) {
      console.log(`${this.name} lost, ${adventurer.name} won the duel`);
    } else if (adventurer.health < 50) {
      console.log(`${adventurer.name} lost, ${this.name} won the duel`);
    }
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

// ================== Part 5 ================
console.log("==== Part 5 ====");

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robin2 = healers.generate("Robin");

const sherif = new Adventurer("Sherif Nottingham", "Fighter");

robin2.duel(sherif);
