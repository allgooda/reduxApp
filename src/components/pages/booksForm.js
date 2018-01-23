"use strict"
import React from 'react';
import {DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button, InputGroup, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{
  constructor() {
    super();
    this.state = {
      images: [{}],
      img: ''
    }
  }

  componentDidMount(){
    this.props.getBooks();
    //Get images from the API
    axios.get('/api/images')
      .then(function(response) {
        this.setState({images: response.data})
      }.bind(this))
      .catch(function(err) {
        this.setState({images:'error loading image files', img:''})
      }.bind(this))
  }

  handleSubmit() {
    const book=[
      {
        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        images: findDOMNode(this.refs.image).value,
        price: findDOMNode(this.refs.price).value,
      }
    ]
    this.props.postBooks(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId);
  }

  handleSelect(img) {
    this.setState({
      img: '/images/' + img
    })
  }

  render() {
    const booksList = this.props.books.map((booksArr) => {
      return(
        <option key={booksArr._id}> {booksArr._id} </option>
      )
    });

    const imgList = this.state.images.map(function(imgArr, i) {
      return(
        <MenuItem key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
      )
    }, this)
    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an Image"
                  bsStyle="primary">
                  {imgList}
                  <MenuItem key="1">Item</MenuItem>
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title" />
              </FormGroup>
              <FormGroup controlId="Description">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Description"
                  ref="description" />
              </FormGroup>
              <FormGroup controlId="price">
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter price"
                  ref="price" />
              </FormGroup>
              <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save Book</Button>
            </Panel>

            <Panel style={{marginTop:"25px"}}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger">DELETE BOOK</Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks,
    deleteBooks,
    getBooks,
  }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
