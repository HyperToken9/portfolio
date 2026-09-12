# Portfolio Project — Session Handoff

*Hand this whole document to a new Claude session to continue building Nathan's portfolio website content. It contains everything needed to pick up without repeating the interview. There is no return path — treat this as the single source of truth.*

---

## WHAT THIS PROJECT IS

Nathan is building a **portfolio website** to display his projects, the tech he's used, and what he used it for. He has a Pinterest design reference (scrapbook/mood-board aesthetic — torn-paper cards, sticky notes, polaroids, hand-drawn accents) that he pulled and likes, but **design is deliberately deferred**. The current job is **content and layout planning only** — writing the actual copy and deciding what goes where, before any UI work.

The output so far lives in a working markdown doc (`portfolio-content.md`). This handoff summarizes its state plus all the interview context behind it.

### Goal & audience
- **Main goal:** Job hunting (full-time roles), with a secondary use as a personal showcase. Leaning job-hunting.
- **Primary audience:** Engineering managers / tech leads. This means prioritize **technical depth and judgment** over surface polish — show how he thinks, not just that he shipped.
- **Philosophy Nathan stated:** the portfolio tells the *story*; the resume does the filtering. Every project should have room for "why I built it" and "what I learned," not just "what it did."

---

## VOICE & TONE RULES (critical — apply everywhere)

Nathan is particular about voice. He revised drafts heavily toward these rules:

1. **Plain, everyday words.** No big vocabulary, no pretension. He explicitly said: "I like to speak normal, using the most basic vocabulary I can." He's "not a very pretentious person."
2. **Short, declarative sentences. One idea per line.** He rewrote paragraph-style drafts into clipped single statements. Avoid essay-style connective tissue.
3. **No forced cleverness / no bolted-on jokes.** He rejected several "cute" attempts (e.g. a handwriting-forgery joke, "flying drones into things at 2nd place"). Personality should come from *real* small details, not gags.
4. **Watch the "I" repetition.** He got self-conscious about every line starting with "I." Vary sentence openings; sometimes lead with the subject/thing instead. BUT don't over-correct into cold detachment — a natural mix is best.
5. **Don't over-explain or narrate what's coming.** He disliked drafts that kept "reciting what is about to happen." Just say the thing.
6. **Personality anchors that are fair game:** likes trying any pizza place at least once; runs on too many energy drinks; still learning not to overbuild things that don't need it; curiosity-driven (builds things because they're interesting).

---

## LOCKED CONTENT (do not re-litigate unless Nathan asks)

### Sitemap
1. **Home** — Hero, About (short), Featured Works (3 cards), Contact CTA
2. **About** (full) — extended bio, skills, design side-note
3. **Case Studies** (full page each): Enterprise Search Optimization, Intrapartum AI, SUAS Drone
4. **Other Projects** (lighter cards, mixed depth): Rollout, AutoShorts, Text-to-Handwriting, Drone RL, C-ROS, Travel (Travel may fold into About instead)
5. **Contact**

