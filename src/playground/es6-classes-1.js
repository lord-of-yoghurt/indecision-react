class Person {
  constructor(name = "Some Weird Dude", age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    return `Hi, I\'m ${this.name}! I am ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, school = "Unknown School") {
    super(name, age);
    this.school = school;
  }

  getGreeting() {
    return `I am ${this.name}, I am ${this.age} years old, and I go to ${this.school}.`;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }

  getGreeting() {
    if (!this.homeLocation) {
      return `Hi, my name is ${this.name}.`;
    }
    return `Hi, I am ${this.name}, and I'm visiting from ${this.homeLocation}!`;
  }
}

const david = new Traveler('David', 28, 'New York');
console.log(david.getGreeting());
