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

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
app.append(buttonContainer);

const mainButton = document.createElement("button");
mainButton.onclick = () => incrementCounter(1);
mainButton.classList.add("main-button");
mainButton.innerHTML = `<span>🫱</span><span class="${"fly"}">🦟</span>`;
buttonContainer.append(mainButton);

const displayContainer = document.createElement("div");
displayContainer.classList.add("display-container");
buttonContainer.append(displayContainer);

const counterElement = document.createElement("div");
counterElement.classList.add("counter");
displayContainer.append(counterElement);

const growthDisplay = document.createElement("div");
growthDisplay.classList.add("counter");
displayContainer.append(growthDisplay);

const upgradeMenu = document.createElement("h2");
upgradeMenu.innerHTML = "UPGRADES:";
upgradeMenu.classList.add("upgrade-counter");
app.append(upgradeMenu);

const buttonDiv = document.createElement("div");
app.append(buttonDiv);

const descriptions = document.createElement("div");
descriptions.classList.add("descriptions");
app.append(descriptions);

interface Item {
  button: HTMLButtonElement;
  name: string;
  cost: number;
  growthRate: number;
  upgradeCounter: HTMLDivElement;
  description: string;
  amount: number;

  applyUpgrade(): void;
  updateButtonDescription(): void;
}

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
  amount: 0,
  applyUpgrade: function () {
    incrementCounter(-this.cost);
    growthRate += this.growthRate;
    this.amount++;
    this.cost *= COST_MULTIPLIER;
    this.updateButtonDescription();
  },
  updateButtonDescription: function () {
    this.button.innerHTML =
      this.name + `: x${this.amount}` + "<br> Cost: " + this.cost.toFixed(2);
    this.upgradeCounter.innerHTML = this.name + " : " + this.description;
  },
}));

class UIUpdater {
  updateGameUI(increaseAmount: number): void {
    counter += increaseAmount;
    counterElement.innerHTML = `Swatted: ${Math.round(counter)} 🦟`;
    growthDisplay.innerHTML = `Growth: ${growthRate.toFixed(2)} 🦟/sec`;
    availableItems.forEach(
      ({ button, cost }) => (button.disabled = counter < cost),
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
  descriptions.append(currentItem.upgradeCounter);
}

requestAnimationFrame(
  (time) => ((startTime = time), frameUpdate(performance.now())),
);
