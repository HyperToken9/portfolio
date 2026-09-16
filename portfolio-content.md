# Nathan Saldanha — Portfolio Content Doc
*Working draft — content only, no design decisions yet*

---

## SITEMAP

1. **Home** — Hero, About (short), Featured Works (3 cards), Contact CTA
2. **About** (full) — extended bio, skills, design side-note
3. **Case Studies** (full page each):
   - Enterprise Search Optimization *(anonymized — Bedrock/query expansion project)*
   - Intrapartum AI *(childbirth prediction model + live tool)*
   - SUAS 2023 *(Project MANAS)*
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
> I'm Nathan. I build software, and I like learning how things work.

---

## ABOUT (full page)

**Voice notes for this section (important — apply throughout the whole site, not just here):**
- Plain, everyday words. No "screenshot" metaphors, no reaching for cleverness.
- Doesn't brag. States what happened, lets the reader draw the conclusion.
- Personality comes through small, real details — not jokes bolted on.

**Draft (v5 — locked):**
> I'm a Full Stack Developer at ZS, and I graduated from Manipal Institute of Technology in 2025.
>
> My work spans AI, robotics and web apps. I enjoy working on complicated problems.
>
> Outside work, my interests include evaluating pizzas and being an energy drink connoisseur.

## SKILLS (heading: "Skills", note: "what I reach for")

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

**Heading: "Currently learning", note: "rabbit holes"**
- Reinforcement Learning — going through OpenAI's Spinning Up in Deep RL doc (link on site)
- Compilers and Interpreters — going through Crafting Interpreters
- AI Harnesses — going through Matt Pocock's Claude Code skills repo

---

## CASE STUDY: SUAS 2023

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**Project MANAS, the official AI and robotics team of MIT Manipal.**

### How it started

Each year, Project MANAS builds an autonomous drone for the Student Unmanned Aerial Systems (SUAS) Competition.

For 2023, the competition made major changes to its mission requirements. The drone's software was written for the 2022 format and failed to adapt to the new standards.

### The old system

The navigation planner was built under a tight deadline for the 2022 format, and it had multiple issues. It crashed often, and could not replan mid-flight or take new commands in the air. Its linear design meant every step had to be set before takeoff, in a fixed sequence.

A mechanically complex drone was held back by its software, which made progress on the platform close to impossible.

### What got built

*[Before/after slider: linear chain vs. central router]*

The planner was redesigned from scratch. The linear chain was swapped for a hub-and-spoke design, built around a central router.

In the old design, each step was its own component, but they were forced to run in a fixed line. Everything was uploaded to the drone once, as hard-coded instructions.

The router takes in the mission the same way, then calls each component on demand. New modules could be plugged straight into it. This made the design more flexible and easier to work on.

### Hitting the target

Due to a small expected error in an upstream component, the drone would always be a few meters off the drop location. That was not precise enough for a successful drop.

This is where the new design let us plug in a human-in-the-loop component. An operator tapped the target on the live video feed, and the component sent correction commands that lined the drone up perfectly over the drop location.

### Result

After 100 to 200 test flights, the system was reliable enough to compete.

The team placed 2nd at SUAS 2023 in Maryland, USA.

*[Video: 18-second clip of a full autonomous flight, from the team video at 16:07]*

**I learned…** how to build a system that adapts when the task changes.

---

## CASE STUDY: Enterprise Search Optimization

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**⚠️ Heavily anonymized — do not name the client or platform, do not use real query examples.**

**Internal knowledge-discovery platform, ZS.**

*Tagline: Fixing semantic search on scientific topics without replacing the embedding model.*

**Result box:** ~3× higher score on the internal search benchmark ✱

### The problem

The company had an internal platform for surfacing assets, tools and utilities built across teams.

It used a hybrid search structure (with a BM25 keyword search + KNN vector search) over OpenSearch hosted on AWS.

