# Nathan Saldanha — Portfolio Content Doc
*Working draft — content only, no design decisions yet*

---

## SITEMAP

1. **Home** — Hero, About (short), Featured Works (3 cards), Contact CTA
2. **About** (full) — extended bio, skills, design side-note
3. **Case Studies** (full page each):
   - Enterprise Search Optimization *(anonymized — Bedrock/query expansion project)*
   - Intrapartum AI *(childbirth prediction model + live tool)*
   - SUAS Drone — Navigation & Controls Rebuild *(Project MANAS)*
4. **Other Projects** (lighter cards, mixed depth — to be decided per project):
   - Rollout (gyroscope maze game)
   - AutoShorts (Reddit-to-YouTube pipeline)
   - Text-to-Handwriting
   - Drone RL (gate racing)
   - C-ROS (middleware library in C)
   - Travel (design-only aside — maybe folds into About instead of its own card)
5. **Contact**

*Note: UGV/IGVC work is on the resume — deprioritized, not going in the portfolio.*

---

## PROJECT NOTES: C-ROS (Middleware Library in C)

*Captured for the Other Projects section — kept lean, no forced war story since none was readily recalled.*

- **Origin:** Learned ROS's communication patterns at MANAS, got curious what was actually happening underneath it, decided to build an equivalent from scratch
- **Built:** Pub-sub distributed messaging framework in raw C, over TCP, no existing libraries — supports 1:1, 1:many, and many:1 publisher/subscriber topologies
- **What it taught you:** thread safety, low-level socket/TCP mechanics, message broker design, mutex-based synchronization
- **Result:** <200μs message latency across distributed nodes
- **Artifact:** GitHub repo (link needed)

---

## HERO (Home page)

**Headline (locked):** Curiosity-driven programming.

*(This is the thread through everything — you build because it's interesting, not because you're told to.)*

**Subhead (locked):** As I do, as I learn.

*(Pairs cleanly with "Curiosity-driven programming" — the headline states the trait, the subhead states the method.)*

**CTA:** Contact / Resume download

---

## ABOUT (short — Home page teaser)

**Locked:**
> Hi, I'm Nathan. I like learning and building software.

---

## ABOUT (full page)

**Voice notes for this section (important — apply throughout the whole site, not just here):**
- Plain, everyday words. No "screenshot" metaphors, no reaching for cleverness.
- Doesn't brag. States what happened, lets the reader draw the conclusion.
- Personality comes through small, real details — not jokes bolted on.

**Draft (v4 — locked, simple and sweet):**
> I like solving complicated problems step by step.
>
> My work involves a number of different software domains.
>
> I graduated from Manipal Institute of Technology in 2025. Currently work as a Software Developer at ZS.
>
> My interests include pizza and too many energy drinks.

*(Left the domains line standing alone, no connector, per your call. If it ever feels like it wants a follow-up, we can revisit.)*

## SKILLS (finalized framing — "What I reach for")

*Tight verb labels, lowercase, punchy. Each verb → the tools that serve it. Pulled from the actual projects, not just the resume list.*

**to click**
React, Next.js, Flutter, Tailwind

**to backend**
FastAPI, PostgreSQL, DuckDB

**to transform**
PySpark, Databricks, Spark

**to see**
OpenCV, image processing

**to predict**
scikit-learn, PPO / reinforcement learning, AWS Bedrock

**to move**
ROS, path & coverage planning, drone controls (MAVLink), Stanley control

**to talk**
Hybrid search (BM25 + semantic), OpenSearch, query expansion, pub-sub / sockets

**to program**
Python, C/C++, JavaScript

*(Notes: "to see" and "to predict" split the old overloaded ML bucket cleanly. "to move" finally captures the robotics work that the resume flattened into just "ROS". "to talk" now covers both search/retrieval and low-level messaging — the two things in your work that are really about systems communicating. FastAPI parked under "to backend" only. AWS Lambda/Batch left off as plumbing rather than headline skills — add back if you want them visible.)*

*(Design note: reads great as verb → pills stacked vertically, or a two-column layout. 8 verbs might be one too many for a clean grid — could drop to 6 by merging if design gets cramped. Decide at design phase.)*

---

## CURRENTLY EXPLORING

*Subhead: "As I do, as I learn." Framed as genuine curiosity, matching the site theme rather than a course list.*

**Working title: "Rabbit holes I'm currently down"**
- Reinforcement learning — going through OpenAI's Spinning Up in Deep RL doc (link on site)
- How programming languages work underneath — going through Crafting Interpreters, work in progress
- Getting AI tools into my real workflow — going through Matt Pocock's Claude Code skills repo

---

## CASE STUDY: SUAS Drone — Navigation & Controls Rebuild

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**Project MANAS, Manipal's student robotics team.**

### The problem

The team's SUAS drone ran on a fragile stack. The navigation planner crashed often. It couldn't replan mid-flight or take custom commands while airborne. It was also hard-coded to the 2022 competition format.

