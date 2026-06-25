# Scheduling rules

This document describes the first scheduling checks. The exact limits must be configured by each producer and validated against local food safety rules.

## Delivery readiness

Products that are required for a delivery or pickup must be completed and placed in cold storage before the deadline.

Example:

- Monday pickup at 08:00.
- Bottled milk must be produced on Sunday or earlier.
- Products with longer shelf life may come from the previous weekly batch.

## Raw milk age

Raw milk should not exceed the configured maximum age in the raw milk tank.

The example dataset uses:

- maximum raw milk age: 72 hours;
- age counted from first milk received after tank cleaning.

This is an example rule only. Producers must configure this according to their own validated process and regulations.

## Tank cleaning

Tank cleaning should happen often enough to keep milk age and quality within limits. Cleaning shortly before a milking can be useful because fresh milk enters the cleaned tank soon after.

A schedule should flag:

- missing required cleaning moments;
- tank intervals that exceed the configured maximum milk age;
- cleaning moments that create unnecessary milk loss.

## Machine conflicts

A machine or shared resource cannot be used for two tasks at the same time.

Common shared resources:

- flow pasteurizer;
- batch pasteurizer;
- filling line;
- labelling line;
- cleaning setup;
- one-person labour capacity.

## Maturation and holding time

Some products occupy a vessel or machine during maturation, incubation or holding.

Example:

- yoghurt start: 2 active hours;
- yoghurt maturation: 20 hours;
- yoghurt finish: 2 active hours;
- batch pasteurizer occupied during maturation.

The schedule should flag maturation that is too short, too long, or overlapping with other machine usage.

## Labour limits

Small dairies often run production with one person. The schedule should calculate active labour time per day and flag days that exceed the configured limit.

Example:

- maximum active production day: 8 hours.

Passive maturation time should not be counted as active labour, but the occupied machine or vessel must still be blocked.

## Shelf life

Products should be produced early enough to meet delivery deadlines but late enough to leave sufficient remaining shelf life.

The tool should eventually calculate:

- production date;
- expiry or best-before date;
- remaining shelf life at delivery;
- warnings for old stock.

## Planning warnings versus hard conflicts

The tool should distinguish between:

- **OK**: clearly within limits;
- **Warning**: allowed but tight or operationally risky;
- **Conflict**: violates a configured rule.

Example:

A 71-hour raw milk tank interval with a 72-hour limit may be OK but should be shown as a warning because it leaves little margin.
