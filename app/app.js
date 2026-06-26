const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function make(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function getProductName(data, id) {
  const product = data.products.find((p) => p.id === id);
  return product ? product.name : id;
}

function getEventClass(event) {
  if (event.type === "delivery") return "delivery";
  if (event.type === "tank_cleaning") return "cleaning";
  if (event.type === "milking") return "milking";
  if (event.type === "buffer") return "buffer";
  if (event.productId === "milk") return "milk";
  if (event.productId && event.productId.includes("yoghurt")) return "yoghurt";
  if (event.type && event.type.includes("maturation")) return "yoghurt";
  return "batch";
}

function getEventLabel(data, event) {
  if (event.description) return event.description;
  if (event.productId) return getProductName(data, event.productId);
  return event.type.replaceAll("_", " ");
}

function getEventTime(event) {
  if (!event.start && !event.end) return "";
  if (event.start && event.end && event.start !== event.end) return event.start + "-" + event.end;
  return event.start || event.end || "";
}

function renderChecks(data) {
  const root = document.getElementById("checks");
  root.innerHTML = "";
  data.checks.forEach((check) => {
    const card = make("article", "check " + (check.status === "warning" ? "warn" : "ok"));
    card.appendChild(make("strong", "", check.id.replaceAll("_", " ")));
    card.appendChild(make("span", "", check.message));
    root.appendChild(card);
  });
}

function renderSourceData(data) {
  const root = document.getElementById("source-data");
  root.innerHTML = "";
  const milkings = data.milkSupply.milkings.map((m) => m.start + "-" + m.end).join(" and ");
  const deliveries = data.deliveries.map((d) => d.day + " " + d.time).join(" and ");
  const items = [
    ["Farm", data.farm.name],
    ["Daily milk", data.milkSupply.dailyMilkLitres + " litres"],
    ["Milkings", milkings],
    ["Raw milk tank", data.rawMilkTank.capacityLitres + " litres"],
    ["Maximum tank age", data.rawMilkTank.maxMilkAgeHours + " hours"],
    ["Delivery deadlines", deliveries],
    ["Maximum active workday", data.farm.maximumActiveProductionHoursPerDay + " hours"],
    ["Products", data.products.length + " products"]
  ];
  items.forEach(([label, value]) => {
    const item = make("div");
    item.appendChild(make("span", "", label));
    item.appendChild(make("strong", "", value));
    root.appendChild(item);
  });
}

function renderWeek(data) {
  const root = document.getElementById("week");
  root.innerHTML = "";
  DAYS.forEach((dayName) => {
    const day = make("section", "day");
    day.appendChild(make("h3", "", dayName));
    const events = data.schedule.filter((event) => event.day === dayName);
    if (!events.length) {
      day.appendChild(make("div", "event buffer", "No fixed production"));
    }
    events.forEach((event) => {
      const card = make("div", "event " + getEventClass(event));
      const time = getEventTime(event);
      card.textContent = time ? time + " " + getEventLabel(data, event) : getEventLabel(data, event);
      day.appendChild(card);
    });
    root.appendChild(day);
  });
}

fetch("small-dairy-example.json")
  .then((response) => {
    if (!response.ok) throw new Error("Could not load example data");
    return response.json();
  })
  .then((data) => {
    renderChecks(data);
    renderSourceData(data);
    renderWeek(data);
  })
  .catch((error) => {
    const warning = make("section", "notice", error.message);
    document.querySelector("main").prepend(warning);
  });
