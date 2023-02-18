import "./App.css";
import { useState, useEffect } from "react";
import { AccountId, PrivateKey, Client, TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { Buffer } from "buffer";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateCar from "./pages/CreateCar";
import GiveScore from "./pages/GiveScore";
import Borrow from "./pages/BorrowCar";
import Return from "./pages/ReturnCar";
import { ethers } from "ethers";

// Part 1 - import ABI

function App() {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [score, setScore] = useState(0);
  const [contract, setContract] = useState();

  // Part 2 - define environment variables

  // Part 3 - create client instance

  const connect = async () => {
    if (window.ethereum) {
      // Part 4 - connect wallet
    }
  };

  const changeConnectedAccount = async (newAddress) => {
    try {
      newAddress = Array.isArray(newAddress) ? newAddress[0] : newAddress;
      setDefaultAccount(newAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const getContract = async () => {
    // Part 5 - create contract instance
  };

  const getScore = async () => {
    try {
      if (defaultAccount) {
        // Part 12 - get reputation token score
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    connect();
    getScore();
  }, [defaultAccount]);

  const createCar = async (cid) => {
    try {
      if (!contract) getContract();
      // Part 6 - add new car

      // Part 7 - submit add new car logs to topic

      alert("Successfully added new car!");
    } catch (e) {
      alert("Failed to add new car");
      console.log(e);
    }
  };

  const borrowCar = async (id, serial) => {
    try {
      if (!contract) getContract();
      // Part 8 - borrow new car

      // Part 9 - submit borrow car logs to topic

      alert("Successfully borrowed car!");
    } catch (e) {
      alert("Failed to borrrow car");
      console.log(e);
    }
  };

  const returnCar = async (id, serial) => {
    try {
      if (!contract) getContract();
      // Part 10 - return car

      // Part 11 - submit return car logs to topic

      alert("Successfully returned car!");
    } catch (e) {
      alert("Failed to return car");
      console.log(e);
    }
  };

  const giveScore = async (customer, score) => {
    try {
      if (!contract) getContract();
      // Part 13 - give reputation tokens

      // Part 14 - submit give reputation tokens logs to topic

      alert("Successfully gave REP tokens!");
    } catch (e) {
      alert("Failed to give REP tokens");
      console.log(e);
    }
  };

  const isMerchant = defaultAccount === merchantAddress;
  return (
    <>
      <nav>
        <ul className="nav">
          {isMerchant ? (
            <>
              <NavLink to="/" className="nav-item">
                Add Car
              </NavLink>
              <NavLink to="/give" className="nav-item">
                Give Score
              </NavLink>
            </>
          ) : defaultAccount ? (
            <>
              <NavLink to="/" className="nav-item">
                Borrow Car
              </NavLink>
              <NavLink to="/give" className="nav-item">
                Return Car
              </NavLink>
            </>
          ) : (
            <></>
          )}
          <div className="acc-container">
            {!isMerchant && defaultAccount && <p className="acc-score">My Reputation Tokens: {defaultAccount ? score : "0"}</p>}
            <div className="connect-btn">
              <button onClick={connect} className="primary-btn">
                {defaultAccount
                  ? `${defaultAccount?.slice(0, 5)}...${defaultAccount?.slice(defaultAccount?.length - 4, defaultAccount?.length)}`
                  : "Not Connected"}
              </button>
            </div>
          </div>
        </ul>
      </nav>

      {!defaultAccount ? <h1 className="center">Connect Your Wallet First</h1> : <></>}

      <Routes>
        {isMerchant ? (
          <>
            <Route path="/" element={<CreateCar createCar={createCar} />} />
            <Route path="/give" element={<GiveScore giveScore={giveScore} />} />
          </>
        ) : defaultAccount ? (
          <>
            <Route path="/" element={<Borrow borrowCar={borrowCar} />} />
            <Route path="/give" element={<Return returnCar={returnCar} address={defaultAccount} />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </>
  );
}

export default App;
