# Examples

The first example dataset is intentionally generic. It is not a copy of any specific business process and should be adapted before real-world use.

## Example: small farm dairy

File:

```text
examples/small-dairy-example.json
```

Scenario:

- one raw milk tank;
- two milkings per day;
- bottled milk twice per week;
- chocolate milk once per week;
- custard once per week;
- yoghurt once per week;
- one flow pasteurizer;
- one batch pasteurizer;
- one shared bottling and labelling line;
- wholesale pickup on Monday and Wednesday at 08:00;
- one-person production limit of 8 active hours per day.

## What to change for your own dairy

Start by changing:

1. daily milk volume;
2. milking times;
3. raw milk tank capacity;
4. maximum raw milk age;
5. cleaning duration and preferred cleaning days;
6. product list;
7. batch sizes;
8. production times;
9. maturation times;
10. delivery or pickup deadlines;
11. maximum active labour per day.

## What not to assume

Do not assume that the example storage age, shelf life, cleaning frequency or process times are valid for your operation. They are placeholders for testing the planner.

Always validate your values with your own quality system, food safety advisor and local regulations.
