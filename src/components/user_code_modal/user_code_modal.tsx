import Image from 'next/image';
import { Button } from '@/components/button/button';
import { useTranslation } from 'next-i18next';
import { ITranslateFunction } from '@/interfaces/locale';

interface IUserCodeModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const UserCodeModal = ({ isModalVisible, modalVisibilityHandler }: IUserCodeModalProps) => {
  const { t }: { t: ITranslateFunction } = useTranslation('common');

  const firstItem = (
    <li className="mb-20px">
      {t('USER_CODE.1_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.1_CONTENT')}
      </span>
    </li>
  );

  const secondItem = (
    <li className="mb-20px">
      {t('USER_CODE.2_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_2_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_3_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.2_3_CONTENT')}
      </span>
    </li>
  );

  const thirdItem = (
    <li className="mb-20px">
      {t('USER_CODE.3_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_2_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_3_TITLE')}
      </span>
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.3_3_CONTENT')}
      </span>
    </li>
  );

  const fourthItem = (
    <li className="mb-20px">
      {t('USER_CODE.4_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.4_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.4_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.4_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.4_2_CONTENT')}
      </span>
    </li>
  );

  const fifthItem = (
    <li className="mb-20px">
      {t('USER_CODE.5_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.5_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.5_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.5_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.5_2_CONTENT')}
      </span>
    </li>
  );

  const sixthItem = (
    <li className="mb-20px">
      {t('USER_CODE.6_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.6_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.6_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.6_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.6_2_CONTENT')}
      </span>
    </li>
  );

  const seventhItem = (
    <li className="mb-20px">
      {t('USER_CODE.7_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.7_1_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.7_1_CONTENT')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.7_2_TITLE')}
      </span>
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.7_2_CONTENT')}
      </span>
    </li>
  );

  const eighthItem = (
    <li className="mb-20px">
      {t('USER_CODE.8_TITLE')}
      <br />
      <span className="text-sm text-text-neutral-secondary lg:text-base">
        {t('USER_CODE.8_CONTENT')}
      </span>
      <br />
    </li>
  );

  const isDisplayModal = isModalVisible ? (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 font-barlow">
      <div
        id="user-code-modal"
        className="relative flex h-auto w-90vw flex-col rounded-sm bg-surface-neutral-surface-lv1 py-20px font-barlow md:w-700px"
      >
        {/* Info: (20240625 - Julian) Header */}
        <div className="flex items-center justify-between pl-40px pr-20px text-xl font-bold text-text-neutral-primary lg:text-2xl">
          <h1>{t('USER_CODE.TITLE')}</h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col items-center gap-y-20px px-20px pt-20px md:px-40px">
          <div className="h-400px overflow-y-auto rounded-sm border border-surface-brand-secondary bg-surface-neutral-main-background p-20px md:h-500px">
            <ol className="list-inside list-decimal text-base font-semibold text-text-neutral-primary lg:text-lg">
              {/* Info: (20240704 - Julian) 1. Purpose */}
              {firstItem}
              {/* Info: (20240704 - Julian) 2. User Responsibilities */}
              {secondItem}
              {/* Info: (20240704 - Julian) 3. Platform Use */}
              {thirdItem}
              {/* Info: (20240704 - Julian) 4. Platform Rules */}
              {fourthItem}
              {/* Info: (20240704 - Julian) 5. Limitation of Liability */}
              {fifthItem}
              {/* Info: (20240704 - Julian) 6. User Plans */}
              {sixthItem}
              {/* Info: (20240704 - Julian) 7. Modification and Termination */}
              {seventhItem}
              {/* Info: (20240704 - Julian) 8. Contact Information */}
              {eighthItem}
            </ol>
          </div>

          <div className="flex items-center gap-x-40px">
            <Button
              id="user-code-cancel-button"
              type="button"
              variant="secondaryOutline"
              onClick={modalVisibilityHandler}
            >
              {t('COMMON.CANCEL')}
            </Button>
            <Button
              id="user-code-agree-button"
              type="button"
              variant="tertiary"
              onClick={modalVisibilityHandler}
            >
              {t('USER_CODE.AGREE_BTN_1')}
              <span className="hidden md:block">{t('USER_CODE.AGREE_BTN_2')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default UserCodeModal;
