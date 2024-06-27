export interface IComment {
  id: string;
  userName: string;
  userAvatar: string;
  comment: string;
  countOfLikes: number;
  countOfDislikes: number;
  createTimestamp: number;
}
