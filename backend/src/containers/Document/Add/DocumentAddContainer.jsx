import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { AppContext } from 'components';
import { DocumentController } from 'controllers';

import styles from './DocumentAddContainer.module.scss';

class DocumentAddContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: ''
    };
  }

  async componentDidMount() {
    await this.setState({ loading: true });
    await this.context.showLoading();
    await this.reload();
    await this.context.hideLoading();
    await this.setState({ loading: false });
  }

  async reload() {

  }

  handleUploadStart = () => {
    this.context.showLoading();
    this.setState({ isUploading: true, progress: 0 });
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  handleUploadError = error => {
    this.context.hideLoading();
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.context.hideLoading();
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('files')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ url }));
  };

  removeThumb() {
    this.setState({ url: null });
  }

  removeDoc() {
    this.setState({ docName: null, url: null });
  }

  basicInfoChanged = type => e => {
    if (type === 'code') {
      this.setState({
        [type]: e.value
      });
    } else {
      this.setState({
        [type]: e.target.value
      });
    }
  };

  addClicked = async () => {
    const {  name,  url, } = this.state;

    if (name === '') {
      alert('Please enter name.');
      return;
    }
    if (!url) {
      alert('Please upload file.');
      return;
    }

    this.context.showLoading();
    try {
      await DocumentController.addDocument(this.state);
      this.props.history.goBack();
    } catch (error) {
      alert(error.message);
    }
    this.context.hideLoading();
  };

  cancelClicked = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1> Add New File </h1>
        <div className={styles.container}>

          <div className={styles.inputItem}>
            <span>Name: </span>
            <input
              value={this.state.name}
              onChange={this.basicInfoChanged('name')}
            />
          </div>


          <div className={styles.inputItem}>
            <span>File: </span>
            <CustomUploadButton
              accept='audio/*'
              storageRef={firebase.storage().ref('files')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              style={{
                backgroundColor: 'steelblue',
                color: 'white',
                padding: 10,
                borderRadius: 2,
                textAlign: 'center',
                width: 325
              }}
            >
              Select File
            </CustomUploadButton>
            {this.state.url && (<span> Added Successfully.</span>)}
            {this.state.url && (
              <span onClick={() => this.removeThumb()}>
                <i className='fa fa-minus-circle' />
              </span>
            )}
          </div>
        </div>

        <div className={styles.btnGroup}>
          <div className={styles.btnSave} onClick={this.addClicked}>
            Save
          </div>
          <div className={styles.btnCancel} onClick={this.cancelClicked}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

DocumentAddContainer.contextType = AppContext;

DocumentAddContainer.propTypes = {
  history: PropTypes.object
};

export default DocumentAddContainer;
