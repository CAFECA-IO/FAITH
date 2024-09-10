import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/button/button';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

interface IUpdateLinkModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const UpdateLinkModal = ({ isModalVisible, modalVisibilityHandler }: IUpdateLinkModalProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');
  // ToDo: (20240703 - Julian) Replace this with actual data
  const sharedDomain = 'http://faith.com/share';
  const oldShareId: string | null = '1234567890';
  const isFirstShare = !oldShareId;
  const oldLink = isFirstShare ? '' : `${sharedDomain}/${oldShareId}`;
  const newSharedId = '0987654321';

  const [currentLink, setCurrentLink] = useState<string>(oldLink);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const updateLinkHandler = () => {
    setIsLoading(true);
    // Info: (20240703 - Julian) wait for 2 seconds to simulate the update process
    setTimeout(() => {
      setCurrentLink(`${sharedDomain}/${newSharedId}`);
      setIsLoading(false);
      setIsUpdated(true);
    }, 2000);
  };

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(currentLink);
  };

  useEffect(() => {
    if (isModalVisible) {
      setIsUpdated(false);
      setIsLoading(false);
    }
  }, [isModalVisible]);

  const mainTitle = isFirstShare ? t('CHAT.SHARE_LINK_TITLE') : t('CHAT.UPDATE_LINK_TITLE');
  const buttonText = isFirstShare ? t('CHAT.CREATE_LINK_BTN') : t('CHAT.UPDATE_LINK_BTN');
  const descriptionText = isFirstShare
    ? t('CHAT.SHARE_LINK_DESCRIPTION')
    : t('CHAT.UPDATE_LINK_DESCRIPTION');

  const displayedUpdatedHint = isUpdated ? (
    <p className="text-xs font-semibold text-text-state-success">{t('CHAT.UPDATE_LINK_HINT')}</p>
  ) : null;

  const displayedButton = isLoading ? (
    // Info: (20240703 - Julian) Loading
    <div className="flex cursor-wait items-center gap-x-2 rounded-xs bg-button-surface-strong-secondary px-6 py-8px text-sm font-medium text-button-text-invert">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00224 0.584473C8.41645 0.584473 8.75224 0.920259 8.75224 1.33447V4.00114C8.75224 4.41535 8.41645 4.75114 8.00224 4.75114C7.58802 4.75114 7.25224 4.41535 7.25224 4.00114V1.33447C7.25224 0.920259 7.58802 0.584473 8.00224 0.584473ZM13.2515 2.8041C13.5444 3.097 13.5444 3.57187 13.2515 3.86476L11.3659 5.75038C11.073 6.04328 10.5981 6.04328 10.3052 5.75038C10.0123 5.45749 10.0123 4.98262 10.3052 4.68972L12.1909 2.8041C12.4838 2.51121 12.9586 2.51121 13.2515 2.8041ZM2.75296 2.8041C3.04585 2.51121 3.52072 2.51121 3.81362 2.8041L5.69923 4.68972C5.99213 4.98262 5.99213 5.45749 5.69923 5.75038C5.40634 6.04328 4.93147 6.04328 4.63857 5.75038L2.75296 3.86476C2.46006 3.57187 2.46006 3.097 2.75296 2.8041ZM0.585571 8.00114C0.585571 7.58693 0.921358 7.25114 1.33557 7.25114H4.00224C4.41645 7.25114 4.75224 7.58693 4.75224 8.00114C4.75224 8.41535 4.41645 8.75114 4.00224 8.75114H1.33557C0.921358 8.75114 0.585571 8.41535 0.585571 8.00114ZM11.2522 8.00114C11.2522 7.58693 11.588 7.25114 12.0022 7.25114H14.6689C15.0831 7.25114 15.4189 7.58693 15.4189 8.00114C15.4189 8.41535 15.0831 8.75114 14.6689 8.75114H12.0022C11.588 8.75114 11.2522 8.41535 11.2522 8.00114ZM5.69923 10.3041C5.99213 10.597 5.99213 11.0719 5.69923 11.3648L3.81362 13.2504C3.52072 13.5433 3.04585 13.5433 2.75296 13.2504C2.46006 12.9575 2.46006 12.4827 2.75296 12.1898L4.63857 10.3041C4.93147 10.0112 5.40634 10.0112 5.69923 10.3041ZM10.3052 10.3041C10.5981 10.0112 11.073 10.0112 11.3659 10.3041L13.2515 12.1898C13.5444 12.4827 13.5444 12.9575 13.2515 13.2504C12.9586 13.5433 12.4838 13.5433 12.1909 13.2504L10.3052 11.3648C10.0123 11.0719 10.0123 10.597 10.3052 10.3041ZM8.00224 11.2511C8.41645 11.2511 8.75224 11.5869 8.75224 12.0011V14.6678C8.75224 15.082 8.41645 15.4178 8.00224 15.4178C7.58802 15.4178 7.25224 15.082 7.25224 14.6678V12.0011C7.25224 11.5869 7.58802 11.2511 8.00224 11.2511Z"
          fill="#FCFDFF"
        />
      </svg>

      <p>{t('COMMON.LOADING')}</p>
    </div>
  ) : isUpdated ? (
    <Button
      id="update-chat-link-button"
      type="button"
      variant="tertiary"
      className="py-8px text-sm"
      onClick={copyLinkHandler}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4259 2.78482C11.0189 2.75156 10.4946 2.75098 9.73553 2.75098H5.0022C4.58799 2.75098 4.2522 2.41519 4.2522 2.00098C4.2522 1.58676 4.58799 1.25098 5.0022 1.25098H9.73553L9.76721 1.25098C10.4871 1.25097 11.0727 1.25096 11.5481 1.2898C12.0391 1.32992 12.4781 1.4152 12.8867 1.62337C13.5296 1.95094 14.0522 2.47362 14.3798 3.11651C14.588 3.52508 14.6733 3.96406 14.7134 4.45511C14.7522 4.93045 14.7522 5.51612 14.7522 6.23595V6.26764V11.001C14.7522 11.4152 14.4164 11.751 14.0022 11.751C13.588 11.751 13.2522 11.4152 13.2522 11.001V6.26764C13.2522 5.50853 13.2516 4.9843 13.2184 4.57726C13.1858 4.17896 13.1258 3.95936 13.0433 3.7975C12.8595 3.43685 12.5663 3.14364 12.2057 2.95988C12.0438 2.87741 11.8242 2.81736 11.4259 2.78482ZM4.10734 3.58431L4.13553 3.58431H9.53553L9.56373 3.58431C9.91299 3.58429 10.2192 3.58428 10.4723 3.60497C10.7411 3.62692 11.0154 3.67587 11.2813 3.81138C11.6734 4.01112 11.9921 4.32983 12.1918 4.72183C12.3273 4.98779 12.3763 5.26212 12.3982 5.53084C12.4189 5.78401 12.4189 6.09018 12.4189 6.43944V6.46764V11.8676V11.8959C12.4189 12.2451 12.4189 12.5513 12.3982 12.8044C12.3763 13.0732 12.3273 13.3475 12.1918 13.6135C11.9921 14.0055 11.6733 14.3242 11.2813 14.5239C11.0154 14.6594 10.7411 14.7084 10.4723 14.7303C10.2192 14.751 9.913 14.751 9.56374 14.751H9.53553H4.13553H4.10732C3.75807 14.751 3.45189 14.751 3.19873 14.7303C2.93001 14.7084 2.65568 14.6594 2.38972 14.5239C1.99772 14.3242 1.67901 14.0055 1.47927 13.6135C1.34376 13.3475 1.29481 13.0732 1.27286 12.8044C1.25217 12.5513 1.25218 12.2451 1.2522 11.8958L1.2522 11.8676V6.46764L1.2522 6.43945C1.25218 6.09019 1.25217 5.78401 1.27286 5.53084C1.29481 5.26212 1.34376 4.98779 1.47927 4.72183C1.679 4.32983 1.99771 4.01112 2.38972 3.81138C2.65568 3.67587 2.93001 3.62692 3.19873 3.60497C3.4519 3.58428 3.75808 3.58429 4.10734 3.58431ZM3.32088 5.09999C3.14492 5.11436 3.08996 5.13808 3.0707 5.14789C2.96094 5.20382 2.8717 5.29306 2.81578 5.40282C2.80597 5.42207 2.78225 5.47703 2.76787 5.65299C2.75278 5.8377 2.7522 6.0819 2.7522 6.46764V11.8676C2.7522 12.2534 2.75278 12.4976 2.76787 12.6823C2.78225 12.8583 2.80597 12.9132 2.81578 12.9325C2.8717 13.0422 2.96094 13.1315 3.0707 13.1874C3.08996 13.1972 3.14492 13.2209 3.32088 13.2353C3.50559 13.2504 3.74979 13.251 4.13553 13.251H9.53553C9.92128 13.251 10.1655 13.2504 10.3502 13.2353C10.5261 13.2209 10.5811 13.1972 10.6004 13.1874C10.7101 13.1315 10.7994 13.0422 10.8553 12.9325C10.8651 12.9132 10.8888 12.8583 10.9032 12.6823C10.9183 12.4976 10.9189 12.2534 10.9189 11.8676V6.46764C10.9189 6.0819 10.9183 5.8377 10.9032 5.65299C10.8888 5.47703 10.8651 5.42207 10.8553 5.40282C10.7994 5.29306 10.7101 5.20382 10.6004 5.14789C10.5811 5.13808 10.5261 5.11436 10.3502 5.09999C10.1655 5.08489 9.92128 5.08431 9.53553 5.08431H4.13553C3.74979 5.08431 3.50559 5.08489 3.32088 5.09999Z"
        />
      </svg>

      <p>{t('CHAT.COPY_LINK_BTN')}</p>
    </Button>
  ) : (
    // Info: (20240703 - Julian) Create / Update Link
    <Button
      id={isFirstShare ? 'create-chat-link-button' : 'update-chat-link-button'}
      type="button"
      variant="tertiary"
      className="py-8px text-sm"
      onClick={updateLinkHandler}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.46117 1.77515C9.2313 1.03133 10.2628 0.619757 11.3334 0.629061C12.404 0.638364 13.4282 1.0678 14.1853 1.82489C14.9424 2.58197 15.3718 3.60612 15.3811 4.67676C15.3904 5.74739 14.9788 6.77885 14.235 7.54898L14.226 7.55836L14.2259 7.55828L12.226 9.55818C12.2259 9.55821 12.2259 9.55824 12.2259 9.55828C11.8119 9.97234 11.3138 10.2925 10.7652 10.4972C10.2166 10.7018 9.63043 10.7861 9.0464 10.7443C8.46237 10.7024 7.89416 10.5355 7.38032 10.2547C6.86648 9.97401 6.41902 9.58605 6.0683 9.11718C5.8202 8.78549 5.88795 8.31548 6.21964 8.06737C6.55133 7.81927 7.02134 7.88702 7.26945 8.21871C7.49133 8.51535 7.77442 8.76079 8.0995 8.9384C8.42458 9.11601 8.78406 9.22162 9.15355 9.24809C9.52304 9.27455 9.8939 9.22124 10.241 9.09177C10.5881 8.9623 10.9032 8.7597 11.1651 8.49771L11.1652 8.49762L13.1603 6.50252C13.6282 6.01577 13.887 5.3651 13.8812 4.68979C13.8753 4.01245 13.6036 3.36452 13.1246 2.88555C12.6456 2.40658 11.9977 2.13489 11.3204 2.129C10.6447 2.12313 9.99372 2.3822 9.5069 2.85056L8.36432 3.98649C8.07058 4.27852 7.59571 4.27714 7.30367 3.98339C7.01163 3.68965 7.01301 3.21478 7.30676 2.92274L8.45343 1.78274L8.46112 1.77509L8.46117 1.77515ZM5.23918 5.50539C5.78779 5.30075 6.37398 5.21648 6.95802 5.25831C7.54205 5.30013 8.11026 5.46708 8.6241 5.74781C9.13794 6.02855 9.5854 6.41651 9.93612 6.88538C10.1842 7.21707 10.1165 7.68708 9.78478 7.93519C9.45309 8.18329 8.98307 8.11553 8.73497 7.78385C8.51308 7.48721 8.23 7.24177 7.90492 7.06416C7.57983 6.88655 7.22036 6.78094 6.85086 6.75447C6.48137 6.72801 6.11052 6.78132 5.76344 6.91079C5.41636 7.04026 5.10119 7.24286 4.8393 7.50485L4.83921 7.50494L2.8441 9.50005C2.3762 9.9868 2.1174 10.6375 2.12327 11.3128C2.12915 11.9901 2.40084 12.638 2.87981 13.117C3.35878 13.596 4.00671 13.8677 4.68405 13.8736C5.35936 13.8794 6.01003 13.6206 6.49678 13.1527L7.63188 12.0176C7.92477 11.7247 8.39964 11.7247 8.69254 12.0176C8.98543 12.3105 8.98543 12.7854 8.69254 13.0783L7.55254 14.2183L7.54332 14.2275L7.54324 14.2274C6.77312 14.9712 5.74166 15.3828 4.67102 15.3735C3.60038 15.3642 2.57623 14.9348 1.81915 14.1777C1.06207 13.4206 0.632627 12.3964 0.623323 11.3258C0.61402 10.2552 1.0256 9.22371 1.76941 8.45358L1.77846 8.4442L1.77855 8.44428L3.77845 6.44438C3.77848 6.44435 3.77851 6.44431 3.77854 6.44428C4.19248 6.03022 4.69062 5.71002 5.23918 5.50539Z"
        />
      </svg>

      <p>{buttonText}</p>
    </Button>
  );

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        id="move-chat-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-surface-lv1 py-20px font-barlow md:w-520px"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-between pl-40px pr-20px text-2xl font-bold text-text-neutral-primary">
          <h1>{mainTitle}</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col gap-y-16px px-40px py-20px">
          {displayedUpdatedHint}
          <div
            className={`flex items-center justify-between gap-x-10px rounded-sm border p-20px ${isUpdated ? 'border-input-stroke-success' : 'border-input-stroke-input'}`}
          >
            <input
              id="update-chat-link-input"
              value={currentLink}
              className={`flex-1 bg-transparent text-base outline-none ${isUpdated ? 'text-text-state-success' : 'text-input-text-input-placeholder'}`}
              readOnly
            />
            {displayedButton}
          </div>
          <p className="text-sm text-input-text-secondary">{descriptionText}</p>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default UpdateLinkModal;
