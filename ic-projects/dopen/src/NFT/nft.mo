import Principal "mo:base/Principal";

persistent actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
  
  transient let itemName = name;
  transient let nftOwner = owner;
  transient let imageBytes = content;

  public query func getName() : async Text{
    return itemName;
  };

  public query func getOwner() : async Principal {
    return nftOwner;
  };

  public query func getAsset() : async [Nat8] {
    return imageBytes;
  };

  public query func getCanisterID() : async Principal {
    return Principal.fromActor(this);
  };

};