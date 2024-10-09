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

setInterval(updateCounter, 1000);
button.onclick = updateCounter;

function updateCounter() {
  counter++;
  counterElement.innerHTML =
    `${counter} 🦟` + (counter > 1 ? "s " : " ") + "swatted";
}
