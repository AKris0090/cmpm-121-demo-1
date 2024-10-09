import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mosquito Swatting Simulator";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🦟";
app.append(button);