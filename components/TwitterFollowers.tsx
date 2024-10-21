import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Follower } from "@/types/types";

export function TwitterFollowers({ followers }: { followers: Follower[] }) {

  // Row component to render each follower
  const Row = ({ index, style }: ListChildComponentProps) => {
    const follower = followers[index];
    return (
      <div style={style} key={follower.handle} className="p-6 border-b">
        <div className="flex items-start space-x-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src={follower.avatar_url} alt={follower.username} />
            <AvatarFallback className="text-lg">
              {follower.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 max-w-[70%]">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-base font-medium text-gray-900 truncate">
                {follower.username}
              </p>
              <a
                href={follower.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:underline truncate"
              >
                {follower.handle}
              </a>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">{follower.bio}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-200px)] rounded-md border bg-gray-50">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={followers.length}
            itemSize={120} // Adjust based on item height
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}
