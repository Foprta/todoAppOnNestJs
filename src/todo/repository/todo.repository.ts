import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoPayload } from '../interface/todo-payload.interface';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(todoDto: CreateTodoDto): Promise<Todo> {
    const { title, done } = todoDto;

    const todo = new Todo();

    todo.title = title;
    todo.done = done || false;

    await todo.save();

    return todo;
  }

  async getAllTodo(): Promise<TodoPayload[]> {
    const query = this.createQueryBuilder('todo');

    return query.getMany();
  }
}
