import { buttonVariants } from '@/components/button/button';
import { VariantProps } from 'class-variance-authority';

export enum MessageType {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface IMessageModal {
  title: string;
  normalMsg?: string;
  hideCloseBtn?: boolean;
  submitBtnStr: string;
  submitBtnFunction: () => void;
  messageType: MessageType;
  subtitle?: string;
  redMsg?: string;
  backBtnStr?: string;
  backBtnFunction?: () => void;
  submitBtnClassName?: string;
  submitBtnVariant?: VariantProps<typeof buttonVariants>['variant'];
  submitBtnIcon?: React.ReactNode;
}

export const dummyMessageModalData: IMessageModal = {
  title: 'Warning',
  normalMsg: '',
  submitBtnStr: 'Delete',
  submitBtnFunction: () => {},
  submitBtnVariant: 'tertiaryBorderless',
  messageType: MessageType.WARNING,
};
