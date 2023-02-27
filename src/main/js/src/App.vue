<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import EmployeeList from "./components/EmployeeList.vue";
import { Client, Link, Resource, State } from "ketting";
import CreateForm from "./components/CreateForm.vue";

const state: Ref<{ employees: Array<Employee>, pageSize: number, links: Link[], attributes: string[] }> = ref({ employees: [], pageSize: 2, links: [], attributes: [] });
const root = "/api";
const client = new Client(root);

const loadFromServer = async (pageSize: number) => {
    const employeesRes = await client.follow("employees", { size: pageSize });
    let employeeCollection = await getEmployees(employeesRes);
    const employeeSchemaRes = client.go(employeeCollection.links.get("profile"));
    const employeeSchemaState = await employeeSchemaRes.get({
        headers: {
            "Accept": "application/schema+json"
        }
    });
    const schema = employeeSchemaState.data;
    state.value.attributes = Object.keys(schema.properties);
}

const updatePageSize = (pageSize: number): void => {
    if (pageSize !== state.value.pageSize) {
        state.value.pageSize = pageSize;
        loadFromServer(pageSize);
    }
}

const getEmployees = async (res: Resource<any>): Promise<State<any>> => {
    let employeeCollection = await res.get();
    let embedded = employeeCollection.getEmbedded();
    // disables caching, which doesn't work currently
    if (embedded.length === 0) {
        employeeCollection = await res.refresh();
    }
    state.value.employees = employeeCollection.getEmbedded().map(e => e.data);
    state.value.links = employeeCollection.links.getAll();
    return employeeCollection;
}

const navigate = async (navUri: string) => {
    const employeesRes = client.go(navUri);
    await getEmployees(employeesRes);
}

const handleNavigation = async (dest: string) => {
    for (const link of state.value.links) {
        if (dest === link.rel) {
            await navigate(link.href);
            return;
        }
    }
}

const handleNewEmployee = async (newEmployee: Employee): Promise<void> => {
    const employeesRes = await client.follow("employees");
    await employeesRes.post({data: newEmployee, headers: {"Content-Type": "application/json"}});
    await loadFromServer(state.value.pageSize);
    await handleNavigation("last");
}

onMounted(async () => {
    await loadFromServer(state.value.pageSize);
});
</script>

<template>
    <div class="w-full p-8 flex justify-center">
        <div class="w-1/2 flex flex-col">
            <EmployeeList :employees="state.employees" :page-size="state.pageSize" @update-page-size="updatePageSize"
                @navigate="handleNavigation">
            </EmployeeList>
        </div>
        <CreateForm :attributes="state.attributes" @submit="handleNewEmployee" class="ml-4" />
    </div>
</template>
