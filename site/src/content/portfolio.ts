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
  aboutTeaser: "I'm Nathan. I build software, and I like learning how things work.",
};

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer at ZS, and I graduated from Manipal Institute of Technology in 2025.",
    "My work spans AI, robotics and web apps. I enjoy working on complicated problems.",
    "Outside work, my interests include evaluating pizzas and being an energy drink connoisseur.",
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
  title: "Currently learning",
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
      "Built a childbirth prediction model that improves on earlier studies of caesarean risk.",
    summary:
      "A clinical model that predicts difficult childbirth outcomes, reaching 0.97 AUC against a baseline of 0.853.",
    highlight: "0.97 AUC against a baseline of 0.853",
    stat: "0.97",
    org: "Kasturba Medical College, for OBGYN residents",
    year: "2024",
    tags: ["scikit-learn", "Next.js", "Clinical ML"],
    role: "Modelling and app, end to end",
    headline: "0.97 AUC against a baseline of 0.853",
    metric: { value: "0.97", label: "AUC, against a baseline of 0.853" },
    liveHref: "https://intrapartum-web-app.vercel.app",
    liveLabel: "intrapartum-web-app.vercel.app",
    blocks: [
      {
        heading: "How it started",
        body: [
          "OBGYN residents at Kasturba Medical College wanted to further develop a clinical model and test its utility in the wards.",
          "The idea was to predict childbirth outcomes from measurements taken during labor.",
          "Their research built on [Eggebø et al. (2015)](https://doi.org/10.1016/j.ajog.2015.05.044) for the model, and [Usman et al. (2019)](https://doi.org/10.1016/j.ajog.2019.03.019) for the app.",
        ],
      },
      {
        heading: "The first version",
        body: [
          "The first version started as a Flutter app that replicated the original model. It was built straight from the parameter coefficients published in the reference paper.",
          "This gave us a starting point for the user interface, and made the model easier to evaluate in real-life scenarios.",
          "*Later versions moved to a Next.js web app on Vercel, so there were no app store listings to maintain.*",
        ],
        image: {
          src: "/work/intrapartum-ai/flutter-app.jpg",
          alt: "The initial Flutter app on two phones: the assessment form, and a result showing the probability of vaginal birth.",
          ratio: "16 / 9",
        },
      },
      {
        heading: "The new parameters",
        body: [
          "To develop the model further, the residents wanted to add new parameters, starting with angle of progression.",
          "The published paper did not open-source the dataset it was trained on. So a new dataset was collected and cleaned specifically for this model.",
          "A new model was trained from scratch on it, with two changes over the original:",
          "- Standardized inputs, so no single measurement outweighs the others because of its units.",
          "- A better training setup: balanced class weights and stratified 5-fold cross-validation.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Together, these took the model from a baseline of 0.853 AUC to ~0.97.",
          "It now runs as a live web tool the residents can test and use in the wards.",
          "[Open the live tool on Vercel ↗](https://intrapartum-web-app.vercel.app)",
        ],
        image: {
          src: "/work/intrapartum-ai/roc-white.jpg",
          alt: "ROC curve for the new model over 5-fold cross-validation, with a mean AUC of 0.97, against the paper's baseline of 0.853 and a coin flip at 0.5.",
          ratio: "16 / 9",
        },
        measured: {
          intro: ["The model was scored on the residents' new dataset."],
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
      "how to turn a research paper into a working tool.",
  },
  {
    slug: "suas-2023",
    thumbnail: "/work/suas-2023/thumbnail.mp4",
    title: "SUAS 2023",
    shortTitle: "SUAS 2023",
    tagline:
      "Built the planning and control software for an autonomous competition drone.",
    summary:
      "Planning and navigation software for an autonomous drone that placed 2nd at the Student Unmanned Aerial Systems (SUAS) Competition 2023.",
    highlight: "placed 2nd at the Student Unmanned Aerial Systems (SUAS) Competition 2023",
    stat: "2nd",
    org: "Project MANAS, Manipal's student robotics team",
    year: "2023",
    tags: ["Robotics", "ROS", "MAVLink", "Python"],
    role: "Software and controls, end to end",
    headline: "2nd place at SUAS 2023",
    metric: { value: "2nd", label: "SUAS 2023, Maryland" },
    blocks: [
      {
        heading: "How it started",
        body: [
          "Each year, Project MANAS builds an autonomous drone for the Student Unmanned Aerial Systems (SUAS) Competition.",
          "For 2023, the competition made major changes to its mission requirements. The drone's software was written for the 2022 format and failed to adapt to the new standards.",
        ],
      },
      {
        heading: "The old system",
        body: [
          "The navigation planner was built under a tight deadline for the 2022 format, and it had multiple issues. It crashed often, and could not replan mid-flight or take new commands in the air. Its linear design meant every step had to be set before takeoff, in a fixed sequence.",
          "A mechanically complex drone was held back by its software, which made progress on the platform close to impossible.",
        ],
      },
      {
        heading: "What got built",
        beforeAfter: {
          before: {
            src: "/work/suas-2023/planner5-before.jpg",
            alt: "Before: a linear chain of mission download, path planner, coverage planner and a one-time upload, ending in a drone with a hard-coded path",
          },
          after: {
            src: "/work/suas-2023/planner5-after.jpg",
            alt: "After: a central router connected to mission download, path planner, coverage planner, the drone, and two new modules: a release latch that drops the bottle and a position adjust that moves the drone left or right",
          },
          ratio: "1200 / 540",
          caption: "drag to compare the planner, before and after",
        },
        body: [
          "The planner was redesigned from scratch. The linear chain was swapped for a hub-and-spoke design, built around a central router.",
          "In the old design, each step was its own component, but they were forced to run in a fixed line. Everything was uploaded to the drone once, as hard-coded instructions.",
          "The router takes in the mission the same way, then calls each component on demand. New modules could be plugged straight into it. This made the design more flexible and easier to work on.",
        ],
      },
      {
        heading: "Hitting the target",
        body: [
          "Due to a small expected error in an upstream component, the drone would always be a few meters off the drop location. That was not precise enough for a successful drop.",
          "This is where the new design let us plug in a human-in-the-loop component. An operator tapped the target on the live video feed, and the component sent correction commands that lined the drone up perfectly over the drop location.",
        ],
      },
      {
        heading: "Result",
        body: [
          "After 100 to 200 test flights, the system was reliable enough to compete.",
          "The team placed 2nd at SUAS 2023 in Maryland, USA.",
        ],
        image: {
          src: "/work/suas-2023/autonomous-flight2.mp4",
          alt: "A full autonomous flight: the drone's camera, the planner server's log and the ground control map, side by side.",
          ratio: "1190 / 720",
        },
      },
    ],
    learnedLead: "I learned…",
    learned:
      "how to build a system that adapts when the task changes.",
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
    role: "Model and App Developer",
    period: "2024",
    summary: "Obstetrics research at a teaching hospital.",
    work: ["intrapartum-ai"],
  },
  {
    place: "Project MANAS",
    kind: "Student team",
    role: "Software and controls",
    period: "2021 – 2024",
    summary: "The official AI and robotics team of MIT Manipal.",
    work: ["suas-2023"],
  },
];

export type PlaygroundProject = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  // Result tags, shown on the card and the page.
  metrics?: string[];
  // Card image (16:10), served from public/projects/<slug>/. An .mp4 plays on
  // a loop and needs a still next to it named <name>-poster.jpg.
  thumbnail?: string;
  // Story sections, told like a case study. Projects without them fall back
  // to problem / built / result.
  blocks?: { heading: string; body: string[] }[];
  problem?: string;
  built?: string[];
  result?: string;
  learned: string;
  // Heading for the "learned" box, read as the start of the sentence.
  learnedLead?: string;
  links?: { href: string; label: string }[];
  artifacts?: string;
};

