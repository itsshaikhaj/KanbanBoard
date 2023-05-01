import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  newTask: any;

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'First task', stage: 0 },
      { name: 'Second task', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  createTask() {
    if (!this.newTask) {
      return;
    }
    this.tasks.push({
      name: this.newTask,
      stage: 0
    })

    this.newTask = '';
    this.configureTasksForRendering();
  }

  next(task: any) {
    this.tasks = this.tasks.map((e: any) => {
      if (e.name == task.name) {
        e.stage = task.stage + 1
      }
      return e;
    });
    this.configureTasksForRendering();
  }

  back(task: any) {
    this.tasks = this.tasks.map((e: any) => {
      if (e.name == task.name) {
        e.stage = task.stage - 1
      }
      return e;
    });
    this.configureTasksForRendering();
  }

  delete(task) {
  this.tasks = this.tasks.filter(e => {
    if (e.name != task?.name) {
      return e;
    }

  });
  this.configureTasksForRendering();
  }


  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}
