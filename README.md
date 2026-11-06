# ⛳ Tiny Tees — Mini Golf

A 12-hole mini golf game that runs in the browser. It's a single HTML file with no build step, and it works with a mouse or a touchscreen.

**Play it:** https://jupixels.github.io/minigolf/

## Features

- **12 holes** with boost pads, two-way portals, hills and dips, ice, sand, water, bumpers, a moving gate and a windmill
- **Local multiplayer** for 1–4 players, taking turns on each hole, with a live scorecard and a winner's podium at the end
- **Shot preview**: a dotted line shows the first part of your shot, including bounces
- **Gems 💎** hidden on every hole. Spend them in the **Ball Shop** on new balls with special trails (fire, bubbles, sparkles, rainbow)
- **Practice mode** to replay any hole, with your best score for each hole saved
- Three course options: **Full 12**, **Front 6** and **Back 6**. Your best solo round on each is saved
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
| Bumper | Fires the ball back harder than it hit |

Each hole has a 10-stroke limit. Press **Esc** or **☰** to pause.

## GitHub Pages setup

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then click **Save**.
3. After a minute or so, the game will be live at the link above.

## Making your own holes

All the holes are in the `LEVELS` array near the top of the `<script>` in `index.html`. The playfield is 800×500, and the playable area runs from (40, 40) to (760, 460).

```js
{ name:"My Hole", par:3, tee:[110,250], hole:[690,250],
  walls:[[x,y,w,h]], sand:[[x,y,w,h]], water:[[x,y,w,h]], ice:[[x,y,w,h]],
  bumpers:[[x,y,radius]], gems:[[x,y]],
  boosts:[[x,y,angleDegrees]],              // 0 = right, -90 = up
  portals:[[x1,y1,x2,y2]],                  // two-way pair
  slopes:[{x,y,r,k}],                       // k > 0 hill, k < 0 dip
  movers:[{x,y,w,h,ax,ay,speed}],           // sliding block
  spinners:[{x,y,len,speed,blades}],        // windmill
  tip:"Optional hint shown at the start" }
```

To add a hole to a course, put its number in the `COURSES` list.
