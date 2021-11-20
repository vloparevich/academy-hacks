const tutorsArray = [
  {
    firstName: 'Nicola',
    isTutor: true,
    email: 'tesla@nicola.com',
    password: 'Test123!@#',
    lastName: 'Tesla',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg',
    countryOfOrigin: 'Croatia',
    teachingExperience: 164,
    courseName: 'Engineering',
    description:
      'Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, and buildings.',
    timeAvailableInRange: {
      from: 6,
      to: 14,
    },
  },
  {
    isTutor: true,
    firstName: 'James',
    lastName: 'Gosling',
    email: 'james@gosling.com',
    password: 'Test123!@#',
    profilePic: 'https://static.javatpoint.com/images/j1.jpg',
    countryOfOrigin: 'United States',
    teachingExperience: 30,
    courseName: 'Java',
    description:
      'Java is a programming language and computing platform first released by Sun Microsystems in 1995. It has evolved from humble beginnings to power a large share of today’s digital world, by providing the reliable platform upon which many services and applications are built. New, innovative products and digital services designed for the future continue to rely on Java, as well. There are many applications and even some websites that will not function unless you have Java installed. Java.com, this website, is intended for consumers who require Java for their desktop applications – specifically applications targeting Java 8. Developers as well as users that would like to learn Java programming should visit the dev.java website instead and business users should visit oracle.com/java for more information.',
    timeAvailableInRange: {
      from: 5,
      to: 17,
    },
  },
  {
    isTutor: true,
    firstName: 'Bill',
    lastName: 'Joy',
    email: 'bill@joy.com',
    password: 'Test123!@#',
    profilePic:
      'http://media.economist.com/sites/default/files/cf_images/20020921/3802TQ1.jpg',
    countryOfOrigin: 'United States',
    teachingExperience: 33,
    courseName: 'Java',
    description: 'Java Is the Language of Possibilities',
    timeAvailableInRange: {
      from: 14,
      to: 22,
    },
  },
  {
    isTutor: true,
    firstName: 'Chris',
    lastName: 'Lather',
    email: 'chris@Lather.com',
    password: 'Test123!@#',
    profilePic:
      'https://techcrunch.com/wp-content/uploads/2017/01/chris-lattner.jpg?w=1390&crop=1',
    countryOfOrigin: 'United States',
    teachingExperience: 19,
    courseName: 'Swift',
    description:
      'Swift is a powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS. Writing Swift code is interactive and fun, the syntax is concise yet expressive, and Swift includes modern features developers love.',
    timeAvailableInRange: {
      from: 13,
      to: 19,
    },
  },
  {
    isTutor: true,
    firstName: 'Yukihiro',
    lastName: 'Matsumoto',
    email: 'yukihiro@matsumoto.com',
    password: 'Test123!@#',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Yukihiro_Matsumoto.JPG/220px-Yukihiro_Matsumoto.JPG',
    countryOfOrigin: 'Japan',
    teachingExperience: 19,
    courseName: 'Ruby',
    description:
      'Ruby is dynamically typed and uses garbage collection and just-in-time compilation. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.',
    timeAvailableInRange: {
      from: 13,
      to: 19,
    },
  },
  {
    isTutor: true,
    firstName: 'Dennis',
    lastName: 'Ritchie',
    email: 'dennis@ritchie.com',
    password: 'Test123!@#',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dennis_Ritchie_2011.jpg/440px-Dennis_Ritchie_2011.jpg',
    countryOfOrigin: 'United States',
    teachingExperience: 33,
    courseName: 'C',
    description:
      'C is an imperative procedural language. It was designed to be compiled to provide low-level access to memory and language constructs that map efficiently to machine instructions, all with minimal runtime support. ',
    timeAvailableInRange: {
      from: 14,
      to: 17,
    },
  },
  {
    isTutor: true,
    firstName: 'John',
    lastName: 'Backus',
    email: 'john@backus.com',
    password: 'Test123!@#',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/b/b2/John_Backus_2.jpg',
    countryOfOrigin: 'United States',
    teachingExperience: 40,
    courseName: 'FORTRAN',
    description:
      'Fortran (/ˈfɔːrtræn/; formerly FORTRAN) is a general-purpose, compiled imperative programming language that is especially suited to numeric computation and scientific computing.',
    timeAvailableInRange: {
      from: 19,
      to: 22,
    },
  },
  {
    isTutor: true,
    firstName: 'Martin',
    lastName: 'Odersky',
    email: 'martin@odersky.com',
    password: 'Test123!@#',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mark_Odersky_photo_by_Linda_Poeng.jpg',
    countryOfOrigin: 'Germany',
    teachingExperience: 17,
    courseName: 'Scala',
    description:
      "Scala is a strong statically typed general-purpose programming language which supports both object-oriented programming and functional programming. Designed to be concise,many of Scala's design decisions are aimed to address criticisms of Java.",
    timeAvailableInRange: {
      from: 19,
      to: 22,
    },
  },
  {
    isTutor: true,
    firstName: 'Obi-Wan',
    lastName: 'Kenobi',
    email: 'ben@jedi.com',
    password: 'lightside1234',
    profilePic:
      'https://cdn.onebauer.media/one/media/6061/e2cc/c00d/0792/88b1/0950/obi-wan-kenobi-revenge-of-the-sith.jpg?format=jpg&quality=80&width=440&ratio=16-9&resize=aspectfill',
    countryOfOrigin: 'Stewjon',
    teachingExperience: 500,
    courseName: 'Force',
    description:
      'The Force is an energy field created by all life that connects everything in the universe, and is known by a variety of names throughout the galaxy.',
    timeAvailableInRange: {
      from: 15,
      to: 20,
    },
  },
  {
    isTutor: true,
    firstName: 'Thomas',
    lastName: 'Anderson',
    email: 'neo@matrix.com',
    password: 'theone01',
    profilePic:
      'https://images.immediate.co.uk/production/volatile/sites/3/2019/08/Keanu-Reeves-5939c06.jpg?quality=90&resize=620%2C413',
    countryOfOrigin: 'United States',
    teachingExperience: 22,
    courseName: 'Matrix',
    description:
      'Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.',
    timeAvailableInRange: {
      from: 0,
      to: 10,
    },
  },
  {
    isTutor: true,
    firstName: 'Elon',
    lastName: 'Musk',
    email: 'elon@musk.com',
    password: 'spacex999',
    profilePic:
      'https://cdn.vox-cdn.com/thumbor/05Fm-f6FL70DdyFKmh6jd7sz0TI=/0x0:4000x2840/1200x800/filters:focal(2335x1426:2975x2066)/cdn.vox-cdn.com/uploads/chorus_image/image/69001757/1229901940.0.jpg',
    countryOfOrigin: 'South Africa',
    teachingExperience: 30,
    courseName: 'Python',
    description:
      'The series is designed to take you from no computer science background whatsoever to proficiency in the basics of computing and programming, specifically in the popular programming language Python. Rated as one of the most in-demand and beginner-friendly programming languages, Python training will give you a solid foundation not only for Python code but for further studies in computer science.',
    timeAvailableInRange: {
      from: 0,
      to: 14,
    },
  },
  {
    isTutor: true,
    firstName: 'Lex',
    lastName: 'Fridman',
    email: 'lex@fridman.com',
    password: 'tensorflow34983#$#',
    profilePic:
      'https://www.rev.ai/Content/curve/img/revai/home/lex.jpg?v=CDA704DF447FFFC6C20E0EFC09E0559F',
    countryOfOrigin: 'Russia',
    teachingExperience: 16,
    courseName: 'Tensorflow',
    description:
      'TensorFlow is a free and open-source software library for machine learning and artificial intelligence. It can be used across a range of tasks but has a particular focus on training and inference of deep neural networks.',
    timeAvailableInRange: {
      from: 0,
      to: 20,
    },
  },
  {
    isTutor: true,
    firstName: 'George',
    lastName: 'Hotz',
    email: 'george@hotz.com',
    password: 'clang34983#$#',
    profilePic:
      'https://upload.wikimedia.org/wikipedia/commons/6/6c/George_Hotz_at_TechCrunch_Disrupt.jpg',
    countryOfOrigin: 'United States',
    teachingExperience: 14,
    courseName: 'C',
    description:
      "C is probably the most widely known programming language. It is used as the reference language for computer science courses all over the world, and it's probably the language that people learn the most in school along with Python and Java.",
    timeAvailableInRange: {
      from: 0,
      to: 20,
    },
  },
  {
    isTutor: true,
    firstName: 'Vitalik',
    lastName: 'Buterin',
    email: 'vitalik@buterin.com',
    password: 'solidity34983#$#',
    profilePic:
      'https://api.time.com/wp-content/uploads/2020/09/vitalik-buterin-time-100-2021.jpg',
    countryOfOrigin: 'Russia',
    teachingExperience: 12,
    courseName: 'Solidity',
    description:
      'Solidity is an object-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms, most notably, Ethereum.',
    timeAvailableInRange: {
      from: 0,
      to: 12,
    },
  },
  {
    isTutor: true,
    firstName: 'Stefan',
    lastName: 'Culafic',
    email: 'stefan@culafic.com',
    password: 'javascript3$',
    profilePic:
      'https://media-exp1.licdn.com/dms/image/C5603AQHs7mH6SYezYQ/profile-displayphoto-shrink_800_800/0/1580751420466?e=1642636800&v=beta&t=Pp4chJ-KiDYXRa1a3bPzPL89Xam8rq4SaxyWJMbzUQo',
    countryOfOrigin: 'Montenegro',
    teachingExperience: 5,
    courseName: 'Javascript',
    description:
      'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled and multi-paradigm. It has dynamic typing, prototype-based object-orientation and first-class functions.',
    timeAvailableInRange: {
      from: 0,
      to: 16,
    },
  },
  {
    isTutor: true,
    firstName: 'Aleksandra',
    lastName: 'Boskovic',
    email: 'Aleksandra@Boskovic.com',
    password: 'reactjs3$',
    profilePic:
      'https://media-exp1.licdn.com/dms/image/C4E03AQE6j9EFXF-19w/profile-displayphoto-shrink_800_800/0/1550808945544?e=1642636800&v=beta&t=OxWaYjDAd0rv8jqFl00RJNR7W2n4vklzjfn6m21aHIg',
    countryOfOrigin: 'Serbia',
    teachingExperience: 6,
    courseName: 'ReactJS',
    description:
      'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
    timeAvailableInRange: {
      from: 0,
      to: 18,
    },
  },
  {
    isTutor: true,
    firstName: 'Marcos',
    lastName: 'Palacios',
    email: 'marcos@palacios.com',
    password: 'htmlandcss3$',
    profilePic:
      'https://media-exp1.licdn.com/dms/image/C4D03AQH_GonWLjAtyQ/profile-displayphoto-shrink_800_800/0/1517598430277?e=1642636800&v=beta&t=UYSI9N9NweYXqHLX-rnoxwSrgLzAy1--mSE1O307PIA',
    countryOfOrigin: 'United States',
    teachingExperience: 6,
    courseName: 'CSS',
    description:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.',
    timeAvailableInRange: {
      from: 4,
      to: 12,
    },
  },
];

module.exports = tutorsArray;