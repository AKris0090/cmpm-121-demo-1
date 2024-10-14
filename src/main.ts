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

const mainButton: HTMLButtonElement = document.createElement("button");
mainButton.innerHTML = "🫱🦟";

const counterElement = document.createElement("div");

const growthDisplay = document.createElement("div");

const upgradeMenu = document.createElement("h2");
upgradeMenu.innerHTML = "UPGRADES:";

const availableItems: Item[] = [
  {
    name: "Auto Swatter 🗞",
    cost: 10,
    growthRate: 2,
    description: "Swatting automatically with the daily paper",
  },
  {
    name: "UV Lamp 🛋️",
    cost: 100,
    growthRate: 10,
    description: "Attracting mosquitos with UV light",
  },
  {
    name: "Electric Swatter 🎾",
    cost: 200,
    growthRate: 100,
    description: "Its almost like playing tennis",
  },
  {
    name: "Repellant Spray 🌿",
    cost: 5000,
    growthRate: 500,
    description:
      "A protective layer that keeps mosquitos away while you swat in peace",
  },
  {
    name: "Mosquito Drone 🚁",
    cost: 20000,
    growthRate: 1000,
    description:
      "An advanced AI-driven drone that targets mosquitos autonomously.",
  },
].map((item) => ({
  ...item,
  button: document.createElement("button"),
  upgradeCounter: document.createElement("div"),
  currentAmount: 0,
}));

const updateDisplay = () => {
  counterElement.innerHTML = `${Math.round(counter)} 🦟 swatted`;
  growthDisplay.innerHTML = `${growthRate} 🦟/sec`;
  availableItems.forEach(
    ({ button, cost }) => (button.disabled = counter < cost),
  );
};

function updateCounter(amount: number = 1) {
  counter += amount;
  updateDisplay();
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
  updateDisplay();
}

function frameUpdate(currentTime: number) {
  const delta = (currentTime - startTime) / 1000;
  startTime = currentTime;
  updateCounter(delta * growthRate);
  requestAnimationFrame(frameUpdate);
}

mainButton.onclick = () => updateCounter();
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
  curr.button.onclick = () => subtractCost(curr);
}
app.append(mainButton);
app.append(counterElement);
app.append(growthDisplay);
app.append(upgradeMenu);
for (const curr of availableItems) {
  app.append(curr.upgradeCounter);
}

requestAnimationFrame(
  (time) => ((startTime = time), frameUpdate(performance.now())),
);
