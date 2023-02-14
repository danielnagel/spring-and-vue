/// <reference types="vite/client" />

type Employee = {
    firstName: string;
    lastName: string;
    description: string;
};

type ApiGetRequest = {
    _embedded: ApiGetEmployeesRequestBody,
}

type ApiGetEmployeesRequestBody = {
    employees: Employee[];
};