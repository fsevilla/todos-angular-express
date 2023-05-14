import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo';
import { TodoService } from 'src/app/shared/services/todo.service';

interface TodosGrid {
  new: Todo[];
  inProgress: Todo[];
  complete: Todo[];
}

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnChanges {

  @Input() version: number = 0;
  todos: Todo[] = [];
  todosGrid: TodosGrid = {
    new: [],
    inProgress: [],
    complete: []
  }

  @Output() onSelect: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnChanges(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.listAll().subscribe({
      next: (response: Todo[]) => {
        console.log('Respuesta: ', response);
        this.todos = response;

        this.todosGrid.new = this.todos.filter(todo => todo.status === 'new');
        this.todosGrid.inProgress = this.todos.filter(todo => todo.status === 'in progress');
        this.todosGrid.complete = this.todos.filter(todo => todo.status === 'done');
      },
      error: (err) => {
        console.log('Failed: ', err);
      }
    })
  }

  doOnSelect(todo: Todo) {
    this.onSelect.emit(todo);
  }

}
