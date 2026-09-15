import type { LogoId } from "./logos";

// Single source of content for the site.
// Mirrors ../../../portfolio-content.md. Wording is still a draft and will be
// revised once the layout is real. Edit copy here, not in the components.

export const site = {
  name: "Nathan Saldanha",
  role: "Software Developer",
  email: "nathansaldanha02@gmail.com",
  resumeHref: "/resume.pdf",
};

export const hero = {
  headline: "Curiosity Driven Development.",
  subhead: "As I do, as I learn.",
  aboutTeaser: "Hi, I'm Nathan. I like learning and building software.",
};

export const about = {
  paragraphs: [
    "I like solving complicated problems step by step.",
    "My work involves a number of different software domains.",
    "I graduated from Manipal Institute of Technology in 2025. Currently work as a Full Stack Developer at ZS.",
    "My interests include pizza and too many energy drinks.",
  ],
};

// Only tools with a real logo that the work on this site backs up.
export const skills: {
  verb: string;
  items: { name: string; logo: LogoId }[];
}[] = [
  {
    verb: "to program",
    items: [
      { name: "Python", logo: "python" },
      { name: "JavaScript", logo: "javascript" },
      { name: "C++", logo: "cplusplus" },
    ],
  },
  {
    verb: "to frontend",
    items: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "Tailwind", logo: "tailwind" },
      { name: "Flutter", logo: "flutter" },
    ],
  },
  {
    verb: "to backend",
    items: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "PostgreSQL", logo: "postgresql" },
    ],
  },
  {
    verb: "to crunch",
    items: [
      { name: "Apache Spark", logo: "spark" },
      { name: "Databricks", logo: "databricks" },
    ],
  },
  {
    verb: "to think",
    items: [
      { name: "AWS Bedrock", logo: "aws" },
      { name: "OpenSearch", logo: "opensearch" },
      { name: "scikit-learn", logo: "scikitlearn" },
      { name: "OpenCV", logo: "opencv" },
    ],
  },
  { verb: "to robot", items: [{ name: "ROS", logo: "ros" }] },
];

export const exploring = {
  // Working title, still tentative.
  title: "Rabbit holes I'm currently down",
  items: [
    {
      label: "Reinforcement Learning",
      detail: "Going through OpenAI's Spinning Up in Deep RL.",
      href: "https://spinningup.openai.com/",
      linkLabel: "spinningup.openai.com",
    },
    {
      label: "Compilers and Interpreters",
      detail: "Going through Crafting Interpreters.",
      href: "https://craftinginterpreters.com/",
      linkLabel: "craftinginterpreters.com",
    },
    {
      label: "AI Harnesses",
      detail: "Going through Matt Pocock's Claude Code skills repo.",
      href: "https://github.com/mattpocock",
      linkLabel: "github.com/mattpocock",
    },
  ],
};

// Two options rated row by row: the one that lost first, the one that won second.
export type Comparison = {
  options: [ComparisonOption, ComparisonOption];
  rows: { label: string; cells: [string, string] }[];
};
export type ComparisonOption = {
  eyebrow: string;
  title: string;
  stamp: string;
};

export type Block = {
  heading: string;
  body: string[];
  // Supporting image, served from public/work/<slug>/.
  image?: { src: string; alt: string; ratio: string };
  comparison?: Comparison;
  // Two images to drag between, served from public/work/<slug>/.
  beforeAfter?: BeforeAfter;
  // How a result was measured, folded away at the end of the section.
  measured?: Measured;
};

export type BeforeAfter = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  ratio: string;
  caption: string;
};

export type Measured = {
  intro: string[];
  scores: { name: string; detail: string }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  // One sentence for the Experience card. `highlight` must appear in it and
  // is marked up as the result; `stat` must appear in `highlight` and is
  // pulled out as the big number.
  summary: string;
  highlight: string;
  stat: string;
  org: string;
  year: string;
  tags: string[];
  role: string;
  headline: string;
  // Card image, served from public/work/<slug>/. An .mp4 plays on a loop and
  // needs a still next to it named <name>-poster.jpg.
  thumbnail?: string;
  metric: { value: string; label: string };
  liveHref?: string;
  liveLabel?: string;
  note?: string;
  blocks: Block[];
  learned: string;
  // Heading for the "learned" box, read as the start of the sentence
  // (e.g. "I learned…" + "how to…"). Defaults to "What I learned".
  learnedLead?: string;
};

