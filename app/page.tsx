import { sql } from "@vercel/postgres";

import TwitterFollowersClient from '@/components/TwitterFollowersClient';
import { Follower } from "@/types/types";

async function getFollowers(): Promise<Follower[]> {
  const allFollowers: Follower[] = [];

  const { rows } = await sql`SELECT * from followers`;

  allFollowers.push(...(rows as Follower[]))

  const uniqueFollowers = allFollowers.reduce((acc, current) => {
    const x = acc.find(item => item.username === current.username);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Follower[]);
  const followers = uniqueFollowers;
  return followers || []
}


export default async function App() {
  const initialFollowers = await getFollowers()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <TwitterFollowersClient initialFollowers={initialFollowers} />
      </div>
    </div>
  )
}
