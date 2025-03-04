import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todos.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(title: string): Promise<Todo> {
    const newTodo = this.todoModel.create({ title });
    return newTodo;
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find();
  }

  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateTodo(id: string, updatedTodo: Partial<Todo>): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndUpdate(id, updatedTodo, {
      new: true,
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async deleteTodo(id: string): Promise<string> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return 'Todo Removed Successfully';
  }
}
