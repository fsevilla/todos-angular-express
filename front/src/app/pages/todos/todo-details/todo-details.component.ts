import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Todo } from 'src/app/shared/interfaces/todo';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  @Input('item') todo: Todo = {
    title: '',
    description: ''
  }

  @Output() onSelect: EventEmitter<Todo> = new EventEmitter();
  @Output() onDelete: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {}

  private showSnack(text: string, action: string = '') {
    this.snackBar.open(text, action, {
      verticalPosition: 'top',
      duration: 2000
    })
  }

  selectTodo() {
    this.onSelect.emit(this.todo);
  }

  delete() {
    this.todoService.delete(this.todo._id!).subscribe({
      next: () => {
        this.showSnack('Todo deleted successfully', 'Success');
        this.onDelete.emit(this.todo);
      },
      error: () => {
        this.showSnack('Failed to delete the task', 'Error');
      }
    });
  }

  showFileSelector(input: HTMLInputElement) {
    input.click();
  }

  selectFile(e: Event) {
    const input = e.target as HTMLInputElement;
    
    this.todoService.upload(this.todo._id!, input).subscribe({
      next: () => {
        this.todo.files = undefined;
        this.onDelete.emit(this.todo);
        this.showSnack('File uploaded successfully', 'Success');
      },
      error: () => {
        this.showSnack('File not supported', 'Error');
      }
    });
  }

}
