// index.ts

import { TwitterApi } from 'twitter-api-v2';

// Replace the following placeholders with your actual keys and tokens
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function fetchFollowers() {
  try {
    // Replace 'your_twitter_handle' with your actual Twitter handle
    const username = 'jasonlaster11';

    // Get user ID by username
    const user = await client.v2.userByUsername(username);
    const userId = user.data.id;

    console.log(user, userId)
 
    const followers = await client.v2.followers(userId, { asPaginator: true });

    // Implement rate limiting
    for await (const follower of followers) {
      console.log(`@${follower.username}`);
      
      // Add a delay between requests to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  } catch (error) {
    if (error.code === 429) {
      console.error('Rate limit exceeded. Waiting before retrying...');
      // Wait for the rate limit to reset before retrying
      const resetTime = error.rateLimit?.reset || 900; // Default to 15 minutes if reset time is not provided
      await new Promise(resolve => setTimeout(resolve, resetTime * 1000));
      // Retry the request
      return fetchFollowers();
    } else {
      console.error('Error fetching followers:', error);
    }
  }
}

fetchFollowers();
