import React, { Component } from 'react';
import { Layout } from 'antd';
import TopContainer from './containers/TopContainer';
import MainContainer from './containers/MainContainer';
import FooterContainer from './containers/FooterContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <TopContainer/>
        <MainContainer/>
        <FooterContainer/>
      </Layout>
    );
  }
}

export default App;