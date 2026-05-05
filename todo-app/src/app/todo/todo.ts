import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {

  newTask: string = '';
  tasks: any[] = [];

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({
        name: this.newTask,
        isEditing: false
      });
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(index: number) {
    this.tasks[index].isEditing = !this.tasks[index].isEditing;
  }
}