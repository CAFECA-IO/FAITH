import Image from 'next/image';
import { Button } from '@/components/button/button';

interface IUserCodeModalProps {
  isModalVisible: boolean;
  modalVisibilityHandler: () => void;
}

const UserCodeModal = ({ isModalVisible, modalVisibilityHandler }: IUserCodeModalProps) => {
  const firstItem = (
    <li className="mb-20px">
      Purpose
      <br />
      <span className="text-base text-text-neutral-secondary">
        This User Code of Conduct aims to ensure a safe, friendly, and efficient environment for all
        users on this platform.
      </span>
    </li>
  );

  const secondItem = (
    <li className="mb-20px">
      User Responsibilities
      <br />
      <span className="text-base text-text-neutral-secondary">
        2.1 Compliance with Laws and Regulations
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users must comply with all applicable laws and regulations and must not engage in any
        illegal activities using this platform.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">2.2 Honesty and Integrity</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users should provide accurate and truthful information and must not impersonate others or
        make false statements.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">2.3 Respect for Others</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users should respect the rights and dignity of others and must not post content that is
        insulting, discriminatory, or defamatory.
      </span>
    </li>
  );

  const thirdItem = (
    <li className="mb-20px">
      Platform Use
      <br />
      <span className="text-base text-text-neutral-secondary">3.1 Account Security</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users are responsible for the security of their accounts and should keep their passwords
        confidential and not share their accounts with others.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">3.2 Content Posting</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        All content posted by users should comply with platform regulations and must not contain
        obscene, violent, inciting, or other prohibited content.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">3.3 Privacy Protection </span>
      <span className="text-base text-text-neutral-secondary">
        Users must not illegally collect, use, or disclose personal information of others and should
        respect the privacy of others.
      </span>
    </li>
  );

  const fourthItem = (
    <li className="mb-20px">
      Platform Rules
      <br />
      <span className="text-base text-text-neutral-secondary">4.1 Content Review</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        The platform reserves the right to review and delete any content that does not comply with
        this User Code of Conduct and to suspend or terminate the accounts of violators.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">4.2 Reporting Mechanism</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        If users discover any violations, they can report them using the platform&apos;s reporting
        function, and the platform will handle them accordingly.
      </span>
    </li>
  );

  const fifthItem = (
    <li className="mb-20px">
      Limitation of Liability
      <br />
      <span className="text-base text-text-neutral-secondary">5.1 Service Interruptions</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        The platform is not responsible for any service interruptions caused by technical failures
        or other reasons but will strive to restore services as quickly as possible.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">5.2 Content Responsibility</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users are responsible for the content they post, and the platform is not legally responsible
        for user-posted content.
      </span>
    </li>
  );

  const sixthItem = (
    <li className="mb-20px">
      User Plans
      <br />
      <span className="text-base text-text-neutral-secondary">6.1 Free Plan</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users not on a paid plan should note that their conversation content may be made public in
        discussion forums. The platform is not responsible for the use and management of public
        content, and users assume the risk of their content being made public.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">6.2 Paid Plan</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        Users who choose a paid plan will have their conversation content kept private and will
        enjoy additional exclusive features and services provided by the platform.
      </span>
    </li>
  );

  const seventhItem = (
    <li className="mb-20px">
      Modification and Termination
      <br />
      <span className="text-base text-text-neutral-secondary">7.1 Code Modification</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        The platform reserves the right to modify this User Code of Conduct at any time, and the
        modified code will be published on the platform and take effect immediately.
      </span>
      <br />
      <span className="text-base text-text-neutral-secondary">7.2 Service Termination</span>
      <br />
      <span className="text-base text-text-neutral-secondary">
        The platform reserves the right to immediately terminate the services of users who violate
        this User Code of Conduct.
      </span>
    </li>
  );

  const eighthItem = (
    <li className="mb-20px">
      Contact Information
      <br />
      <span className="text-base text-text-neutral-secondary">
        If users have any questions or suggestions regarding this User Code of Conduct, please
        contact us through the following methods:
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
        <div className="flex items-center justify-between pl-40px pr-20px text-2xl font-bold text-text-neutral-primary">
          <h1>User Code of Conduct </h1>
          <button type="button" onClick={modalVisibilityHandler}>
            <Image src="/icons/cross.svg" width={32} height={32} alt="cross_icon" />
          </button>
        </div>

        <hr className="my-20px bg-divider-stroke-lv-4" />

        {/* Info: (20240625 - Julian) Content */}
        <div className="flex w-full flex-col items-center gap-y-20px px-40px pt-20px">
          <div className="h-500px overflow-y-auto rounded-sm border border-surface-brand-secondary bg-surface-neutral-main-background p-20px">
            <ol className="list-inside list-decimal text-lg font-semibold text-text-neutral-primary">
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
              Cancel
            </Button>
            <Button
              id="user-code-agree-button"
              type="button"
              variant="tertiary"
              onClick={modalVisibilityHandler}
            >
              Agreed, I confirm acceptance of the above terms.
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return isDisplayModal;
};

export default UserCodeModal;