The semantic side underperformed, especially on niche topics from scientific literature.

### The path not taken

The plan was to replace the embedding model with one that handled scientific terms better, either trained in house or found online.

That meant a long build and evaluation process, the cost of hosting a new model, and no promises of being a complete solution.

I instead proposed a smaller query expansion module. Which would be easier to build and evaluate if it worked.

### What got built

We went ahead with the query expansion module. Every query would now get expanded by an LLM on AWS Bedrock before hitting the index.

The module handled both the keyword and vector legs of the search in a single LLM call.

The BM25 query was appended with exact related terms. The KNN vector search received standardized phrases explaining the intent of the user.

### The refinement

While integrating this module, the keyword index was found to store each asset's name, descriptions, tags and metadata as one combined field.

These were split into separate fields, and a new query weighted each by relevance. This improved the reliability of keyword matches, especially against typos.

### Result

Together, the changes scored ~3× higher on an internal search relevance benchmark.

> **✱ How it was measured** *(folded note under the result box)*
> The platform owners kept a list of search queries and the results they expected.
> That list became a benchmark with two scores:
> - **Top-1 accuracy:** was the right result first?
> - **Top-3 score:** a right result still counts in second or third place, just for less (1, ½, ⅓).

### What I learned

*(Box heading reads "I learned…", and the sentence continues from it.)*

**I learned…** how to evaluate solutions on viability, cost and effort.

---

## CASE STUDY: Intrapartum AI

*Draft approved (structure locked, exact wording open — will revisit once visually laid out on the site).*

**Kasturba Medical College, for OBGYN residents.**

**Result box:** 0.97 AUC, against a baseline of 0.853 ✱

### How it started

OBGYN residents at Kasturba Medical College wanted to further develop a clinical model and test its utility in the wards.

The idea was to predict childbirth outcomes from measurements taken during labor.

