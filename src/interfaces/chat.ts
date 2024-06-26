export interface IFolder {
  id: string;
  name: string;
  chats: IAbbreviatedChat[];
}

export interface IAbbreviatedChat {
  id: string;
  title: string;
  description: string;
  createdAt: number;
}

export enum MessageRole {
  USER = 'user',
  BOT = 'bot',
  ANONYMOUS_USER = 'anonymous user',
}

export interface IMessage {
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface IChat extends IAbbreviatedChat {
  messages: IMessage[];
}

// 虛擬數據
export const dummyFolder: IFolder = {
  id: 'folder1',
  name: '我的聊天',
  chats: [
    {
      id: 'chat1',
      title: '與AI討論程式設計',
      description: '關於JavaScript的對話',
      createdAt: Date.now() - 86400000, // 昨天
    },
    {
      id: 'chat2',
      title: '數學問題求解',
      description: '討論微積分概念',
      createdAt: Date.now() - 3600000, // 一小時前
    },
  ],
};

export const dummyAbbreviatedChat: IAbbreviatedChat = {
  id: 'chat3',
  title: '探討人工智能的未來',
  description: 'AI發展趨勢分析',
  createdAt: Date.now(),
};

export const dummyMessage: IMessage = {
  role: MessageRole.USER,
  content: '你能解釋一下什麼是遞迴函數嗎？',
  createdAt: Date.now(),
};

export const dummyMessageList: IMessage[] = [
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '你能解釋一下什麼是遞迴函數嗎？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content: '遞迴函數是將函數的結果作為新函數的輸入，並且在遞迴函數內呼叫自身的函數。',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '可以舉個例子嗎？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content: '例如，計算階乘的遞迴函數如下：',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '```python\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)\n```',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '這個函數是如何工作的？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '這個函數通過以下步驟計算階乘：\n1. 如果 n 是 0 或 1，直接返回 1。\n2. 否則，返回 n 乘以 (n-1) 的階乘。\n3. 函數會不斷調用自己，直到達到基本情況（n=0 或 n=1）。',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '遞迴函數有什麼優缺點？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '遞迴函數的優點：\n1. 代碼簡潔易讀\n2. 適合解決具有遞迴性質的問題\n\n缺點：\n1. 可能導致堆棧溢出\n2. 對於大型輸入可能效率較低\n3. 調試可能較為困難',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '還有其他常見的遞迴函數例子嗎？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '當然，以下是一些常見的遞迴函數例子：\n1. 斐波那契數列\n2. 二分搜索\n3. 樹的遍歷（前序、中序、後序）\n4. 漢諾塔問題\n5. 快速排序算法',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '能詳細解釋一下斐波那契數列的遞迴實現嗎？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '當然，這是斐波那契數列的遞迴實現：\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n```\n這個函數計算第 n 個斐波那契數。它的工作原理是：\n1. 如果 n <= 1，直接返回 n\n2. 否則，返回前兩個斐波那契數的和',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '遞迴和迭代有什麼區別？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '遞迴和迭代的主要區別：\n1. 實現方式：遞迴通過函數調用自身，迭代使用循環結構\n2. 內存使用：遞迴可能使用更多的堆棧空間，迭代通常更節省內存\n3. 可讀性：某些問題下，遞迴可能更易理解；其他情況下，迭代可能更直觀\n4. 性能：對於某些問題，遞迴可能導致重複計算，而迭代通常更高效\n5. 終止條件：遞迴需要基本情況來終止，迭代使用循環條件控制',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.ANONYMOUS_USER,
    content: '如何避免遞迴導致的堆棧溢出？',
    createdAt: Date.now(),
  },
  {
    role: MessageRole.BOT,
    content:
      '避免遞迴導致的堆棧溢出的方法：\n1. 使用尾遞迴優化（如果編程語言支持）\n2. 將遞迴轉換為迭代\n3. 使用記憶化（memoization）來避免重複計算\n4. 限制遞迴深度\n5. 使用蹦床函數（trampoline function）\n6. 考慮使用堆而不是堆棧來管理函數調用',
    createdAt: Date.now(),
  },
];

export const dummyChat: IChat = {
  id: 'chat4',
  title: '程式設計基礎',
  description: '學習編程概念',
  createdAt: Date.now() - 172800000, // 兩天前
  messages: [
    {
      role: MessageRole.USER,
      content: '什麼是變數？',
      createdAt: Date.now() - 172700000,
    },
    {
      role: MessageRole.BOT,
      content: '變數是用來儲存數據的容器...',
      createdAt: Date.now() - 172600000,
    },
    {
      role: MessageRole.ANONYMOUS_USER,
      content: '可以舉個例子嗎？',
      createdAt: Date.now() - 172500000,
    },
  ],
};
