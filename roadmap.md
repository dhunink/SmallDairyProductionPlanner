# Roadmap

## Phase 0 - Public project foundation

- Create generic README and documentation.
- Add generic example data.
- Add static visual demo.
- Add disclaimer and MIT license.

## Phase 1 - Data-driven demo

Goal: make the static demo read from `examples/small-dairy-example.json`.

Tasks:

- Load example JSON in the browser.
- Render source data cards from JSON.
- Render checks from JSON.
- Render week schedule from JSON.
- Keep the app framework-free for now.

## Phase 2 - Schedule comparison

Goal: compare multiple schedule variants.

Tasks:

- Add `examples/schedule-variant-a.json`.
- Add `examples/schedule-variant-b.json`.
- Add a selector in the UI.
- Show differences in workday length, tank intervals and delivery readiness.

## Phase 3 - Automated checks

Goal: calculate warnings instead of writing them manually.

Checks to implement:

- resource overlap detection;
- maximum active labour per day;
- required maturation duration;
- delivery readiness;
- raw milk tank age intervals;
- shelf-life remaining at delivery.

## Phase 4 - Editable planning model

Goal: allow users to edit values in the browser.

Tasks:

- add editable source data form;
- export updated JSON;
- import JSON;
- validate required fields;
- keep all logic client-side.

## Phase 5 - Private deployment pattern

Goal: document how a private farm can use the public app with private data.

Possible patterns:

- public app + private local JSON file;
- private GitHub repo using the same app;
- Codespaces preview for private planning;
- static hosting on a private intranet or website.

## Not planned yet

- Full mathematical optimization.
- Multi-user database.
- Regulatory compliance automation.
- Direct integration with pasteurizers, ERP systems or accounting software.
