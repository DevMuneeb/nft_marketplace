import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { CreatorCard } from '../components';
import Banner from '../components/Banner';
import images from '../assets';
import NFTCard from '../components/NFTCard';

const Home = () => {
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justifyStart mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div className="">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Top Sellers
          </h1>
          <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
            <div
              ref={scrollRef}
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
            >
              {[6, 7, 8, 9].map((creator, i) => (
                <CreatorCard
                  key={i}
                  rank={i + 1}
                  creatorImg={images[`creator${i + 1}`]}
                  creatorName="2x2667133....786"
                  creatorEths={7.0}
                />
              ))}
              {!hideButtons && (
                <>
                  <div
                    onClick={() => handleScroll('left')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer"
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="leftArrow"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                  <div
                    onClick={() => handleScroll('right')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer"
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="leftArrow"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flexBetween mx-4 sm:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Hot NFTs
            </h1>
            <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
              SearchBar
            </div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  seller: '0xt...8asdn',
                  owner: '0xt...8asdn',
                  description: 'Cool NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
