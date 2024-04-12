const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [dirPath] = process.argv.slice(2);

const OUTPUT_DIR_NAME = "converted";

const OUTPUT_DIR = `${dirPath}/${OUTPUT_DIR_NAME}`;

const isFile = (file, directory) => {
  const filePath = path.join(directory, file);
  const stat = fs.statSync(filePath);

  return stat.isFile();
};

const main = () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  const files = fs.readdirSync(dirPath).filter((file) => isFile(file, dirPath));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const filePath = path.join(dirPath, file);
    const outputPath = path.join(
      OUTPUT_DIR,
      file.replace(/\.[^/.]+$/, ".webp")
    );

    sharp(filePath)
      .toFormat("webp")
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error("Error:", err);
        } else {
          console.log("Conversion successful!");
          console.log("Output file:", info);
        }
      });
  }
};
main();
