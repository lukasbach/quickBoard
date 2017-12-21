import {EventEmitter, Injectable, Output} from '@angular/core';
import {ProjectData} from './projectdata.model';
import {Person} from './person.model';
import {Board} from './board.model';
import {Task} from 'app/projectdata/task.model';
import {Change} from './change.model';
import {UtilsService} from '../utils.service';

@Injectable()
export class ProjectdataService {
  private project: ProjectData;

  public static CHANGE_ID_CREATED_PERSON: number = 100;
  public static CHANGE_ID_MODIFIED_PERSON: number = 101;
  public static CHANGE_ID_REMOVED_PERSON: number = 102;
  public static CHANGE_ID_CREATED_CATEGORY: number = 200;
  public static CHANGE_ID_REMOVED_CATEGORY: number = 201;
  public static CHANGE_ID_RENAMED_CATEGORY: number = 202;
  public static CHANGE_ID_CREATED_BOARD: number = 300;
  public static CHANGE_ID_REMOVED_BOARD: number = 301;
  public static CHANGE_ID_CREATED_TASK: number = 400;
  public static CHANGE_ID_MODIFIED_TASK: number = 401;
  public static CHANGE_ID_REMOVED_TASK: number = 402;

  @Output() public projectChange: EventEmitter<any> = new EventEmitter();
  @Output() public boardMetaChange: EventEmitter<any> = new EventEmitter();

  constructor(public util: UtilsService) {
    this.project = {
      people: [],
      boards: [],
      changes: []
    };

    this.createBoard({name: 'Default Board', categories: ['Todo', 'In Progress', 'Testing', 'Done'], tasks: [], id: '1'});
    this.createPerson({name: 'John Doe', email: 'johndoe@gmail.com', id: '1'});
    this.createPerson({name: 'Lukas Bach', email: 'lbach@outlook.de', id: '2'});
    this.createPerson({name: 'Gregor Snelting', email: 'gregor.snelting@kit.edu', id: '3'});

    this.createTask(this.getBoards()[0].id, {id: 'a', subtasks: [], category: 'Todo', dateCreated: new Date(),
      dateLastUpdate: new Date(), description: 'My awesome new task!', people: [], name: 'New Task', assets: [],
      comments: [], images: [], archived: false});
    this.createTask(this.getBoards()[0].id, {id: 'b', subtasks: [], category: 'Todo', dateCreated: new Date(),
      dateLastUpdate: new Date(), description: 'My awesome new task!', people: [], name: 'Another cool task', assets: [],
      comments: [], images: [], archived: false});
    this.createTask(this.getBoards()[0].id, {id: 'c', subtasks: [], category: 'In Progress', dateCreated: new Date(),
      dateLastUpdate: new Date(), description: 'My awesome new task!', people: [], name: 'New Task', assets: [],
      comments: [], images: [], archived: false});
  }

  logChange(changeType: number, modifiedObjectBefore: any, modifiedObjectAfter: any, boardId?: string) {
    if (typeof modifiedObjectBefore === 'string' || modifiedObjectBefore instanceof String) {
      modifiedObjectBefore = {name: modifiedObjectBefore};
    }
    if (typeof modifiedObjectAfter === 'string' || modifiedObjectAfter instanceof String) {
      modifiedObjectAfter = {name: modifiedObjectAfter};
    }

    let change: Change = {
      id: this.util.guid(),
      changeType: changeType,
      responsiblePerson: null,  //this.session.getSession().user.id,
      modifiedObjectBefore: this.util.clone(modifiedObjectBefore),
      modifiedObjectAfter: this.util.clone(modifiedObjectAfter),
      date: new Date()
    };

    if (boardId) {
      change.boardId = boardId;
    }

    this.project.changes.push(change);
  }

