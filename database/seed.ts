import { dummybooks } from "../dummybooks.json";

const seed = () => {
  console.log("Seeding database...");

  try {
    for (const book of dummybooks) {
      const coverUrl = await uploadToImageKit(book.coverUrl);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
