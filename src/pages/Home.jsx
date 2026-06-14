import React, { useState, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ChatSection from '../components/sections/ChatSection';
import ForumSection from '../components/sections/ForumSection';
import Footer from '../components/sections/Footer';
import Player from '../components/radio/Player';
import ForumPopup from '../components/forum/ForumPopup';
import ForumSidebar from '../components/forum/ForumSidebar';

export default function Home() {
  const [forumOpen, setForumOpen] = useState(false);
  const [forumUrl, setForumUrl] = useState(null);

  const openForum = useCallback((url = null) => {
    setForumUrl(url);
    setForumOpen(true);
  }, []);

  const closeForum = useCallback(() => {
    setForumOpen(false);
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-x-hidden pb-[90px] lg:pb-[90px]">
        <Navbar onOpenForum={() => openForum()} />
        <Hero />
        <ChatSection />
        <ForumSection onOpenPopup={() => openForum()} />
        <Footer />
        <Player />
        <ForumSidebar onOpenForum={openForum} />
      </div>
      <ForumPopup isOpen={forumOpen} onClose={closeForum} url={forumUrl} />
    </>
  );
}