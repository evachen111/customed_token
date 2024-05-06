import React,{useState} from "react";
import {token, canisterId, createActor} from "../../../declarations/token";
import { Principal } from '@dfinity/principal';
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisable, setDisable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setHidden] = useState(true);

  

  async function handleClick() {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId,{
      agentOptions: {
        identity,
      },
    })

    setHidden(true);
    setDisable(true);
    const toId = Principal.fromText(to);
    const amountNum = Number(amount);
    const result = await authenticatedCanister.transfer(toId, amountNum);
    setFeedback(result);
    setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value = {to}
                onChange={(e) => setTo(e.target.value)}

              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled = {isDisable} >
            Transfer
          </button>
        </p>
        <p hidden = {isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
