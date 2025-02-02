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
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoPayload } from './interface/todo-payload.interface';
import { TodoService } from './service/todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entity/todo.entity';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @ApiOperation({ summary: "Get all ToDo's" })
  @ApiOkResponse({
    description: 'ToDo Entities',
    type: Todo,
    isArray: true,
  })
  @Get()
  getAllTodo(): Promise<TodoPayload[]> {
    return this.todoService.getAllTodo();
  }

  @ApiOperation({ summary: 'Create ToDo entity' })
  @ApiOkResponse({
    description: 'Created ToDo Entity',
    type: Todo,
  })
  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() todoDto: CreateTodoDto): Promise<TodoPayload> {
    return this.todoService.createTodo(todoDto);
  }

  @ApiOperation({ summary: 'Update ToDo entity' })
  @ApiParam({ name: 'id', required: true, example: 12, description: 'ToDo ID you want to update' })
  @ApiOkResponse({
    description: 'Updated ToDo Entity',
    type: Todo,
  })
  @Patch('/:id')
  updateTodoById(@Param('id', ParseIntPipe) id: number, @Body() todoDto: UpdateTodoDto): Promise<TodoPayload> {
    return this.todoService.updateTodoById(id, todoDto);
  }

  @ApiOperation({ summary: 'Delete ToDo entity' })
  @ApiParam({ name: 'id', required: true, example: 12, description: 'ToDo ID you want to delete' })
  @Delete('/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.deleteTodoById(id);
  }
}