  getChanges(): Change[] {
    let changes: Change[] = [];

    this.project.changes.forEach(change => {
      changes.push({
        id: change.id,
        boardId: change.boardId,
        modifiedObjectAfter: change.modifiedObjectAfter,
        modifiedObjectBefore: change.modifiedObjectBefore,
        responsiblePerson: change.responsiblePerson,
        changeType: change.changeType,
        date: change.date,
        stringChangeName: this.getChangeStringChangeName(change),
        modifiedObjectType: this.getChangeModifiedObjectType(change),
        isCreation: Object.keys(change.modifiedObjectBefore).length === 0
      });
    });

        return changes;
  }

  getChangeStringChangeName(change: Change): string {
    switch (change.changeType) {
      case ProjectdataService.CHANGE_ID_CREATED_PERSON:
        return `Person ${change.modifiedObjectAfter.name} was created`;
      case ProjectdataService.CHANGE_ID_MODIFIED_PERSON:
        return `Person ${change.modifiedObjectAfter.name} was modified`;
      case ProjectdataService.CHANGE_ID_REMOVED_PERSON:
        return `Person ${change.modifiedObjectAfter.name} was removed`;
      case ProjectdataService.CHANGE_ID_CREATED_CATEGORY:
        return 'Created category';
      case ProjectdataService.CHANGE_ID_REMOVED_CATEGORY:
        return 'Removed category';
      case ProjectdataService.CHANGE_ID_CREATED_BOARD:
        return 'Created board';
      case ProjectdataService.CHANGE_ID_REMOVED_BOARD:
        return 'Removed board';
      case ProjectdataService.CHANGE_ID_CREATED_TASK:
        return `Task ${change.modifiedObjectAfter.name} was created`;
      case ProjectdataService.CHANGE_ID_MODIFIED_TASK:
        return `Task ${change.modifiedObjectAfter.name} was modified`;
      case ProjectdataService.CHANGE_ID_REMOVED_TASK:
        return `Task ${change.modifiedObjectAfter.name} was removed`;
      default:
        return '';
    }
  }

  getChangeModifiedObjectType(change: Change): string {
    switch (change.changeType) {
      case ProjectdataService.CHANGE_ID_CREATED_PERSON:
        return 'person';
      case ProjectdataService.CHANGE_ID_MODIFIED_PERSON:
        return 'person';
      case ProjectdataService.CHANGE_ID_REMOVED_PERSON:
        return 'person';
      case ProjectdataService.CHANGE_ID_CREATED_CATEGORY:
        return 'category';
      case ProjectdataService.CHANGE_ID_REMOVED_CATEGORY:
        return 'category';
      case ProjectdataService.CHANGE_ID_CREATED_BOARD:
        return 'board';
      case ProjectdataService.CHANGE_ID_REMOVED_BOARD:
        return 'board';
      case ProjectdataService.CHANGE_ID_CREATED_TASK:
        return 'task';
      case ProjectdataService.CHANGE_ID_MODIFIED_TASK:
        return 'task';
      case ProjectdataService.CHANGE_ID_REMOVED_TASK:
        return 'task';
      default:
        return '';
    }
  }

  createPerson(person: Person): string {
    let id = this.util.guid();

    person.id = id;
    this.project.people.push(person);

    this.logChange(ProjectdataService.CHANGE_ID_CREATED_PERSON, {}, person);
    this.projectChange.emit();

    return id;
  }

  editPerson(id: string, newPerson: Person): string {
    this.logChange(ProjectdataService.CHANGE_ID_MODIFIED_PERSON, this.getPeople().find(p => p.id === id), newPerson);

    newPerson.id = id;
    this.project.people = this.getPeople().filter(p => p.id !== id);
    this.project.people.push(newPerson);

    this.projectChange.emit();

    return id;
  }

  getPeople(): Person[] {
    return this.project.people;
  }

  getPerson(id: string): Person {
    return this.getPeople().filter(p => p.id == id)[0];
  }

  removePerson(id: string): string {
    this.logChange(ProjectdataService.CHANGE_ID_REMOVED_PERSON, this.getPeople().find(p => p.id === id), {});
    this.project.people = this.getPeople().filter(p => p.id !== id);

    this.projectChange.emit();

    return id;
  }