// Case studies: the full story of a piece of work done at an Experience.
// Kept in the same order as `experiences` so "next" links follow it.
export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-search",
    thumbnail: "/work/enterprise-search/thumbnail.mp4",
    title: "Enterprise Search Optimization",
    shortTitle: "Enterprise Search",
    tagline: "Fixing semantic search on scientific topics.",
    summary:
      "LLM-powered query expansion using AWS Bedrock and OpenSearch, surfacing scientific documents, for ~3× higher search relevance.",
    highlight: "~3× higher search relevance",
    stat: "~3×",
    org: "a Knowledge Discovery Platform",
    year: "2025",
    tags: ["OpenSearch", "Hybrid search", "LLM", "AWS Bedrock"],
    role: "Proposed and Built",
    headline: "~3× higher search relevance",
    metric: {
      value: "~3×",
      label: "higher score on the internal search benchmark",
    },
    note: "Anonymized. Client and platform related specifics are intentionally left out.",
    blocks: [
      {
        heading: "The problem",
        body: [
          "The company had an internal platform for surfacing assets, tools and utilities built across teams.",
          "It used a hybrid search structure (with a BM25 keyword search + KNN vector search) over OpenSearch hosted on AWS.",
          "The semantic side underperformed, especially on niche topics from scientific literature.",
        ],
      },
      {
        heading: "The path not taken",
        comparison: {
          options: [
            {
              eyebrow: "Original plan",
              title: "Custom embedding model",
              stamp: "RISKY",
            },
            {
              eyebrow: "Proposed plan",
              title: "Query expansion module",
              stamp: "SHIPPED",
            },
          ],
          rows: [
            {
              label: "Effort",
              cells: ["Train or find a model", "One small add-on"],
            },
            {
              label: "Running cost",
              cells: ["Host a model", "One LLM call per query"],
            },
            {
              label: "Will it work?",
              cells: ["No guarantee", "Easy to test first"],
            },
            {
              label: "Index changes",
              cells: ["Re-embed everything", "No change required"],
            },
          ],
        },
        body: [
          "The plan was to replace the embedding model with one that handled scientific terms better, either trained in house or found online.",
          "That meant a long build and evaluation process, the cost of hosting a new model, and no promises of being a complete solution.",
          "I instead proposed a smaller query expansion module. Which would be easier to build and evaluate if it worked.",
        ],
      },
      {
        heading: "What got built",
        body: [
          "We went ahead with the query expansion module. Every query would now get expanded by an LLM on AWS Bedrock before hitting the index.",
          "The module handled both the keyword and vector legs of the search in a single LLM call.",
          "The BM25 query was appended with exact related terms. The KNN vector search received standardized phrases explaining the intent of the user.",
        ],
      },
      {
        heading: "The refinement",
        beforeAfter: {
          before: {
            src: "/work/enterprise-search/fields-before.jpg",
            alt: "Before: an asset's name, description, tags and metadata stored together in one text field",
          },
          after: {
            src: "/work/enterprise-search/fields-after.jpg",
            alt: "After: name, description, tags and metadata in separate fields, each with its own weight",
          },
          ratio: "1196 / 416",
          caption: "drag to compare the index, before and after",
        },
        body: [
          "While integrating this module, the keyword index was found to store each asset's name, descriptions, tags and metadata as one combined field.",
          "These were split into separate fields, and a new query weighted each by relevance. This improved the reliability of keyword matches, especially against typos.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Together, the changes scored ~3× higher on an internal search relevance benchmark.",
        ],
        measured: {
          intro: [
            "The platform owners kept a list of search queries and the results they expected.",
            "That list became a benchmark with two scores:",
          ],
          scores: [
            { name: "Top-1 accuracy", detail: "was the right result first?" },
            {
              name: "Top-3 score",
              detail:
                "a right result still counts in second or third place, just for less (1, ½, ⅓).",
            },
          ],
        },
      },
    ],
    learnedLead: "I learned…",
    learned:
      "how to evaluate solutions on viability, cost and effort.",
  },
  {
    slug: "intrapartum-ai",
    thumbnail: "/work/intrapartum-ai/thumbnail.mp4",
    title: "Intrapartum AI",
    shortTitle: "Intrapartum AI",
    tagline:
      "A childbirth-outcome model, replicated from a paper and then retrained on new data.",
    summary:
      "A clinical model that predicts difficult childbirth outcomes, reaching 0.97 AUC against the paper's 0.853.",
    highlight: "0.97 AUC against the paper's 0.853",
    stat: "0.97",
    org: "Kasturba Medical College, for OBGYN residents",
    year: "2024",
    tags: ["scikit-learn", "Next.js", "Clinical ML"],
    role: "Modelling and app, end to end",
    headline: "0.97 AUC against the paper's 0.853",
    metric: { value: "0.97", label: "AUC, against the paper's 0.853" },
    liveHref: "https://intrapartum-web-app.vercel.app",
    liveLabel: "intrapartum-web-app.vercel.app",
    blocks: [
      {
        heading: "The problem",
        body: [
          "A resident at Kasturba Medical College wanted a published clinical model turned into an app.",
          "The model predicts difficult childbirth outcomes from measurements taken during labor.",
          "Faculty passed the request to me after hearing about my robotics work.",
        ],
      },
      {
        heading: "The first version",
        body: [
          "The model was an Eggebø et al. (2015) logistic regression. It was rebuilt straight from the paper's coefficients, using eight inputs: head-perineum distance, caput, occiput position, maternal age, BMI, gestational age, prolonged labor and cervical dilation.",
          "It started as a Flutter app. Shipping to both iOS and Android was more hassle than the project needed, so it moved to a Next.js web app on Vercel.",
        ],
      },
      {
        heading: "The new predictor",
        body: [
          "The resident wanted to add a new predictor: angle of progression.",
          "The original model couldn't take it, since it wasn't one of the paper's inputs. So she collected a new dataset by hand.",
          "A new logistic regression was trained from scratch on 9 features, with standardized inputs and balanced class weights. It scored a mean AUC of 0.973.",
        ],
      },
      {
        heading: "The honest part",
        body: [
          "The model was tested with and without angle of progression. Without it: 0.9745 AUC. With it: 0.9732.",
          "The new predictor made the model very slightly worse, even though it was the reason the data was collected.",
          "I flagged this to the resident and faculty instead of quietly shipping what was asked for.",
        ],
      },
      {
        heading: "Result",
        body: [
          "A live clinical decision-support tool, scoring ~0.97 AUC against the paper's 0.853.",
        ],
        measured: {
          intro: ["The model was scored on the resident's new dataset."],
          scores: [
            {
              name: "AUC",
              detail:
                "how well the model tells apart cases with and without a difficult outcome (1.0 is perfect, 0.5 is a coin flip).",
            },
            {
              name: "5-fold cross-validation",
              detail:
                "the data was split into five parts. The model trained on four and was tested on the fifth, five times over, and the scores were averaged.",
            },
            {
              name: "Baseline",
              detail:
                "0.853 is the AUC reported in the original paper, on its own data.",
            },
          ],
        },
      },
    ],
    learnedLead: "I learned…",
    learned:
      "to report a result honestly, even when it isn't the one people wanted.",
  },
  {
    slug: "suas-drone",
    thumbnail: "/work/suas-drone/thumbnail.mp4",
    title: "SUAS Drone: Navigation & Controls Rebuild",
    shortTitle: "SUAS Drone",
    tagline:
      "Rebuilding a flight stack that couldn't bend when the competition changed.",
    summary:
      "Planning and navigation system for an autonomous drone that placed second at the SUAS 2023 competition.",
    highlight: "placed second at the SUAS 2023 competition",
    stat: "second",
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
          "Software and controls, end to end. This was a team effort, with mechanical, electronics and management running in parallel, but the flight stack was mine.",
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
          "I built a human-in-the-loop correction step. A live video feed goes to an operator, who taps the target in the frame. Before the drop, that tap becomes a directional correction: how far off-center the target is sets how far and which way the drone moves.",
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
      "Rigid systems break the moment the task changes. Building for the actual mission profile, not just the current rules, is what let the drone adapt when the competition did.",
  },
];

