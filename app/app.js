const DATA_URL = "small-dairy-example.json";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function getById(id) {
  return document.getElementById(id);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatId(id) {
  return String(id || "unknown").replaceAll("_", " ");
}

function formatHours(hours) {
  if (!hours) return "";
  return hours === 1 ? "1 hour" : hours + " hours";
}

function formatLitres(litres) {
  if (!litres) return "";
  return litres + " litres";
}

function formatList(items, fallback) {
  return items.length ? items.join(", ") : fallback;
}

function getProduct(data, id) {
  return asArray(data.products).find((product) => product.id === id);
}

function getProductName(data, id) {
  const product = getProduct(data, id);
  return product ? product.name : formatId(id);
}

function getProductOutput(product) {
  if (!product) return "";
  if (product.batchLitres) return formatLitres(product.batchLitres);
  if (product.batchLitresMin && product.batchLitresMax) {
    return product.batchLitresMin + "-" + product.batchLitresMax + " litres";
  }
  return "";
}

function getProductActiveTime(product) {
  if (!product) return "";
  if (product.activeProductionHours) return formatHours(product.activeProductionHours);

  const parts = [];
  const activeHours = (product.activeStartHours || 0) + (product.activeFinishHours || 0);
  if (activeHours) parts.push(formatHours(activeHours) + " active");
  if (product.maturationHours) parts.push(formatHours(product.maturationHours) + " maturation");
  return parts.join(", ");
}

function getResourceName(data, id) {
  if (id === "raw_milk_tank") return "Raw milk tank";

  const machine = asArray(data.machines).find((item) => item.id === id);
  return machine ? machine.name : formatId(id);
}

function getResourceNames(data, resourceIds) {
  return asArray(resourceIds).map((id) => getResourceName(data, id));
}

function getAllResources(data) {
  const resources = [
    { id: "raw_milk_tank", name: "Raw milk tank" },
    ...asArray(data.machines).map((machine) => ({ id: machine.id, name: machine.name }))
  ];

  asArray(data.schedule).forEach((event) => {
    asArray(event.resourceIds).forEach((resourceId) => {
      if (!resources.some((resource) => resource.id === resourceId)) {
        resources.push({ id: resourceId, name: getResourceName(data, resourceId) });
      }
    });
  });

  return resources;
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

function getEventAction(event) {
  const labels = {
    production: "production",
    production_start: "production start",
    production_finish: "production finish",
    maturation: "maturation",
    tank_cleaning: "tank cleaning"
  };
  return labels[event.type] || formatId(event.type);
}

function getEventTitle(data, event) {
  if (event.productId) {
    return getProductName(data, event.productId) + " " + getEventAction(event);
  }
  if (event.description) return event.description;
  return getEventAction(event);
}

function getEventTime(event) {
  if (!event.start && !event.end) return "";
  if (event.start && event.end && event.start !== event.end) return event.start + "-" + event.end;
  return event.start || event.end || "";
}

function getEventMeta(data, event) {
  const product = getProduct(data, event.productId);
  const output = getProductOutput(product);
  const resources = getResourceNames(data, event.resourceIds);
  const meta = [];

  if (output) meta.push("Output: " + output);
  if (resources.length) meta.push("Resources: " + resources.join(", "));
  return meta;
}

function createTableCell(text) {
  const cell = make("td");
  cell.textContent = text || "Not specified";
  return cell;
}

function renderChecks(data) {
  const root = getById("checks");
  root.innerHTML = "";

  asArray(data.checks).forEach((check) => {
    const status = check.status === "warning" ? "warn" : "ok";
    const card = make("article", "check " + status);
    card.appendChild(make("strong", "", formatId(check.id)));
    card.appendChild(make("span", "", check.message || "No message provided."));
    root.appendChild(card);
  });
}

function renderSourceData(data) {
  const root = getById("source-data");
  root.innerHTML = "";

  const milkings = asArray(data.milkSupply && data.milkSupply.milkings)
    .map((milking) => milking.start + "-" + milking.end)
    .join(" and ");
  const deliveries = asArray(data.deliveries)
    .map((delivery) => delivery.day + " " + delivery.time)
    .join(" and ");
  const items = [
    ["Farm", data.farm && data.farm.name],
    ["Daily milk", data.milkSupply && formatLitres(data.milkSupply.dailyMilkLitres)],
    ["Milkings", milkings],
    ["Raw milk tank", data.rawMilkTank && formatLitres(data.rawMilkTank.capacityLitres)],
    ["Maximum tank age", data.rawMilkTank && formatHours(data.rawMilkTank.maxMilkAgeHours)],
    ["Delivery deadlines", deliveries],
    ["Maximum active workday", data.farm && formatHours(data.farm.maximumActiveProductionHoursPerDay)],
    ["Products", asArray(data.products).length + " products"]
  ];

  items.forEach(([label, value]) => {
    const item = make("div");
    item.appendChild(make("span", "", label));
    item.appendChild(make("strong", "", value || "Not specified"));
    root.appendChild(item);
  });
}

function renderProductOverview(data) {
  const root = getById("product-overview");
  root.innerHTML = "";

  asArray(data.products).forEach((product) => {
    const row = make("tr");
    const resources = getResourceNames(data, product.machineIds);
    row.appendChild(createTableCell(product.name));
    row.appendChild(createTableCell(getProductOutput(product)));
    row.appendChild(createTableCell(product.frequencyPerWeek ? product.frequencyPerWeek + " per week" : ""));
    row.appendChild(createTableCell(product.shelfLifeDays ? product.shelfLifeDays + " days" : ""));
    row.appendChild(createTableCell(getProductActiveTime(product)));
    row.appendChild(createTableCell(formatList(resources, "Not specified")));
    root.appendChild(row);
  });
}

function renderWeek(data) {
  const root = getById("week");
  root.innerHTML = "";

  DAYS.forEach((dayName) => {
    const day = make("section", "day");
    day.appendChild(make("h3", "", dayName));

    const events = asArray(data.schedule).filter((event) => event.day === dayName);
    if (!events.length) {
      day.appendChild(make("div", "event buffer", "No fixed production"));
    }

    events.forEach((event) => {
      const card = make("div", "event " + getEventClass(event));
      const time = getEventTime(event);
      const title = make("strong", "event-title", getEventTitle(data, event));
      const meta = getEventMeta(data, event);

      if (time) card.appendChild(make("span", "event-time", time));
      card.appendChild(title);
      meta.forEach((line) => card.appendChild(make("span", "event-meta", line)));
      day.appendChild(card);
    });

    root.appendChild(day);
  });
}

function renderResourceUsage(data) {
  const root = getById("resource-usage");
  root.innerHTML = "";

  getAllResources(data).forEach((resource) => {
    const events = asArray(data.schedule).filter((event) => asArray(event.resourceIds).includes(resource.id));
    const products = [...new Set(events.filter((event) => event.productId).map((event) => getProductName(data, event.productId)))];
    const slots = events.map((event) => {
      const time = getEventTime(event);
      const label = getEventTitle(data, event);
      return event.day + (time ? " " + time : "") + ": " + label;
    });
    const row = make("tr");

    row.appendChild(createTableCell(resource.name));
    row.appendChild(createTableCell(events.length ? String(events.length) : "None"));
    row.appendChild(createTableCell(formatList(products, "None")));
    row.appendChild(createTableCell(formatList(slots, "None")));
    root.appendChild(row);
  });
}

function renderError(error) {
  const warning = getById("load-error");
  warning.hidden = false;
  warning.textContent = "";
  warning.appendChild(make("strong", "", "Could not load example data."));
  warning.appendChild(document.createTextNode(" Check that " + DATA_URL + " is available and contains valid JSON. " + error.message));
}

async function loadData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("HTTP " + response.status + " " + response.statusText);
  }
  return response.json();
}

async function init() {
  try {
    const data = await loadData();
    renderChecks(data);
    renderSourceData(data);
    renderProductOverview(data);
    renderWeek(data);
    renderResourceUsage(data);
  } catch (error) {
    renderError(error);
  }
}

init();
