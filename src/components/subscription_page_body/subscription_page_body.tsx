import Image from 'next/image';
import { useState } from 'react';
import useOuterClick from '@/lib/hooks/use_outer_click';
import { Button } from '@/components/button/button';
import { checkboxStyle } from '@/constants/display';
import { useTranslation } from 'react-i18next';

const SubscriptionPageBody = () => {
  const { t } = useTranslation();
  // ToDo: (20240628 - Julian) replace with real data
  const feeOfPerMonth = 200;
  const subtotal = 200;
  const tax = 0;
  const totalDueToday = 200;

  const [cardNo, setCardNo] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingAddressLine, setBillingAddressLine] = useState('');

  const monthList = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
    const monthString = month < 10 ? `0${month}` : `${month}`;
    return monthString;
  });
  const yearList = Array.from({ length: 10 }, (_, i) => i + 1).map((year) => {
    const thisYear = new Date().getFullYear();
    const yearString = `${thisYear + year - 1}`;
    return yearString.slice(-2);
  });

  const monthPlaceholder = expirationMonth === '' ? 'MM' : expirationMonth;
  const yearPlaceholder = expirationYear === '' ? 'YY' : expirationYear;

  const {
    targetRef: monthRef,
    componentVisible: monthVisible,
    setComponentVisible: setMonthVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const {
    targetRef: yearRef,
    componentVisible: yearVisible,
    setComponentVisible: setYearVisible,
  } = useOuterClick<HTMLDivElement>(false);

  const cardNoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNo(event.target.value);
  };
  const cvcHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(event.target.value);
  };
  const cardholderNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardholderName(event.target.value);
  };
  const billingCountryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingCountry(event.target.value);
  };
  const billingPostalCodeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingPostalCode(event.target.value);
  };
  const billingAddressLineHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddressLine(event.target.value);
  };

  const monthToggleHandler = () => setMonthVisible(!monthVisible);
  const yearToggleHandler = () => setYearVisible(!yearVisible);

  const isSubmitDisabled =
    cardNo === '' ||
    expirationMonth === '' ||
    expirationYear === '' ||
    cvc === '' ||
    cardholderName === '' ||
    billingCountry === '' ||
    billingPostalCode === '' ||
    billingAddressLine === '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ToDo: (20240628 - Julian) Add submit logic
  };

  const backHandler = () => window.history.back();

  const displayedTitle = (
    <div className="flex flex-col items-center gap-y-8px">
      <p className="text-sm font-semibold text-text-neutral-secondary md:text-lg">
        {t('SUBSCRIPTION.SUBSCRIBE')}
      </p>
      <p className="text-2xl font-semibold text-text-neutral-primary md:text-4xl md:font-bold">
        <span className="mr-16px text-lg font-semibold text-text-neutral-secondary">
          {t('SUBSCRIPTION.PER_MONTH_1')}
        </span>
        {t('NTD')} {feeOfPerMonth}
        <span className="ml-16px text-lg font-semibold text-text-neutral-secondary">
          {t('SUBSCRIPTION.PER_MONTH_2')}
        </span>
      </p>
    </div>
  );

  const displayedReceiptBlock = (
    <div className="flex w-4/5 flex-col gap-y-20px rounded-sm bg-surface-neutral-surface-lv1 p-20px shadow-custom1 md:w-500px md:px-32px md:py-40px">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-8px text-sm font-semibold md:text-lg">
          <p className="text-text-neutral-tertiary">{t('SUBSCRIPTION.PLUS_SUBSCRIPTION')}</p>
          <p className="text-text-brand-secondary-lv3">{t('SUBSCRIPTION.BILLED_MONTHLY')}</p>
        </div>
        <p className="text-lg font-bold text-text-neutral-secondary lg:text-xl">
          $ {feeOfPerMonth}
        </p>
      </div>
      <hr className="border-divider-stroke-lv-4" />
      <div className="flex flex-col items-center gap-8px">
        <div className="flex w-full justify-between text-sm font-semibold md:text-lg">
          <p className="text-text-neutral-tertiary">{t('SUBSCRIPTION.SUBTOTAL')}</p>
          <p className="text-lg font-bold text-text-neutral-secondary lg:text-xl">$ {subtotal}</p>
        </div>
        <div className="flex w-full justify-between text-sm font-semibold md:text-lg">
          <p className="text-text-brand-secondary-lv3">{t('SUBSCRIPTION.TAX')}</p>
          <p className="text-lg font-bold text-text-neutral-tertiary lg:text-xl">$ {tax}</p>
        </div>
      </div>
      <hr className="border-divider-stroke-lv-4" />
      <div className="flex w-full justify-between text-sm font-semibold md:text-lg">
        <p className="text-text-neutral-tertiary">{t('SUBSCRIPTION.TOTAL_DUE_TODAY')}</p>
        <p className="text-lg font-bold text-text-neutral-secondary lg:text-xl">
          $ {totalDueToday}
        </p>
      </div>
    </div>
  );

  const monthDropMenu = (
    <div
      ref={monthRef}
      className={`absolute left-0 top-14 flex w-full flex-col overflow-y-auto rounded-sm border border-input-stroke-input ${monthVisible ? 'h-200px opacity-100' : 'h-0 opacity-0'} bg-input-surface-input-background p-10px shadow-dropmenu transition-all duration-300 ease-in-out`}
    >
      {monthList.map((month) => {
        const clickHandler = () => {
          setExpirationMonth(month);
          setMonthVisible(false);
        };
        return (
          <button
            id={`subscription-expiration-month-${month}`}
            key={month}
            type="button"
            onClick={clickHandler}
            className="w-full py-4px text-input-text-input-placeholder hover:bg-dropdown-surface-item-hover"
          >
            {month}
          </button>
        );
      })}
    </div>
  );

  const yearDropMenu = (
    <div
      ref={yearRef}
      className={`absolute left-0 top-14 flex w-full flex-col overflow-y-auto rounded-sm border border-input-stroke-input ${yearVisible ? 'h-200px opacity-100' : 'h-0 opacity-0'} bg-input-surface-input-background p-10px shadow-dropmenu transition-all duration-300 ease-in-out`}
    >
      {yearList.map((year) => {
        const clickHandler = () => {
          setExpirationYear(year);
          setYearVisible(false);
        };
        return (
          <button
            id={`subscription-expiration-year-${year}`}
            key={year}
            type="button"
            onClick={clickHandler}
            className="w-full py-4px text-input-text-input-placeholder hover:bg-dropdown-surface-item-hover"
          >
            {year}
          </button>
        );
      })}
    </div>
  );

  const displayedCardInformation = (
    <div className="row-span-4 flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">
        {t('SUBSCRIPTION.CARD_INFO')}
      </p>
      <div className="grid grid-cols-1 gap-x-40px gap-y-16px text-input-text-primary md:grid-cols-2">
        {/* Info: (20240628 - Julian) Card No. */}
        <div className="flex flex-col gap-y-8px md:col-span-2">
          <p className="text-sm font-semibold">{t('SUBSCRIPTION.CARD_NO')}</p>
          <div className="flex items-center divide-x divide-input-stroke-input rounded-sm border border-input-stroke-input bg-input-surface-input-background">
            <input
              id="subscription-card-no"
              type="text"
              value={cardNo}
              onChange={cardNoHandler}
              required
              placeholder={t('SUBSCRIPTION.CARD_NO_PLACEHOLDER')}
              className="flex-1 bg-transparent px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
            />
          </div>
        </div>
        {/* Info: (20240628 - Julian) Expiration */}
        <div className="flex flex-col gap-y-8px">
          <p className="text-sm font-semibold">{t('SUBSCRIPTION.EXPIRATION')}</p>
          <div className="flex items-center gap-x-20px">
            {/* Info: (20240628 - Julian) Expiration Month */}
            <div
              id="subscription-expiration-month"
              onClick={monthToggleHandler}
              className="relative flex w-fit items-center gap-x-24px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px hover:cursor-pointer"
            >
              <p className="w-20px text-input-text-input-placeholder">{monthPlaceholder}</p>
              <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
              {monthDropMenu}
            </div>
            {/* Info: (20240628 - Julian) Expiration Year */}
            <div
              id="subscription-expiration-year"
              onClick={yearToggleHandler}
              className="relative flex w-fit items-center gap-x-24px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px hover:cursor-pointer"
            >
              <p className="w-20px text-input-text-input-placeholder">{yearPlaceholder}</p>
              <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
              {yearDropMenu}
            </div>
          </div>
        </div>
        {/* Info: (20240628 - Julian) CVC */}
        <div className="flex flex-col gap-y-8px">
          <p className="text-sm font-semibold">{t('SUBSCRIPTION.CVC')}</p>
          <div className="">
            <input
              id="subscription-card-cvc"
              type="text"
              value={cvc}
              onChange={cvcHandler}
              required
              placeholder={t('SUBSCRIPTION.CVC')}
              className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const displayedCardholderName = (
    <div className="row-span-2 mt-auto flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">
        {t('SUBSCRIPTION.CARDHOLDER_NAME')}
      </p>
      <input
        id="subscription-cardholder-name"
        type="text"
        value={cardholderName}
        onChange={cardholderNameHandler}
        required
        placeholder={t('SUBSCRIPTION.CARDHOLDER_NAME_PLACEHOLDER')}
        className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
      />
    </div>
  );

  const displayedBillingAddress = (
    <div className="row-span-3 flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">
        {t('SUBSCRIPTION.BILLING_ADDRESS')}
      </p>
      <div className="grid grid-flow-row grid-cols-2 gap-x-8px gap-y-16px">
        {/* Info: (20240628 - Julian) Country */}
        <input
          id="subscription-billing-country"
          type="text"
          value={billingCountry}
          onChange={billingCountryHandler}
          required
          placeholder={t('SUBSCRIPTION.COUNTRY')}
          className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
        {/* Info: (20240628 - Julian) Postal code */}
        <input
          id="subscription-billing-postal-code"
          type="text"
          value={billingPostalCode}
          onChange={billingPostalCodeHandler}
          required
          placeholder={t('SUBSCRIPTION.POSTAL_CODE')}
          className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
        {/* Info: (20240628 - Julian) Address line */}
        <input
          id="subscription-billing-address-line"
          type="text"
          value={billingAddressLine}
          onChange={billingAddressLineHandler}
          required
          placeholder={t('SUBSCRIPTION.ADDRESS_LINE')}
          className="col-span-2 rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
      </div>
    </div>
  );

  const displayedSubscribeButton = (
    <div className="row-span-3 mt-auto flex flex-col gap-y-40px">
      <label
        htmlFor="subscription-agreement-checkbox"
        className="flex items-baseline gap-x-8px text-sm text-checkbox-text-primary"
      >
        <div className="">
          <input
            id="subscription-agreement-checkbox"
            type="checkbox"
            required
            className={checkboxStyle}
          />
        </div>
        <p>{t('SUBSCRIPTION.CHECK_BOX_HINT')}</p>
      </label>
      <Button
        id="subscribe-submit-button"
        type="submit"
        variant="default"
        disabled={isSubmitDisabled}
      >
        {t('SUBSCRIPTION.SUBSCRIBE_BTN')}
      </Button>
    </div>
  );

  return (
    <div className="mb-40px mt-120px flex w-screen flex-col items-stretch md:ml-100px md:flex-row">
      {/* Info: (20240628 - Julian) Desktop Back button */}
      <Button
        type="button"
        variant="secondaryOutline"
        className="hidden h-fit w-fit md:flex"
        onClick={backHandler}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.86627 4.47065C9.15916 4.76354 9.15916 5.23841 8.86627 5.53131L5.1466 9.25098H16.6693C17.0835 9.25098 17.4193 9.58676 17.4193 10.001C17.4193 10.4152 17.0835 10.751 16.6693 10.751H5.1466L8.86627 14.4706C9.15916 14.7635 9.15916 15.2384 8.86627 15.5313C8.57337 15.8242 8.0985 15.8242 7.80561 15.5313L2.80561 10.5313C2.51271 10.2384 2.51271 9.76354 2.80561 9.47065L7.80561 4.47065C8.0985 4.17775 8.57337 4.17775 8.86627 4.47065Z"
          />
        </svg>
        <p>{t('BACK')}</p>
      </Button>
      {/* Info: (20240628 - Julian) Mobile Back button & Title */}
      <div className="relative flex items-center justify-center px-20px text-2xl font-bold text-text-neutral-primary md:hidden">
        <button type="button" onClick={backHandler} className="absolute left-10 p-10px">
          <Image src="/icons/back.svg" alt="back_icon" width={24} height={24} />
        </button>
        <h1>{t('SUBSCRIPTION.HEADER_TITLE')}</h1>
      </div>
      {/* Info: (20240628 - Julian) Main Body */}
      <div className="flex flex-1 flex-col gap-y-40px px-20px py-40px md:px-80px">
        <div className="flex flex-col items-center justify-between gap-y-20px md:flex-row md:items-start">
          {displayedTitle}
          {/* Info: (20240628 - Julian) block */}
          {displayedReceiptBlock}
        </div>
        {/* Info: (20240628 - Julian) Payment method */}
        <div className="flex flex-col items-center gap-y-40px md:items-start">
          <h2 className="text-xl font-bold text-text-neutral-primary md:text-2xl">
            {t('SUBSCRIPTION.PAYMENT_METHOD')}
          </h2>
          <form
            id="subscription-form"
            onSubmit={handleSubmit}
            className="grid grid-flow-row gap-x-80px gap-y-40px md:grid-flow-col md:grid-rows-6"
          >
            {/* Info: (20240628 - Julian) Card information */}
            {displayedCardInformation}
            {/* Info: (20240628 - Julian) Cardholder name */}
            {displayedCardholderName}
            {/* Info: (20240628 - Julian) Billing address */}
            {displayedBillingAddress}
            {/* Info: (20240628 - Julian) Subscribe button */}
            {displayedSubscribeButton}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPageBody;
