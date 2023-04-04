import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from "./component/Navigation"
import Message from "./component/Message"
import MainPage from "./page/MainPage"
import LoginPage from "./page/LoginPage"
import './App.css';
import {Layout} from 'antd';

const{Header,Footer} = Layout;

const headerStyle = {
  textAlign: 'right',
  color: '#fff',
  paddingInline: 50,
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#000',
  backgroundColor: '#fff',
};

function App() {
  return (
      <BrowserRouter>
        <Layout style={{height: '100vh'}}>
          <Header style={headerStyle}>
            <Navigation/>
          </Header>

          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/login" element={<LoginPage />}/>
            </Routes>
          </Layout>

          <Footer style={footerStyle}>
            <Message/>
          </Footer>
        </Layout>
      </BrowserRouter>
  );
}

export default App;
