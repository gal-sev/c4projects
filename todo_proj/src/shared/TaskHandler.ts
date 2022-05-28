import { Task } from "./Task";
import { StorageHandler } from "./StorageHandler";

export class TaskHandler {
  tasks: Task[];
  sth: StorageHandler;

  constructor() {
    this.tasks = [];
    this.sth = new StorageHandler();
  }

  addTask(text: string): void {
    let new_task: Task = new Task({finished: false, text: text});
    this.createTaskHTML(text, this.tasks.length);
    this.tasks.push(new_task);
    this.sth.storeTask(new_task, this.tasks.length);
  }

  removeTask(index: number): void {    
    this.tasks.splice(index, 1);
    const task_el = document.getElementById("task_" + index) as HTMLElement;
    if(task_el.parentNode != null) {
      task_el.parentNode.removeChild(task_el);
    }
    this.sth.unstoreTask(index+1);
    this.reorderTaskIDs(index);
  }

  toggleTask(index: number): void {
    this.tasks[index].finished = !this.tasks[index].finished;    
    this.sth.storeTask(this.tasks[index], index+1);

    const task_el = document.getElementById("task_" + index) as HTMLDivElement;
    if(this.tasks[index].finished) {
      task_el.children[1].className = "taskInputFinished";
    } else {
      task_el.children[1].className = "taskInput";
    }
  }

  editTask(index: number, text: string): void {
    this.tasks[index].text = text;
    this.sth.storeTask(this.tasks[index], index+1);
  }

  //sort the others when removing instead?
  reorderTaskIDs(start: number): void {
    const all_tasks = document.getElementsByClassName("task") as HTMLCollectionOf<HTMLElement>;
    for (let i = start; i < all_tasks.length; i++) {
      all_tasks[i].id = "task_" + String(i);
      this.sth.changeTaskKey(i+2, i+1);
    }

  }

  createTaskHTML(text: string, index: number, mark_checkbox?: boolean): void {
    const task_list = document.getElementById("taskList") as HTMLDivElement;
    const task_div: HTMLDivElement = document.createElement("div");
    task_div.className = "task";
    task_div.id = "task_" + index;
    
    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    if(mark_checkbox !== undefined) {
      checkbox.checked = mark_checkbox;
    }
    checkbox.onclick = () => {
      this.toggleTask(Number(task_div.id.substring(5)));
    };
    task_div.appendChild(checkbox);

    const text_inp_p: HTMLInputElement = document.createElement("input");
    text_inp_p.type = "text";
    text_inp_p.className = "taskInput";
    if(mark_checkbox === true) {
      text_inp_p.className = "taskInputFinished";
    } else {
      text_inp_p.className = "taskInput";
    }
    text_inp_p.value = text;
    text_inp_p.onblur = () => {
      this.editTask(Number(task_div.id.substring(5)), text_inp_p.value);
    }
    /*text_inp_p.onkeyup = (e) => {
      if(e.key === "Enter") {
        //call blur event?
      }
    }*/
    task_div.appendChild(text_inp_p);

    /*const edit_b: HTMLButtonElement = document.createElement("button");
    edit_b.onclick = () => {
      this.editTask(Number(task_div.id.substring(5)), text_inp_p.innerText + 1);
    };
    const edit_i: HTMLElement = document.createElement("i");
    edit_i.classList.add("far", "fa-edit", "editBtn");
    edit_b.appendChild(edit_i);
    task_div.appendChild(edit_b);*/

    const remove_b: HTMLButtonElement = document.createElement("button");
    remove_b.onclick = () => {      
      this.removeTask(Number(task_div.id.substring(5)))
    };

    const remove_i: HTMLElement = document.createElement("i");
    remove_i.classList.add("far", "fa-trash-alt", "removeBtn");
    remove_b.appendChild(remove_i);
    task_div.appendChild(remove_b);

    task_list.appendChild(task_div);
  }

  loadStorage() {
    let storage: any[] = this.sth.getAllTasks();
    for (let i = 0; i < storage.length; i++) {
      let new_task: Task = new Task({finished: storage[i].finished, text: storage[i].text});
      this.createTaskHTML(new_task.text, this.tasks.length, storage[i].finished);
      this.tasks.push(new_task);
      
    }
  }

}
