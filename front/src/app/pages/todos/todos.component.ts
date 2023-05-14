import { Component } from '@angular/core';

import { Todo } from 'src/app/shared/interfaces/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  todo: Todo = { title: '', description: '' }
  version: number = 1;

  doOnSelect(todo: Todo) {
    this.todo = todo;
  }

  create() {
    this.todo = { title: '', description: '', status: 'new' };
  }

}
