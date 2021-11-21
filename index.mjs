import fs, { readdirSync, lstatSync } from 'fs';
import path from'path';

function copyFile (file, destinationDirectoryPath, destinationFileName) {
  //gets file name and adds it to destinationDirectoryPath
  const originFileName = path.basename(file);
  const source = fs.createReadStream(file);

  if (!fs.existsSync(destinationDirectoryPath)) {
    fs.mkdirSync(destinationDirectoryPath, {recursive: true});
  }

  const destination = fs.createWriteStream(path.resolve(destinationDirectoryPath, destinationFileName ?? originFileName));
console.log({originFileName, destinationFileName});
  source.pipe(destination);
  source.on('end', function() { console.log('Succesfully copied'); });
  source.on('error', function(err) { console.log(err); });
};

export default function readAllFolder (dirMain) {
  const parentDirArray = dirMain.split('/');
  const parentDirName = parentDirArray[2];
  const artworkDirName = parentDirArray[3];
  
  const readDirMain = readdirSync(dirMain);
  
  // console.log({dirMain, readDirMain, parentDirArray, parentDirName});
  
  readDirMain.forEach((dirNext) => {
    // console.log({dirNext}, lstatSync(dirMain + "/" + dirNext).isDirectory());
    if (lstatSync(dirMain + "/" + dirNext).isDirectory()) {
      readAllFolder(dirMain + "/" + dirNext);
    } else {
      if (dirNext.endsWith('.md')) {
        copyFile(`${dirMain}/${dirNext}`, `./output/arbeiten/${parentDirName}/`, `${artworkDirName}.md`);
      } else if (dirNext.endsWith('.jpg')) {
        copyFile(`${dirMain}/${dirNext}`, `./output/images/${parentDirName}/`, dirNext);
      }
    }
  });
}

const directories = process.env.npm_config_dir?.split('\n\n') || ['./artwork'];

directories.forEach(directory => readAllFolder(directory));
