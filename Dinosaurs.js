// Dinosaurs
class Dinosaur {
  constructor(speed, fast, dc, carnivore, ac, hp, at, dmg, con) {
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
    if (save > 10) {
      this.speed = this.speed / 2;
      this.fast = this.fast / 2;
    }
  }
  attack(otherDino) {
    // TODO
  }
  get dc() {return this.dc;}
};
class Allosaurus extends Dinosaur {
  constructor() {
    super(50, 80, 16, true, 13, 30, 6, "1d10+3", 2);
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
  constructor(dino, skillMod) {
    this.ah = "1d20+"+skillMod;
    this.dinosaur = dino;
    this.distance = 0;
  }
  ride() {
    if (roll(this.ah) >= this.dinosaur.dc()) {
      this.distance += this.dinosaur[speed];
    }
    console.log(this.distance)
  }
  thrash() {
    // animal handling check is made with advantage
    var result = Math.max(roll(this.ah), roll(this.ah));
    
    // if successful, move forward faster
    if (result >= this.dinosaur[dc]) {
      this.distance += this.dinosaur[fast];
    }
    console.log(this.distance)
    // but the dino has to make a con save or it gets slower
    this.dinosaur.conSave();
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
rider = new Rider(new Allosaurus(),6);
rider.ride();
