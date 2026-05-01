import sharp from "sharp";
import path from "path";

async function generateIcons() {
  const svgPath = path.join(process.cwd(), "public/icons/icon.svg");
  const icon192Path = path.join(process.cwd(), "public/icons/icon-192x192.png");
  const icon512Path = path.join(process.cwd(), "public/icons/icon-512x512.png");

  try {
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(icon192Path);
    console.log("Generated icon-192x192.png");

    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(icon512Path);
    console.log("Generated icon-512x512.png");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
