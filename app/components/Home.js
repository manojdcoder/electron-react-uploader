// @flow
import React, { Component } from 'react';
import routes from '../constants/routes';
import styles from './Home.scss';
import {
  FORMAT_TXT,
  FORMAT_PDF,
  copyFile,
  getFileContent
} from '../utils/file';

import { remote } from 'electron';

type Props = {
  syncFile: (path: string) => void,
  selectFile: (path: string) => void,
  file: []
};

export default class Home extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.syncFile();
  }

  onUploadButtonClick() {
    remote.dialog.showOpenDialog(
      {
        buttonLabel: 'Upload',
        filters: [
          {
            extensions: [FORMAT_TXT, FORMAT_PDF],
            name: 'Text Or PDF'
          }
        ],
        properties: ['openFile'],
        message: 'Please select a Text or PDF document'
      },
      filePaths => {
        if (filePaths) {
          filePaths = copyFile(filePaths);
          this.props.syncFile(filePaths[0]);
        }
      }
    );
  }

  render() {
    const { file, selectFile } = this.props;
    let selectedIndex = file.findIndex(item => item.selected);
    let renderFile = '';
    if (selectedIndex !== -1) {
      const selectedFile = file[selectedIndex];
      let fileContent;
      if (selectedFile.extname === FORMAT_TXT) {
        fileContent = <pre>{getFileContent(selectedFile.path)}</pre>;
      } else {
        fileContent = (
          <webview
            src={'./pdfjs/viewer.html?file=' + selectedFile.path}
          ></webview>
        );
      }
      renderFile = (
        <div className="wh-100">
          <h1>
            <i
              className={
                'fas ' +
                ((selectedFile.extname === FORMAT_TXT &&
                  'fa-file-alt text-primary') ||
                  '') +
                ((selectedFile.extname === FORMAT_PDF &&
                  'fa-file-pdf text-danger') ||
                  '')
              }
            ></i>
            Document {++selectedIndex}
          </h1>
          {fileContent}
        </div>
      );
    }
    return (
      <div className={styles.container + ' wh-100'}>
        <div className={styles.sidebar}>
          <h2>
            <i className="fas fa-book-open"></i>Reader Zone
          </h2>
          <h4>Files</h4>
          <div className={styles.list}>
            {file.map((item, index) => (
              <div
                className={
                  styles['list-item'] +
                  ' ' +
                  ((item.selected && styles['list-item-selected']) || '')
                }
                key={item.path}
                onClick={() => selectFile(item.path)}
              >
                <h3>
                  <i
                    className={
                      'fas ' +
                      ((item.extname === FORMAT_TXT &&
                        'fa-file-alt text-primary') ||
                        '') +
                      ((item.extname === FORMAT_PDF &&
                        'fa-file-pdf text-danger') ||
                        '')
                    }
                  ></i>
                  Document {++index}
                </h3>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.upload}>
            <button onClick={() => this.onUploadButtonClick()}>
              <i className="fas fa-cloud"></i>Upload Files
            </button>
          </div>
        </div>
        <div className={styles.content + ' wh-100'}>{renderFile}</div>
      </div>
    );
  }
}
