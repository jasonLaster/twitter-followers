"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import followersData from "@/data/followers.json";

interface Follower {
  username: string;
  handle: string;
  bio: string;
  profileURL: string;
  avatarURL: string;
}

const followers: Follower[] = followersData;

function TwitterFollowers({ followers }: { followers: Follower[] }) {
  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <ul className="divide-y">
      {followers.map((follower, index) => (
          <li key={index} className="p-4">
            <div className="flex items-start space-x-4">
              <Avatar className="mt-1">
                <AvatarImage src={follower.avatarURL} alt={follower.username} />
                <AvatarFallback>{follower.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {follower.username}
                  </p>
                  <a
                    href={follower.profileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline truncate"
                  >
                    @{follower.handle}
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-1">{follower.bio}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export function AppComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      follower.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Twitter Followers Visualizer
            </CardTitle>
            <p className="text-muted-foreground text-center">
              A simple tool to visualize and search your Twitter followers
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm text-muted-foreground">
              Total Followers: {filteredFollowers.length}
            </div>
            <div className="mb-4 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search followers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <TwitterFollowers followers={filteredFollowers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
