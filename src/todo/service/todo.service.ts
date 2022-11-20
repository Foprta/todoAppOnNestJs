import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoPayload } from '../interface/todo-payload.interface';
import { TodoRepository } from '../repository/todo.repository';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoRepository) private todoRepository: TodoRepository) {}

  async getAllTodo(): Promise<TodoPayload[]> {
    return this.todoRepository.getAllTodo();
  }

  async createTodo(todoDto: CreateTodoDto): Promise<TodoPayload> {
    return this.todoRepository.createTodo(todoDto);
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return todo;
  }

  async updateTodoById(id: number, todoDto: UpdateTodoDto): Promise<TodoPayload> {
    const todo = await this.getTodoById(id);

    Object.assign(todo, todoDto);

    await todo.save();

    return {
      id: todo.id,
      title: todo.title,
      done: todo.done,
      createdDate: todo.createdDate,
      updatedDate: todo.updatedDate,
    };
  }

  async deleteTodoById(id: number): Promise<{ message: string }> {
    const todo = await this.todoRepository.delete({ id });

    if (todo.affected === 0) {
      throw new NotFoundException(`This ${id} is not found`);
    }

    return { message: 'Deleted successfully !' };
  }
}
