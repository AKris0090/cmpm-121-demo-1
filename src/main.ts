import "./style.css";

const COST_MULTIPLIER = 1.15;
const app = document.querySelector("#app")!;

const gameName = "🦟 Mosquito Swatting Simulator🦟";
document.title = gameName;

let counter = 0;
let startTime = 0;
let growthRate = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttonDiv = document.createElement("div");
app.append(buttonDiv);

const mainButton = document.createElement("button");
mainButton.innerHTML = "🫱🦟";
mainButton.onclick = () => incrementCounter(1);
buttonDiv.append(mainButton);

const counterElement = document.createElement("div");
app.append(counterElement);
const growthDisplay = document.createElement("div");
app.append(growthDisplay);

const upgradeMenu = document.createElement("h2");
upgradeMenu.innerHTML = "UPGRADES:";
app.append(upgradeMenu);

interface UpgradeState {
  amount: number;
  cost: number;
  growthRate: number;
}

interface Item {
  button: HTMLButtonElement;
  name: string;
  upgradeCounter: HTMLDivElement;
  description: string;
  state: UpgradeState;

  applyUpgrade(): void;
  updateButtonDescription(): void;
}

class UIUpdater {
  updateGameUI(increaseAmount: number): void {
    counter += increaseAmount;
    counterElement.innerHTML = `${Math.round(counter)} 🦟 swatted`;
    growthDisplay.innerHTML = `${growthRate} 🦟/sec`;
    availableItems.forEach(
      ({ button, state }) => (button.disabled = counter < state.cost),
    );
  }

  frameUpdate(currentTime: number) {
    const delta = (currentTime - startTime) / 1000;
    startTime = currentTime;
    uiManager.updateGameUI(delta * growthRate);
    requestAnimationFrame(frameUpdate);
  }
}

const uiManager = new UIUpdater();

const availableItems: Item[] = [
  {
    name: "Auto Swatter 🗞",
    state: { cost: 10, growthRate: 2 },
    description: "Swatting automatically with the daily paper",
  },
  {
    name: "UV Lamp 🛋️",
    state: { cost: 100, growthRate: 10 },
    description: "Attracting mosquitos with UV light",
  },
  {
    name: "Electric Swatter 🎾",
    state: { cost: 200, growthRate: 100 },
    description: "Its almost like playing tennis",
  },
  {
    name: "Repellant Spray 🌿",
    state: { cost: 5000, growthRate: 500 },
    description:
      "A protective layer that keeps mosquitos away while you swat in peace",
  },
  {
    name: "Mosquito Drone 🚁",
    state: { cost: 20000, growthRate: 1000 },
    description:
      "An advanced AI-driven drone that targets mosquitos autonomously.",
  },
].map((item) => ({
  ...item,
  button: document.createElement("button"),
  upgradeCounter: document.createElement("div"),
  state: { ...item.state, amount: 0 },
  applyUpgrade: function () {
    incrementCounter(-this.state.cost);
    growthRate += this.state.growthRate;
    this.state.amount++;
    this.state.cost *= COST_MULTIPLIER;
    this.updateButtonDescription();
  },
  updateButtonDescription: function () {
    this.upgradeCounter.innerHTML =
      this.name +
      ` x${this.state.amount}, cost: ` +
      this.state.cost +
      " : " +
      this.description;
  },
}));

function frameUpdate(currentTime: number) {
  const delta = (currentTime - startTime) / 1000;
  startTime = currentTime;
  uiManager.updateGameUI(delta * growthRate);
  requestAnimationFrame(frameUpdate);
}

function incrementCounter(amount: number): void {
  counter += amount;
}

for (const currentItem of availableItems) {
  currentItem.button.innerHTML = currentItem.name;
  currentItem.button.disabled = true;
  currentItem.updateButtonDescription();
  currentItem.button.onclick = () => {
    currentItem.applyUpgrade();
  };
  buttonDiv.append(currentItem.button);
  app.append(currentItem.upgradeCounter);
}

requestAnimationFrame(
  (time) => ((startTime = time), frameUpdate(performance.now())),
);
