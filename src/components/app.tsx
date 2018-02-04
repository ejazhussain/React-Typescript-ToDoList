import * as React from "react";


export class App extends React.Component<any, IState>{

    /**
     *
     */
    constructor(props: {}) {
        super(props);

        this.state = {
            currentTask: "",
            tasks: []
        }
    }

    public handleSubmit(e: any): void {
        e.preventDefault();
        this.setState({
            currentTask: "",
            tasks: [
                //this will get all available tasks in the array
                ...this.state.tasks,
                //this will add new task to available array
                {
                    id: this._thisInMilliseconds(),
                    value: this.state.currentTask,
                    completed: false
                }
            ]
        })
    }
    public deleteTask(id: number): void {
        //es6 filter method
        const filteredTasks: Array<ITask> = this.state.tasks.filter(
            (task: ITask) => task.id !== id);
        this.setState({
            tasks: filteredTasks
        });

    }
    public renderTasks(): any {
        return this.state.tasks.map((task: ITask, index: number) => {
            return (
                <div key={index} className="tdl-task">
                    <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
                    <button onClick={() => this.deleteTask(task.id)}>Delete</button>
                    <button onClick={() => this.toggleDone(index)}>{task.completed ? "UnDone" : "Done"}</button>
                </div>
            )
        })
    }

    public toggleDone(index: number): void {
        let task: Array<ITask> = this.state.tasks.splice(index, 1);
        task[0].completed = !task[0].completed;
        const currentTasks: Array<ITask> = [...this.state.tasks, ...task];
        this.setState({ tasks: currentTasks });
    }


    public render() {
        console.log(this.state);
        return (
            <div>
                <h1>React Typescript Todo List</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        className="tdl-input"
                        type="text"
                        value={this.state.currentTask}
                        placeholder="Add a Task"
                        onChange={(e) => this.setState({ currentTask: e.target.value })} />
                    <button type="submit">Add Task</button>
                </form>
                <section>
                    {this.renderTasks()}
                </section>
            </div>
        );
    }

    private _thisInMilliseconds(): number {
        const date: Date = new Date();
        return date.getTime();
    }
}
interface IState {
    currentTask: string;
    tasks: Array<ITask>
}

interface ITask {
    id: number;
    value: string;
    completed: boolean;
}




