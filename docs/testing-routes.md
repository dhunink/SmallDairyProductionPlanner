# Testing routes

This project is intended to support two complementary testing routes.

## Route D: public GitHub Pages demo

Use this for the generic open-source app and example data.

Live demo:

```text
https://dhunink.github.io/SmallDairyProductionPlanner/
```

Data:

```text
examples/small-dairy-example.json
```

Use this route to test whether the app is useful to other small dairy producers.

## Route C: private farm-specific testing

Use this for real farm data that should not be public.

Recommended pattern:

1. Keep real source data and schedule variants in a private repository.
2. Use the same app structure as the public repository.
3. Preview the app in Codespaces or another private environment.
4. Only move generic improvements back into the public repository.

## What belongs in the public repository

- Generic example data.
- Reusable planner logic.
- Generic documentation.
- No real customer, supplier or farm-sensitive operational data.

## What belongs in a private repository

- Real production volumes.
- Real delivery partner details.
- Internal schedule variants.
- Operational notes.
- Business-specific assumptions.

## Suggested comparison

Compare both routes on:

- ease of opening the planner;
- privacy;
- ability to share with collaborators;
- ease of updating data;
- usefulness for future open-source development.
