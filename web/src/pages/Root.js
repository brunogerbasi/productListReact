import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PagesPromotionSearch from './Promotion/Search/Search';


const Root = () => {
  return (
    <Router>
      <Switch>        
        <Route path="/" component={PagesPromotionSearch} />
      </Switch>
    </Router>
  );
};

export default Root;

