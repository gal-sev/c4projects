export interface TaskI{
  finished: boolean;
  text: string;
}

export class Task implements TaskI {
   finished: boolean;
   text: string;

   constructor(task: TaskI) {
     this.finished = task.finished;
     this.text = task.text;
   }
}
