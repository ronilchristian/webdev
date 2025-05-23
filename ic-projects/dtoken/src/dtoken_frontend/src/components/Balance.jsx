import { Principal } from '@dfinity/principal';
import React, { useState } from "react";
import { dtoken_backend } from "../../../declarations/dtoken_backend";

function Balance() {
  const [inputValue, setInputValue] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    console.log("Button clicked");
    const principal = Principal.fromText(inputValue);
    const userBalance = await dtoken_backend.balanceOf(principal);
    const symbol = await dtoken_backend.getSymbol();
    setUserBalance(userBalance.toLocaleString());
    setSymbol(symbol);
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value);}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {userBalance} {symbol}.</p>
    </div>
  );
}

export default Balance;
