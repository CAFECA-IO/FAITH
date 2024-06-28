import React, { useState, useContext, createContext } from 'react';
import { IMessageModal, dummyMessageModalData } from '@/interfaces/message_modal';
import { ITopic, defaultTopicData } from '@/interfaces/topic';
/* eslint-disable-next-line import/no-cycle */
import ChatSettingModal from '@/components/chat_setting_modal/chat_setting_modal';
import MessageModal from '@/components/message_modal/message_modal';
import TopicModal from '@/components/topic_modal/topic_modal';
import RegisterFormModal from '@/components/register_form_modal/register_form_modal';

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

  isRegisterModalVisible: boolean;
  registerModalVisibilityHandler: () => void;
}

export interface IGlobalProvider {
  children: React.ReactNode;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: IGlobalProvider) => {
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageModalData, setMessageModalData] = useState<IMessageModal>(dummyMessageModalData);

  const [isChatSettingModalVisible, setIsChatSettingModalVisible] = useState(false);

  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);
  const [topicModalData, setTopicModalData] = useState<ITopic>(defaultTopicData);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

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

  const registerModalVisibilityHandler = () => {
    setIsRegisterModalVisible(!isRegisterModalVisible);
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
    isRegisterModalVisible,
    registerModalVisibilityHandler,
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

      <RegisterFormModal
        isModalVisible={isRegisterModalVisible}
        modalVisibilityHandler={registerModalVisibilityHandler}
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