// Places Nathan did significant work, in order of priority. Each holds one or
// more pieces of work, listed by case-study slug. To spotlight another piece
// of work at a place, add its case study above and its slug to `work`.
export type Experience = {
  place: string;
  // One word on what kind of place it was, e.g. a job vs. a student team.
  kind: string;
  role: string;
  period: string;
  summary?: string;
  work: string[];
};

export const experiences: Experience[] = [
  {
    place: "ZS",
    kind: "Job",
    role: "Full Stack Developer",
    period: "2025 – now",
    summary: "Tech consultancy for pharma clients.",
    work: ["enterprise-search"],
  },
  {
    place: "Kasturba Medical College",
    kind: "Research",
    role: "Modelling and app",
    period: "2024",
    summary: "Clinical decision support for OBGYN residents.",
    work: ["intrapartum-ai"],
  },
  {
    place: "Project MANAS",
    kind: "Student team",
    role: "Software and controls",
    period: "2021 – 2024",
    summary: "The official AI and robotics team of MIT Manipal.",
    work: ["suas-drone"],
  },
];

export type PlaygroundProject = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  metric?: string;
  // Card image (16:10), served from public/projects/<slug>/. An .mp4 plays on
  // a loop and needs a still next to it named <name>-poster.jpg.
  thumbnail?: string;
  problem: string;
  built: string[];
  result: string;
  learned: string;
  artifacts?: string;
};