// Hobby-scale, shown under "Just for fun". Each gets its own page at /projects/[slug].
// Order is not final. See portfolio-content.md.
export const playground: PlaygroundProject[] = [
  {
    slug: "autoshorts",
    thumbnail: "/projects/autoshorts/thumbnail.mp4",
    title: "AutoShorts",
    tagline: "Built a pipeline that turned Reddit threads into YouTube Shorts.",
    year: "2022",
    tags: ["Python", "PRAW", "MoviePy", "FFmpeg"],
    metrics: ["166K+ views", "1,200+ watch hours"],
    blocks: [
      {
        heading: "The pipeline",
        body: [
          "Reddit threads were scraped with PRAW and rebuilt as Reddit-style posts. Text-to-speech read them out, and MoviePy and FFmpeg put the video together.",
        ],
      },
      {
        heading: "What viewers wanted",
        body: [
          "The content alone was not enough to hold a viewer's attention. They also wanted a hypnotic background to watch while they listened. I added Minecraft parkour clips underneath, which spiked viewers and their attention.",
        ],
      },
      {
        heading: "Looking back",
        body: [
          "The codebase was one huge script with deeply nested classes. It re-scraped Reddit on every run, and even tried an automated upload to YouTube.",
        ],
      },
    ],
    learnedLead: "I learned…",
    learned:
      "that not everything needs to be automated, and sometimes 80% of the gains come from 20% of the automation.",
    links: [
      { href: "https://www.youtube.com/@threadpress7285/shorts", label: "The channel" },
      { href: "https://www.youtube.com/shorts/wfIcFJlCC28", label: "Watch a Short" },
    ],
    artifacts: "Source code lost.",
  },
  {
    slug: "c-ros",
    thumbnail: "/projects/c-ros/thumbnail.mp4",
    title: "C-ROS",
    tagline:
      "Built an inter-process communication (IPC) library in C that replicates the core of ROS.",
    year: "2023",
    tags: ["C", "TCP sockets", "Pub-sub"],
    metrics: ["<200μs latency"],
    blocks: [
      {
        heading: "Under the hood",
        body: [
          "At Project MANAS, I used ROS to pass messages between modules. As a curious experiment, I built an equivalent of its pub-sub messaging from scratch.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "The library is written in raw C, over TCP, with no outside libraries. A master node keeps track of topics, and nodes publish or subscribe to them. It supports the patterns of a typical middleware architecture, including one-to-one, one-to-many and many-to-one setups.",
        ],
      },
      {
        heading: "Result",
        body: ["Messages moved between nodes in under 200μs."],
      },
    ],
    learnedLead: "I learned…",
    learned:
      "what ROS was quietly handling for me.",
    links: [
      { href: "https://github.com/HyperToken9/CROSS", label: "Source on GitHub" },
    ],
  },
  {
    slug: "rollout",
    thumbnail: "/projects/rollout/thumbnail.mp4",
    title: "Rollout",
    tagline: "Built a tilt-controlled maze game for Android, on a physics engine.",
    year: "2025",
    tags: ["Flutter", "Box2D", "Game dev"],
    metrics: ["Shipped to Play Store"],
    blocks: [
      {
        heading: "Why a game",
        body: [
          "I wanted hands-on time with Flutter and a game engine, so I picked a scope small enough to finish.",
        ],
      },
      {
        heading: "How it plays",
        body: [
          "Tilting the phone rolls a ball through a maze, using the gyroscope and the Box2D physics engine. I made a few modes to keep it interesting, along with light and dark mode.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The game is live on Google Play.",
        ],
      },
    ],
    learnedLead: "I learned…",
    learned:
      "how to work with a physics engine.",
    links: [
      {
        href: "https://play.google.com/store/apps/details?id=com.greasepanstudios.amaze_game",
        label: "Get it on Google Play",
      },
    ],
  },
  {
    slug: "text-to-handwriting",
    thumbnail: "/projects/text-to-handwriting/thumbnail.mp4",
    title: "Text-to-Handwriting",
    tagline:
      "Built a tool that turns typed text into pages that look handwritten and photographed.",
    year: "2021",
    tags: ["Python", "Pillow", "React"],
    blocks: [
      {
        heading: "Why build it",
        body: [
          "In 2021, despite classes being online, we often still got handwritten assignments. The tools available online were very easy to identify as fake, so I built my own.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "I hand-wrote every character about 10 times on a tablet, so no two letters looked the same. At generation time, the tool went through the text one character at a time. For each one, it picked a random version, rotated and resized it slightly, and placed it on a paper background. I added noise and lowered the quality to make the page look photographed.",
        ],
      },
      {
        heading: "Result",
        body: [
          "Each page took a minute to generate, with no optimization. But the pages looked like photos of real handwriting.",
        ],
      },
      {
        heading: "Looking back",
        body: [
          "This was my first real software project, and it got me excited to work with software for the rest of my life, even though I made it with very little understanding of how a computer worked or how to write programs.",
          "*In 2023, I built a React frontend for it while learning React. Looking at it now, the website was pretty bad.*",
        ],
      },
    ],
    learnedLead: "I learned…",
    learned: "to love working with software.",
    links: [
      { href: "https://text-2-handwriting-wheat.vercel.app", label: "Try it" },
      { href: "https://github.com/HyperToken9/text-2-handwriting", label: "Source on GitHub" },
    ],
  },
];

// Sections of the one-page home. Deep dives live on their own routes.
export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "just-for-fun", label: "Just for fun" },
];
