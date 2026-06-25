# Concept

Small Dairy Production Planner is built around one idea: a small dairy schedule should be understandable before it is automated.

Many small producers do not need a full factory planning system. They need a clear weekly view that combines raw milk flow, tank cleaning, pasteurizer usage, maturation time, bottling, labelling, delivery deadlines and labour capacity.

## Core objects

The planner works with these concepts:

- **Milk source**: when milk becomes available, usually from one or more daily milkings.
- **Raw milk tank**: storage capacity, cleaning moments and maximum allowed milk age.
- **Products**: bottled milk, yoghurt, custard, chocolate milk or other dairy products.
- **Production tasks**: blocks of time that occupy a machine, a person, or a shared line.
- **Machines**: flow pasteurizer, batch pasteurizer, filling line, labelling line, cleaning system.
- **Maturation or holding blocks**: time where a product or vessel is occupied without active labour.
- **Delivery deadlines**: moments by which products must be ready in cold storage.
- **Checks**: rules that mark a schedule as OK, warning or conflict.

## Design principles

1. **Readable first**  
   The schedule should be useful even as a static table or visual timeline.

2. **Source data separate from schedules**  
   Assumptions such as product times, tank capacity and delivery deadlines should live separately from schedule variants.

3. **Human-editable data**  
   Example data should be stored in a format that a non-developer can inspect and discuss.

4. **No hidden optimization**  
   Early versions should show why a schedule works or fails. Optimization can come later.

5. **Adaptable to local rules**  
   Food safety rules differ by location and product. The tool must not hard-code legal assumptions as universal truth.

## Typical workflow

1. Define milkings, tanks, products, machines and delivery deadlines.
2. Create one or more weekly schedule variants.
3. Check each variant for conflicts and warnings.
4. Compare variants.
5. Choose a practical schedule and validate it against local rules and food safety procedures.
