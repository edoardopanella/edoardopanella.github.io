// Reads the public Letterboxd RSS feed and writes films.json for the website.
// Run locally with:  node scripts/update-letterboxd.mjs   (Node 18+)
import { writeFile } from 'node:fs/promises';

const USER = 'edostratocaster';
const res = await fetch(`https://letterboxd.com/${USER}/rss/`, {
  headers: { 'user-agent': 'Mozilla/5.0 (personal website sync; github.com/edoardopanella)' },
});
if (!res.ok) {
  console.error(`Letterboxd RSS returned ${res.status}. Keeping the existing films.json.`);
  process.exit(0);
}
const xml = await res.text();

const decode = (s) => s
  .replace(/<!\[CDATA\[|\]\]>/g, '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};

const diary = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  .map((m) => m[1])
  .filter((item) => tag(item, 'letterboxd:filmTitle')) // skip lists, keep diary entries
  .map((item) => ({
    t: tag(item, 'letterboxd:filmTitle'),
    y: Number(tag(item, 'letterboxd:filmYear')) || null,
    r: Number(tag(item, 'letterboxd:memberRating')) || 0,
    date: tag(item, 'letterboxd:watchedDate'),
    url: tag(item, 'link'),
    img: (tag(item, 'description').match(/<img src="([^"]+)"/) || [])[1] || '',
  }))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

if (!diary.length) {
  console.error('No diary entries found in the feed. Keeping the existing films.json.');
  process.exit(0);
}
await writeFile('films.json', JSON.stringify({ updated: new Date().toISOString(), diary }, null, 1) + '\n');
console.log(`Saved ${diary.length} diary entries to films.json`);
