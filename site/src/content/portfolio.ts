// Single source of content for the site.
// Mirrors ../../../portfolio-content.md — wording is still a draft and will be
// revised once the layout is real. Edit copy here, not in the components.

export const site = {
  name: "Nathan Saldanha",
  role: "Software Developer",
  email: "nathansaldanha02@gmail.com",
  resumeHref: "/resume.pdf",
};

export const hero = {
  headline: "Curiosity-driven programming.",
  subhead: "As I do, as I learn.",
  aboutTeaser: "Hi, I'm Nathan. I like learning and building software.",
};

export const about = {
  paragraphs: [
    "I like solving complicated problems step by step.",
    "My work involves a number of different software domains.",
    "I graduated from Manipal Institute of Technology in 2025. Currently work as a Software Developer at ZS.",
    "My interests include pizza and too many energy drinks.",
  ],
};

export const skills: { verb: string; items: string[] }[] = [
  { verb: "to click", items: ["React", "Next.js", "Flutter", "Tailwind"] },
  { verb: "to backend", items: ["FastAPI", "PostgreSQL", "DuckDB"] },
  { verb: "to transform", items: ["PySpark", "Databricks", "Spark"] },
  { verb: "to see", items: ["OpenCV", "Image processing"] },
  {
    verb: "to predict",
    items: ["scikit-learn", "PPO / reinforcement learning", "AWS Bedrock"],
  },
  {
    verb: "to move",
    items: ["ROS", "Path & coverage planning", "Drone controls (MAVLink)", "Stanley control"],
  },
  {
    verb: "to talk",
    items: ["Hybrid search (BM25 + semantic)", "OpenSearch", "Query expansion", "Pub-sub / sockets"],
  },
  { verb: "to program", items: ["Python", "C/C++", "JavaScript"] },
];

export const exploring = {
  // Working title — still tentative.
  title: "Rabbit holes I'm currently down",
  items: [
    {
      label: "Reinforcement learning",
      detail: "Going through OpenAI's Spinning Up in Deep RL.",
      href: "https://spinningup.openai.com/",
      linkLabel: "spinningup.openai.com",
    },
    {
      label: "How programming languages work underneath",
      detail: "Going through Crafting Interpreters. Work in progress.",
      href: "https://craftinginterpreters.com/",
      linkLabel: "craftinginterpreters.com",
    },
    {
      label: "Getting AI tools into my real workflow",
      detail: "Going through Matt Pocock's Claude Code skills repo.",
      href: "https://github.com/mattpocock",
      linkLabel: "github.com/mattpocock",
    },
  ],
};

