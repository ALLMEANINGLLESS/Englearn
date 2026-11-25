'use strict';

const dailyQuotes = [
  {
    text: 'Only that day dawns to which we are awake.',
    author: 'Henry David Thoreau', work: 'Walden',
    source: 'https://digitalthoreau.org/walden/fluid/text/18.html'
  },
  {
    text: 'Well done is better than well said.',
    author: 'Benjamin Franklin', work: 'Poor Richard’s Almanack',
    source: 'https://fi.edu/en/science-and-education/benjamin-franklin/famous-quotes'
  },
  {
    text: 'If there is no struggle, there is no progress.',
    author: 'Frederick Douglass', work: 'West India Emancipation speech',
    source: 'https://www.nps.gov/common/uploads/teachers/lessonplans/Abolition%20and%20Anti%20Slavery%20Texts%20in%20Hopedale%20-%20Primary%20Sources.pdf'
  },
  {
    text: 'I’m not afraid of storms, for I’m learning how to sail my ship.',
    author: 'Louisa May Alcott', work: 'Little Women',
    source: 'https://quotle.info/who-said/i-am-not-afraid-of-storms-for-i-am-learning-how-to-sail-my/'
  },
  {
    text: 'Trust thyself: every heart vibrates to that iron string.',
    author: 'Ralph Waldo Emerson', work: 'Self-Reliance',
    source: 'https://emersoncentral.com/texts/essays-first-series/self-reliance/'
  },
  {
    text: 'While we are postponing, life speeds by.',
    author: 'Seneca', work: 'Moral Letters to Lucilius · Letter 1',
    source: 'https://daily-stoicism.captaindev.app/en/seneca/letters/1/'
  },
  {
    text: 'What do we live for, if it is not to make life less difficult to each other?',
    author: 'George Eliot', work: 'Middlemarch',
    source: 'https://en.wikisource.org/wiki/Page:Middlemarch_(Second_Edition).djvu/557'
  },
  {
    text: 'Wisely and slow. They stumble that run fast.',
    author: 'William Shakespeare', work: 'Romeo and Juliet',
    source: 'https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/read/2/3/'
  },
  {
    text: 'First, say to yourself what you would be; and then do what you have to do.',
    author: 'Epictetus', work: 'Discourses · Elizabeth Carter translation',
    source: 'https://en.wikisource.org/wiki/The_Works_of_Epictetus,_His_Discourses,_in_Four_Books,_the_Enchiridion,_and_Fragments/Book_3/Chapter_23'
  },
  {
    text: 'There is no charm equal to tenderness of heart.',
    author: 'Jane Austen', work: 'Emma',
    source: 'https://austen.unl.edu/visualizations/emma/all'
  },
  {
    text: 'Always bear in mind that your own resolution to succeed is more important than any other one thing.',
    author: 'Abraham Lincoln', work: 'Letter to Isham Reavis',
    source: 'https://www.abrahamlincolnonline.org/lincoln/speeches/quotes.htm'
  },
  {
    text: 'Life is either a daring adventure or nothing.',
    author: 'Helen Keller', work: 'Let Us Have Faith',
    source: 'https://quoteinvestigator.com/2014/11/21/adventure/'
  },
  {
    text: 'Great works are performed, not by strength, but by perseverance.',
    author: 'Samuel Johnson', work: 'Rasselas',
    source: 'https://www.samueljohnson.com/persever.html'
  },
  {
    text: 'Reading maketh a full man; conference a ready man; and writing an exact man.',
    author: 'Francis Bacon', work: 'Of Studies',
    source: 'https://www.gutenberg.org/cache/epub/56463/pg56463-images.html'
  },
  {
    text: 'You must do the thing you think you cannot do.',
    author: 'Eleanor Roosevelt', work: 'You Learn by Living',
    source: 'https://quotations.pro/people/eleanor-roosevelt/quote/you-must-do-the-thing-you-think-you-cannot-do'
  },
  {
    text: 'I dwell in Possibility.',
    author: 'Emily Dickinson', work: 'I dwell in Possibility',
    source: 'https://www.brinkerhoffpoetry.org/poems/i-dwell-in-possibility'
  },
  {
    text: 'To travel hopefully is a better thing than to arrive.',
    author: 'Robert Louis Stevenson', work: 'El Dorado',
    source: 'https://skat.ihmc.us/rid%3D1JNLFFR1N-16CDVSL-19WY/El%20Dorado.pdf'
  },
  {
    text: 'The journey of a thousand li commenced with a single step.',
    author: 'Laozi', work: 'Tao Te Ching · James Legge translation',
    source: 'https://dao-de-jing.com/quotes/journey-of-a-thousand-miles'
  },
  {
    text: 'A thing of beauty is a joy for ever.',
    author: 'John Keats', work: 'Endymion',
    source: 'https://poets.org/poem/endymion-book-i-thing-beauty-joy-ever'
  },
  {
    text: 'The best way out is always through.',
    author: 'Robert Frost', work: 'A Servant to Servants',
    source: 'https://quotogeny.com/q/the-best-way-out-is-always-through/'
  },
  {
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela', work: 'Nelson Mandela Foundation',
    source: 'https://www.nelsonmandela.org/nm100-education'
  },
  {
    text: 'I am large—I contain multitudes.',
    author: 'Walt Whitman', work: 'Song of Myself',
    source: 'https://whitmanarchive.org/about/archive/wwa-2000-to-2007/published/LG/1871/whole.html'
  },
  {
    text: 'No one is useless in this world … who lightens the burden of it for any one else.',
    author: 'Charles Dickens', work: 'Our Mutual Friend',
    source: 'https://kwize.com/quote/9105'
  },
  {
    text: 'Learn to labor and to wait.',
    author: 'Henry Wadsworth Longfellow', work: 'A Psalm of Life',
    source: 'https://www.poetryfoundation.org/poems/44644/a-psalm-of-life'
  },
  {
    text: 'The only thing we have to fear is fear itself.',
    author: 'Franklin D. Roosevelt', work: 'First Inaugural Address',
    source: 'https://www.archives.gov/education/lessons/fdr-inaugural'
  },
  {
    text: 'Our doubts are traitors and make us lose the good we oft might win, by fearing to attempt.',
    author: 'William Shakespeare', work: 'Measure for Measure',
    source: 'https://www.folger.edu/explore/shakespeares-works/measure-for-measure/read/'
  },
  {
    text: 'How we spend our days is, of course, how we spend our lives.',
    author: 'Annie Dillard', work: 'The Writing Life',
    source: 'https://www.azquotes.com/quote/373404'
  },
  {
    text: '“Hope” is the thing with feathers.',
    author: 'Emily Dickinson', work: '“Hope” is the thing with feathers',
    source: 'https://www.poetryfoundation.org/poems/42889/hope-is-the-thing-with-feathers-314'
  },
  {
    text: 'I am the master of my fate.',
    author: 'William Ernest Henley', work: 'Invictus',
    source: 'https://www.poetryfoundation.org/poems/51642/invictus'
  },
  {
    text: 'The world is full of obvious things which nobody by any chance ever observes.',
    author: 'Arthur Conan Doyle', work: 'The Hound of the Baskervilles',
    source: 'https://web.english.upenn.edu/~cavitch/pdf-library/Doyle_Hound_of_the_Baskervilles_1902.pdf'
  }
];
