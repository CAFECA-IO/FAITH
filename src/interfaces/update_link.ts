export type UpdateLinkTypeUnion = 'chat' | 'folder';

export const UpdateLinkType: { [key in UpdateLinkTypeUnion]: UpdateLinkTypeUnion } = {
  chat: 'chat',
  folder: 'folder',
};

export interface IUpdateLink {
  id: string;
  sharedDomain: string;
  oldShareId: string | null;
  isFirstCreate: boolean;
  newSharedId: string;
}

export const dummyUpdateLink: IUpdateLink = {
  id: '1',
  sharedDomain: 'http://faith.com/share',
  oldShareId: '1234567890',
  isFirstCreate: false,
  newSharedId: '0987654321',
};
