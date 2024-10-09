import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mosquito Swatting Simulator";
document.title = gameName;

let counter: number = 0;
let startTime: number = 0;
let growthRate: number = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🦟";

const upgrade: HTMLButtonElement = document.createElement("button");
upgrade.innerHTML = "🎾";
upgrade.disabled = true;

const counterElement = document.createElement("div");
counterElement.innerHTML =
  `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";

app.append(button);
app.append(upgrade);
app.append(counterElement);

function updateCounter(amount: number = 1) {
  counter += amount;
  const counterInteger: number = Math.round(counter);
  counterElement.innerHTML =
    `${counterInteger} 🦟` + (counterInteger > 1 ? "s " : " ") + "swatted";
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
  counter -= 10;

  requestAnimationFrame(frameUpdate);
}

function checkUnlock() {
  if (counter >= 10) {
    upgrade.disabled = false;
    growthRate = 1;
  }
}

button.onclick = () => updateCounter();
upgrade.onclick = () => requestAnimationFrame(startTimeUpdate);
checkUnlock();
