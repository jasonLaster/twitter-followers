import { sql } from "@vercel/postgres";
import followers from '../data/followers.json';

// Create the followers table if it doesn't exist
async function createFollowersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS followers (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255),
      handle VARCHAR(255) UNIQUE,
      bio TEXT,
      profile_url VARCHAR(255),
      avatar_url VARCHAR(255)
    );
  `;
  console.log("Followers table created or already exists");
}

// Function to upload followers to the table
async function uploadFollowers(followers) {
  const batchSize = 100; // Adjust this value based on your needs and database limitations
  for (let i = 0; i < followers.length; i += batchSize) {
    const batch = followers.slice(i, i + batchSize);
    try {
      const values = batch.map(follower => 
        `(${sql(follower.username)}, ${sql(follower.handle)}, ${sql(follower.bio)}, ${sql(follower.profileURL)}, ${sql(follower.avatarURL)})`
      ).join(', ');

      await sql`
        INSERT INTO followers (username, handle, bio, profile_url, avatar_url)
        VALUES ${sql.unsafe(values)}
        ON CONFLICT (handle) DO UPDATE SET
          username = EXCLUDED.username,
          bio = EXCLUDED.bio,
          profile_url = EXCLUDED.profile_url,
          avatar_url = EXCLUDED.avatar_url;
      `;
      console.log(`Batch ${i / batchSize + 1} uploaded successfully`);
    } catch (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
    }
  }
  console.log("Followers uploaded successfully");
}

// Main function to create table and upload followers
async function main() {
  try {
    await createFollowersTable();
    
    // Read the followers data from the JSON file
    
    await uploadFollowers(followers);
    

    // Query to check the inserted data
    const res1 = await sql`SELECT COUNT(*) FROM followers;`;
    console.log(`Total followers in the database: ${res1.rows[0].count}`);

    // const res2  = await sql`SELECT * FROM followers;`;
    // console.log(res2.rows)
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Run the main function
main();
