import React, { Component } from 'react';
import { Button, Form, Divider, Tab, Modal, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import createHistory from "history/createBrowserHistory";
import axios from 'axios';
import InputRange from 'react-input-range';
import './ActualApp.css';

const history = createHistory({forceRefresh:true})
const Title2 = ({ text }) => ( <h1 class='App-title2'>{text}</h1> );
const Title3 = ({ text }) => ( <h2 class='App-title3'>{text}</h2> );
const Title4 = ({ text }) => ( <h3 class='App-title3'>{text}</h3> );

const optionsNums = [
  {key: '1', text: '1', value:1},
  {key: '2', text: '2', value:2},
  {key: '3', text: '3', value:3},
  {key: '4', text: '4', value:4},
  {key: '5', text: '5', value:5},
  {key: '6', text: '6', value:6},
  {key: '7', text: '7', value:7},
  {key: '8', text: '8', value:8},
  {key: '9', text: '9', value:9},
  {key: '10', text: '10', value:10},
]

class Buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suburb: '',
      min: 0,
      max: 0,
      bedrooms: 0,
      bathrooms: 0,
      priceRange: {
        min: 400000,
        max: 1200000
      },
      group_by: '0',        // default values
      sort_by: '1',
      ascending: 'true'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }

  componentDidMount() {
    console.log(localStorage.getItem('session'));
    if (localStorage.getItem('session') === null) {
      alert("You are unable to use this API without signing in!");
      this.setState({loggedIn: false});
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeSelect(event, data) {
    const { name, value } = data;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const mintmp = this.state.priceRange.min;
    const maxtmp = this.state.priceRange.max;
    this.setState({ min: {mintmp}, max: {maxtmp} })
    console.log(this.state)
    if (localStorage.getItem('session') === null) {
      alert("You are unable to use this API without signing in!");
      this.setState({loggedIn: false});
    } else {
      history.push('/buy-result', this.state)
    }
  }
  render() {
    return (
      <div>
      <Title3 text='Browse Properties' />
      <p class='grey-text'>View a map displaying properties with the following attributes</p>
      <Form name='sellform' id='sellform'
        onSubmit={this.handleSubmit}
        class='ui form'>
        <Form.Input required
          label='Suburb'
          name='suburb'
          value={this.state.suburb}
          onChange={this.handleChange}
          placeholder='Name of suburb'/>
        <Form.Group>
        <Form.Select label='Bedrooms'
          name='bedrooms'
          onChange={this.handleChangeSelect}
          options={optionsNums}
          placeholder='Number of Bedrooms'/>
        <Form.Select label='Bathrooms'
          name='bathrooms'
          onChange={this.handleChangeSelect}
          options={optionsNums}
          placeholder='Number of Bathrooms'/>
        </Form.Group>
        <div style={{margin:50}}>
        <InputRange
          maxValue={4000000}
          minValue={0}
          formatLabel={value => `$${value}`}
          value={this.state.priceRange}
          onChange={value => this.setState({ priceRange: value })}
          onChangeComplete={value => console.log(value)} />
        </div>
        {/*** SCHOOL AND CRIME FIELDS:
          [/SCHOOL] - suburb, ascending, sort_by
          [/CRIMES] - suburb, group_by
         ***/}
         <Title4 text='View School Statistics'/>
         <Form.Group>
         <Form.Select label='Sort By'
          name='sort_by'
          onChange={this.handleChangeSelect}
          options={optionsSortBy}
          placeholder='Sort By Value'/>
         <Form.Select label='Order'
          name='ascending'
          onChange={this.handleChangeSelect}
          options={optionsAscending}
          placeholder='Ascending or Descending'/>
          </Form.Group>
         <Title4 text='View Crime Statistics'/>
         <Form.Select label='Group By' width={2}
          name='group_by'
          onChange={this.handleChangeSelect}
          options={optionsGroupBy}
          placeholder='Group By Value'/>

        <Button
          type='submit'
          content='Submit'
          icon='right arrow'
          labelPosition='left'
          role='button'>
        </Button>
      </Form>


      </div>
    );
  }
}

const optionsSortBy = [
  {text:'Number of Students', value:'0'},
  {text:'Completion Rate', value:'1'},
  {text:'Median', value:'2'},
  {text:'Over 40% Completion', value:'3'}

]
const optionsAscending = [
  {text:'Ascending', value:'true'},
  {text:'Descending', value:'false'}
]
const optionsGroupBy = [
  {text: 'Sum', value:'0'},
  {text: 'Mean', value:'1'},
  {text: 'Median', value:'2'}
]
export default Buy;
