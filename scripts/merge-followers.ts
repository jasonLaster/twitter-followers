import fs from 'fs';
import path from 'path';

interface Follower {
  username: string;
  handle: string;
  bio: string;
  profileURL: string;
  avatarURL: string;
}

function readJsonFile(filePath: string): Follower[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

function mergeFollowers(followers1: Follower[], followers3: Follower[]): Follower[] {
  const mergedFollowers = [...followers1, ...followers3];

  // Remove duplicates based on username
  const uniqueFollowers = mergedFollowers.reduce((acc, current) => {
    const x = acc.find(item => item.username === current.username);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Follower[]);

  return uniqueFollowers;
}

function saveJsonFile(filePath: string, data: Follower[]): void {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

// Main execution
const followers1 = readJsonFile(path.join(__dirname, '../data/followers1.json'));
const followers3 = readJsonFile(path.join(__dirname, '../data/followers3.json'));

const mergedFollowers = mergeFollowers(followers1, followers3);

saveJsonFile(path.join(__dirname, '../data/followers.json'), mergedFollowers);

console.log('Followers merged and saved to followers.json');
