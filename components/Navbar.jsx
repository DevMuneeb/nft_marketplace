import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import images from '../assets';
import Button from './Button';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul className={`list-none flexCenter ${isMobile && ' flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          onClick={() => setActive(item)}
          key={i}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}

        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;
  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  ) : <Button btnName="Connect" classStyles="mx-2 rounded-xl" />;
};
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('Explore NFTs');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter">
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1 md:hidden">KryptoPlace</p>
          </div>

        </Link>

      </div>
      <div className="flex flex-initial flex-row justify-end mr-2 items-center">
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label mr-2">
          <i className="fas fa-moon" />
          <i className="fas fa-sun" />
          <div className="w-3 h-3 absolute bg-white rounded-full ball" />

        </label>
        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div>
            <ButtonGroup router={router} setActive={setActive} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        {
          isOpen ? (
            <Image
              src={images.cross}
              width={20}
              height={20}
              objectFit="contain"
              alt="close"
              onClick={() => setIsOpen(false)}
              className={theme === 'light' && 'filter invert'}
            />
          ) : (
            <Image
              src={images.menu}
              width={25}
              height={25}
              objectFit="contain"
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === 'light' && 'filter invert'}
            />
          )
        }
        {isOpen && (
        <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 flex justify-between flex-col">
          <div className="flex-1 p-4">
            <MenuItems active={active} setActive={setActive} isMobile />
          </div>
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 flex flexCenter">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
