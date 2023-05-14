import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from 'src/app/shared/interfaces/todo';
import { TodoService } from 'src/app/shared/services/todo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnChanges {

  @Input() todo: Todo = { title: '', description: '' };

  tempTodo: Todo;
  assetsUrl: string = `${environment.apiUrl}/assets`;

  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    this.tempTodo = this.todo;
  }

  private showSnack(text: string, action: string = '') {
    this.snackBar.open(text, action, {
      verticalPosition: 'top',
      duration: 2000
    });
  }

  ngOnChanges() {
    this.tempTodo = {...this.todo};

    if(!this.todo.files) {
      this.getFiles();
    }
  }

  save() {
    if(this.todo.title) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.todoService.create(this.tempTodo).subscribe({
      next: () => {
        this.todo = this.tempTodo;
        this.showSnack('Created a new task successfully', 'Success');
        this.onSave.emit(this.todo);
      },
      error: () => {
        this.showSnack('Failed to create the task', 'Error');
      }
    });
  }

  update() {
    this.todoService.update(this.tempTodo).subscribe({
      next: () => {
        this.todo = this.tempTodo;
        this.showSnack('Updated the task successfully', 'Success');
        this.onSave.emit(this.todo);
      },
      error: () => {
        this.showSnack('Failed to update the task', 'Error');
      }
    });
  }

  cancel() {
    this.onCancel.emit();
  }

  getFiles() {
    this.todoService.getFiles(this.todo._id!).subscribe({
      next: (response) => {
        this.todo.files = response;
      },
      error: () => {
        this.showSnack('Failed to get attachments', 'Error');
      }
    });
  }
}
