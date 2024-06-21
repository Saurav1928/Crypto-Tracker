import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  const fetchTrendingCoins = async (retryCount = 0) => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        console.warn(`Rate limited. Retrying... (${retryCount + 1})`);
        setTimeout(() => fetchTrendingCoins(retryCount + 1), 1000 * (retryCount + 1)); // Exponential backoff
      } else {
        console.error('Error fetching trending coins:', error);
      }
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <div className={classes.carousel}>
      {trending.map((coin) => (
        <div key={coin.id} className={classes.carouselItem}>
          <span>{coin.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
