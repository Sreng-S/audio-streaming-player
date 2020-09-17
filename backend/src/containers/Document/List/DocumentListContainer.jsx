import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { AppContext } from 'components';
import { DocumentController } from 'controllers';
import styles from './DocumentListContainer.module.scss';

var _ = require('lodash');
class DocumentListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      { title: 'Play Order', key: 'order' },
      { title: 'Name', key: '' },
      { title: 'Url', key: '' },
      { title: 'Actions', key: '' }
    ];

    this.state = {
      activeFilter: 1,
      data: [],
      keyword: '',
      filter: 'name',
      activePage: 1,
      itemPerPage: 10
    };
  }

  async componentDidMount() {
    await this.reload();
  }

  addClicked = () => {
    this.props.history.push('/files/add');
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  reload = async () => {
    this.context.showLoading();
    await DocumentController.sortOrder();

    let data = await DocumentController.getDocuments();
    data = data
      .filter(client =>
        (client[this.state.filter] || '')
          .toLowerCase()
          .includes(this.state.keyword.toLowerCase())
      )
      .map(client => {
        let item = { ...client };

        return item;
      });

    await this.setState({ data });
    this.sortBy('order');
    this.context.hideLoading();
  };

  activeFilterChanged = () => {
    this.setState({
      activeFilter: 1 - this.state.activeFilter,
    });
  };

  editClicked = id => () => {
    this.props.history.push(`/files/edit/${id}`);
  };

  deactivateClicked = id => async () => {
    var res = window.confirm('Do you want to deactivate this file?');
    if (res) {
      await DocumentController.deactivateDocument(id);
      await this.reload();
    }
  };

  activateClicked = id => async () => {
    var res = window.confirm('Do you want to activate this file?');
    if (res) {
      await DocumentController.activateDocument(id);
      await this.reload();
    }
  };

  searchfilterChanged = filter => () => {
    this.setState({
      filter
    });
  };

  searchInputChanged = e => {
    this.setState(
      {
        keyword: e.target.value
      },
      async () => {
        if (!this.state.keyword) {
          await this.reload();
        }
      }
    );
  };

  searchInputKeyPressed = async e => {
    if (e.charCode === 13) {
      // enter pressed
      await this.reload();
    }
  };

  sortBy(key) {
    let { data } = this.state;
    data = _.orderBy(data, key);
    this.setState({ data });
  }

  createRow() {
    const { data } = this.state;
    let children = [];
    for (
      var i = (this.state.activePage - 1) * this.state.itemPerPage;
      i < this.state.activePage * this.state.itemPerPage;
      i++
    ) {
      let item = data[i];
      children.push(
        _.isEmpty(item) ? null : (
          item.active === this.state.activeFilter && (<tr key={item.id}>
            <td>{item.order}</td>
            <td>{item.name}</td>
            <td>
              {item.url && (
                <span
                  src={item.url}
                  className={styles.image}
                  onClick={() => window.open(item.url, '_blank')}
                />
              )}
            </td>

            <td>
              <span onClick={this.editClicked(item.id)}>
                <i className={`fa fa-pencil-square-o ${styles.iconPencil}`} />
              </span>
              {item.active ? (
                <span onClick={this.deactivateClicked(item.id)}>
                  <i className={`fa fa-trash-o ${styles.iconTrash}`} />
                </span>
              ) : (
                <span onClick={this.activateClicked(item.id)}>
                  <i className={`fa fa-refresh ${styles.iconRefresh}`} />
                </span>
              )}
            </td>
          </tr>)
        )
      );
    }
    return children;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.searchContainer}>
            <div className={styles.searchbar}>
              <i className={`fa fa-search ${styles.iconSearch}`} />
              <input
                type='text'
                placeholder='Type here and press enter to get the result...'
                value={this.state.keyword}
                onChange={this.searchInputChanged}
                onKeyPress={this.searchInputKeyPressed}
              />
            </div>
            <div className={styles.searchfilters}>
              <div
                className={styles.filter}
                onClick={this.activeFilterChanged}
              >
                <input
                  type='checkbox'
                  value='name'
                  checked={this.state.activeFilter === 1}
                  onChange={this.activeFilterChanged}
                />
                {this.state.activeFilter === 1 ? 'Active' : 'Deactive'}
              </div>
            </div>
          </div>
          <div className={styles.btnAdd} onClick={this.addClicked}>
            <i className={`fa fa-plus ${styles.icon}`} />
            Add
          </div>
        </div>

        {this.state.data.length ? (
          <div>
            <table>
              <thead>
                <tr className={styles.header}>
                  {this.columns.map(item => (
                    <th key={item.title} onClick={() => this.sortBy(item.key)}>
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{this.createRow()}</tbody>
            </table>
            <div className={styles.bottom}>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemPerPage}
                totalItemsCount={this.state.data.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
                innerClass={styles.pagination}
                activeClass={styles.activeItem}
              />
            </div>
          </div>
        ) : (
          <h3>No Search Result</h3>
        )}
      </div>
    );
  }
}

DocumentListContainer.contextType = AppContext;

DocumentListContainer.propTypes = {
  history: PropTypes.object
};

export default DocumentListContainer;
