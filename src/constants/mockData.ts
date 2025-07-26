import { AnimeStatus } from "@/types/anime";

export type Genre = {
  name: string;
  variant: "primary" | "secondary" | "accent";
  icon: string;
};

export type MockAnime = {
  id: number;
  title: { english: string; romaji: string; native: string };
  coverImage: {
    large: string;
    medium: string;
  };
  averageScore: number;
  genres: string[];
  status: AnimeStatus;
  episodes: number | undefined;
  description: string;
};

export const mockPopularAnime: MockAnime[] = [
  {
    id: 1,
    title: {
      english: "Attack on Titan",
      romaji: "Shingeki no Kyojin",
      native: "進撃の巨人",
    },
    coverImage: {
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-73IhOXpJZiMF.jpg",
    },
    averageScore: 90,
    genres: ["Action", "Drama", "Fantasy"],
    status: AnimeStatus.FINISHED,
    episodes: 25,
    description:
      "Humanity fights for survival against giant humanoid Titans that have suddenly appeared and devoured most of humanity. The story follows Eren Yeager and his friends as they join the military to fight these creatures.",
  },
  {
    id: 2,
    title: {
      english: "Demon Slayer",
      romaji: "Kimetsu no Yaiba",
      native: "鬼滅の刃",
    },
    coverImage: {
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-PEn1CTc93blC.jpg",
    },
    averageScore: 87,
    genres: ["Action", "Supernatural", "Historical"],
    status: AnimeStatus.FINISHED,
    episodes: 26,
    description:
      "A young boy becomes a demon slayer to save his sister and avenge his family after they are slaughtered by demons. Set in Taisho-era Japan, this is a tale of determination and brotherhood.",
  },
  {
    id: 3,
    title: {
      english: "Your Name",
      romaji: "Kimi no Na wa",
      native: "君の名は。",
    },
    coverImage: {
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-fPhvy69vnQqS.png",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21519-fPhvy69vnQqS.png",
    },
    averageScore: 83,
    genres: ["Romance", "Drama", "Supernatural"],
    status: AnimeStatus.FINISHED,
    episodes: 1,
    description:
      "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things become even more complicated when the boy and girl decide to meet in person.",
  },
  {
    id: 4,
    title: { english: "One Piece", romaji: "One Piece", native: "ワンピース" },
    coverImage: {
      large:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg",
      medium:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-YCDoj1EkAxFn.jpg",
    },
    averageScore: 90,
    genres: ["Action", "Adventure", "Comedy"],
    status: AnimeStatus.RELEASING,
    episodes: undefined,
    description:
      "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as the One Piece.",
  },
];

export const genres: Genre[] = [
  { name: "Action", variant: "primary", icon: "⚔️" },
  { name: "Romance", variant: "secondary", icon: "💕" },
  { name: "Sci-Fi", variant: "accent", icon: "🚀" },
  { name: "Fantasy", variant: "primary", icon: "🧙‍♂️" },
  { name: "Comedy", variant: "secondary", icon: "😄" },
  { name: "Drama", variant: "accent", icon: "🎭" },
];
