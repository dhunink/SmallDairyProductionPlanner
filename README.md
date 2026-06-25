# Small Dairy Production Planner

A lightweight planning tool for small dairy farms and micro-dairies.

Small Dairy Production Planner helps producers reason about weekly production schedules for bottled milk, yoghurt, custard, chocolate milk and similar products while taking into account:

- raw milk availability;
- milking times;
- raw milk tank capacity and cleaning intervals;
- maximum raw milk storage time;
- pasteurizer occupation;
- maturation, incubation or holding times;
- bottling and labelling capacity;
- delivery or pickup deadlines;
- product shelf life;
- labour limits and maximum working days.

The project started from a practical farm-dairy planning need and is being generalized so other small producers can adapt the model to their own workflow.

## Current status

This repository is in an early proof-of-concept stage.

The first version contains:

- a generic example dataset;
- documentation for the planning concept and data model;
- a static visual planner demo;
- a roadmap for turning the demo into a data-driven scheduling tool.

It is not yet an automated optimizer. The first goal is to make assumptions visible, compare schedule variants, and catch obvious planning conflicts.

## What the app should help answer

Typical questions this project aims to support:

- Do all products fit into the weekly production week?
- Are delivery deadlines met?
- Is raw milk used before the maximum storage age is exceeded?
- Are tank cleaning moments frequent enough and placed sensibly?
- Is a pasteurizer or bottling line double-booked?
- Does yoghurt or another matured product get the required incubation time?
- Is any production day too long for the available labour?

## Repository structure

```text
.
├─ app/                         Static visual demo
├─ docs/                        Project documentation
├─ examples/                    Generic example datasets
├─ LICENSE
├─ README.md
└─ roadmap.md
```

## Quick start

Open the static demo:

```text
app/index.html
```

For GitHub Pages, publish the `app/` folder or copy it to the Pages source used by your repository.

## Important disclaimer

This project is a planning aid only. It does not replace professional food safety advice, legal compliance checks, HACCP procedures, veterinary guidance, or local regulatory requirements. Always validate production schedules and storage rules against the standards that apply to your dairy business and location.

## License

MIT License. See `LICENSE`.