Then the competition changed its task for 2023. The old stack couldn't flex to fit. Testing it was nearly impossible.

### What I owned

Software and controls, end to end. This was a team effort — mechanical, electronics, and management ran in parallel — but the flight stack was mine.

### What I built

Rebuilt the planner from scratch. Stripped out ROS dependencies that weren't earning their keep, so the whole thing could run inline and actually be tested.

Migrated the control layer from a C++ MAVLink library to a Python one. New territory for me at the time.

Built a pipeline that matched the real mission: fly to a waypoint, sweep the area from above to cover it, identify five targets in that footage, drop a payload on each one, then head home. Because the new design was flexible, the drone could re-navigate once a target was found instead of following a fixed path.

### The precision problem

After the sweep, the drone would hover 2 to 5 meters off target. Fine for a photo. Not fine for dropping a water bottle on something.

I built a human-in-the-loop correction step. A live video feed goes to an operator, who taps the target in the frame. That tap gets translated into a directional correction — how far off-center the target is becomes how far and which way the drone moves — before it drops.

### Result

100 to 200 test flights later, it worked reliably enough to fly. The team placed 2nd at SUAS 2023 in Maryland.

### What I learned

Rigid systems break the moment the task changes. Building for the actual mission profile — not just the current rules — is what let the drone adapt when the competition did.

---

## CASE STUDY: Enterprise Search Optimization

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**⚠️ Heavily anonymized — do not name the client or platform, do not use real query examples.**

**Internal knowledge-discovery platform, ZS.**

### The problem

The company had an internal platform that surfaced tools, dashboards, and utilities built across the org, so people could find and reuse things instead of rebuilding them. Nobody assigned me this — search on it was broken, and I went looking at it on my own.

Search was already hybrid: semantic plus keyword (BM25) over an OpenSearch index. But it only worked for direct matches. Anything abstract or off the exact wording came back empty, even when a related asset existed.

### The path I didn't take

The obvious fix was training a custom embedding model tuned to the company's domain. I ruled it out. High effort, high risk to a search pipeline that already worked well for direct matches, and no guarantee it would fix the actual gap.

### What I built

Two changes, done together.

First, a query expansion step. Before a query hits the index, a small LLM expands it with related terms and phrasing.

Second, a restructured index. The name, short description, long description, and tags for each asset had all been concatenated into one blob, used as-is for both semantic and keyword search. I split them into separate fields, weighted by relevance, and scoped semantic search to only the fields that actually benefit from it.

### The refinement that mattered most

One expansion doesn't serve both search methods well. BM25 wants exact related terms; semantic search wants related concepts, even if the wording is totally different. So I had the LLM produce two expansions in a single call — one tuned for keyword matching, one for semantic — instead of one generic expansion doing both jobs badly.

That's what produced the bulk of the improvement, including matches on terms that didn't literally appear anywhere in the asset descriptions.

### Result

About 300% improvement in search relevance.

### What I learned

The fix wasn't a bigger model. It was noticing that two algorithms sharing one query expansion were quietly working against each other, and giving each one what it actually needed.

---

## CASE STUDY: Intrapartum AI

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**Kasturba Medical College, for OBGYN residents.**

### The problem

A resident wanted to replicate a published clinical model — one that predicts difficult childbirth outcomes from labor measurements — as a usable app. Faculty routed the request to me after hearing about my robotics work.

### Phase 1: replication

I implemented the existing model, an Eggebø et al. 2015 logistic regression, straight from the paper's published coefficients. Seven inputs: head-perineum distance, caput, occiput posterior, maternal age, BMI, gestational age, prolonged labor, cervical dilation. Published baseline: 0.853 AUC.

First version was a Flutter app. Getting it onto both iOS and Android turned out to be more friction than the project needed, so I moved it to a Next.js web app instead.

### Phase 2: retraining

The resident wanted to add a new predictor: angle of progression. The original model couldn't take it — it wasn't one of the paper's inputs, and there was no data for it. She collected a fresh dataset by hand.

I retrained a new logistic regression from scratch on 9 features, with standardized inputs, balanced class weights, and 5-fold cross-validation. Mean AUC: 0.973.

### The honest part

I tested the new model with and without angle of progression. Without it: 0.9745 AUC. With it: 0.9732. It made things very slightly worse.

The whole point of collecting the new data was to add that feature. I flagged the result back to the resident and faculty anyway, rather than quietly shipping it because it was the ask.

### Result

A live clinical decision-support tool, at close to 0.97 AUC versus the 0.853 baseline it replaced.

### What I learned

Data collected for a specific hypothesis doesn't owe you a positive result. Reporting a null finding honestly is worth more than a model that just does what was asked.

**Live tool:** intrapartum-web-app.vercel.app

---

## OTHER PROJECTS — ordering + framing decision

All 3 featured case studies are done (SUAS Drone, Intrapartum AI, Enterprise Search).

