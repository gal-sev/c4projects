import { Task } from "./Task";

export class StorageHandler {

  storeTask(new_task: Task, index: number): void {
    localStorage.setItem("Task_" + String(index), JSON.stringify(new_task));
    //location.reload();
  }

  unstoreTask(index: number): void {
    localStorage.removeItem("Task_" + String(index));
  }

  changeTaskKey(startIndex: number, afterIndex: number) {    
    const current_task = JSON.parse(String(localStorage.getItem("Task_" + startIndex)));
    this.unstoreTask(startIndex);
    this.storeTask(current_task, afterIndex);
  }

  getAllTasks(): any[] {
    let output: any[] = [];
    
    for (let i = 1; i < localStorage.length+1; i++) {
      const current_task = JSON.parse(String(localStorage.getItem("Task_" + i)));
      output.push(current_task);
    }
    return output;
  }

  clearAll():void {
    localStorage.clear();
  }

}
