// Dinosaurs
class Dinosaur {
  constructor(name, speed, fast, dc, carnivore, ac, hp, at, dmg, con) {
    this.name = name;
    this.speed = speed;
    this.fast = fast;
    this.dc = dc;
    this.carnivore = carnivore;
    this.ac = ac;
    this.hp = hp;
    this.at = at;
    this.dmg = dmg;
    this.con = con;
  }
  conSave() {
    var save = roll("1d20+"+this.con);
    console.log(this.name+" rolled "+save+" on their CON save.")
    if (save < 10) {
      this.speed = this.speed / 2;
      this.fast = this.fast / 2;
      console.log(this.name+"'s speed is now "+this.speed+"/"+this.fast+"!");
    }
  }
  attack(otherDino) {
    // TODO
  }
};
class Allosaurus extends Dinosaur {
  constructor(name) {
    if (name == null) {
      super("Allosaurus", 50, 80, 16, true, 13, 30, 6, "1d10+3", 2);
    } else {
      super(name, 50, 80, 16, true, 13, 30, 6, "1d10+3", 2);
    }
  }
}
class Deinonychus extends Dinosaur {
  constructor() {
    super(40, 60, 12, true, 13, 26, 4, "1d8+2", 2);
  }
};
class Dimetrodon extends Dinosaur {
  constructor() {
    super(30, 50, 8, false, 12, 19, 3, "2d6+1", 2);
  }
};
class Hadrosaurus extends Dinosaur {
  constructor() {
    super(40, 50, 10, false, 11, 19, 3, "1d10+1", 1);
  }
};
class Other extends Dinosaur {
  constructor() {
    super(40, 60, 12, false, 12, 24, 3, "1d8+2", 3);
  }
};
class Triceratops extends Dinosaur {
  constructor() {
    super(50, 75, 14, false, 13, 38, 5, "1d10+1", 2);
  }
};
class TRex extends Dinosaur {
  constructor() {
    super(50, 100, 18, true, 13, 46, 6, "1d12+3", 3);
  }
};

// basic constructor for someone riding a dino
class Rider {
  constructor(name, dino, skillMod) {
    this.name = name;
    this.ah = "1d20+"+skillMod;
    this.dino = dino;
    this.dist = 0;
  }
  ride() {
    var ahCheck = roll(this.ah);
    console.log(this.name + " rolled a(n) "+ahCheck+" on their Animal Handling check.");
    
    if (ahCheck >= this.dino.dc) {
      this.dist += this.dino.speed;
      console.log(this.dino.name+" moves forward "+this.dino.speed+" feet!");
    }
    console.log(this.dino.name+" is "+this.dist+" feet into the race.");
  }
  thrash() {
    console.log(this.name+" is thrashing "+this.dino.name+" furiously!");
    
    // animal handling check is made with advantage
    var roll1 = roll(this.ah), roll2 = roll(this.ah);
    console.log(this.name+" rolled "+roll1+" and "+roll2+" on their Animal Handling check.");
    var result = Math.max(roll1, roll2);
    
    // if successful, move forward faster
    if (result >= this.dino.dc) {
      this.dist += this.dino.fast;
    }
    console.log(this.dino.name+" moves forward "+this.dino.fast+" feet!")
    console.log(this.dino.name+" is "+this.dist+" feet into the race.");
    // but the dino has to make a con save or it gets slower
    this.dino.conSave();
  }
};

/*Simulates a die roll.
Argument: a string representing a die roll (for example, "1d4+2" or "d20")
returns: an integer showing the result of the roll
*/
function roll(str) {
  arr = str.split("d");
  numDice = arr[0];
  secondPart = arr[1].split("+")
  sides = secondPart[0]
  modifier = secondPart[1]
  
  //numDice, sides, modifier are the only ones we care about now. Cast them to integers
  if (numDice != "") {
    numDice = parseInt(numDice);
  } else {
    numDice = 1;
  }
  sides = parseInt(sides);
  if (modifier != null) {
    modifier = parseInt(modifier);
  } else {
    modifier = 0;
  }

  // now do the actual rolling
  total = 0;
  for (i = 0; i < numDice; i++) {
    total += Math.ceil(Math.random()*sides);
  }
  total += modifier;
  
  return total;
}



//test
joe = new Rider("Joe", new Allosaurus("Spronky"), 4);
try {
  joe.ride();
  joe.thrash();
} catch(e) {
  console.log(e.stack)
}
