import { useEffect, useRef } from 'react';
import useStateRef from 'react-usestateref';

function useOuterClick<T extends HTMLElement>(
  initialVisibleState: boolean,
  onClickOutside?: () => void
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [componentVisible, setComponentVisible, componentVisibleRef] =
    useStateRef<boolean>(initialVisibleState);

  const targetRef = useRef<T>(null);

  function handleClickOutside(this: Document, event: MouseEvent): void {
    if (event.target instanceof HTMLElement && !targetRef.current?.contains(event.target)) {
      setComponentVisible(false);
      if (onClickOutside) {
        onClickOutside();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return {
    targetRef,
    componentVisible: componentVisibleRef.current,
    setComponentVisible,
  };
}

export default useOuterClick;
