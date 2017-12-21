import {Person} from '../projectdata/person.model';
export class Session {
  currentBoard: string;

  user: Person;

  showTaskDescriptions: boolean;
  showSubtasks: boolean;
  showAssignedPeople: boolean;
  showTaskControls: boolean;

  theme: string;
  isDark: boolean;
}