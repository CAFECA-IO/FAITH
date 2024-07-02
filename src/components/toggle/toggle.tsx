import React, { Dispatch, SetStateAction, useState } from 'react';

interface IToggleProps {
  id: string;
  lockedToOpen?: boolean;
  initialToggleState?: boolean;
  getToggledState: (props: boolean) => void;
  toggleStateFromParent?: boolean;
  setToggleStateFromParent?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}

const Toggle = ({
  id,
  initialToggleState = false,
  getToggledState,
  lockedToOpen = false,
  toggleStateFromParent,
  setToggleStateFromParent,
  onClick,
}: IToggleProps) => {
  const [toggle, setToggle] =
    toggleStateFromParent && setToggleStateFromParent
      ? [toggleStateFromParent, setToggleStateFromParent]
      : useState(initialToggleState);

  const passToggledStateHandler = (data: boolean) => {
    getToggledState(data);
  };

  const toggleClickHandler = () => {
    if (lockedToOpen) return;
    if (onClick) {
      onClick();
      return;
    }

    setToggle(!toggle);
    passToggledStateHandler(!toggle);
  };

  const toggleBackgroundStyle = lockedToOpen
    ? 'bg-lightGray'
    : toggle
      ? 'bg-primaryYellow'
      : 'bg-lightGray6';

  const toggleSwitchStyle = lockedToOpen
    ? 'transform translate-x-full bg-lightGray shadow-lg shadow-black/80'
    : toggle
      ? 'transform translate-x-full'
      : '';

  return (
    <div
      id={id}
      onClick={toggleClickHandler}
      className={`${toggleBackgroundStyle} inline-flex h-26px w-46px cursor-pointer items-center rounded-full p-3px duration-300 ease-in-out`}
    >
      <div
        className={`${toggleSwitchStyle} h-20px w-20px rounded-full bg-white shadow-md duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Toggle;
