'use client';

import { useFarcasterSDK } from "@/hooks/use-farcaster";
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect, 
  Avatar, 
  Name, 
  Identity,
  Address,
  EthBalance
} from '@coinbase/onchainkit/wallet';
import { motion } from "motion/react";
import { Plus, MessageSquare, Repeat2, Heart, Share, ShieldCheck } from "lucide-react";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    id: 1,
    author: "jesse.base.eth",
    avatar: "https://picsum.photos/seed/jesse/100/100",
    content: "Welcome to the Base Social Mini! Built with OnchainKit and Farcaster SDK.",
    timestamp: "2h ago",
    likes: 42,
    recasts: 12,
    replies: 5
  },
  {
    id: 2,
    author: "vitalik.eth",
    avatar: "https://picsum.photos/seed/vitalik/100/100",
    content: "The future is onchain. Mini apps are the next frontier for decentralized social.",
    timestamp: "5h ago",
    likes: 128,
    recasts: 45,
    replies: 18
  },
  {
    id: 3,
    author: "brian.base.eth",
    avatar: "https://picsum.photos/seed/brian/100/100",
    content: "Building on Base is faster and cheaper. Let's get more people onchain! 🔵",
    timestamp: "8h ago",
    likes: 89,
    recasts: 23,
    replies: 9
  }
];

export default function Home() {
  const { isReady, context } = useFarcasterSDK();
  const [newCast, setNewCast] = useState("");

  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-bold tracking-tight text-xl">Base Social</h1>
        </div>
        
        <Wallet>
          <ConnectWallet className="rounded-full bg-primary hover:bg-primary/90">
            <Avatar className="h-7 w-7" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Welcome Card */}
        {context?.user && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary text-white p-6 rounded-3xl shadow-lg relative overflow-hidden"
          >
             <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-1">Hello, {context.user.displayName}!</h2>
              <p className="text-white/80">You're logged in with Farcaster on Base.</p>
             </div>
             <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        )}

        {/* Composer */}
        <section className="bg-white p-4 rounded-3xl border shadow-sm space-y-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden">
               <img src={context?.user?.pfpUrl || "https://picsum.photos/seed/user/100/100"} alt="Avatar" className="h-full w-full object-cover" />
            </div>
            <textarea 
              value={newCast}
              onChange={(e) => setNewCast(e.target.value)}
              placeholder="What's happening onchain?"
              className="w-full resize-none border-none py-2 focus:ring-0 text-lg placeholder:text-gray-400"
              rows={2}
            />
          </div>
          <div className="flex justify-end border-t pt-3">
             <button 
               disabled={!newCast}
               className="rounded-full bg-primary px-6 py-2 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
             >
               <Plus className="h-4 w-4" />
               Cast
             </button>
          </div>
        </section>

        {/* Feed */}
        <section className="space-y-4">
          {SAMPLE_POSTS.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-3xl border shadow-sm space-y-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100 overflow-hidden">
                    <img src={post.avatar} alt={post.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{post.author}</h3>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{post.timestamp}</p>
                  </div>
                </div>
                <div className="p-2 text-gray-400 hover:text-primary cursor-pointer">
                   <Share className="h-4 w-4" />
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.content}
              </p>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-gray-500">
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.replies}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                  <Repeat2 className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.recasts}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <div className="w-4" />
              </div>
            </motion.article>
          ))}
        </section>
      </div>

      {/* Floating Action Menu (Mobile Style) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border shadow-2xl z-50">
         <div className="p-1 text-primary cursor-pointer"><ShieldCheck className="h-6 w-6" /></div>
         <div className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors"><MessageSquare className="h-6 w-6" /></div>
         <div className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors"><Heart className="h-6 w-6" /></div>
         <div className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors"><Avatar className="h-7 w-7" /></div>
      </nav>
    </main>
  );
}
