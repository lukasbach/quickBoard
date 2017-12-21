import {Person} from './person.model';
import {Subtask} from './subtask.model';
export class Task {
  id: string;
  name: string;
  description: string;
  category: string;
  archived: boolean;

  images: string[];
  assets: any[];

  dateCreated: Date;
  dateLastUpdate: Date;

  people: Person[];

  comments: any[];

  subtasks: Subtask[];
}