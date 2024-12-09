import fs from "fs";
import {join} from "path";

const copyDirectory = (source: string, destination: string): void => {
  try {
    // Ensure the destination directory exists
    fs.mkdirSync(destination, { recursive: true });

    // Read all entries in the source directory
    const entries = fs.readdirSync(source, { withFileTypes: true});

    for (const entry of entries) {
      const sourcePath = join(source, entry.name);
      const destinationPath = join(destination, entry.name);

      if (entry.isDirectory()) {
        // Recursively copy subdirectories
        copyDirectory(sourcePath, destinationPath);
      } else if (entry.isFile()) {
        // Copy files
        fs.copyFileSync(sourcePath, destinationPath);
      }
    }

  } catch (error) {
    console.error("Error copying directory:", error);
  }
};

export default copyDirectory;