import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mosquito Swatting Simulator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🦟";
app.append(button);

const upgrade: HTMLButtonElement = document.createElement("button");
upgrade.innerHTML = "🎾";
upgrade.disabled = true;
app.append(upgrade);

let counter: number = 0;
const counterElement = document.createElement("div");
counterElement.innerHTML =
  `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";
app.append(counterElement);

button.onclick = () => updateCounter();

function updateCounter(amount: number = 1) {
  counter += amount;
  counterElement.innerHTML =
    `${Math.round(counter)} 🦟` +
    (Math.round(counter) > 1 ? "s " : " ") +
    "swatted";
  checkUnlock();
}

let startTime: number = 0;
let growthRate: number = 0;

function frameUpdate(currentTime: number) {
  const delta = (currentTime - startTime) / 1000;

  startTime = currentTime;

  updateCounter(delta * growthRate);

  requestAnimationFrame(frameUpdate);
}

function startTimeUpdate(currentTime: number) {
  startTime = currentTime;
  counter -= 10;

  requestAnimationFrame(frameUpdate);
}

upgrade.onclick = () => requestAnimationFrame(startTimeUpdate);

function checkUnlock() {
  if (counter >= 10) {
    upgrade.disabled = false;
    growthRate = 1;
  }
}

checkUnlock();
