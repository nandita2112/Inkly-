// Single source of truth for all site content.
// Components import these arrays and render them with .map(), so adding
// a new article here automatically shows it on Home, Explore and Article pages.

const img = (id, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`;

export const categories = [
  { slug: 'technology', name: 'Technology', count: '120+ articles', image: img('1485827404703-89b55fcc595e', 600) },
  { slug: 'design', name: 'Design', count: '98+ articles', image: img('1497366754035-f200968a6e72', 600) },
  { slug: 'productivity', name: 'Productivity', count: '76+ articles', image: img('1495474472287-4d71bcdd2085', 600) },
  { slug: 'education', name: 'Education', count: '64+ articles', image: img('1507842217343-583bb7270b65', 600) },
  { slug: 'travel', name: 'Travel', count: '54+ articles', image: img('1500534623283-312aade485b7', 600) },
  { slug: 'creativity', name: 'Creativity', count: '48+ articles', image: img('1549490349-8643362247b5', 600) },
];

export const articles = [
  {
    id: 'power-small-habits',
    title: 'The Power of Small Habits',
    category: 'productivity',
    author: 'James Clear',
    readTime: 6,
    featured: true,
    image: img('1500534623283-312aade485b7'),
    excerpt: 'Tiny changes, when done consistently, can create extraordinary results.',
    body: [
      'Small habits look insignificant on any single day. Reading one page, writing one sentence, or walking for ten minutes rarely feels like progress. But habits compound, and the gains add up in ways that are hard to see from the inside.',
      'The trick is to make the habit so small that starting is easy. Once the routine exists, you can grow it. Consistency matters far more than intensity.',
    ],
  },
  {
    id: 'future-ai',
    title: 'The Future of AI Is More Human Than We Think',
    category: 'technology',
    author: 'Tim Urban',
    readTime: 8,
    featured: true,
    image: img('1519608487953-e999c86e7455'),
    excerpt: 'AI isn’t just about machines. It’s about people, creativity and a better tomorrow.',
    body: [
      'When people imagine artificial intelligence, they often picture cold machines replacing human jobs. The more likely future is one where these tools handle repetitive work and leave room for judgement, care and imagination.',
      'The most useful systems will be the ones designed around people, with clear limits, honest feedback and a clear sense of who is responsible for the result.',
    ],
  },
  {
    id: 'places-perspective',
    title: 'Places That Change Your Perspective',
    category: 'travel',
    author: 'Inkly Editors',
    readTime: 7,
    featured: true,
    image: img('1500534314209-a25ddb2bd429'),
    excerpt: 'Travel can completely change how we see the world.',
    body: [
      'Some places rearrange your priorities without asking. A quiet mountain village, a crowded market in an unfamiliar city, or a long train ride across a flat landscape can each reset the way you think.',
      'The point is not to collect destinations. It is to notice what a new place makes you question about your own routine.',
    ],
  },
  {
    id: 'simple-design',
    title: 'Why Simple Design Works Better',
    category: 'design',
    author: 'Inkly Editors',
    readTime: 5,
    image: img('1558655146-d09347e92766'),
    excerpt: 'Good design makes complicated things easier.',
    body: [
      'Every element on a page competes for attention. Removing the ones that do not help the reader is often the fastest way to improve a design.',
      'Simple does not mean empty. It means each part earns its place.',
    ],
  },
  {
    id: 'morning-routine',
    title: 'Build a Better Morning Routine',
    category: 'productivity',
    author: 'Leo Babauta',
    readTime: 6,
    image: img('1499750310107-5fef28a66643'),
    excerpt: 'Small routines can lead to meaningful changes.',
    body: [
      'A good morning routine does not need to be long. Three steps, done the same way each day, are enough to set a calm tone for the rest of the day.',
      'Start with what you already do, then add one small change at a time.',
    ],
  },
  {
    id: 'learning-skill',
    title: 'Learning Is a Skill You Can Improve',
    category: 'education',
    author: 'Inkly Editors',
    readTime: 5,
    image: img('1524995997946-a1c2e315a42f'),
    excerpt: 'Better learning habits make every new subject easier.',
    body: [
      'Most people learn by reading and hoping it sticks. Retrieval practice, where you test yourself from memory, is far more effective.',
      'Spacing your study sessions over days, rather than cramming, helps the knowledge stay with you.',
    ],
  },
  {
    id: 'creative-thinking',
    title: 'How Creative Thinking Can Change Your Work',
    category: 'creativity',
    author: 'Inkly Editors',
    readTime: 6,
    image: img('1516321318423-f06f85e504b3'),
    excerpt: 'Creative habits help solve ordinary problems in new ways.',
    body: [
      'Creativity is less about sudden inspiration and more about making space for new combinations of ideas. Walks, sketches and conversations with people outside your field all help.',
      'Try writing down three unrelated ideas each week. Some will be useless, but one may change how you approach a real problem.',
    ],
  },
  {
    id: 'learning-code',
    title: 'Learning to Code in a Changing World',
    category: 'technology',
    author: 'Inkly Editors',
    readTime: 6,
    image: img('1488590528505-98d2b5aba04b'),
    excerpt: 'A beginner’s journey into programming.',
    body: [
      'Start with a small project you actually care about. A tool that solves one of your own problems teaches more than any list of exercises.',
      'Tools change quickly, but the core ideas of variables, functions and data stay useful for a long time.',
    ],
  },
  {
    id: 'finding-peace',
    title: 'Finding Peace in New Places',
    category: 'travel',
    author: 'Inkly Editors',
    readTime: 5,
    image: img('1476514525535-07fb3b4ae5f1'),
    excerpt: 'Sometimes getting away is exactly what we need.',
    body: [
      'A short trip does not need to be expensive or far away. Changing your surroundings for a few days can give you a clearer view of what matters.',
      'Pay attention to small details on the way: the light, the sounds, the pace of people around you.',
    ],
  },
];

// Ids of the articles shown in the "Most Popular" panel, in ranking order.
export const popularIds = ['power-small-habits', 'future-ai', 'places-perspective'];

export const writers = [
  { id: 'tim-urban', name: 'Tim Urban', publication: 'Wait But Why', initials: 'TU', bio: 'Explains complex ideas in simple, beautiful ways.' },
  { id: 'james-clear', name: 'James Clear', publication: 'Habits & Ideas', initials: 'JC', bio: 'Build better habits, create a better life.' },
  { id: 'leo-babauta', name: 'Leo Babauta', publication: 'Zen Habits', initials: 'LB', bio: 'Less stuff. More life.' },
  { id: 'seth-godin', name: 'Seth Godin', publication: 'Marketing & Ideas', initials: 'SG', bio: 'Ideas for a world that wants change.' },
];

export const values = [
  { icon: '✍', title: 'Write', text: 'Create stories that matter.' },
  { icon: '◈', title: 'Discover', text: 'Find ideas worth your time.' },
  { icon: '∞', title: 'Connect', text: 'Meet curious people and creators.' },
];

export const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/explore', label: 'Explore' },
  { to: '/write', label: 'Write' },
  { to: '/saved', label: 'Saved' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function getArticle(id) {
  return articles.find((article) => article.id === id);
}

export function categoryName(slug) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
