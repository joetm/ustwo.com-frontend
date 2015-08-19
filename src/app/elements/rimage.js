'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import findIndex from 'lodash/array/findIndex';

class Rimage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: props.sizes[0]
    };
  }
  render() {
    const url = this.getImageUrl();
    let img;
    if(this.props.background) {
      img = (
        <section className={this.props.className} style={{backgroundImage: `url('${url}')`}}>
          <img className={`${this.props.className}__image`} src={url} />
        </section>
      );
    } else {
      img = <img className={this.props.className} src={url} />
    }
    return img;
  }
  getImageUrl = (size) => {
    return this.state.size.url;
  }
  getNewSize = () => {
    const sizes = this.props.sizes;
    const el = React.findDOMNode(this);
    const constrainSize = el.clientHeight;
    let newSize = find(sizes, size => size.height > constrainSize);
    if(!newSize) {
      newSize = sizes[sizes.length - 1];
    }
    return newSize;
  }
  componentDidMount() {
    const sizes = this.props.sizes;
    const newSize = this.getNewSize();
    if(findIndex(sizes, newSize) > findIndex(this.state.size)) {
      const img = new Image();
      img.onload = () => this.setState({
        size: newSize
      });
      img.src = this.getImageUrl(newSize);
    }
  }
};

export default Rimage;
