import Image from 'next/image';
import { Button } from '@/components/button/button';

const SubscriptionPageBody = () => {
  const backHandler = () => window.history.back();

  const displayedTitle = (
    <div className="flex flex-col items-center gap-y-8px">
      <p className="text-lg font-semibold text-text-neutral-secondary">
        Subscribe to Faith Plus Subscription
      </p>
      <p className="text-4xl font-bold text-text-neutral-primary">
        NTD $3000
        <span className="ml-16px text-lg font-semibold text-text-neutral-secondary">per/month</span>
      </p>
    </div>
  );

  const displayedReceiptBlock = (
    <div className="flex w-500px flex-col gap-y-20px rounded-sm bg-surface-neutral-surface-lv1 px-32px py-40px shadow-custom1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-8px text-lg font-semibold">
          <p className="text-text-neutral-tertiary">Faith Plus Subscription</p>
          <p className="text-text-brand-secondary-lv3">Billed monthly</p>
        </div>
        <p className="text-xl font-bold text-text-neutral-secondary">$ 3000</p>
      </div>
      <hr className="border-divider-stroke-lv-4" />
      <div className="flex flex-col items-center gap-8px">
        <div className="flex w-full justify-between text-lg font-semibold">
          <p className="text-text-neutral-tertiary">Subtotal</p>
          <p className="text-xl font-bold text-text-neutral-secondary">$ 3000</p>
        </div>
        <div className="flex w-full justify-between text-lg font-semibold">
          <p className="text-text-brand-secondary-lv3">Tax</p>
          <p className="text-xl font-bold text-text-neutral-tertiary">$ 0</p>
        </div>
      </div>
      <hr className="border-divider-stroke-lv-4" />
      <div className="flex w-full justify-between text-lg font-semibold">
        <p className="text-text-neutral-tertiary">Total due today</p>
        <p className="text-xl font-bold text-text-neutral-secondary">$ 3000</p>
      </div>
    </div>
  );

  const displayedCardInformation = (
    <div className="row-span-4 flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">Card information</p>
      <div className="grid grid-cols-2 gap-x-40px gap-y-16px text-input-text-primary">
        {/* Info: (20240628 - Julian) Card No. */}
        <div className="col-span-2 flex flex-col gap-y-8px">
          <p className="text-sm font-semibold">Card No.</p>
          <div className="flex items-center divide-x divide-input-stroke-input rounded-sm border border-input-stroke-input bg-input-surface-input-background">
            <p className="px-12px py-10px text-input-text-input-placeholder">Type</p>
            <input
              id="subscription-card-no"
              type="text"
              placeholder="Enter Card No."
              className="flex-1 bg-transparent px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
            />
          </div>
        </div>
        {/* Info: (20240628 - Julian) Expiration */}
        <div className="flex flex-col gap-y-8px">
          <p className="text-sm font-semibold">Expiration</p>
          <div className="flex items-center gap-x-20px">
            {/* Info: (20240628 - Julian) Expiration Month */}
            <div className="flex w-fit items-center gap-x-24px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px">
              <p className="text-input-text-input-placeholder">MM</p>
              <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
            </div>
            {/* Info: (20240628 - Julian) Expiration Year */}
            <div className="flex w-fit items-center gap-x-24px rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px">
              <p className="text-input-text-input-placeholder">YY</p>
              <Image src="/icons/chevron_down.svg" width={20} height={20} alt="chevron_down_icon" />
            </div>
          </div>
        </div>
        {/* Info: (20240628 - Julian) CVC */}
        <div className="flex flex-col gap-y-8px">
          <p className="text-sm font-semibold">CVC</p>
          <div className="">
            <input
              id="subscription-card-cvc"
              type="text"
              placeholder="CVC"
              className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const displayedCardholderName = (
    <div className="row-span-2 mt-auto flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">Cardholder name</p>
      <input
        id="subscription-cardholder-name"
        type="text"
        placeholder="Full name on card"
        className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
      />
    </div>
  );

  const displayedBillingAddress = (
    <div className="row-span-3 flex flex-col gap-y-20px">
      <p className="text-lg font-semibold text-text-neutral-secondary">Billing address</p>
      <div className="grid grid-flow-row grid-cols-2 gap-x-8px gap-y-16px">
        {/* Info: (20240628 - Julian) Country */}
        <input
          id="subscription-billing-country"
          type="text"
          placeholder="Country"
          className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
        {/* Info: (20240628 - Julian) Postal code */}
        <input
          id="subscription-billing-postal-code"
          type="text"
          placeholder="Postal code"
          className="rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
        {/* Info: (20240628 - Julian) Address line */}
        <input
          id="subscription-billing-address-line"
          type="text"
          placeholder="Address line"
          className="col-span-2 rounded-sm border border-input-stroke-input bg-input-surface-input-background px-12px py-10px outline-none placeholder:text-input-text-input-placeholder"
        />
      </div>
    </div>
  );

  const displayedSubscribeButton = (
    <div className="row-span-3 mt-auto flex flex-col gap-y-40px">
      <label className="flex items-baseline gap-x-8px text-sm text-checkbox-text-primary">
        <input type="checkbox" />
        <p>
          You’ll be charged the amount and at the frequency listed above until you cancel. We may
          change our prices as described in our Terms of Use. You can cancel any time.By
          Subscribing, you agree to Faith’s Terms of Use and Privacy Policy
        </p>
      </label>
      <Button type="button">Subscribe</Button>
    </div>
  );

  return (
    <div className="my-120px ml-100px flex w-screen items-stretch">
      {/* Info: (20240628 - Julian) Back button */}
      <Button
        type="button"
        variant="secondaryOutline"
        className="h-fit w-fit"
        onClick={backHandler}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              className="fill-current"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.86627 4.47065C9.15916 4.76354 9.15916 5.23841 8.86627 5.53131L5.1466 9.25098H16.6693C17.0835 9.25098 17.4193 9.58676 17.4193 10.001C17.4193 10.4152 17.0835 10.751 16.6693 10.751H5.1466L8.86627 14.4706C9.15916 14.7635 9.15916 15.2384 8.86627 15.5313C8.57337 15.8242 8.0985 15.8242 7.80561 15.5313L2.80561 10.5313C2.51271 10.2384 2.51271 9.76354 2.80561 9.47065L7.80561 4.47065C8.0985 4.17775 8.57337 4.17775 8.86627 4.47065Z"
            />
          </g>
        </svg>
        <p>Back</p>
      </Button>
      <div className="flex flex-1 flex-col gap-y-40px px-80px py-40px">
        <div className="flex items-start justify-between">
          {displayedTitle}
          {/* Info: (20240628 - Julian) block */}
          {displayedReceiptBlock}
        </div>
        {/* Info: (20240628 - Julian) Payment method */}
        <div className="flex flex-col gap-y-40px">
          <h2 className="text-2xl font-bold text-text-neutral-primary">Payment method</h2>
          <div className="grid grid-flow-col grid-rows-6 gap-x-80px gap-y-40px">
            {/* Info: (20240628 - Julian) Card information */}
            {displayedCardInformation}
            {/* Info: (20240628 - Julian) Cardholder name */}
            {displayedCardholderName}
            {/* Info: (20240628 - Julian) Billing address */}
            {displayedBillingAddress}
            {/* Info: (20240628 - Julian) Subscribe button */}
            {displayedSubscribeButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPageBody;
