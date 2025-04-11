"use client"

import { useState } from "react"
import { PlatformSelector } from "@/components/platform-selector"
import { AccountSelector } from "@/components/account-selector"
import { ChatInterface } from "@/components/chat-interface"
import { CustomerInfo } from "@/components/customer-info"
import { platforms } from "../lib/data"

export function ChatDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0])
  const [selectedAccount, setSelectedAccount] = useState(selectedPlatform.accounts[0])
  const [selectedChat, setSelectedChat] = useState(selectedAccount.chats.length > 0 ? selectedAccount.chats[0] : null)

  const handlePlatformChange = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId)
    if (platform) {
      setSelectedPlatform(platform)
      setSelectedAccount(platform.accounts[0])
      setSelectedChat(platform.accounts[0].chats.length > 0 ? platform.accounts[0].chats[0] : null)
    }
  }

  const handleAccountChange = (accountId: string) => {
    const account = selectedPlatform.accounts.find((a) => a.id === accountId)
    if (account) {
      setSelectedAccount(account)
      setSelectedChat(account.chats.length > 0 ? account.chats[0] : null)
    }
  }

  const handleChatChange = (chatId: string) => {
    const chat = selectedAccount.chats.find((c) => c.id === chatId)
    if (chat) {
      setSelectedChat(chat)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Layer 1: Platforms - Made more compact */}
      <PlatformSelector
        platforms={platforms}
        selectedPlatformId={selectedPlatform.id}
        onSelectPlatform={handlePlatformChange}
      />

      {/* Layer 2: Accounts - Made more compact */}
      <AccountSelector
        accounts={selectedPlatform.accounts}
        selectedAccountId={selectedAccount.id}
        onSelectAccount={handleAccountChange}
      />

      {/* Layer 3: Chat messages and customer info - Enlarged chat area */}
      <div className="flex flex-1 overflow-hidden">
        <ChatInterface chats={selectedAccount.chats} selectedChat={selectedChat} onSelectChat={handleChatChange} />
        {selectedChat && <CustomerInfo customer={selectedChat.customer} />}
      </div>
    </div>
  )
}
