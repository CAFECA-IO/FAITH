import { TopicCategory } from '@/constants/topic';
import { IComment } from '@/interfaces/comment';

export interface ITopicBrief {
  id: string;
  title: string;
  imageId: string;
  creator: string;
  category: TopicCategory[];
  summary: string;
}

export interface ITopic extends ITopicBrief {
  mainQuestion: string;
  bestAnswers: {
    answer: string;
    countOfLikes: number;
    countOfDislikes: number;
  };
  comments: IComment[];
}

export const defaultTopicData: ITopic = {
  id: '',
  title: '',
  imageId: '',
  creator: '',
  category: [],
  summary: '',
  mainQuestion: '',
  bestAnswers: {
    answer: '',
    countOfLikes: 0,
    countOfDislikes: 0,
  },
  comments: [],
};

export const dummyTopicList: ITopic[] = [
  {
    id: '1',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'What is the best way to invest in the stock market?',
    bestAnswers: {
      answer: 'Invest in a diversified portfolio of low-cost index funds.',
      countOfLikes: 10,
      countOfDislikes: 0,
    },
    comments: [
      {
        id: '1-1',
        userName: 'Jane',
        userAvatar: '/icons/info.svg',
        comment: 'I agree with this answer.',
        countOfLikes: 1,
        countOfDislikes: 0,
        createTimestamp: 1624825200,
      },
    ],
  },
  {
    id: '2',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.OTHER, TopicCategory.TRENDING],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'I want to create a landing page',
    bestAnswers: {
      answer: `Great! Let's get started.\nFirst, can you tell me what your landing page is about? A good description will explain what your campaign aims to do, such as offering a discount or raising awareness.`,
      countOfLikes: 5,
      countOfDislikes: 1,
    },
    comments: [],
  },
  {
    id: '3',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING, TopicCategory.OTHER],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'How much money should I save for retirement?',
    bestAnswers: {
      answer:
        'Save at least 15% of your income for retirement.\nDue to inflation, you may need more than you think. Consult a financial advisor for a personalized plan.',
      countOfLikes: 37,
      countOfDislikes: 5,
    },
    comments: [
      {
        id: '3-1',
        userName: 'Sara',
        userAvatar: '/icons/info.svg',
        comment: 'I disagree with this answer.',
        countOfLikes: 0,
        countOfDislikes: 1,
        createTimestamp: 1628257200,
      },
      {
        id: '3-2',
        userName: 'Alice',
        userAvatar: '/icons/info.svg',
        comment: 'Seems like a good answer.',
        countOfLikes: 0,
        countOfDislikes: 0,
        createTimestamp: 1649237041,
      },
    ],
  },
  {
    id: '4',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.FINANCIAL_INSIGHTS, TopicCategory.TRENDING],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'What is the best way to invest in the stock market?',
    bestAnswers: {
      answer:
        'Invest in a diversified portfolio of low-cost index funds. This is the best way to invest in the stock market. You can also consider investing in individual stocks if you have the time and expertise to research and pick winning stocks.',
      countOfLikes: 120,
      countOfDislikes: 10,
    },
    comments: [
      {
        id: '4-1',
        userName: 'Chris',
        userAvatar: '/icons/info.svg',
        comment:
          'What? This is not the best way to invest in the stock market. You should invest in individual stocks to maximize your returns. Index funds are for people who are too lazy to do their own research.',
        countOfLikes: 3,
        countOfDislikes: 2,
        createTimestamp: 1653418252,
      },
    ],
  },
  {
    id: '5',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.AI_FINANCE, TopicCategory.TRENDING],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'The future of AI in finance',
    bestAnswers: {
      answer:
        'The future of AI in finance is bright. AI is already being used to automate trading, detect fraud, and improve customer service. In the future, AI will be used to make better investment decisions, predict market trends, and personalize financial advice.',
      countOfLikes: 50,
      countOfDislikes: 5,
    },
    comments: [
      {
        id: '5-1',
        userName: 'Vicky',
        userAvatar: '/icons/info.svg',
        comment: 'I agree. AI will revolutionize the finance industry.',
        countOfLikes: 5,
        countOfDislikes: 1,
        createTimestamp: 1697041093,
      },
      {
        id: '5-2',
        userName: 'David',
        userAvatar: '/icons/info.svg',
        comment:
          'You must be kidding. AI will never replace human traders. AI is just a tool to help traders make better decisions.',
        countOfLikes: 1,
        countOfDislikes: 2,
        createTimestamp: 1661901238,
      },
    ],
  },
  {
    id: '6',
    title: 'WorldMap',
    imageId: '/icons/info.svg',
    creator: 'John',
    category: [TopicCategory.AI_FINANCE, TopicCategory.TRENDING],
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainQuestion: 'How to use AI to predict stock prices',
    bestAnswers: {
      answer:
        'To use AI to predict stock prices, you need to collect historical stock data, clean and preprocess the data, build a machine learning model, and train the model on the data. You can use regression models, neural networks, or other machine learning algorithms to predict stock prices.',
      countOfLikes: 30,
      countOfDislikes: 2,
    },
    comments: [],
  },
];
