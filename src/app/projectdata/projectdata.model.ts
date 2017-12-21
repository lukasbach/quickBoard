import {Person} from './person.model';
import {Board} from './board.model';
import {Change} from './change.model';

export class ProjectData {
  people: Person[];
  boards: Board[];
  changes: Change[];
}