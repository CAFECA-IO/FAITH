import { Button } from '@/components/button/button';
import useOuterClick from '@/lib/hooks/use_outer_click';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { INTERNATIONALIZATION_LIST } from '@/constants/i18n';

const I18n = () => {
  const { asPath } = useRouter();

  const {
    targetRef: lanRef,
    componentVisible: isMenuVisible,
    setComponentVisible: setIsMenuVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  const languageList = INTERNATIONALIZATION_LIST.map((item) => {
    return (
      <Link key={item.value} href={asPath} scroll={false} locale={item.value} onClick={toggleMenu}>
        <Button type="button" variant="tertiaryBorderless">
          {item.label}
        </Button>
      </Link>
    );
  });

  return (
    <div className="relative flex flex-col items-center font-barlow">
      {/* Info: (20240906 - Julian) Global icon button */}
      <Button type="button" size={'small'} variant={'secondaryBorderless'} onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="fill-current"
            fillRule="evenodd"
            d="M3.226 10.001a9.029 9.029 0 000 4h3.94a16.3 16.3 0 01-.163-2.02A16.3 16.3 0 017.165 10H3.226zm.712-2h3.644a16.302 16.302 0 012.147-4.71A9.02 9.02 0 003.939 8zm8.065-4.45a14.302 14.302 0 00-2.336 4.45h4.671a14.298 14.298 0 00-2.335-4.45zm2.814 6.45H9.19c-.108.658-.17 1.326-.186 2 .015.674.078 1.342.186 2h5.628c.108-.658.17-1.326.186-2a14.302 14.302 0 00-.186-2zm2.023 4a16.31 16.31 0 00.163-2.02A16.31 16.31 0 0016.84 10h3.94c.146.643.223 1.313.223 2 0 .688-.077 1.357-.223 2h-3.94zm-2.502 2h-4.67a14.302 14.302 0 002.335 4.45A14.298 14.298 0 0014.338 16zm-4.61 4.71a16.303 16.303 0 01-2.146-4.71H3.938a9.02 9.02 0 005.79 4.71zm4.55 0a16.303 16.303 0 002.146-4.71h3.643a9.02 9.02 0 01-5.79 4.71zm5.79-12.71h-3.644a16.302 16.302 0 00-2.147-4.71A9.02 9.02 0 0120.067 8zm-19.065 4c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      {/* Info: (20240906 - Julian) Dropdown */}
      <div
        ref={lanRef}
        className={`absolute top-50px flex-col items-center rounded-xs bg-surface-neutral-surface-lv2 p-8px text-base shadow-custom1 ${isMenuVisible ? 'flex' : 'hidden'}`}
      >
        {languageList}
      </div>
    </div>
  );
};

export default I18n;
