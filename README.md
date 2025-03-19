# Sports Social Media Platform

A modern social media platform for sports enthusiasts built with Next.js and TailwindCSS. Connect with other sports fans, follow your favorite teams, and stay updated on the latest sports news and events.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with a focus on user experience
- Real-time updates for live scores and events
- Social features including posts, likes, and comments
- Trending topics and suggested users to follow
- Upcoming events calendar
- Three-column layout with navigation, feed, and friends sidebar
- User profiles with posts, photos, and videos tabs

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Hooks
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sports-social-platform.git
cd sports-social-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
sports-social-platform/
├── app/                  # Next.js app directory
│   ├── components/       # React components
│   │   ├── CreatePostCard.tsx  # Component for creating new posts
│   │   ├── Feed.tsx            # Main feed component
│   │   ├── Header.tsx          # Top navigation header
│   │   ├── Layout.tsx          # Main layout with sidebars
│   │   ├── LeftSidebar.tsx     # Navigation sidebar
│   │   ├── PostCard.tsx        # Individual post component
│   │   └── RightSidebar.tsx    # Friends and contacts sidebar
│   ├── profile/          # Profile page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── public/               # Static assets
│   ├── avatars/          # User avatars
│   ├── events/           # Event images
│   └── posts/            # Post images
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Components

### Layout Components

- **Layout**: Main layout component that includes Header, LeftSidebar, content area, and RightSidebar
- **Header**: Top navigation bar with logo, search, and user menu
- **LeftSidebar**: Navigation sidebar with menu items and shortcuts
- **RightSidebar**: Friends sidebar showing friend requests and online friends

### Content Components

- **Feed**: Main feed component that displays posts
- **PostCard**: Individual post component with author info, content, images, and interaction buttons
- **CreatePostCard**: Component for creating new posts with text and media options
- **Profile Page**: User profile page with cover photo, profile info, and posts

## Placeholder Images

This project uses placeholder images for demonstration purposes. In a production environment, you would replace these with real images from your database or a CDN.

The components include fallback images that display when the primary image fails to load.

## Responsive Design

The layout is fully responsive:
- On mobile: Only the main content is shown
- On tablets: Left sidebar and main content are shown
- On desktop: All three columns (left sidebar, main content, right sidebar) are shown

## Deployment

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