export type Block = { heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  org: string;
  year: string;
  tags: string[];
  role: string;
  headline: string;
  metric: { value: string; label: string };
  liveHref?: string;
  liveLabel?: string;
  note?: string;
  blocks: Block[];
  learned: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "suas-drone",
    title: "SUAS Drone — Navigation & Controls Rebuild",
    shortTitle: "SUAS Drone",
    tagline: "Rebuilding a flight stack that couldn't bend when the competition changed.",
    org: "Project MANAS, Manipal's student robotics team",
    year: "2023",
    tags: ["Robotics", "ROS", "MAVLink", "Python"],
    role: "Software and controls, end to end",
    headline: "2nd place at SUAS 2023",
    metric: { value: "2nd", label: "SUAS 2023, Maryland" },
    blocks: [
      {
        heading: "The problem",
        body: [
          "The team's SUAS drone ran on a fragile stack. The navigation planner crashed often. It couldn't replan mid-flight or take custom commands while airborne. It was also hard-coded to the 2022 competition format.",
          "Then the competition changed its task for 2023. The old stack couldn't flex to fit. Testing it was nearly impossible.",
        ],
      },
      {
        heading: "What I owned",
        body: [
          "Software and controls, end to end. This was a team effort — mechanical, electronics, and management ran in parallel — but the flight stack was mine.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "Rebuilt the planner from scratch. Stripped out ROS dependencies that weren't earning their keep, so the whole thing could run inline and actually be tested.",
          "Migrated the control layer from a C++ MAVLink library to a Python one. New territory for me at the time.",
          "Built a pipeline that matched the real mission: fly to a waypoint, sweep the area from above to cover it, identify five targets in that footage, drop a payload on each one, then head home. Because the new design was flexible, the drone could re-navigate once a target was found instead of following a fixed path.",
        ],
      },
      {
        heading: "The precision problem",
        body: [
          "After the sweep, the drone would hover 2 to 5 meters off target. Fine for a photo. Not fine for dropping a water bottle on something.",
          "I built a human-in-the-loop correction step. A live video feed goes to an operator, who taps the target in the frame. That tap gets translated into a directional correction — how far off-center the target is becomes how far and which way the drone moves — before it drops.",
        ],
      },
      {
        heading: "Result",
        body: [
          "100 to 200 test flights later, it worked reliably enough to fly. The team placed 2nd at SUAS 2023 in Maryland.",
        ],
      },
    ],
    learned:
      "Rigid systems break the moment the task changes. Building for the actual mission profile — not just the current rules — is what let the drone adapt when the competition did.",
  },
  {
    slug: "intrapartum-ai",
    title: "Intrapartum AI",
    shortTitle: "Intrapartum AI",
    tagline: "A childbirth-outcome model, replicated from a paper and then retrained on new data.",
    org: "Kasturba Medical College, for OBGYN residents",
    year: "2024",
    tags: ["scikit-learn", "Next.js", "Clinical ML"],
    role: "Modelling and app, end to end",
    headline: "0.97 AUC against a 0.853 published baseline",
    metric: { value: "0.97", label: "AUC (baseline 0.853)" },
    liveHref: "https://intrapartum-web-app.vercel.app",
    liveLabel: "intrapartum-web-app.vercel.app",
    blocks: [
      {
        heading: "The problem",
        body: [
          "A resident wanted to replicate a published clinical model — one that predicts difficult childbirth outcomes from labor measurements — as a usable app. Faculty routed the request to me after hearing about my robotics work.",
        ],
      },
      {
        heading: "Phase 1: replication",
        body: [
          "I implemented the existing model, an Eggebø et al. 2015 logistic regression, straight from the paper's published coefficients. Seven inputs: head-perineum distance, caput, occiput posterior, maternal age, BMI, gestational age, prolonged labor, cervical dilation. Published baseline: 0.853 AUC.",
          "First version was a Flutter app. Getting it onto both iOS and Android turned out to be more friction than the project needed, so I moved it to a Next.js web app instead.",
        ],
      },
      {
        heading: "Phase 2: retraining",
        body: [
          "The resident wanted to add a new predictor: angle of progression. The original model couldn't take it — it wasn't one of the paper's inputs, and there was no data for it. She collected a fresh dataset by hand.",
          "I retrained a new logistic regression from scratch on 9 features, with standardized inputs, balanced class weights, and 5-fold cross-validation. Mean AUC: 0.973.",
        ],
      },
      {
        heading: "The honest part",
        body: [
          "I tested the new model with and without angle of progression. Without it: 0.9745 AUC. With it: 0.9732. It made things very slightly worse.",
          "The whole point of collecting the new data was to add that feature. I flagged the result back to the resident and faculty anyway, rather than quietly shipping it because it was the ask.",
        ],
      },
      {
        heading: "Result",
        body: [
          "A live clinical decision-support tool, at close to 0.97 AUC versus the 0.853 baseline it replaced.",
        ],
      },
    ],
    learned:
      "Data collected for a specific hypothesis doesn't owe you a positive result. Reporting a null finding honestly is worth more than a model that just does what was asked.",
  },
  {
    slug: "enterprise-search",
    title: "Enterprise Search Optimization",
    shortTitle: "Enterprise Search",
    tagline: "Two search algorithms were sharing one query expansion and quietly fighting each other.",
    org: "Internal knowledge-discovery platform, ZS",
    year: "2025",
    tags: ["OpenSearch", "Hybrid search", "LLM", "AWS Bedrock"],
    role: "Self-initiated, end to end",
    headline: "~300% improvement in search relevance",
    metric: { value: "~300%", label: "search relevance improvement" },
    note: "Anonymized. Client, platform name, and real query examples are deliberately left out.",
    blocks: [
      {
        heading: "The problem",
        body: [
          "The company had an internal platform that surfaced tools, dashboards, and utilities built across the org, so people could find and reuse things instead of rebuilding them. Nobody assigned me this — search on it was broken, and I went looking at it on my own.",
          "Search was already hybrid: semantic plus keyword (BM25) over an OpenSearch index. But it only worked for direct matches. Anything abstract or off the exact wording came back empty, even when a related asset existed.",
        ],
      },
      {
        heading: "The path I didn't take",
        body: [
          "The obvious fix was training a custom embedding model tuned to the company's domain. I ruled it out. High effort, high risk to a search pipeline that already worked well for direct matches, and no guarantee it would fix the actual gap.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "Two changes, done together.",
          "First, a query expansion step. Before a query hits the index, a small LLM expands it with related terms and phrasing.",
          "Second, a restructured index. The name, short description, long description, and tags for each asset had all been concatenated into one blob, used as-is for both semantic and keyword search. I split them into separate fields, weighted by relevance, and scoped semantic search to only the fields that actually benefit from it.",
        ],
      },
      {
        heading: "The refinement that mattered most",
        body: [
          "One expansion doesn't serve both search methods well. BM25 wants exact related terms; semantic search wants related concepts, even if the wording is totally different. So I had the LLM produce two expansions in a single call — one tuned for keyword matching, one for semantic — instead of one generic expansion doing both jobs badly.",
          "That's what produced the bulk of the improvement, including matches on terms that didn't literally appear anywhere in the asset descriptions.",
        ],
      },
      {
        heading: "Result",
        body: ["About 300% improvement in search relevance."],
      },
    ],
    learned:
      "The fix wasn't a bigger model. It was noticing that two algorithms sharing one query expansion were quietly working against each other, and giving each one what it actually needed.",
  },
];

