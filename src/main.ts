import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mosquito Swatting Simulator";
document.title = gameName;

let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 0;

interface UpgradeItem {
  button: HTMLButtonElement;
  cost: number;
  growthRate: number;
  currentAmount: number;
  name: string;
  upgradeCounter: HTMLDivElement;
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🦟";

const autoSwatter: UpgradeItem = {
  button: document.createElement("button"),
  cost: 10,
  growthRate: 0.1,
  name: "🎾",
  currentAmount: 0,
  upgradeCounter: document.createElement("div"),
};
autoSwatter.button.innerHTML = autoSwatter.name;
autoSwatter.button.disabled = true;
autoSwatter.upgradeCounter.innerHTML =
  autoSwatter.name +
  ` x${autoSwatter.currentAmount}, cost: ` +
  autoSwatter.cost;

const UVLamp: UpgradeItem = {
  button: document.createElement("button"),
  cost: 100,
  growthRate: 2.0,
  name: "🛋️",
  currentAmount: 0,
  upgradeCounter: document.createElement("div"),
};
UVLamp.button.innerHTML = UVLamp.name;
UVLamp.button.disabled = true;
UVLamp.upgradeCounter.innerHTML =
  UVLamp.name + ` x${UVLamp.currentAmount}, cost: ` + UVLamp.cost;

const BugSpray: UpgradeItem = {
  button: document.createElement("button"),
  cost: 1000,
  growthRate: 50,
  name: "🗞",
  currentAmount: 0,
  upgradeCounter: document.createElement("div"),
};
BugSpray.button.innerHTML = BugSpray.name;
BugSpray.button.disabled = true;
BugSpray.upgradeCounter.innerHTML =
  BugSpray.name + ` x${BugSpray.currentAmount}, cost: ` + BugSpray.cost;

const counterElement = document.createElement("div");
counterElement.innerHTML =
  `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";

const growthDisplay = document.createElement("div");
growthDisplay.innerHTML =
  `${growthRate} 🦟` + (growthRate > 1 ? "s " : " ") + "mosquito / sec";

const upgradeMenu = document.createElement("h2");
upgradeMenu.innerHTML = "UPGRADES:";

const upgrades: UpgradeItem[] = [autoSwatter, UVLamp, BugSpray];

app.append(button);
for (const curr of upgrades) {
  app.append(curr.button);
}
app.append(counterElement);
app.append(growthDisplay);
app.append(upgradeMenu);
for (const curr of upgrades) {
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

function subtractCost(curr: UpgradeItem) {
  counter -= curr.cost;
  growthRate += curr.growthRate;
  curr.currentAmount++;
  curr.cost *= 1.15;
  curr.upgradeCounter.innerHTML =
    curr.name + ` x${curr.currentAmount}, cost: ` + curr.cost;
}

function checkUnlock() {
  for (const curr of upgrades) {
    if (counter >= curr.cost && curr.button.disabled) {
      curr.button.disabled = false;
    } else if (counter < curr.cost && !curr.button.disabled) {
      curr.button.disabled = true;
    }
  }
}

button.onclick = () => updateCounter();
for (const curr of upgrades) {
  curr.button.onclick = () => subtractCost(curr);
}

requestAnimationFrame(() => startTimeUpdate(performance.now()));
