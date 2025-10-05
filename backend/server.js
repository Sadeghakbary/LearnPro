import dotenv from "dotenv";
import app from "./app.js";
console.log("Loading environment variables...");
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(`Starting server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} در حال اجراست...`);
});