  createCategory(boardId: string, name: string) {
    this.logChange(ProjectdataService.CHANGE_ID_CREATED_CATEGORY, {}, name, boardId);
    this.getBoard(boardId).categories.push(name);
    this.projectChange.emit();
  }

  renameCategory(boardId: string, oldName: string, newName: string) {
    this.logChange(ProjectdataService.CHANGE_ID_RENAMED_CATEGORY, oldName, newName, boardId);
    this.getTasks(boardId, oldName).forEach(task => task.category = newName);
    this.getBoard(boardId).categories = this.getBoard(boardId).categories.map(cat => cat === oldName ? newName : cat);
    this.projectChange.emit();
  }

  removeCategory(boardId: string, name: string) {
    this.logChange(ProjectdataService.CHANGE_ID_REMOVED_CATEGORY, name, {});
    this.getTasks(boardId, name).forEach(task => this.removeTask(boardId, task.id));
    this.getBoard(boardId).categories = this.getBoard(boardId).categories.filter(cat => cat !== name);
    this.projectChange.emit();
  }

  getBoard(boardId: string): Board {
    return this.project.boards.find(b => b.id === boardId);
  }

  getBoards(): Board[] {
    return this.project.boards;
  }

  createBoard(board: Board): string {
    let id = this.util.guid();
    board.id = id;
    this.project.boards.push(board);

    this.logChange(ProjectdataService.CHANGE_ID_CREATED_BOARD, {}, board, board.id);
    this.boardMetaChange.emit();
    this.projectChange.emit();

    return id;
  }

  /**
   * Remove the board with the given ID. Beware, problems can occur if the current board gets removed.
   * The caller has to make sure that the currentBoard variable in the session gets changed accordingly to
   * a different board. If the only board in the project is being removed using this method, this method
   * makes sure to create a new default board to make sure that there is always one board in the project.
   * @param boardId
   */
  removeBoard(boardId: string) {
    //this.logChange(ProjectdataService.CHANGE_ID_REMOVED_BOARD,
    //  this.project.boards.find(board => board.id === boardId), {}, boardId);
    this.project.boards = this.project.boards.filter(board => board.id !== boardId);

    if (this.project.boards.length == 0) {
      this.createBoard({id: null, tasks: [], categories: [], name: 'Default board'});
    }

    this.boardMetaChange.emit();
    this.projectChange.emit();
  }

  hasBoard(boardId: string) {
    return this.project.boards.find(board => board.id === boardId) ? true : false;
  }

  getTask(boardId: string, taskId: string): Task {
    return this.util.clone(this.getBoard(boardId).tasks.find(p => p.id == taskId));
  }

  createTask(boardId: string, task: Task): string {
    let id = this.util.guid();

    this.getBoard(boardId).tasks.push(task);

    this.logChange(ProjectdataService.CHANGE_ID_CREATED_TASK, {}, task, boardId);
    this.projectChange.emit();

    return id;
  }

  getTasks(boardId: string, category: string): Task[] {
    return this.getBoard(boardId).tasks.filter(t => t.category === category);
  }

  modifyTask(boardId: string, taskId: string, modifiedTask: Task): string {
    this.logChange(ProjectdataService.CHANGE_ID_MODIFIED_TASK, this.getBoard(boardId).tasks.find(t => t.id === taskId), modifiedTask, boardId);

    this.getBoard(boardId).tasks = this.getBoard(boardId).tasks.filter(t => t.id !== taskId);
    this.getBoard(boardId).tasks.push(modifiedTask);

    this.projectChange.emit();

    return modifiedTask.id;
  }

  removeTask(boardId: string, taskId: string) {
    this.logChange(ProjectdataService.CHANGE_ID_REMOVED_TASK, this.getBoard(boardId).tasks.find(t => t.id === taskId), {}, boardId);
    this.getBoard(boardId).tasks = this.getBoard(boardId).tasks.filter(task => task.id !== taskId);
    this.projectChange.emit();
  }

}