**Order for Other Projects, strongest → weakest (Nathan's call):** AutoShorts, then C-ROS, then Rollout.

**Framing:** These are hobby-scale, less involved than the featured case studies. Draft them in the same problem/approach/result/learnings shape for now so the content exists, but keep them lighter — exact on-page treatment (full mini-case vs. short card) TBD once we see how it lays out on the site.

### AutoShorts — Reddit-to-YouTube Pipeline

*Draft approved.*

**The problem:** Reddit-narration YouTube Shorts were having a moment. I wanted to automate the whole format, start to finish, just to see if I could.

**What I built:** Scraped Reddit threads with PRAW, then rebuilt a fake Reddit UI around each post — the post card, upvote count, username — so it looked native. Ran the thread text through TTS for narration. Assembled the final video with MoviePy and FFmpeg.

Voice and captions alone didn't hold attention. Someone pointed out that viewers stick around for background gameplay footage, so I added Minecraft parkour clips running underneath. Engagement jumped.

**Result:** 166K+ views, 1,200+ watch hours.

**What I learned:** The code was rough — one script, deeply nested classes — and I automated things that didn't need it. It re-scraped Reddit on every run with no dedup, and I even automated the YouTube upload step when doing it manually would've been simpler and safer. Good lesson in where the line is between automating for speed and automating for its own sake.

**Artifacts:** YouTube channel link pending from Nathan. Source code lost.

---

### C-ROS — Middleware Library in C

*Draft approved.*

**The problem:** While working with ROS at MANAS, I got curious what was actually happening underneath its pub-sub messaging. Decided to build an equivalent from scratch and find out.

**What I built:** A pub-sub distributed messaging framework in raw C, over TCP, no existing libraries. Supports one-to-one, one-to-many, and many-to-one publisher/subscriber setups.

**Result:** Under 200μs message latency across distributed nodes.

**What I learned:** Thread safety, low-level socket and TCP mechanics, message broker design, mutex-based synchronization — all the things ROS was quietly handling that I'd never had to think about before.

**Artifacts:** GitHub repo link pending from Nathan.

---

### Rollout — Gyroscope Maze Game

*Draft approved.*

**The problem:** Not really a problem this time — I wanted hands-on time with Flutter and a game engine, and picked a small enough scope to actually finish it.

**What I built:** A tilt-controlled maze game: the phone's gyroscope moves a ball through a maze, built on the Box2D physics engine. Added a few modes to keep it interesting — one where only the ball's traveled path is visible (fog), one where a spotlight follows the ball, and one where the maze ramps in difficulty. Light and dark mode included.

**Result:** Shipped it to Google Play, with a proper store listing and README. It's no longer live.

**What I learned:** Small scope by design, and it paid off — this was real exposure to game dev and a physics engine, a different muscle from the backend and ML work I usually do.

---

### Text-to-Handwriting

*Draft — grouped into this section per Nathan's call (originally not planned as a case study, but fits here alongside AutoShorts/C-ROS/Rollout). Order relative to the other three still open.*

**⚠️ Resume correction:** resume currently lists "Angular + Flask" — actual order was React first (2023), Angular conversion attempted later and still unpolished. Worth auditing the rest of the resume for similar stack-order slips before anything goes live.

**The problem:** 2021, COVID-era online classes. Got a handwritten assignment that made no sense to do by hand for an online class. The text-to-handwriting tools online at the time looked obviously fake. That was annoying enough to build my own.

**What I built:** Hand-wrote every ASCII character about 10 times on a tablet, for natural variation. Sourced a textured old-paper background, added noise and dropped the quality for realism. For each character, picked a variant, applied a slight rotation and resize, and composited it onto the page. Built with Pillow — didn't know OpenCV yet.

**Result:** No OS or performance knowledge at the time, so page generation took 2 to 3 minutes, completely unoptimized. But the output held up — looked like a photographed handwritten page.

**What I learned:** This was my first real software project. Built a React frontend for it in 2023 while learning React; later attempted an Angular conversion that's still unpolished.

**Artifacts:** Source + showcase links exist (on resume).

---

## BUILD

Site skeleton lives in `./site` — Next.js 16 (App Router, TypeScript, Tailwind 4).
All copy on the site is pulled from `site/src/content/portfolio.ts`, which mirrors this doc.
Edit copy there, not in the components.

Routes: `/` · `/about` · `/work` · `/work/[slug]` (3 case studies) · `/playground` · `/contact`

Run: `cd site && npm run dev`

---

## STATUS: NEEDS YOUR INPUT

1. Resolve the 3 open skill items above (FastAPI placement, OpenSearch/Lambda/Batch, scikit-learn)
2. Other Projects — all 4 drafted (AutoShorts, C-ROS, Rollout, Text-to-Handwriting). Confirm final order.
3. Resume audit — fix "Angular + Flask" stack-order error on Text-to-Handwriting, check rest of resume for similar issues.
4. Images — every case study and project has an empty media slot on the site. Need screenshots/photos.
5. Links — LinkedIn + GitHub handles for the contact page; AutoShorts YouTube channel; C-ROS and Text-to-Handwriting repos.
