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

let counter: number = 0;
const counterElement = document.createElement("div");
counterElement.innerHTML =
  `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";
app.append(counterElement);

button.onclick = () => updateCounter();

function updateCounter(amount: number = 1) {
  counter += amount;
  counterElement.innerHTML =
    `${Math.round(counter)} 🦟` + (counter > 1 ? "s " : " ") + "swatted";
}

let lastTime = 0;

function frameUpdate(currentTime: number) {
  const delta = (currentTime - lastTime) / 1000;

  lastTime = currentTime;

  updateCounter(delta);

  requestAnimationFrame(frameUpdate);
}

requestAnimationFrame(frameUpdate);
