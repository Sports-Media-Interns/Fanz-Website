"use client";

import PostCard from './PostCard';
import CreatePostCard from './CreatePostCard';

// Define the post type to match PostCardProps
interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  time: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
}

// Sample data for posts
const posts: Post[] = [
  {
    id: 1,
    author: {
      name: 'NBA Official',
      avatar: '/avatars/nba.jpg',
      verified: true
    },
    time: '2h',
    content: 'BREAKING: The Los Angeles Lakers have advanced to the Western Conference Finals! LeBron James with a triple-double: 30 points, 11 rebounds, 11 assists. 🏀🔥',
    images: [
      '/posts/lakers-game.jpg'
    ],
    likes: 15243,
    comments: 1832,
    shares: 4231
  },
  {
    id: 2,
    author: {
      name: 'Premier League',
      avatar: '/avatars/premier-league.jpg',
      verified: true
    },
    time: '5h',
    content: 'Manchester City clinches the Premier League title for the fourth consecutive season! Congratulations to Pep Guardiola and his squad on this historic achievement. ⚽🏆',
    images: [
      '/posts/man-city-celebration.jpg',
      '/posts/guardiola.jpg',
      '/posts/premier-trophy.jpg'
    ],
    likes: 24892,
    comments: 3521,
    shares: 7845
  },
  {
    id: 3,
    author: {
      name: 'Serena Williams',
      avatar: '/avatars/serena.jpg',
      verified: true
    },
    time: '1d',
    content: 'Training session complete! Getting ready for the upcoming tournament. Always pushing to be better. 💪 #Tennis #Dedication',
    images: [
      '/posts/tennis-court.jpg'
    ],
    likes: 45678,
    comments: 2341,
    shares: 1298
  },
  {
    id: 4,
    author: {
      name: 'NFL Network',
      avatar: '/avatars/nfl.jpg',
      verified: true
    },
    time: '3h',
    content: 'BREAKING: Kansas City Chiefs win the Super Bowl! Patrick Mahomes named MVP with an incredible performance: 3 touchdowns and 380 passing yards. What a game! 🏈🏆',
    images: [
      '/posts/super-bowl.jpg'
    ],
    likes: 35421,
    comments: 8723,
    shares: 12456
  },
  {
    id: 5,
    author: {
      name: 'Lewis Hamilton',
      avatar: '/avatars/hamilton.jpg',
      verified: true
    },
    time: '12h',
    content: 'P1 in qualifying! The car feels amazing this weekend. Looking forward to tomorrow\'s race. Thank you to everyone at the factory for their hard work. Let\'s go! 🏎️ #F1 #TeamLH',
    images: [
      '/posts/f1-car.jpg'
    ],
    likes: 125789,
    comments: 8432,
    shares: 3211
  }
];

export default function Feed() {
  return (
    <div className="max-w-2xl mx-auto">
      <CreatePostCard />
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 