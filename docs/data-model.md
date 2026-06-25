# Data model

The data model is intentionally small. It is meant to be easy to read, edit and discuss.

The example file is stored in:

```text
examples/small-dairy-example.json
```

## Top-level structure

```json
{
  "farm": {},
  "milkSupply": {},
  "rawMilkTank": {},
  "machines": [],
  "products": [],
  "deliveries": [],
  "schedule": [],
  "checks": []
}
```

## Farm

General metadata.

```json
{
  "farm": {
    "name": "Example Farm Dairy",
    "timezone": "Europe/Amsterdam",
    "planningHorizonDays": 7
  }
}
```

## Milk supply

Defines when raw milk becomes available.

```json
{
  "milkSupply": {
    "dailyMilkLitres": 300,
    "milkings": [
      { "name": "Morning milking", "start": "05:00", "end": "08:00", "litres": 150 },
      { "name": "Evening milking", "start": "17:00", "end": "20:00", "litres": 150 }
    ]
  }
}
```

## Raw milk tank

Defines tank capacity, cleaning and maximum storage age.

```json
{
  "rawMilkTank": {
    "capacityLitres": 1700,
    "maxMilkAgeHours": 72,
    "cleaningDurationMinutes": 30,
    "preferredCleaningBeforeMilking": true
  }
}
```

## Machines

Machines or shared resources that can be occupied by tasks.

```json
{
  "machines": [
    { "id": "flow_pasteurizer", "name": "Flow pasteurizer" },
    { "id": "batch_pasteurizer", "name": "Batch pasteurizer", "capacityLitres": 500 },
    { "id": "bottling_labeling_line", "name": "Bottling and labelling line" }
  ]
}
```

## Products

Products define batch size, shelf life and production constraints.

```json
{
  "id": "yoghurt_plain",
  "name": "Plain yoghurt",
  "batchLitres": 120,
  "shelfLifeDays": 15,
  "activeStartHours": 2,
  "maturationHours": 20,
  "activeFinishHours": 2,
  "machineId": "batch_pasteurizer"
}
```

## Deliveries

Delivery or pickup deadlines.

```json
{
  "deliveries": [
    { "id": "monday_pickup", "day": "Monday", "time": "08:00", "description": "Wholesale pickup" }
  ]
}
```

## Schedule tasks

Schedule tasks are explicit blocks with day, start, end, type and occupied resources.

```json
{
  "day": "Tuesday",
  "start": "08:30",
  "end": "11:30",
  "type": "production",
  "productId": "milk",
  "resourceIds": ["flow_pasteurizer", "bottling_labeling_line"],
  "description": "Produce bottled milk for Wednesday pickup"
}
```

## Checks

Checks describe what should be validated. In early versions they may be documented manually. Later versions should calculate them automatically.

```json
{
  "id": "max_workday",
  "description": "No production day should exceed the maximum labour limit.",
  "limitHours": 8
}
```
