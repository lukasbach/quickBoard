import {Task} from 'app/projectdata/task.model';

export class Board {
  id: string;
  name: string;
  categories: string[];
  tasks: Task[];
}