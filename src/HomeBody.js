import React, { Component } from 'react';

import { Image, List } from 'semantic-ui-react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { HashRouter, Route, Link } from 'react-router-dom';

import bgimg from './img/bg3.jpg';
import christine from './img/christine.svg';
import charley from './img/charley.svg';
import je from './img/je.svg';
import gautham from './img/gautham.svg';

configureAnchors({offset:-53, scrollDuration: 500});

const Title2 = ({ text }) => ( <h1 class='App-title2'>{text}</h1> );
const Title3 = ({ text }) => ( <h2 class='App-title3'>{text}</h2> );

/*** landing ***/
const bgStyle = {
  backgroundImage: 'url(' + bgimg + ')',
  backgroundSize: 'cover',
  height: 800
}
const Landing = () => (
      <div>
        <div class='bg ui segment App-img' style={bgStyle}>
          <div style={{height:250}}></div>
          <h1 class='ui huge header App-title'>HOUSOS</h1>
          <p>We value your home as much as you do.</p><br />

          <div class='ui'>
            <Link to='/docs'><button class='ui animated button black' role='button'>
              <div class='visible content'>Learn More</div>
              <div class='hidden content'>
                <i class="arrow circle down icon"></i>
              </div>
            </button></Link>{' '}
            <Link to='/api'><button class='ui animated button black' role='button'>
              <div class='visible content'>Explore API</div>
              <div class='hidden content'><i class="dollar sign icon"></i></div>
            </button></Link>
          </div>
        </div>


      </div>
);

/*** sections ***/
class Section extends Component {
  constructor(props) {
    super(props);
    this.state = { tag: props.tag, title: props.title};
    if (props.tag === 'about') {
      this.body = ( <AboutBody /> );
    } else {
      this.body = ( <DocsBody /> );
    }
  }
  render() {
    return(
      <div>
        <ScrollableAnchor id={this.state.tag}><div></div></ScrollableAnchor>
        <div class='ui main text container'>
          <Title2 text={this.state.title} />
          {this.body}
          <div style={{paddingBottom:50}} class='ui divider' />
        </div>
      </div>

    );
  }
};

const AboutBody = () => (
  <div>
  <p>Housos gives you accurate approximate housing prices based on location and other house attributes. Machine learning, yadda yadda</p>

  <Title3 text='The Team' />
  hide yo kids
  <br />
  <TeamList />
  </div>
);

const DocsBody = () => (
  <div>
  docs here uwu
  </div>
);

const TeamList = props => (
    <div class='teamlist'>
      <List horizontal>
        <List.Item><Image avatar src={charley} />
          <List.Content>
            <List.Header>Charley Wong</List.Header>Project Leader
          </List.Content>
        </List.Item>
        <List.Item><Image avatar src={christine} />
          <List.Content>
            <List.Header>Christine Bui</List.Header>Front End Developer
          </List.Content>
        </List.Item>
        <List.Item><Image avatar src={je} />
          <List.Content>
            <List.Header>Pang Je Ho</List.Header>Back End Developer
          </List.Content>
        </List.Item>
        <List.Item><Image avatar src={gautham} />
          <List.Content>
            <List.Header>Gautham Ontri</List.Header>Back End Developer
          </List.Content>
        </List.Item>
      </List>
    </div>
);


const HomeBody = () => (
  <div>
  <Landing />
  <Section tag='about' title='ABOUT US' />
  </div>
);

export default HomeBody;
