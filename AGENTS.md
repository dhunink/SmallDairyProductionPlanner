# AGENTS.md

## Repository scope

This repository is the public, open-source version of Small Dairy Production Planner.

Only generic, reusable information belongs here. Do not add private farm-specific data, customer names, supplier names, delivery partner names, real production volumes from a private business, internal operational notes, or private schedule variants.

## Related private repository

There may be a separate private repository used by a real farm to store farm-specific planning data and operational schedules. That private repository is not part of this public project and must not be referenced as a source of data.

Reusable ideas may move from the private workflow to this public repository only after they have been generalized and stripped of private details.

## Technology rules

For now, keep the app intentionally simple:

- plain HTML;
- plain CSS;
- plain JavaScript;
- no build step;
- no backend;
- no database;
- no frontend framework.

## GitHub Pages

The public demo is deployed to GitHub Pages from the `app/` folder using the workflow in:

```text
.github/workflows/pages.yml
```

The deployed app must keep working at:

```text
https://dhunink.github.io/SmallDairyProductionPlanner/
```

Because the Pages workflow publishes only `app/`, any data needed by the live demo must be available inside `app/` or be fetched from a public URL that is known to work in GitHub Pages.

At the moment the live app loads:

```text
app/small-dairy-example.json
```

The canonical example dataset also exists in:

```text
examples/small-dairy-example.json
```

If these files diverge, update both or clearly document which one is authoritative.

## Current implementation brief

Use these files as guidance for current work:

```text
docs/codex-next-task.md
docs/data-model.md
docs/scheduling-rules.md
```

Current issue:

```text
#1 Phase 1: improve the data-driven demo
```

## Safety and wording

All public user-facing text must be in English.

Preserve the food-safety disclaimer. This project is a planning aid only and must not claim to replace HACCP, legal, veterinary or food-safety validation.

## Pull request expectations

Before opening a pull request, verify:

- the app still works from GitHub Pages;
- no private farm-specific data has been added;
- the app remains framework-free;
- the example JSON still loads;
- all public text is in English;
- documentation is updated when behavior changes.
