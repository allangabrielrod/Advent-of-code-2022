const fs = require("fs");
const logs = fs.readFileSync("input.txt").toString("utf-8").split("\n");

const getFileSystem = () => {
  const fileSystem = {
    root: [],
  };
  let currentDirectory = ["root"];

  logs.forEach((log) => {
    const isCommand = log.startsWith("$");
    const isDirectory = log.startsWith("dir");
    const currentDirectoryPath = currentDirectory.join("/");

    if (isCommand) {
      const [_, command, parameter] = log.split(" ");

      if (command === "cd") {
        if (parameter === "/") {
          currentDirectory = ["root"];
        } else if (parameter === "..") {
          currentDirectory.pop();
        } else {
          currentDirectory.push(parameter);
        }

        lastDirectory = currentDirectory;
      }
    } else if (isDirectory) {
      const [_, dirName] = log.split(" ");
      const foundDirectory = [...currentDirectory, dirName].join("/");

      if (!Object.keys(fileSystem).includes(foundDirectory)) {
        fileSystem[foundDirectory] = [];
      }
    } else {
      const [fileSize, fileName] = log.split(" ");
      fileSystem[currentDirectoryPath].push({
        fileSize: Number(fileSize),
        fileName,
      });
    }
  });

  return fileSystem;
};

const getDirectoriesSizes = (fileSystem) => {
  const directoriesSizes = {};

  // First level directories sizes sum
  Object.keys(fileSystem).forEach((directory) => {
    const directoryFiles = fileSystem[directory];

    if (!Object.keys(directoriesSizes).includes(directory)) {
      Object.assign(directoriesSizes, { [directory]: 0 });
    }

    const totalDirectorySize = directoryFiles.reduce(
      (accumulator, currentFile) => {
        return accumulator + currentFile.fileSize;
      },
      0
    );

    directoriesSizes[directory] += totalDirectorySize;
  });

  // Children directories sizes sum
  Object.keys(directoriesSizes).forEach((parentDirectory) => {
    let currentDirectorySum = 0;

    directoriesSizes[parentDirectory] += Object.keys(directoriesSizes).reduce(
      (acc, childrenDirectory) => {
        if (childrenDirectory === parentDirectory) {
          return acc;
        }

        if (childrenDirectory.includes(parentDirectory)) {
          return acc + directoriesSizes[childrenDirectory];
        }

        return acc;
      },
      0
    );
  });

  return directoriesSizes;
};

const fileSystem = getFileSystem();
const { root, ...directoriesSizes } = getDirectoriesSizes(fileSystem);

// Part 1
const totalDirectoriesSizesSum = Object.values(directoriesSizes).reduce(
  (acc, size) => {
    if (size <= 100000) {
      return (acc += size);
    }
    return acc;
  },
  0
);

console.log(
  "Total sum of directories smaller than 100000:",
  totalDirectoriesSizesSum
);

// Part 2
const totalDeviceSize = 70000000;
const freeSpace = totalDeviceSize - root;
const updateSize = 30000000;
const spaceRequiredForUpdate = updateSize - freeSpace;

const directorySizeToBeDeleted = Object.values(directoriesSizes)
  .sort((a, b) => a - b)
  .find((item) => item >= spaceRequiredForUpdate);

console.log("Total directory size to be deleted:", directorySizeToBeDeleted);