// Hobby-scale, shown under "Just for fun". Each gets its own page at /projects/[slug].
// Order is not final. See portfolio-content.md.
export const playground: PlaygroundProject[] = [
  {
    slug: "autoshorts",
    thumbnail: "/projects/autoshorts/thumbnail.mp4",
    title: "AutoShorts",
    tagline:
      "Content generation pipeline that scraped Reddit threads and turned them into videos.",
    year: "2023",
    tags: ["Python", "PRAW", "MoviePy", "FFmpeg"],
    metric: "166K+ views",
    problem:
      "Reddit-narration YouTube Shorts were having a moment. I wanted to automate the whole format, start to finish, just to see if I could.",
    built: [
      "Scraped Reddit threads with PRAW, then rebuilt a fake Reddit UI around each post (the post card, upvote count, username) so it looked native. Ran the thread text through TTS for narration. Assembled the final video with MoviePy and FFmpeg.",
      "Voice and captions alone didn't hold attention. Someone pointed out that viewers stick around for background gameplay footage, so I added Minecraft parkour clips running underneath. Engagement jumped.",
    ],
    result: "166K+ views, 1,200+ watch hours.",
    learned:
      "The code was rough, one script with deeply nested classes, and I automated things that didn't need it. It re-scraped Reddit on every run with no dedup, and I even automated the YouTube upload step when doing it manually would've been simpler and safer. Good lesson in where the line is between automating for speed and automating for its own sake.",
    artifacts: "YouTube channel link pending. Source code lost.",
  },
  {
    slug: "c-ros",
    thumbnail: "/projects/c-ros/thumbnail.mp4",
    title: "C-ROS",
    tagline:
      "Inter-process communication (IPC) library in C that replicates the core of ROS.",
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
      "Thread safety, low-level socket and TCP mechanics, message broker design, mutex-based synchronization. All the things ROS was quietly handling that I'd never had to think about before.",
    artifacts: "GitHub repo link pending.",
  },
  {
    slug: "rollout",
    thumbnail: "/projects/rollout/thumbnail.mp4",
    title: "Rollout",
    tagline:
      "Tilt-controlled maze game for Android, built on a physics engine.",
    year: "2022",
    tags: ["Flutter", "Box2D", "Game dev"],
    metric: "Shipped to Play Store",
    problem:
      "Not really a problem this time. I wanted hands-on time with Flutter and a game engine, and picked a small enough scope to actually finish it.",
    built: [
      "A tilt-controlled maze game: the phone's gyroscope moves a ball through a maze, built on the Box2D physics engine. Added a few modes to keep it interesting: one where only the ball's traveled path is visible (fog), one where a spotlight follows the ball, and one where the maze ramps in difficulty. Light and dark mode included.",
    ],
    result:
      "Shipped it to Google Play, with a proper store listing and README. It's no longer live.",
    learned:
      "Small scope by design, and it paid off. This was real exposure to game dev and a physics engine, a different muscle from the backend and ML work I usually do.",
  },
  {
    slug: "text-to-handwriting",
    thumbnail: "/projects/text-to-handwriting/thumbnail.mp4",
    title: "Text-to-Handwriting",
    tagline:
      "Turns typed text into pages that look handwritten and photographed.",
    year: "2021",
    tags: ["Python", "Pillow", "React"],
    problem:
      "2021, COVID-era online classes. Got a handwritten assignment that made no sense to do by hand for an online class. The text-to-handwriting tools online at the time looked obviously fake. That was annoying enough to build my own.",
    built: [
      "Hand-wrote every ASCII character about 10 times on a tablet, for natural variation. Sourced a textured old-paper background, added noise and dropped the quality for realism. For each character, picked a variant, applied a slight rotation and resize, and composited it onto the page. Built with Pillow, since I didn't know OpenCV yet.",
    ],
    result:
      "No OS or performance knowledge at the time, so page generation took 2 to 3 minutes, completely unoptimized. But the output held up. It looked like a photographed handwritten page.",
    learned:
      "This was my first real software project. Built a React frontend for it in 2023 while learning React; later attempted an Angular conversion that's still unpolished.",
    artifacts: "Source + showcase links to be added.",
  },
];

// Sections of the one-page home. Deep dives live on their own routes.
export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "just-for-fun", label: "Just for fun" },
];