Their research built on [Eggebø et al. (2015)](https://doi.org/10.1016/j.ajog.2015.05.044) for the model, and [Usman et al. (2019)](https://doi.org/10.1016/j.ajog.2019.03.019) for the app.

### The first version

The first version started as a Flutter app that replicated the original model. It was built straight from the parameter coefficients published in the reference paper.

This gave us a starting point for the user interface, and made the model easier to evaluate in real-life scenarios.

*Later versions moved to a Next.js web app on Vercel, so there were no app store listings to maintain.*

### The new parameters

To develop the model further, the residents wanted to add new parameters, starting with angle of progression.

The published paper did not open-source the dataset it was trained on. So a new dataset was collected and cleaned specifically for this model.

A new model was trained from scratch on it, with two changes over the original:

- Standardized inputs, so no single measurement outweighs the others because of its units.
- A better training setup: balanced class weights and stratified 5-fold cross-validation.

### Result

Together, these took the model from a baseline of 0.853 AUC to ~0.97.

It now runs as a live web tool the residents can test and use in the wards.

[Open the live tool on Vercel ↗](https://intrapartum-web-app.vercel.app)

> **✱ How it was measured** *(folded note at the end of Result)*
> The model was scored on the residents' new dataset.
> - **AUC:** how well the model tells apart cases with and without a difficult outcome (1.0 is perfect, 0.5 is a coin flip).
> - **5-fold cross-validation:** the data was split into five parts. The model trained on four and was tested on the fifth, five times over, and the scores were averaged.
> - **Baseline:** 0.853 is the AUC reported in the original paper, on its own data.

### What I learned

**I learned…** how to turn a research paper into a working tool.

**Live tool:** intrapartum-web-app.vercel.app

---

## OTHER PROJECTS — ordering + framing decision

All 3 featured case studies are done (SUAS 2023, Intrapartum AI, Enterprise Search).

**Order for Other Projects, strongest → weakest (Nathan's call):** AutoShorts, then C-ROS, then Rollout.

**Framing:** These are hobby-scale, less involved than the featured case studies. Draft them in the same problem/approach/result/learnings shape for now so the content exists, but keep them lighter — exact on-page treatment (full mini-case vs. short card) TBD once we see how it lays out on the site.

### AutoShorts — Reddit-to-YouTube Pipeline

**Tagline:** Built a pipeline that turned Reddit threads into YouTube Shorts. (2022)

**Tags:** 166K+ views · 1,200+ watch hours

**The pipeline:** Reddit threads were scraped with PRAW and rebuilt as Reddit-style posts. Text-to-speech read them out, and MoviePy and FFmpeg put the video together.

**What viewers wanted:** The content alone was not enough to hold a viewer's attention. They also wanted a hypnotic background to watch while they listened. I added Minecraft parkour clips underneath, which spiked viewers and their attention.

**Looking back:** The codebase was one huge script with deeply nested classes. It re-scraped Reddit on every run, and even tried an automated upload to YouTube.

**I learned…** that not everything needs to be automated, and sometimes 80% of the gains come from 20% of the automation.

**Links:** [The channel](https://www.youtube.com/@threadpress7285/shorts) · [Watch a Short](https://www.youtube.com/shorts/wfIcFJlCC28). Source code lost.

---

### C-ROS — Middleware Library in C

**Tagline:** Built an inter-process communication (IPC) library in C that replicates the core of ROS. (2023)

**Tags:** <200μs latency

**Under the hood:** At Project MANAS, I used ROS to pass messages between modules. As a curious experiment, I built an equivalent of its pub-sub messaging from scratch.

**How it works:** The library is written in raw C, over TCP, with no outside libraries. A master node keeps track of topics, and nodes publish or subscribe to them. It supports the patterns of a typical middleware architecture, including one-to-one, one-to-many and many-to-one setups.

**Result:** Messages moved between nodes in under 200μs.

**I learned…** what ROS was quietly handling for me.

**Links:** [Source on GitHub](https://github.com/HyperToken9/CROSS)

---

### Rollout — Gyroscope Maze Game

**Tagline:** Built a tilt-controlled maze game for Android, on a physics engine. (2025)

**Tags:** Shipped to Play Store

**Why a game:** I wanted hands-on time with Flutter and a game engine, so I picked a scope small enough to finish.

**How it plays:** Tilting the phone rolls a ball through a maze, using the gyroscope and the Box2D physics engine. I made a few modes to keep it interesting, along with light and dark mode.

**Result:** The game is live on Google Play.

**I learned…** how to work with a physics engine.

**Links:** [Get it on Google Play](https://play.google.com/store/apps/details?id=com.greasepanstudios.amaze_game)

---

### Text-to-Handwriting

**⚠️ Resume correction:** resume currently lists "Angular + Flask" — actual order was React first (2023), Angular conversion attempted later and still unpolished. Worth auditing the rest of the resume for similar stack-order slips before anything goes live.

**Tagline:** Built a tool that turns typed text into pages that look handwritten and photographed. (2021)

**Why build it:** In 2021, despite classes being online, we often still got handwritten assignments. The tools available online were very easy to identify as fake, so I built my own.

**How it works:** I hand-wrote every character about 10 times on a tablet, so no two letters looked the same. At generation time, the tool went through the text one character at a time. For each one, it picked a random version, rotated and resized it slightly, and placed it on a paper background. I added noise and lowered the quality to make the page look photographed.

**Result:** Each page took a minute to generate, with no optimization. But the pages looked like photos of real handwriting.

**Looking back:** This was my first real software project, and it got me excited to work with software for the rest of my life, even though I made it with very little understanding of how a computer worked or how to write programs.

*In 2023, I built a React frontend for it while learning React. Looking at it now, the website was pretty bad.*

**I learned…** to love working with software.

**Links:** [Try it](https://text-2-handwriting-wheat.vercel.app) · [Source on GitHub](https://github.com/HyperToken9/text-2-handwriting)

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
