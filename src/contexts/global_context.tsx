import React, { useState, useContext, createContext, useCallback } from 'react';
import Image from 'next/image';
import { toast as toastify } from 'react-toastify';
import { IMessageModal, dummyMessageModalData } from '@/interfaces/message_modal';
import { ITopic, defaultTopicData } from '@/interfaces/topic';
import { IReportCommentModal, defaultReportCommentModalData } from '@/interfaces/report_modal';
import { IToastify, ToastType, ToastPosition } from '@/interfaces/toastify';
/* eslint-disable-next-line import/no-cycle */
import ChatSettingModal from '@/components/chat_setting_modal/chat_setting_modal';
import MessageModal from '@/components/message_modal/message_modal';
/* eslint-disable-next-line import/no-cycle */
import TopicModal from '@/components/topic_modal/topic_modal';
import ReportCommentModal from '@/components/report_comment_modal/report_comment_modal';
import RegisterFormModal from '@/components/register_form_modal/register_form_modal';
import FileUploadModal from '@/components/file_upload_modal/file_upload_modal';
import Toast from '@/components/toast/toast';

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

  isRegisterModalVisible: boolean;
  registerModalVisibilityHandler: () => void;

  isFileUploadModalVisible: boolean;
  fileUploadModalVisibilityHandler: () => void;

  toastHandler: (props: IToastify) => void;
  eliminateToast: (id?: string) => void;
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

  const [isReportCommentModalVisible, setIsReportCommentModalVisible] = useState(false);
  const [reportCommentModalData, setReportCommentModalData] = useState<IReportCommentModal>(
    defaultReportCommentModalData
  );

  const [isFileUploadModalVisible, setIsFileUploadModalVisible] = useState(false);

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
  const registerModalVisibilityHandler = () => {
    setIsRegisterModalVisible(!isRegisterModalVisible);
  };

  const fileUploadModalVisibilityHandler = () => {
    setIsFileUploadModalVisible(!isFileUploadModalVisible);
  };

  // Info: (20240509 - Julian) toast handler
  const toastHandler = useCallback((props: IToastify) => {
    const {
      id,
      type,
      content,
      closeable,
      autoClose: isAutoClose,
      position: toastPosition,
      onClose = () => {},
      onOpen = () => {},
    } = props;

    const bodyStyle =
      'before:absolute before:h-100vh before:w-5px before:top-0 before:left-0 md:w-400px w-100vw md:scale-100 scale-75 text-sm font-barlow pointer-events-auto';

    const toastId = id;
    const position = toastPosition ?? ToastPosition.TOP_CENTER; // Info:(20240513 - Julian) default position 'top-center'

    // Info:(20240513 - Julian) 如果 closeable 為 false，則 autoClose、closeOnClick、draggable 都會被設為 false
    const autoClose = closeable ? isAutoClose ?? 5000 : false; // Info:(20240513 - Julian) default autoClose 5000ms

    const closeOnClick = closeable; // Info:(20240513 - Julian) default closeOnClick true
    const draggable = closeable; // Info:(20240513 - Julian) default draggable true
    const closeButton = closeable;
    // ? () => (
    //     <div className="h-20px w-20px">
    //       <RxCross2 size={16} className="text-secondaryBlue" />
    //     </div>
    //   )
    // : false;

    switch (type) {
      case ToastType.SUCCESS:
        toastify.success(content, {
          icon: <Image src="/icons/success.svg" alt="success" width={24} height={24} />,
          className: `${bodyStyle} before:bg-alert-surface-surface-success`,
          toastId,
          position,
          autoClose,
          closeOnClick,
          draggable,
          closeButton,
          onClose,
          onOpen,
        });
        break;
      case ToastType.ERROR:
        toastify.error(content, {
          icon: <Image src="/icons/error.svg" alt="error" width={24} height={24} />,
          className: `${bodyStyle} before:bg-alert-surface-surface-error`,
          toastId,
          position,
          autoClose,
          closeOnClick,
          draggable,
          closeButton,
          onClose,
          onOpen,
        });
        break;
      case ToastType.WARNING:
        toastify.warning(content, {
          icon: <Image src="/icons/warning.svg" alt="warning" width={24} height={24} />,
          className: `${bodyStyle} before:bg-warningYellow`,
          toastId,
          position,
          autoClose,
          closeOnClick,
          draggable,
          closeButton,
          onClose,
          onOpen,
        });
        break;
      case ToastType.INFO:
        toastify.info(content, {
          icon: <Image src="/icons/info.svg" alt="info" width={24} height={24} />,
          className: `${bodyStyle} before:bg-navyBlue2`,
          toastId,
          position,
          autoClose,
          closeOnClick,
          draggable,
          closeButton,
          onClose,
          onOpen,
        });
        break;
      default:
        toastify(content);
        break;
    }
  }, []);

  const eliminateToast = (id?: string) => {
    if (id) {
      toastify.dismiss(id);
    } else {
      toastify.dismiss(); // Info:(20240513 - Julian) dismiss all toasts
    }
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
    isRegisterModalVisible,
    registerModalVisibilityHandler,
    isFileUploadModalVisible,
    fileUploadModalVisibilityHandler,
    toastHandler,
    eliminateToast,
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

      <RegisterFormModal
        isModalVisible={isRegisterModalVisible}
        modalVisibilityHandler={registerModalVisibilityHandler}
      />

      <FileUploadModal
        isModalVisible={isFileUploadModalVisible}
        modalVisibilityHandler={fileUploadModalVisibilityHandler}
      />

      <Toast />

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
