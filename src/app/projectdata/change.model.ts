export class Change {
  id: string;

  responsiblePerson: string;
  date: Date;

  stringChangeName?: string;
  stringChangeDescription?: string;
  modifiedObjectType?: string;
  isCreation?: boolean;

  boardId?: string;

  changeType: number;

  modifiedObjectBefore: any;
  modifiedObjectAfter: any;
}