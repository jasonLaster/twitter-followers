import { kv } from '@vercel/kv';
import followersData from '../data/followers.json';

async function populateKV() {
  try {
    await kv.set('followers', followersData);
    console.log('Followers data successfully populated in Vercel KV');
  } catch (error) {
    console.error('Error populating Vercel KV:', error);
  }
}

populateKV();
