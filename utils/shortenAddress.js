export const shortenAddress = (address) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `${address.substring(0, 5)}...${address.slice(address.length - 4)}`;
