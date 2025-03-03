import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todos.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async createTodo(@Body('title') title: string) {
    return await this.todosService.createTodo(title);
  }

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return await this.todosService.getAllTodos();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return await this.todosService.getTodoById(id);
  }

  @Post('update')
  async updateTodo(
    @Body('id') id: string,
    @Body('updateTodo') updateTodo: Partial<Todo>,
  ) {
    return await this.todosService.updateTodo(id, updateTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.todosService.deleteTodo(id);
  }
}
