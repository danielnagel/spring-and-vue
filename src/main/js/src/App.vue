<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import EmployeeList from "./components/EmployeeList.vue";
import { Client, Link } from "ketting";

const state: Ref<{ employees: Array<Employee>, pageSize: number, links: Link[], attributes: string[] }> = ref({ employees: [], pageSize: 2, links: [], attributes: [] });

const loadFromServer = async (pageSize: number) => {

    const root = "/api";
    const client = new Client(root);
    const employeesRes = await client.follow("employees", { size: pageSize });
    const employeeCollection = await employeesRes.get();
    state.value.employees = employeeCollection.getEmbedded().map(e => e.data);
    state.value.links = employeeCollection.links.getAll();
    const employeeSchemaRes = client.go(employeeCollection.links.get("profile"));
    const employeeSchemaState = await employeeSchemaRes.get({
        headers: {
            "Accept": "application/schema+json"
        }
    });
    const schema = employeeSchemaState.data;
    state.value.attributes = Object.keys(schema.properties);

}

onMounted(async () => {
    await loadFromServer(state.value.pageSize);
});
</script>

<template><EmployeeList :employees="state.employees"></EmployeeList></template>
