import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { AppContext } from 'components';
import { DocumentController } from 'controllers';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import styles from './DocumentEditContainer.module.scss';

class DocumentEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DocumentId: props.match.params.id
    };
  }

  async componentDidMount() {
    this.context.showLoading();
    let data = await DocumentController.getDocumentById(this.state.DocumentId);
    await this.setState({
      id: data.id,
      name: data.name,
      url: data.url,
      order: data.order,
      active: data.active
    });


    this.context.hideLoading();
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

  handleDocUploadSuccess = filename => {
    this.context.hideLoading();
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('documents')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ docName: filename, docUrl: url }));
  };

  removeThumb() {
    this.setState({ url: null });
  }

  removeDoc() {
    this.setState({ name: null, url: null });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ codeId: selectedOption.value });
    console.log('Option selected:', selectedOption);
  };

  updateClicked = async () => {
    const {  name, url  } = this.state;

    if (name === '') {
      alert('Please enter name.');
      return;
    }
    if (!url) {
      alert('Please upload audio file.');
      return;
    }

    this.context.showLoading();
    try {
      await DocumentController.updateDocument(this.state);
      this.props.history.goBack();
    } catch (error) {
      alert(error.message);
    }
    this.context.hideLoading();
  };

  cancelClicked = () => {
    this.props.history.goBack();
  };

  basicInfoChanged = type => e => {
    if (type === 'codeId') {
      this.setState({
        [type]: e.value
      });
    } else {
      this.setState({
        [type]: e.target.value
      });
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1> Edit Document </h1>
        <div className={styles.container}>

          <div className={styles.inputItem}>
            <span>Document Name</span>
            <input
              value={this.state.name}
              onChange={this.basicInfoChanged('name')}
            />
          </div>

          <div className={styles.inputItem}>
            <span>File</span>
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
          <div className={styles.btnSave} onClick={this.updateClicked}>
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

DocumentEditContainer.contextType = AppContext;

DocumentEditContainer.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default DocumentEditContainer;
