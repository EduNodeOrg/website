import React from 'react';
import { Balance } from './components/Balance';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import './App.css';


const App = () => {
  return (
    <React.Fragment>
        <Router>
          <NavigationBar />
            <Switch>
              <Route exact path="/" component={Balance} />
              <Route path="/TransactionList" component={TransactionList} />
              <Route path="/AddTransaction" component={AddTransaction} />
            </Switch>

        </Router>
      </React.Fragment>

  )
}

export default App;
