/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
      debitSum: 0,
      creditSum: 0,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      "https://johnnylaicode.github.io/api/credits.json"
    );
    const creditData = await response.json();
    const credits = creditData.map((credit) => ({
      ...credit,
      amount: parseFloat(credit.amount),
    }));

    const response2 = await fetch(
      "https://johnnylaicode.github.io/api/debits.json"
    );
    const debitData = await response2.json();
    const debits = debitData.map((debit) => ({
      ...debit,
      amount: parseFloat(debit.amount),
    }));

    const creditSum = credits.reduce(
      (total, credit) => total + credit.amount,
      0
    );
    const debitSum = debits.reduce((total, debit) => total + debit.amount, 0);

    this.setState(
      { creditList: credits, debitList: debits, creditSum, debitSum },
      this.updateAccountBalance
    );
  }

  addCredit = (newCredit) => {
    const { creditList, creditSum } = this.state;
    const credits = [...creditList, newCredit]; // use spread operator to not lose the state we already have
    const sum = creditSum + newCredit.amount;
    this.setState(
      { creditList: credits, creditSum: sum },
      this.updateAccountBalance
    );
  };

  addDebit = (newDebit) => {
    const { debitList, debitSum } = this.state;
    const debits = [...debitList, newDebit]; // use spread operator to not lose the state we already have
    const sum = debitSum + newDebit.amount;
    this.setState(
      { debitList: debits, debitSum: sum },
      this.updateAccountBalance
    );
  };

  updateAccountBalance = () => {
    const { creditSum, debitSum } = this.state;
    const accountBalance = creditSum - debitSum;
    this.setState({ accountBalance });
  };
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        accountBalance={this.state.accountBalance}
        addCredit={this.addCredit}
      />
    );
    const DebitsComponent = () => (
      <Debits
        addDebit={this.addDebit}
        debits={this.state.debitList}
        accountBalance={this.state.accountBalance}
      />
    );

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
