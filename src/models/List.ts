import { Todo } from './TodoItem'
export class List {
    Name: string;

    Todos: Array<Todo>;

    constructor(name: string, color: string, todos: Array<Todo>) {
        this.Name = name;

        this.Todos = todos;
    }
}