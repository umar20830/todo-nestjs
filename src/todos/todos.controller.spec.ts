import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todos.schema';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodosService = {
    createTodo: jest.fn().mockImplementation((title: string) => ({ title })),
    getAllTodos: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Todo' }]),
    getTodoById: jest
      .fn()
      .mockImplementation((id: string) =>
        id === '1' ? Promise.resolve({ id: '1', title: 'Test Todo' }) : null,
      ),
    updateTodo: jest
      .fn()
      .mockImplementation((id: string, updateTodo: Partial<Todo>) =>
        id === '1' ? Promise.resolve({ id: '1', ...updateTodo }) : null,
      ),
    deleteTodo: jest
      .fn()
      .mockImplementation((id: string) =>
        id === '1' ? Promise.resolve('Todo Removed Successfully') : null,
      ),
  };

  beforeEach(async () => {
    const test: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compile();

    controller = test.get<TodosController>(TodosController);
    service = test.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const result = await controller.createTodo('New Todo');
    expect(result).toEqual({ title: 'New Todo' });
  });

  it('should return all todos', async () => {
    const result = await controller.getAllTodos();
    expect(result).toEqual([{ id: '1', title: 'Test Todo' }]);
  });

  it('should return a todo by ID', async () => {
    const result = await controller.getTodoById('1');
    expect(result).toEqual({ id: '1', title: 'Test Todo' });
  });


  it('should update a todo', async () => {
    const result = await controller.updateTodo('1', { title: 'Updated Todo' });
    expect(result).toEqual({ id: '1', title: 'Updated Todo' });
  });


  it('should delete a todo', async () => {
    const result = await controller.deleteTodo('1');
    expect(result).toEqual('Todo Removed Successfully');
  });
});
