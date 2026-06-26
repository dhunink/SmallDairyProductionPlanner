# Codex next task: improve the data-driven demo

## Context

The repository now contains a public proof-of-concept for a small dairy production planner.

The app is intentionally simple and framework-free. It currently renders the public demo from:

```text
examples/small-dairy-example.json
```

The long-term goal is to build a practical browser-based planning tool that helps small dairy farms compare weekly production schedules.

## Goal for the next implementation pass

Improve the data-driven demo without adding a framework or build step.

## Requirements

1. Keep the app framework-free: plain HTML, CSS and JavaScript.
2. Keep the source data in `examples/small-dairy-example.json`.
3. Render these sections from JSON:
   - planning checks;
   - source data cards;
   - weekly schedule;
   - product overview;
   - machine/resource usage.
4. Add graceful error handling if the JSON file cannot be loaded.
5. Keep the GitHub Pages deployment working.
6. Do not introduce real farm-specific data.
7. Keep all wording in English.
8. Preserve the food-safety disclaimer.

## Suggested implementation steps

1. Refactor `app/app.js` into small functions:
   - load data;
   - render checks;
   - render source data;
   - render week plan;
   - render product table;
   - render resource table.
2. Add a product overview table below the source data.
3. Add a machine/resource usage table below the week plan.
4. Improve event labels so production tasks show product, resource and output where available.
5. Add basic client-side calculated checks later, but do not do that in this task unless the static rendering is complete.

## Out of scope for this task

- Mathematical optimization.
- Database or login.
- Editing source data in the browser.
- Private farm deployment.
- HACCP or legal compliance validation.

## Acceptance criteria

- The GitHub Pages demo still loads.
- The week plan is rendered from JSON, not hardcoded HTML.
- Product and resource information are visible.
- The repository remains useful to an outside reader as an open-source project.
