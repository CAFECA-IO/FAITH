import React, { useState, useContext, createContext } from 'react';
import { IMessageModal, dummyMessageModalData } from '@/interfaces/message_modal';
import { ITopic, defaultTopicData } from '@/interfaces/topic';
import { IReportCommentModal, defaultReportCommentModalData } from '@/interfaces/report_modal';
/* eslint-disable-next-line import/no-cycle */
import ChatSettingModal from '@/components/chat_setting_modal/chat_setting_modal';
import MessageModal from '@/components/message_modal/message_modal';
import TopicModal from '@/components/topic_modal/topic_modal';
import ReportCommentModal from '@/components/report_comment_modal/report_comment_modal';

interface IGlobalContext {
  isMessageModalVisible: boolean;
  messageModalVisibilityHandler: () => void;
  messageModalData: IMessageModal;
  messageModalDataHandler: (data: IMessageModal) => void;

  isChatSettingModalVisible: boolean;
  chatSettingModalVisibilityHandler: () => void;

  isTopicModalVisible: boolean;
  topicModalVisibilityHandler: () => void;
  topicModalData: ITopic;
  topicModalDataHandler: (data: ITopic) => void;

  isReportCommentModalVisible: boolean;
  reportCommentModalVisibilityHandler: () => void;
  reportCommentModalData: IReportCommentModal;
  reportCommentModalDataHandler: (data: IReportCommentModal) => void;
}

export interface IGlobalProvider {
  children: React.ReactNode;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: IGlobalProvider) => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalData, setMessageModalData] = useState<IMessageModal>(dummyMessageModalData);

  const [isChatSettingModalVisible, setIsChatSettingModalVisible] = useState(true);

  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);
  const [topicModalData, setTopicModalData] = useState<ITopic>(defaultTopicData);

  const [isReportCommentModalVisible, setIsReportCommentModalVisible] = useState(false);
  const [reportCommentModalData, setReportCommentModalData] = useState<IReportCommentModal>(
    defaultReportCommentModalData
  );

  const messageModalVisibilityHandler = () => {
    setIsMessageModalVisible(!isMessageModalVisible);
  };

  const messageModalDataHandler = (data: IMessageModal) => {
    setMessageModalData(data);
  };

  const chatSettingModalVisibilityHandler = () => {
    setIsChatSettingModalVisible(!isChatSettingModalVisible);
  };

  const topicModalVisibilityHandler = () => {
    setIsTopicModalVisible(!isTopicModalVisible);
  };

  const topicModalDataHandler = (data: ITopic) => {
    setTopicModalData(data);
  };

  const reportCommentModalVisibilityHandler = () => {
    setIsReportCommentModalVisible(!isReportCommentModalVisible);
  };

  const reportCommentModalDataHandler = (data: IReportCommentModal) => {
    setReportCommentModalData(data);
  };

  /* eslint-disable react/jsx-no-constructed-context-values */
  const value = {
    isMessageModalVisible,
    messageModalVisibilityHandler,
    messageModalData,
    messageModalDataHandler,
    isChatSettingModalVisible,
    chatSettingModalVisibilityHandler,
    isTopicModalVisible,
    topicModalVisibilityHandler,
    topicModalData,
    topicModalDataHandler,
    isReportCommentModalVisible,
    reportCommentModalVisibilityHandler,
    reportCommentModalData,
    reportCommentModalDataHandler,
  };

  return (
    <GlobalContext.Provider value={value}>
      <MessageModal
        isModalVisible={isMessageModalVisible}
        modalVisibilityHandler={messageModalVisibilityHandler}
        messageModalData={messageModalData}
      />

      <ChatSettingModal
        isModalVisible={isChatSettingModalVisible}
        modalVisibilityHandler={chatSettingModalVisibilityHandler}
      />

      <TopicModal
        isModalVisible={isTopicModalVisible}
        modalVisibilityHandler={topicModalVisibilityHandler}
        topicData={topicModalData}
      />
      <ReportCommentModal
        isModalVisible={isReportCommentModalVisible}
        modalVisibilityHandler={reportCommentModalVisibilityHandler}
        reportCommentData={reportCommentModalData}
      />
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalCtx = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
