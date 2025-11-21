import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/NFT/NFT.did.js";
import { Principal } from "@dfinity/principal";

function Item(props) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();

  const id = Principal.fromText(props.id);

  const agent = new HttpAgent({ host: window.location.origin });

  function uint8ArrayToBase64(bytes) {
    let binary = "";
    const len = bytes.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function loadNFT() {
    // Use the same origin as the page instead of hard-coding localhost
    const hostname = window.location.hostname;
    const isLocal =
      hostname === "127.0.0.1" || hostname.endsWith("localhost");

    if (isLocal) {
      // IMPORTANT: fetch local root key so cert verification works
      await agent.fetchRootKey();
    }

    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset(); // returns [Nat8]
    const bytes = new Uint8Array(imageData);
    const base64 = uint8ArrayToBase64(bytes);
    const imgUrl = `data:image/png;base64,${base64}`;

    setName(name);
    setOwner(owner.toText());
    setImage(imgUrl);
  }

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
