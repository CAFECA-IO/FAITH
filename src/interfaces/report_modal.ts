export interface IReportCommentModal {
  reportReason: string;
  user: string; // ToDo: (20240628 - Julian) Maybe replace with IUser
}

export const defaultReportCommentModalData: IReportCommentModal = {
  reportReason: '',
  user: '',
};
