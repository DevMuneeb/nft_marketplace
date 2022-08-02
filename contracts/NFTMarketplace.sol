//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFTMarketplace is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  Counters.Counter private _itemsSold;

  uint256 listingPrice = 0.025 ether;

  address payable owner;

  struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  event MarketItemCreated(
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );
  mapping(uint256 => MarketItem) private idToMarketItem;

  constructor() {
    owner = payable(msg.sender);
  }

  function updateListingPrice(uint256 _listingPrice) public payable {
    require(
      owner == msg.sender,
      'Only marketplace owner can update the listing price'
    );
    listingPrice = _listingPrice;
  }

  function getListingPrice() public view returns (uint256) {
    return listingPrice;
  }

  function createToken(string memory tokenURI, uint256 price)
    public
    payable
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newTokenId = _tokenIds.current();
    _mint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);

    createMarketItem(newTokenId, price);

    return newTokenId;
  }

  function createMarketItem(uint256 tokenId, uint256 price) private {
    require(price > 0, 'price muste be greator than 0');
    require(msg.value == listingPrice, 'price must be equal to listing price');
    idToMarketItem[tokenId] = MarketItem(
      tokenId,
      payable(msg.sender),
      payable(address(this)),
      price,
      false
    );
    _transfer(msg.sender, address(this), tokenId);
    emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
  }
}
