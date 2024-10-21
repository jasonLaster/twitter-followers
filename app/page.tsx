import { kv } from '@vercel/kv';
import TwitterFollowersClient from '@/components/TwitterFollowersClient';

interface Follower {
  username: string;
  handle: string;
  bio: string;
  profileURL: string;
  avatarURL: string;
}

async function getFollowers(): Promise<Follower[]> {
  const allFollowers = await kv.get<Follower[]>('followers') || [];
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
