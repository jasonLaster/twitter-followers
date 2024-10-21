"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TwitterFollowers } from "@/components/TwitterFollowers";
import Fuse from 'fuse.js';
import { Follower } from "@/types/types";

export default function TwitterFollowersClient({ initialFollowers }: { initialFollowers: Follower[] }) {
  const [followers] = useState(initialFollowers);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Throttle the search term with immediate first update
  useEffect(() => {
    let lastUpdateTime = 0;
    const throttleDelay = 100; // Delay in milliseconds

    const updateSearchTerm = () => {
      const now = Date.now();
      if (now - lastUpdateTime >= throttleDelay) {
        setDebouncedSearchTerm(searchTerm);
        lastUpdateTime = now;
      }
    };

    // Immediate update for the first change
    if (lastUpdateTime === 0) {
      setDebouncedSearchTerm(searchTerm);
      lastUpdateTime = Date.now();
    } else {
      const timerId = setTimeout(updateSearchTerm, throttleDelay);
      return () => clearTimeout(timerId);
    }
  }, [searchTerm]);

  const fuse = useMemo(() => new Fuse(followers, {
    keys: ['username', 'handle', 'bio'],
    threshold: 0.3, // You can adjust this value to make the search more or less fuzzy
  }), [followers]);

  const filteredFollowers = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) return followers;
    return fuse.search(debouncedSearchTerm).map(result => result.item);
  }, [fuse, debouncedSearchTerm, followers]);

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
