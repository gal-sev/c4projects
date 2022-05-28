// import { Task } from './shared/Task';
import { TaskHandler } from './shared/TaskHandler';

window.addEventListener('load', mainFunc);

let tasks = new TaskHandler();

function mainFunc(): void {
    console.log("loading tasks");
    tasks.loadStorage();


}

export function addTask(): void {
    const input = document.getElementById("input_main_task") as HTMLInputElement;
    if(input.value != "") {
        tasks.addTask(input.value);
        input.value = "";
    } else {
        console.log("Write text before adding task");
        
    }
}

export function clearAllTasks(): void {
    tasks.clearStorage();
}