export type PlaygroundProject = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  metric?: string;
  problem: string;
  built: string[];
  result: string;
  learned: string;
  artifacts?: string;
};

// Hobby-scale. Lighter treatment than the featured case studies.
// Order is not final — see portfolio-content.md.
export const playground: PlaygroundProject[] = [
  {
    slug: "autoshorts",
    title: "AutoShorts",
    tagline: "Reddit-to-YouTube pipeline",
    year: "2023",
    tags: ["Python", "PRAW", "MoviePy", "FFmpeg"],
    metric: "166K+ views",
    problem:
      "Reddit-narration YouTube Shorts were having a moment. I wanted to automate the whole format, start to finish, just to see if I could.",
    built: [
      "Scraped Reddit threads with PRAW, then rebuilt a fake Reddit UI around each post — the post card, upvote count, username — so it looked native. Ran the thread text through TTS for narration. Assembled the final video with MoviePy and FFmpeg.",
      "Voice and captions alone didn't hold attention. Someone pointed out that viewers stick around for background gameplay footage, so I added Minecraft parkour clips running underneath. Engagement jumped.",
    ],
    result: "166K+ views, 1,200+ watch hours.",
    learned:
      "The code was rough — one script, deeply nested classes — and I automated things that didn't need it. It re-scraped Reddit on every run with no dedup, and I even automated the YouTube upload step when doing it manually would've been simpler and safer. Good lesson in where the line is between automating for speed and automating for its own sake.",
    artifacts: "YouTube channel link pending. Source code lost.",
  },
  {
    slug: "c-ros",
    title: "C-ROS",
    tagline: "Middleware library in C",
    year: "2023",
    tags: ["C", "TCP sockets", "Pub-sub"],
    metric: "<200μs latency",
    problem:
      "While working with ROS at MANAS, I got curious what was actually happening underneath its pub-sub messaging. Decided to build an equivalent from scratch and find out.",
    built: [
      "A pub-sub distributed messaging framework in raw C, over TCP, no existing libraries. Supports one-to-one, one-to-many, and many-to-one publisher/subscriber setups.",
    ],
    result: "Under 200μs message latency across distributed nodes.",
    learned:
      "Thread safety, low-level socket and TCP mechanics, message broker design, mutex-based synchronization — all the things ROS was quietly handling that I'd never had to think about before.",
    artifacts: "GitHub repo link pending.",
  },
  {
    slug: "rollout",
    title: "Rollout",
    tagline: "Gyroscope maze game",
    year: "2022",
    tags: ["Flutter", "Box2D", "Game dev"],
    metric: "Shipped to Play Store",
    problem:
      "Not really a problem this time — I wanted hands-on time with Flutter and a game engine, and picked a small enough scope to actually finish it.",
    built: [
      "A tilt-controlled maze game: the phone's gyroscope moves a ball through a maze, built on the Box2D physics engine. Added a few modes to keep it interesting — one where only the ball's traveled path is visible (fog), one where a spotlight follows the ball, and one where the maze ramps in difficulty. Light and dark mode included.",
    ],
    result: "Shipped it to Google Play, with a proper store listing and README. It's no longer live.",
    learned:
      "Small scope by design, and it paid off — this was real exposure to game dev and a physics engine, a different muscle from the backend and ML work I usually do.",
  },
  {
    slug: "text-to-handwriting",
    title: "Text-to-Handwriting",
    tagline: "Typed text, rendered as a photographed handwritten page",
    year: "2021",
    tags: ["Python", "Pillow", "React"],
    problem:
      "2021, COVID-era online classes. Got a handwritten assignment that made no sense to do by hand for an online class. The text-to-handwriting tools online at the time looked obviously fake. That was annoying enough to build my own.",
    built: [
      "Hand-wrote every ASCII character about 10 times on a tablet, for natural variation. Sourced a textured old-paper background, added noise and dropped the quality for realism. For each character, picked a variant, applied a slight rotation and resize, and composited it onto the page. Built with Pillow — didn't know OpenCV yet.",
    ],
    result:
      "No OS or performance knowledge at the time, so page generation took 2 to 3 minutes, completely unoptimized. But the output held up — looked like a photographed handwritten page.",
    learned:
      "This was my first real software project. Built a React frontend for it in 2023 while learning React; later attempted an Angular conversion that's still unpolished.",
    artifacts: "Source + showcase links to be added.",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Case Studies" },
  { href: "/playground", label: "Playground" },
];
