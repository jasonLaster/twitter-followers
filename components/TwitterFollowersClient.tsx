"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TwitterFollowers } from "@/components/TwitterFollowers";
import Fuse from 'fuse.js';

interface Follower {
  username: string;
  handle: string;
  bio: string;
  profileURL: string;
  avatarURL: string;
}

export default function TwitterFollowersClient({ initialFollowers }: { initialFollowers: Follower[] }) {
  const [followers] = useState(initialFollowers)
  const [searchTerm, setSearchTerm] = useState("")

  const fuse = useMemo(() => new Fuse(followers, {
    keys: ['username', 'handle', 'bio'],
    threshold: 0.3, // You can adjust this value to make the search more or less fuzzy
  }), [followers]);

  const filteredFollowers = useMemo(() => {
    if (!searchTerm || searchTerm.length < 3) return followers;
    return fuse.search(searchTerm).map(result => result.item);
  }, [fuse, searchTerm, followers]);

  return (
    <>
      <div className="mb-2 text-sm text-muted-foreground">
        Total Following: {filteredFollowers.length}
      </div>
      <div className="mb-4 relative ">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search following..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 bg-gray-50"
        />
      </div>
      <TwitterFollowers followers={filteredFollowers} />
    </>
  );
}
