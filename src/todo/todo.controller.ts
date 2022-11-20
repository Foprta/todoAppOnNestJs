import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoPayload } from './interface/todo-payload.interface';
import { TodoService } from './service/todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodo(): Promise<TodoPayload[]> {
    return this.todoService.getAllTodo();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() todoDto: CreateTodoDto): Promise<TodoPayload> {
    return this.todoService.createTodo(todoDto);
  }

  @Patch('/:id')
  updateTodoById(@Param('id', ParseIntPipe) id: number, @Body() todoDto: UpdateTodoDto): Promise<TodoPayload> {
    return this.todoService.updateTodoById(id, todoDto);
  }

  @Delete('/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.todoService.deleteTodoById(id);
  }
}
