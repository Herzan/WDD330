import { FandomScraper } from 'fandomscraper';

export async function getFandom() {
  // const scraper =  new  FandomScraper('starwars', { lang:  'en' });
  const scraper = new FandomScraper('shiki', { lang: 'en' });
  const wikis = scraper.getAvailableWikis();

  console.log(wikis);
}
