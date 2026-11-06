# ⛳ Tiny Tees — Mini Golf

A mini golf game with 30 holes across 3 worlds, plus a map editor for building your own courses. It runs in the browser with no build step, and it works with a mouse or a touchscreen.

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
- **🛠️ Custom maps**: a full map editor, share links, and an optional public **Community** gallery (see below)
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

## 🛠️ Custom maps

Open **🛠️ Custom maps** from the main menu.

### My maps
- **＋ New map** opens the editor. Maps save automatically in your browser.
- **▶ Play** a map solo or with 2–4 players. **✏️ Edit** reopens it in the editor.
- **🔗 Share** makes a link with the whole map packed into it. Anyone who opens the link can play the map or save a copy, and no server is needed.
- **📥 Import code** loads a map from a link or code someone sent you.
- **🌐 Publish** puts the map in the Community gallery, if Community maps are turned on. Publishing again updates it.

### The editor
- **18 tools:** tee, hole, walls, sand, water, ice, conveyor belts, breakable crystals, bumpers, boost pads, portal pairs, hills, dips/gravity wells, moving blocks, windmills, gems and an eraser.
- **Placing things:** click to place. Drag to draw walls and zones. Use 👆 to select and move things, and pull the yellow ■ handle to resize them.
- **Settings panel:** shows the exact numbers for whatever is selected (position, size, direction, strength, speed, number of arms).
- **Holes:** each course has up to 9 holes. Each hole has its own name, par, hint and size, from 400×280 up to 1200×760. There are also presets: Small, Medium, Large, Huge and Tall.
- **🎨 Theme:** 8 color presets (Greenfield, Canyon, Neon, Snowy, Candy, Volcano, Lagoon, Midnight) or your own colors for the fairway, background, rails and walls. You can also pick a hazard style (water, quicksand, neon void or lava) and a course icon.
- **▶ Test** plays the hole you're editing straight away. One click takes you back to the editor.
- **Safety checks:** warnings appear if the tee or hole is inside a wall or hazard.
- **Shortcuts:** `Ctrl+Z`/`Ctrl+Y` undo/redo · `Ctrl+C`/`V`/`D` copy/paste/duplicate · `Del` delete · `R` rotate · arrow keys nudge · `G` toggle snap · hold `Alt` to place freely · `T` test.

Gems in custom maps sparkle when you collect them but don't add to your 💎 wallet, so nobody can farm gems with a custom map.

### Community maps
The Community tab lists maps that players have published. You can sort by 🆕 New, ❤️ Top or 🔥 Most played, search, like (once per player), play, and **Remix** (copy a map into My maps to edit). Publishers can remove their own maps.

**🏆 Hole records.** Every Community map has a top-3 leaderboard for each hole:
- The current record appears when a hole starts. After you sink a putt, the end-of-hole card shows the top 3 and any record you just set ("🥇 New hole record!", "🥈 You're 2nd on this hole!").
- Tap 🏆 on any Community map to see the full leaderboard.
- Records count in **solo** play, under your creator name. In hot-seat multiplayer everyone shares one device, so those scores aren't recorded.
- Each player keeps their best score per hole. Ties go to whoever got there first.
- **Records reset when the creator updates the map**, since an edited hole is a different challenge. Republishing a map that hasn't changed does nothing, and an update asks for confirmation first.

Community maps use a free Google Firebase project. Until one is connected, the tab explains that it isn't set up yet, and everything else (including share links) works normally.

## Turning on Community maps (Firebase)

You only need to do this once. It takes about 10 minutes and uses Firebase's free Spark plan.

1. **Create a project.** Go to the [Firebase console](https://console.firebase.google.com/), click **Create a project**, and give it a name (for example `tiny-tees`). You can turn Google Analytics off.
2. **Turn on anonymous sign-in.** Go to **Build → Authentication → Get started → Sign-in method**, then enable **Anonymous**. Players never see a login: each browser gets an invisible ID, so a player can update or remove only the maps they published.
3. **Create the database.** Go to **Build → Firestore Database → Create database**, pick a location near your players, and start in **production mode**.
4. **Add the security rules.** In Firestore, open the **Rules** tab, replace everything with the contents of [`firestore.rules`](firestore.rules), and click **Publish**.
5. **Register the web app.** Go to **Project settings ⚙️ → General → Your apps**, click the **Web `</>`** icon, give the app a nickname, and click **Register app** (you don't need Firebase Hosting). Firebase then shows a `firebaseConfig` object.
6. **Paste the config.** Open [`firebase-config.js`](firebase-config.js), replace `window.FIREBASE_CONFIG = null;` with your config, then commit and push. Keep the `window.FIREBASE_CONFIG =` part: Firebase's own snippet says `const firebaseConfig =`, and the game won't see it under that name.
   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "…", authDomain: "…", projectId: "…",
     storageBucket: "…", messagingSenderId: "…", appId: "…",
   };
   ```
   It's normal for these values to be public. Access is controlled by the security rules, not by keeping the config secret.
7. **Authorize your domain.** Go to **Authentication → Settings → Authorized domains** and add `jupixels.github.io`.

Once GitHub Pages redeploys, the Community tab is live.

**What the security rules allow** (the tests in [`tests/`](tests) check all of these against the Firestore emulator):
- Anyone can browse and play published maps.
- A player can only publish under their own ID. Names, sizes and hole counts are validated, and a new map always starts at 0 likes and 0 plays.
- Only the publisher can edit or delete a map.
- Anyone can add exactly +1 play, or +1 like once per player. Nobody can inflate the counters.
- A hole record can only be posted under your own ID, for a hole that exists on the map's current version, with 1–10 strokes. It can only replace your own score with a better one.

If you change `firestore.rules`, paste the new version into **Firestore → Rules** and click **Publish** again. The live site uses the rules in the console, not the file in this repo.

## Running locally

Opening `index.html` directly works for the main game. Custom maps and Community need the files served over HTTP, because `community.js` is a module:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To try the Community tab without Firebase, open `http://localhost:8000/?community=local`. That uses a fake backend that stores everything in your browser.

## GitHub Pages setup

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then click **Save**.
3. After a minute or so, the game will be live at the link above.

## Adding built-in holes (code)

To add holes to the built-in worlds, edit the code. Each world's holes are in its own array near the top of the `<script>` in `index.html`: `GREEN_LEVELS`, `DESERT_LEVELS` and `COSMIC_LEVELS`. The `WORLDS` list ties each array to its name and theme. Built-in holes are 720×420, and the playable area runs from (40, 40) to (760, 460). Add `size:[w,h]` to a hole to change its size. Custom-map holes use exactly the same format.

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
