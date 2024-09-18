'use client';

import ChatPageBody from "@/components/chat_page_body/chat_page_body";
import ChatSidebar from "@/components/chat_sidebar/chat_sidebar";
import { useState } from "react";

/*
 * Info: (20240916 - Murky)
 * This is a Client Component (same as components in the `pages` directory)
 * It receives data as props, has access to state and effects, and is
 * pre-rendered on the server during the initial page load.
 */
export default function HomePage() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const getIsExpanded = (props: boolean) => {
        setIsSidebarExpanded(props);
    };

    return (

        <div className="bg-white">
            <ChatSidebar getIsExpanded={getIsExpanded} />
            <div
                className={`flex h-screen flex-col justify-end transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'lg:ml-240px' : ''}`}
            >
                <ChatPageBody isSidebarExpanded={isSidebarExpanded} />
            </div>
        </div>
    );
}
