import { kv } from '@vercel/kv';
import followersData from '../data/followers.json';

async function populateKV() {
  try {
    const pipeline = kv.pipeline();
    followersData.forEach((follower) => {
      pipeline.set(`follower:${follower.handle}`, follower);
    });
    await pipeline.exec();
    console.log('Followers data successfully populated in Vercel KV as individual entries');
  } catch (error) {
    console.error('Error populating Vercel KV:', error);
  }
}

populateKV();
