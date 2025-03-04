import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todos.schema';

describe('TodosService', () => {
  let service: TodosService;
  let todoModel: any;

  beforeEach(async () => {
    const mockTodoModel = {
      create: jest.fn().mockImplementation((dto) => dto),
      find: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Todo' }]),
      findById: jest
        .fn()
        .mockImplementation((id) =>
          id === '1' ? Promise.resolve({ id: '1', title: 'Test Todo' }) : null,
        ),
      findByIdAndUpdate: jest
        .fn()
        .mockImplementation((id, dto) =>
          id === '1' ? Promise.resolve({ id: '1', ...dto }) : null,
        ),
      findByIdAndDelete: jest
        .fn()
        .mockImplementation((id) =>
          id === '1'
            ? Promise.resolve({ id: '1', title: 'Deleted Todo' })
            : null,
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: getModelToken(Todo.name), useValue: mockTodoModel },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todoModel = module.get(getModelToken(Todo.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const result = await service.createTodo('New Todo');
    expect(result).toEqual({ title: 'New Todo' });
  });

  it('should return all todos', async () => {
    const result = await service.getAllTodos();
    expect(result).toEqual([{ id: '1', title: 'Test Todo' }]);
  });

  it('should return a todo by ID', async () => {
    const result = await service.getTodoById('1');
    expect(result).toEqual({ id: '1', title: 'Test Todo' });
  });

  it('should update a todo', async () => {
    const result = await service.updateTodo('1', { title: 'Updated Todo' });
    expect(result).toEqual({ id: '1', title: 'Updated Todo' });
  });

  it('should delete a todo', async () => {
    const result = await service.deleteTodo('1');
    expect(result).toEqual('Todo Removed Successfully');
  });

});