*(The "trusted by / affiliations" strip was considered and DROPPED — Nathan has no clients, didn't want a logo strip as padding.)*

### Hero
- **Headline (locked):** Curiosity-driven programming.
- **Subhead (locked):** As I do, as I learn.
- CTA: Contact / Resume download

### About — short (Home teaser) (locked)
> Hi, I'm Nathan. I like learning and building software.

### About — full page (locked v4)
> I like solving complicated problems step by step.
>
> My work involves a number of different software domains.
>
> I graduated from Manipal Institute of Technology in 2025. Currently work as a Software Developer at ZS.
>
> My interests include pizza and too many energy drinks.

*(Note: the "number of different software domains" line stands alone with no follow-up connector — that was Nathan's explicit call. Revisit only if he raises it.)*

### Skills — "What I reach for" framing (locked structure, verb-based)
Tight lowercase verb labels, each → the tools that serve it. Built from the FULL body of work (interviews), not just the resume list.

- **to click** — React, Next.js, Flutter, Tailwind
- **to backend** — FastAPI, PostgreSQL, DuckDB
- **to transform** — PySpark, Databricks, Spark
- **to see** — OpenCV, image processing
- **to predict** — scikit-learn, PPO / reinforcement learning, AWS Bedrock
- **to move** — ROS, path & coverage planning, drone controls (MAVLink), Stanley control
- **to talk** — Hybrid search (BM25 + semantic), OpenSearch, query expansion, pub-sub / sockets
- **to program** — Python, C/C++, JavaScript

*(8 verbs may be dense in a grid; can merge to 6 if design gets cramped. AWS Lambda/Batch left off as "plumbing" — add back if Nathan wants them visible.)*

### Currently Exploring (locked content, title tentative)
Working title: "Rabbit holes I'm currently down"
- Reinforcement learning — going through OpenAI's Spinning Up in Deep RL doc (link this on site)
- How programming languages work underneath — going through Crafting Interpreters (book), work in progress
- Getting AI tools into his real workflow — going through Matt Pocock's Claude Code skills repo

---

## PROJECT INTERVIEW CONTENT (the raw material for case studies + cards)

### 1. Enterprise Search Optimization (ZS) — FEATURED CASE STUDY
**⚠️ CONFIDENTIALITY: Heavily anonymized. Do NOT name the client, do NOT name the platform, do NOT use real query examples. (The real names and examples are kept out of this repo on purpose.) The 300% metric and rough architecture ARE shareable. Refer to it generically, e.g. "Internal Knowledge-Discovery Platform" / "Enterprise Search Optimization."**

- **His initiative** (not assigned). An internal company platform surfaced tools/dashboards/CLIs/utilities from across the company for visibility. Search on it was broken.
- **The problem:** Abstract/niche queries returned nothing even when conceptually related assets existed. (He gave a real example, which is deliberately not recorded here.) Existing search was already hybrid — semantic + lexical (BM25) over an OpenSearch index — but relevance was surface-level only.
- **Path NOT taken (good judgment story):** The team initially considered training/hosting their own domain-specific embedding model. He correctly rejected this as high-effort, high-risk to the existing performant direct-match search.
- **What he built (two parts):**
  1. **Query expansion pre-processing step** — a small AWS-hosted lightweight LLM expands the user's query (adds relevant terms/phrases) *before* it hits the index.
  2. **Restructured, weighted index** — previously name + short desc + long desc + tags were concatenated into ONE blob used for both semantic and lexical indexing. He split fields out with **per-field weighting**, and scoped semantic search to only a subset of the asset's details.
- **The key refinement (best technical insight):** A single query expansion doesn't serve both algorithms well — BM25 (lexical) wants different expansion terms than semantic search does. So he had the LLM produce **two expansions in one call**, one-shot-prompted separately: one tuned for lexical/BM25 matching, one for semantic. This gave the big boost — including on query terms not present anywhere in the asset base.
- **Result:** ~300% search relevance improvement.
- **Artifacts:** Can share rough architecture diagram (he'll sketch one: query → dual expansion → weighted hybrid index → results) and the 300% number. NO raw examples, NO client/platform name.

### 2. Intrapartum AI (Kasturba Medical College) — FEATURED CASE STUDY
**Confidentiality: shareable but anonymized — no patient data. Methodology, code, UI, metrics all fine.**

- **Origin:** Faculty routed a request from OBGYN residents to him (his robotics-club reputation got him noticed). They wanted to replicate a published clinical model + associated app.
- **Phase 1 — Replication:** Implemented the existing Eggebø et al. 2015 logistic regression model (published baseline **AUC 0.853**) directly from the paper's coefficients (intercept 18.52 + HPD, caput, occiput posterior, maternal age, BMI, gestational age, prolonged labor, cervical dilation). Originally ported into a **Flutter** app.
- **Pivot:** iOS/Android dual-deployment friction → moved to a **Next.js web app on Vercel** instead.
- **Phase 2 — Retraining:** Resident wanted a NEW predictor added: **angle of progression**. Original dataset/model couldn't accommodate it, so she collected fresh data (Excel sheet of raw parameters). He retrained a new logistic regression from scratch: 9 features, **StandardScaler**, balanced class weights, **stratified 5-fold cross-validation** → **~0.973 mean AUC**.
- **The honest-engineering nuance (great detail):** He tested the model WITH vs WITHOUT angle of progression and found AoP contributed basically nothing (≈0.9745 without vs 0.9732 with; Δ ≈ −0.0013). Despite AoP being the whole reason for the data re-collection. **He flagged this back to the resident/faculty** rather than silently shipping the ask.
- **Result:** Working, live clinical decision-support tool. AUC 0.97 vs 0.853 baseline.
- **Artifacts:** LIVE TOOL at https://intrapartum-web-app.vercel.app/ (confirmed working — single-assessment form: maternal age, BMI, gestational age, cervical dilation, head-perineum distance, angle of progression, caput >10mm, prolonged labour, occiput position). Screenshots available. Source notebook (compare.ipynb) exists. Two source papers exist (Eggebø 2015 + 2019 intrapartum app letter).

### 3. SUAS Drone — Navigation & Controls Rebuild (Project MANAS) — FEATURED CASE STUDY
- **Context:** Project MANAS = Manipal student robotics/AI club. Structured ~6-month onboarding (Python, C++, classical ML — SVMs, regression, k-means; ROS fundamentals — pub/sub, path planners; OpenCV — morphological transforms, kernels; CNNs, U-Nets, DQNs, ResNets) before members pick a platform (autonomous car, UGV, or one of two drones — a small test-bench drone and a large SUAS drone).
- **His ownership:** He owned the **software / controls stack end-to-end** within a larger cross-functional team (mechanical, electronics, management divisions). NOT the overall leader — a senior led the team. Frame as "Software & Controls" ownership, don't overclaim the whole project.
- **The problem he inherited:** Existing SUAS drone stack was software-fragile. Navigation/control planner crashed frequently, couldn't replan mid-flight or take custom in-air commands, and was hard-coded to the SUAS 2022 task format. SUAS 2023 changed the task significantly → old stack couldn't flex. Testing was nearly impossible.
- **What he rebuilt:**
  - Redesigned the planner from scratch; stripped some ROS dependencies to make things inline and testable.
  - Migrated control layer from a **C++ MAVLink library to a Python MAVLink library** (new territory for him at the time).
  - Built a flexible pipeline for the real mission profile: **waypoint nav → coverage-planning sweep (top-down image sweep of an area) → identify 5 targets of interest → precision payload drop (water bottles) → return to base.** Re-navigation step once targets were defined — the flexible design is what enabled this.
- **The precision problem + his fix (best part):** After the coverage sweep, the drone would hover **2–5 m off target** — unacceptable for a drop. He built a **human-in-the-loop visual correction loop**: live video feed to a human operator, operator selects/confirms the target in-frame, the offset from image-center is translated into a directional correction command sent back to the drone to recenter before dropping (treating screen-center as drone position).
- **Validation:** 100–200 test flights.
- **Result:** **2nd place at SUAS 2023, Maryland, USA.**
- **Artifacts:** Footage of drops/flights available.

### 4. C-ROS: Middleware Library in C — OTHER PROJECT (lean)
- **Origin:** Learned ROS's comms patterns at MANAS, got curious what's underneath, decided to build an equivalent from scratch. He called it "a very crazy project."
- **Built:** Pub-sub distributed messaging framework in **raw C over TCP**, no existing libraries. Supports 1:1, 1:many, many:1 publisher/subscriber topologies.
- **Taught him:** thread safety, low-level socket/TCP mechanics, message broker design, mutex-based synchronization.
- **Result:** **<200μs message latency** across distributed nodes.
- **Artifact:** GitHub repo exists (link needed). No specific war story recalled — keep it lean, don't fabricate one.

### 5. Rollout — Gyroscope Maze Game — OTHER PROJECT (can be full mini-case)
- **Motivation:** Wanted to get better at Flutter and try a game engine.
- **Mechanic:** Tilt-controlled ball through a maze using phone **gyroscope**, built on **Box2D** physics engine.
- **Product touches:** Multiple game modes — a fog/reveal mode (only see where the ball has been), a spotlight-follow mode, and a difficulty-ramping maze mode. Light + dark mode.
- **Shipped:** Was live on Google Play (with a genuinely good store listing + README), no longer live.
- **Retrospective:** Small scope by design; real exposure to game-dev + physics engine — different muscle from his usual backend/ML.
- **Artifacts:** Screenshots/recordings available. Source code still exists (repo linkable).

### 6. AutoShorts — Reddit-to-YouTube Pipeline — OTHER PROJECT (on resume)
- **Origin:** Saw the Reddit-narration YouTube Shorts trend, wanted to automate the whole format. Built alongside the MANAS task phase.
- **Pipeline:** PRAW to scrape Reddit threads → synthesized fake Reddit UI components (post, upvote, username) → TTS narration of the thread verbatim → MoviePy/FFmpeg for video assembly.
- **Data-informed pivot:** Voice+captions alone performed poorly; someone told him viewers stay for the background gameplay footage → he added Minecraft-parkour-style background → engagement jumped.
- **Result (resume number CONFIRMED accurate):** 166K+ views, 1,200+ watch hours.
- **Retrospective (the valuable part — over-engineering self-awareness):** Rough code — single script, deeply nested classes. Over-automated things that didn't need it (re-scraping Reddit each run with no proper dedup; even automated the YouTube upload step when manual was simpler/safer). Clear "I learned where the line is on automation" takeaway.
- **Artifacts:** Source lost. YouTube channel still exists (Nathan will share link — was still pending at handoff).

### 7. Text-to-Handwriting — OTHER PROJECT (on resume)
- **⚠️ RESUME CORRECTION:** Resume lists "Angular + Flask" but the real order is **React first, Angular conversion attempted later (still unpolished)**. Reconcile this — and it's worth auditing the resume for other stack-order errors before anything goes live.
- **Origin (2021, his FIRST software project):** COVID-era, online classes, got a handwritten assignment that made no sense to do by hand. Existing text-to-handwriting tools online looked fake. Got annoyed, built his own.
- **Approach:** Hand-wrote every ASCII character ~10 times on a tablet for natural variation. Sourced a textured "old paper" background, added noise + reduced quality for realism. Per-character rendering: pick a variant, apply slight rotation + resize, composite onto page. Built with **Pillow** (didn't know OpenCV yet).
- **Honest bit:** No OS/performance knowledge then — page generation took 2–3 min, unoptimized. But output was convincing — looked like a photographed handwritten page.
- **Evolution:** 2023 built a React frontend (learning React); later attempted an Angular conversion (still unpolished).
- **Artifacts:** source + showcase links exist (on resume).

### 8. Drone RL — Gate-Racing Agent — OTHER PROJECT (most recent)
- **Motivation:** Wanted hands-on RL, outside anything from work or MANAS. His "currently leveling up" project.
- **Setup:** Trained a drone control policy with **PPO** to fly through a gate course (square-frame track). Started in **PyBullet**, later moved to **Genesis World** (newer GPU-accelerated sim) for faster iteration.
- **Result:** Working policy, drone flies the course; video evidence exists.
- **Status:** Wrapped up for now. **No repo** — video-only artifact (that's fine).

### 9. Travel — AI Travel Planner — DESIGN-ONLY ASIDE (not a case study)
- Unfinished personal project with friends. His role was **frontend + UI/UX design** (not engineering here).
- Made a detailed, visually polished **Figma** — though component structure was "brute force," not cleanly systematized.
- Never shipped. Portfolio value: evidence of design sensibility. Best used as a small aside in the About page (the "I also care about design" note) rather than its own project card. Figma screenshots available.

### ON THE RESUME, DEPRIORITIZED
- **UGV / IGVC 2023** work (computer vision pipeline for an Unmanned Ground Vehicle, <10cm object localization, 3rd place IGVC 2023). He worked on the UGV "in little capacity." Also a **Stanley controller** he built for the autonomous car platform. **Decision: deprioritized, not going in the portfolio.**

---

## OPEN QUESTIONS / TODO (where we stopped)

We had JUST finished the skills rework and were about to write the three featured case studies. Immediate next steps:

1. **Write the 3 featured case studies** in the locked plain voice — order agreed: **SUAS Drone first** (richest story), then **Intrapartum AI**, then **Enterprise Search**. Each should include a "what I learned" callout (1–2 lines) — Nathan confirmed he wants this on each project. Case-study template shape (problem/approach/result/learnings) is a default but NOT locked — Nathan wanted to "revisit after seeing a draft," so show him one and let him react before templating all three. **IN PROGRESS — SUAS Drone draft underway.**
2. **Other Projects section** — Nathan wants "mixed" depth, picking per project which get full mini-case-studies vs short cards. Rollout and C-ROS have enough for mini-cases; AutoShorts too. Confirm per-project with him.
3. **Loose ends to collect from Nathan:** YouTube channel link (AutoShorts), GitHub links (C-ROS, Rollout), resume stack-order correction (Text-to-Handwriting, and audit the rest).
4. ~~Decide whether to do a UGV/IGVC interview round~~ — **DECIDED: deprioritized, dropped from portfolio.**
5. **"Currently exploring"** — content updated with specific links/sources (Spinning Up RL doc, Crafting Interpreters, Matt Pocock skills repo). Title "Rabbit holes I'm currently down" still tentative.

---

## WORKING STYLE THAT WORKED WELL WITH NATHAN
- He preferred being **interviewed** project-by-project rather than dumping everything at once — one focused round at a time, building context progressively.
- He likes **reviewing section by section**, not one giant delivery.
- Tappable multiple-choice questions worked well for quick decisions (he's likely on mobile). Keep questions tight, 1–3 at a time.
- He edits copy himself and hands back his rewrites — mirror his exact rhythm when he does, don't "improve" past his stated preference.
- He'll reject cleverness fast. When in doubt, simpler and plainer.
- Content/planning phase ONLY right now — resist jumping to design/UI until he says so.
