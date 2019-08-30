import { remote } from 'electron';
import path from 'path';
import fs from 'fs';

export const FORMAT_TXT = 'txt';
export const FORMAT_PDF = 'pdf';

function getAppData() {
  const appData = path.join(remote.app.getPath('appData'), 'ElectronReactUploader');
  if (!fs.existsSync(appData)) {
    fs.mkdirSync(appData);
  }
  return appData;
}

export function getExtname(file) {
  return path
    .extname(file)
    .toLowerCase()
    .substr(1);
}

export function getFiles() {
  const files = [];
  try {
    const appData = getAppData();
    fs.readdirSync(appData).forEach(file => {
      const extname = getExtname(file);
      if (extname === FORMAT_TXT || extname === FORMAT_PDF) {
        files.push({
          name: path.basename(file, `.${extname}`),
          extname: extname,
          path: path.join(appData, file),
          selected: false
        });
      }
    });
  } catch (err) {
    remote.dialog.showErrorBox('Error', err.message);
  }
  return files;
}

export function copyFile(filePaths) {
  const destinations = [];
  try {
    filePaths.forEach(filePath => {
      const destination = path.join(getAppData(), path.basename(filePath));
      fs.copyFileSync(filePath, destination);
      destinations.push(destination);
    });
  } catch (err) {
    remote.dialog.showErrorBox('Error', err.message);
  }
  return destinations;
}

export function getFileContent(file) {
  return fs.readFileSync(file, { encoding: 'utf8' });
}
