import {Person} from './person.model';
export class Subtask {
  name: string;
  description: string;

  dateCreated: Date;
  dateLastUpdate: Date;

  done: boolean;
}