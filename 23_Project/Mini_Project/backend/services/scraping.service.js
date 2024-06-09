import axios from 'axios';
import cheerio from 'cheerio';

export const getOpenGraph = async ({ prefer }) => {
  const preferHtml = await axios.get(prefer);

  const $ = cheerio.load(preferHtml.data);

  const openGraph = {};

  $('meta').each((index, el) => {
    if ($(el).attr('property')?.includes('og:')) {
      const key = $(el).attr('property').replace('og:', '');
      const value = $(el).attr('content');
      openGraph[key] = value;
    }
  });

  console.log('openGraph: ', openGraph);

  return openGraph;
};
