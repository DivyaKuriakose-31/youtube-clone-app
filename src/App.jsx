import React from 'react';
import { 
  Menu, Search, Bell, Video, User, 
  Home, Compass, PlaySquare, Clock, ThumbsUp 
} from 'lucide-react'; // Install lucide-react or use your own icons

export default function YouTubeClone() {
  // Mock data to simulate YouTube video cards
  const videos = Array(12).fill({
    title: "Building a Responsive YouTube Clone with React & Tailwind CSS",
    channel: "CodeCraft Academy",
    views: "125K views",
    timestamp: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans antialiased">
      
      {/* 1. FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#272727] rounded-full hidden md:block">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            {/* YouTube Logo Emblem */}
            <div className="bg-red-600 px-2 py-1 rounded-lg font-bold text-xs tracking-tighter">TV</div>
            <span className="font-bold text-xl tracking-tighter hidden sm:block">YouTube</span>
          </div>
        </div>

        {/* Middle Section (Responsive Search Bar) */}
        <div className="flex flex-1 max-w-[600px] mx-4 items-center">
          <div className="flex w-full bg-[#121212] border border-[#303030] rounded-l-full px-4 py-1.5 focus-within:border-blue-500">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            />
          </div>
          <button className="bg-[#222222] border-y border-r border-[#303030] rounded-r-full px-6 py-1.5 hover:bg-[#272727]">
            <Search className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 hover:bg-[#272727] rounded-full hidden sm:block">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full hidden sm:block">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-[#272727] rounded-full">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
              D
            </div>
          </button>
        </div>
      </header>

      <div className="flex pt-14">
        
        {/* 2. RESPONSIVE SIDEBAR */}
        {/* Hidden on mobile, narrow on tablet (md), wide on desktop (lg) */}
        <aside className="hidden md:flex flex-col fixed left-0 top-14 h-[calc(100vh-56px)] bg-[#0f0f0f] z-40
          w-16 lg:w-60 px-2 py-3 overflow-y-auto border-r border-transparent hover:border-[#272727] transition-all">
          
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" active />
          <SidebarItem icon={<Compass className="w-5 h-5" />} label="Explore" />
          <SidebarItem icon={<PlaySquare className="w-5 h-5" />} label="Subscriptions" />
          
          <hr className="border-[#272727] my-3 hidden lg:block" />
          
          <div className="hidden lg:block">
            <SidebarItem icon={<Clock className="w-5 h-5" />} label="History" />
            <SidebarItem icon={<ThumbsUp className="w-5 h-5" />} label="Liked Videos" />
          </div>
        </aside>

        {/* 3. MAIN CONTENT CONTAINER */}
        {/* Adjusts margins dynamically based on the sidebar's responsive footprint */}
        <main className="flex-1 min-h-[calc(100vh-56px)] ml-0 md:ml-16 lg:ml-60 p-4 transition-all">
          
          {/* Categories/Tags Bar */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-none">
            {["All", "React", "Tailwind CSS", "JavaScript", "Live", "Music", "Gaming", "Podcasts"].map((tag, i) => (
              <span 
                key={i} 
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition-colors
                  ${i === 0 ? 'bg-white text-black' : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* RESPONSIVE VIDEO GRID */}
          {/* 1 col on mobile, 2 on tablet, 3 on small laptops, 4 on wide monitors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {videos.map((video, index) => (
              <div key={index} className="flex flex-col gap-2 cursor-pointer group">
                
                {/* 16:9 Aspect Ratio Thumbnail Container */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#272727] relative">
                  <img 
                    src={video.thumbnail} 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-medium">
                    12:45
                  </span>
                </div>

                {/* Video Details */}
                <div className="flex gap-3 pt-1">
                  <img 
                    src={video.avatar} 
                    alt="Channel Avatar" 
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm text-[#f1f1f1] line-clamp-2 leading-5 group-hover:text-white">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#aaa] mt-1 hover:text-white transition-colors">
                      {video.channel}
                    </p>
                    <div className="text-xs text-[#aaa] flex items-center gap-1.5 mt-0.5">
                      <span>{video.views}</span>
                      <span>•</span>
                      <span>{video.timestamp}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>

    </div>
  );
}

// Reusable Helper Component for Sidebar Items
function SidebarItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-5 w-full py-3 lg:py-2.5 px-1 lg:px-4 rounded-xl cursor-pointer transition-colors
      ${active ? 'bg-[#272727] font-medium' : 'hover:bg-[#272727]/60'}`}>
      {icon}
      <span className="text-[10px] lg:text-sm tracking-tight lg:tracking-normal mt-1 lg:mt-0">
        {label}
      </span>
    </div>
  );
}