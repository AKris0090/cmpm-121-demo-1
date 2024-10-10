import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🦟 Mosquito Swatting Simulator🦟";
document.title = gameName;

let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 0;

interface Item {
  button: HTMLButtonElement;
  cost: number;
  growthRate: number;
  currentAmount: number;
  name: string;
  upgradeCounter: HTMLDivElement;
  description: string;
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🫱🦟";

const counterElement = document.createElement("div");
counterElement.innerHTML =
  `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML =
  `${growthRate} 🦟` + (growthRate > 1 ? "s " : " ") + "mosquito / sec";

const upgradeMenu = document.createElement("h2");
upgradeMenu.innerHTML = "UPGRADES:";

const availableItems: Item[] = [
  {
    button: document.createElement("button"),
    cost: 10,
    growthRate: 2,
    name: "Auto Swatter 🗞",
    currentAmount: 0,
    upgradeCounter: document.createElement("div"),
    description: "Swatting automatically with the daily paper",
  },
  {
    button: document.createElement("button"),
    cost: 100,
    growthRate: 10,
    name: "UV Lamp 🛋️",
    currentAmount: 0,
    upgradeCounter: document.createElement("div"),
    description: "Attracting mosquitos with UV light",
  },
  {
    button: document.createElement("button"),
    cost: 200,
    growthRate: 100,
    name: "Electric Swatter 🎾",
    currentAmount: 0,
    upgradeCounter: document.createElement("div"),
    description: "Its almost like playing tennis",
  },
  {
    button: document.createElement("button"),
    cost: 5000,
    growthRate: 500,
    name: "Repellant Spray 🌿",
    currentAmount: 0,
    upgradeCounter: document.createElement("div"),
    description:
      "A protective layer that keeps mosquitos away while you swat in peace",
  },
  {
    button: document.createElement("button"),
    cost: 20000,
    growthRate: 1000,
    name: "Mosquito Drone 🚁",
    currentAmount: 0,
    upgradeCounter: document.createElement("div"),
    description:
      "An advanced AI-driven drone that targets mosquitos autonomously.",
  },
];

app.append(button);
for (const curr of availableItems) {
  curr.button.innerHTML = curr.name;
  curr.button.disabled = true;
  curr.upgradeCounter.innerHTML =
    curr.name +
    ` x${curr.currentAmount}, cost: ` +
    curr.cost +
    " : " +
    curr.description;
  app.append(curr.button);
}
app.append(counterElement);
app.append(growthDisplay);
app.append(upgradeMenu);
for (const curr of availableItems) {
  app.append(curr.upgradeCounter);
}

function updateCounter(amount: number = 1) {
  counter += amount;
  const counterInteger: number = Math.round(counter);
  counterElement.innerHTML =
    `${counterInteger} 🦟` + (counterInteger > 1 ? "s " : " ") + "swatted";
  growthDisplay.innerHTML =
    `${growthRate} 🦟` + (growthRate > 1 ? "s " : " ") + "mosquito / sec";
  checkUnlock();
}

function frameUpdate(currentTime: number) {
  const delta = (currentTime - startTime) / 1000;

  startTime = currentTime;

  updateCounter(delta * growthRate);

  requestAnimationFrame(frameUpdate);
}

function startTimeUpdate(currentTime: number) {
  startTime = currentTime;

  frameUpdate(currentTime);
}

function subtractCost(curr: Item) {
  counter -= curr.cost;
  growthRate += curr.growthRate;
  curr.currentAmount++;
  curr.cost *= 1.15;
  curr.upgradeCounter.innerHTML =
    curr.name +
    ` x${curr.currentAmount}, cost: ` +
    curr.cost +
    " : " +
    curr.description;
}

function checkUnlock() {
  for (const curr of availableItems) {
    if (counter >= curr.cost && curr.button.disabled) {
      curr.button.disabled = false;
    } else if (counter < curr.cost && !curr.button.disabled) {
      curr.button.disabled = true;
    }
  }
}

button.onclick = () => updateCounter();
for (const curr of availableItems) {
  curr.button.onclick = () => subtractCost(curr);
}

requestAnimationFrame(() => startTimeUpdate(performance.now()));
