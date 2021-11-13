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
];

module.exports = tutorsArray;
