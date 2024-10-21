import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Follower {
  username: string;
  handle: string;
  bio: string;
  profileURL: string;
  avatarURL: string;
}

export function TwitterFollowers({ followers }: { followers: Follower[] }) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)] rounded-md border bg-gray-50">
      <ul className="divide-y">
      {followers.map((follower, index) => (
          <li key={index} className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={follower.avatarURL} alt={follower.username} />
                <AvatarFallback className="text-lg">{follower.username.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 max-w-[70%]">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-base font-medium text-gray-900 truncate">
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
                <p className="text-sm text-gray-500 line-clamp-2">{follower.bio}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
