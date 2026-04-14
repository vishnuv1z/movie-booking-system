/**
 * Seed script to populate the movies collection with sample data.
 * Run: node seedMovies.js
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Movie = require("./models/Movie");

const movies = [
  {
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.",
    duration: 166,
    language: "English",
    genre: "Sci-Fi",
    rating: "8.5",
    poster:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    releaseDate: new Date("2024-03-01"),
  },
  {
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    duration: 180,
    language: "English",
    genre: "Drama",
    rating: "8.9",
    poster:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    releaseDate: new Date("2023-07-21"),
  },
  {
    title: "Kalki 2898 AD",
    description:
      "A modern-day avatar of Vishnu, a half-man, half-machine hybrid, battles evil forces in a futuristic world.",
    duration: 181,
    language: "Telugu",
    genre: "Action",
    rating: "7.2",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kalki_2898_AD.jpg/250px-Kalki_2898_AD.jpg",
    releaseDate: new Date("2024-06-27"),
  },
  {
    title: "Deadpool & Wolverine",
    description:
      "Deadpool joins the Marvel Cinematic Universe in an epic team-up with Wolverine.",
    duration: 127,
    language: "English",
    genre: "Action",
    rating: "7.8",
    poster:
      "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    releaseDate: new Date("2024-07-26"),
  },
  {
    title: "Civil War",
    description:
      "In the near future, a team of journalists travel across the United States during a civil war.",
    duration: 109,
    language: "English",
    genre: "Thriller",
    rating: "7.4",
    poster:
      "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    releaseDate: new Date("2024-04-12"),
  },
  {
    title: "Alien: Romulus",
    description:
      "A group of young space colonists come face to face with the most terrifying life form in the universe.",
    duration: 119,
    language: "English",
    genre: "Horror",
    rating: "7.3",
    poster:
      "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    releaseDate: new Date("2024-08-16"),
  },
  {
    title: "Inside Out 2",
    description:
      "A sequel that continues the story of Riley as new emotions emerge during her teenage years.",
    duration: 100,
    language: "English",
    genre: "Animation",
    rating: "7.8",
    poster:
      "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    releaseDate: new Date("2024-06-14"),
  },
  {
    title: "Joker: Folie à Deux",
    description:
      "Arthur Fleck begins a relationship with Harleen Quinzel while institutionalized at Arkham.",
    duration: 138,
    language: "English",
    genre: "Drama",
    rating: "5.4",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNTRlNmU1NzEtODNkNC00ZGM3LWFmNzQtMjBlMWRiYTcyMGRhXkEyXkFqcGc@._V1_.jpg",
    releaseDate: new Date("2024-10-04"),
  },
  {
    title: "The Brutalist",
    description:
      "A visionary architect escapes the horrors of postwar Europe and reinvents himself in America.",
    duration: 215,
    language: "English",
    genre: "Drama",
    rating: "8.3",
    poster:
      "https://m.media-amazon.com/images/I/91MIC1j6kaL._AC_UF1000,1000_QL80_.jpg",
    releaseDate: new Date("2024-12-20"),
  },
  {
    title: "Wicked",
    description:
      "The untold story of the witches of Oz, focusing on Elphaba and Glinda before Dorothy arrives.",
    duration: 160,
    language: "English",
    genre: "Musical",
    rating: "8.0",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWMwYjYzYmMtMWQ2Ni00NWUwLTg2MzAtYzkzMDBiZDIwOTMwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: new Date("2024-11-22"),
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing movies
    await Movie.deleteMany({});
    console.log("Cleared existing movies");

    // Insert seed data
    const inserted = await Movie.insertMany(movies);
    console.log(`Seeded ${inserted.length} movies successfully`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
