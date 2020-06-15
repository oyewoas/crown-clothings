import React, { Component } from 'react';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { createStructuredSelector } from 'reselect';


const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component{

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
  }

  render() {
    const {match, isCollectionLoaded } = this.props

    return(
      <div className="shop-page">
      <Route exact path={`${match.path}`} component={ CollectionsOverviewContainer }/>
      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
    </div>
    )
  }
    
}

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsCollectionLoaded
})
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)