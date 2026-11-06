# ⛳ Tiny Tees — Mini Golf

A mini golf game with 30 holes across 3 worlds that runs in the browser. It's a single HTML file with no build step, and it works with a mouse or a touchscreen.

**Play it:** https://jupixels.github.io/minigolf/

## Worlds

| World | Holes | How to unlock | What's in it |
|---|---|---|---|
| 🌳 Greenfield Park | 12 | Open from the start | Boost pads, portals, hills, ice, sand, water, windmill |
| 🌵 Dusty Canyon | 9 | Finish the **full** Greenfield Park course | Conveyor belts, cactus bumpers, quicksand, mesas, a dust-devil spinner |
| 🪐 Neon Nebula | 9 | Finish the **full** Dusty Canyon course | Gravity wells, repulsors, breakable crystals, black-hole voids, wormholes |

A world unlocks when you finish its predecessor's full course, in solo or multiplayer. Your score doesn't matter. Unlocks are saved in your browser.

## Features

- **3 worlds with 30 holes**, each with its own look and its own hazards
- **Local multiplayer** for 1–4 players, taking turns on each hole, with a live scorecard and a winner's podium at the end
- **Shot preview**: a dotted line shows the first part of your shot, including bounces
- **Gems 💎** hidden on every hole. Spend them in the **Ball Shop** on new balls with special trails (fire, bubbles, sparkles, rainbow)
- **Practice mode** to replay any hole in any world you have unlocked, with your best score for each hole saved
- In every world you can play the full course or just the front or back half. Your best solo round on each is saved
- Hole intro banners, confetti, screen shake and synthesized sound effects (press **M** to mute)

## How to play

Drag back from anywhere on the course and let go to putt. The farther you pull, the harder you hit.

| Hazard | What it does |
|---|---|
| Sand | Slows the ball down a lot |
| Water | Adds a one-stroke penalty and puts the ball back where you hit it from |
| Ice | Barely slows the ball at all |
| Hill / dip | Hills push the ball away, dips pull it in |
| Boost pad | Launches the ball in the arrow's direction and lines it up with the pad |
| Portal | Sends the ball to the matching portal at the same speed |
| Bumper / cactus | Fires the ball back harder than it hit |
| Conveyor belt | Keeps pushing the ball in the arrow's direction while it's on the belt |
| Quicksand / void | Works like water: one-stroke penalty |
| Gravity well | Pulls the ball in (the neon version of a dip) |
| Crystal | A solid wall until you hit it hard enough, then it shatters and the ball goes through. Crystals reset for each player's turn |

Each hole has a 10-stroke limit. Press **Esc** or **☰** to pause.

## GitHub Pages setup

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then click **Save**.
3. After a minute or so, the game will be live at the link above.

## Making your own holes

Each world's holes are in its own array near the top of the `<script>` in `index.html`: `GREEN_LEVELS`, `DESERT_LEVELS` and `COSMIC_LEVELS`. The `WORLDS` list ties each array to its name and theme. The playfield is 800×500, and the playable area runs from (40, 40) to (760, 460).

```js
{ name:"My Hole", par:3, tee:[110,250], hole:[690,250],
  walls:[[x,y,w,h]], sand:[[x,y,w,h]], water:[[x,y,w,h]], ice:[[x,y,w,h]],
  bumpers:[[x,y,radius]], gems:[[x,y]],
  conveyors:[[x,y,w,h,angleDegrees]],       // belt that pushes the ball
  breakables:[[x,y,w,h]],                   // crystal you can smash
  boosts:[[x,y,angleDegrees]],              // 0 = right, -90 = up
  portals:[[x1,y1,x2,y2]],                  // two-way pair
  slopes:[{x,y,r,k}],                       // k > 0 hill, k < 0 dip
  movers:[{x,y,w,h,ax,ay,speed}],           // sliding block
  spinners:[{x,y,len,speed,blades}],        // windmill
  tip:"Optional hint shown at the start" }
```

Add a new object to a world's array and it appears in that world's courses and practice list automatically. To add a whole new world, add an entry to `WORLDS` and `THEMES`. It unlocks after the world before it.
