import { Request } from 'express';
import { UserService } from '../services/UserService';
import { UserController } from './UserController';
import { makeMockRequest } from '../__mocks__/mockRequest.mock';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';

describe('UserController', () => {
	const mockUserService: Partial<UserService> = {
		createUser: jest.fn(),
		getAllUsers: jest.fn(),
	};
	const userController = new UserController(mockUserService as UserService);
	const mockResponse = makeMockResponse();

	it('deve adicionar um novo usuário', () => {
		const mockRequest = {
			body: {
				name: 'Elio',
				email: 'Elio@dio.com',
			},
		} as Request;
		userController.createUser(mockRequest, mockResponse);
		expect(mockResponse.state.status).toBe(201);
		expect(mockResponse.state.json).toMatchObject({
			message: 'Usuário Criado',
		});
	});

	it('Deve retornar erro caso o usuário não informe o name', () => {
		const mockRequest = {
			body: {
				name: '',
				email: 'Elio@dio.com',
			},
		} as Request;

		userController.createUser(mockRequest, mockResponse);
		expect(mockResponse.state.status).toBe(400);
		expect(mockResponse.state.json).toMatchObject({
			message: 'bad request! Name e Email Obrigatórios!',
		});
	});

	it('Deve retornar erro caso o usuário não informe o email', () => {
		const mockRequest = {
			body: {
				name: 'Elio',
				email: '',
			},
		} as Request;

		userController.createUser(mockRequest, mockResponse);
		expect(mockResponse.state.status).toBe(400);
		expect(mockResponse.state.json).toMatchObject({
			message: 'bad request! Name e Email Obrigatórios!',
		});
	});

	it('Deve retornar a lista de usuários', () => {
		const mockRequest = makeMockRequest({});
		userController.getAllUsers(mockRequest, mockResponse);
		expect(mockResponse.state.status).toBe(200);
	});

	it('Deve retornar a mensagem de usuário deletado', () => {
		const mockRequest = {
			body: {
				name: 'Elio',
				email: '',
			},
		} as Request;

		userController.deleteUser(mockRequest, mockResponse);
		expect(mockResponse.state.status).toBe(200);
		expect(mockResponse.state.json).toMatchObject({
			message: 'Usuário deletado',
		});
	});
});