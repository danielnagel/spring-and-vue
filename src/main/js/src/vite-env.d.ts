/// <reference types="vite/client" />

type Employee = {
    [key: string]: string;
    firstName: string;
    lastName: string;
    description: string;
    uri?: string;
};

type ApiGetRequest = {
    _embedded: ApiGetEmployeesRequestBody,
}

type ApiGetEmployeesRequestBody = {
    employees: Employee[];
};