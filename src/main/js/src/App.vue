<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import EmployeeList from "./components/EmployeeList.vue";
import { Client, Link } from "ketting";

const state: Ref<{ employees: Array<Employee>, pageSize: number, links: Link[], attributes: string[] }> = ref({ employees: [], pageSize: 2, links: [], attributes: [] });
const root = "/api";
const client = new Client(root);

const loadFromServer = async (pageSize: number) => {
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

const updatePageSize = (pageSize: number): void => {
    if (pageSize !== state.value.pageSize) {
        state.value.pageSize = pageSize;
        loadFromServer(pageSize);
    }
}

const navigate = async (navUri: string) => {
    // get rel and parameters
    const relativeUriStartIndex = navUri.indexOf("employees");
    const relativeUri = navUri.substring(relativeUriStartIndex);
    const pageIndex = relativeUri.indexOf("page=");
    const sizeIndex = relativeUri.indexOf("size=");
    const rel = relativeUri.substring(0, pageIndex - 1);
    const page = relativeUri.substring(pageIndex + 5, sizeIndex - 1);
    const size = relativeUri.substring(sizeIndex + 5);

    // navigate
    const employeesRes = await client.follow(rel, {page, size});
    const employeeCollection = await employeesRes.get();
    state.value.employees = employeeCollection.getEmbedded().map(e => e.data);
    state.value.links = employeeCollection.links.getAll();
}

const handleNavigation = (dest: string) => {
    for(const link of state.value.links) {
        if(dest === link.rel) {
            navigate(link.href);
            return;
        }
    }
}

onMounted(async () => {
    await loadFromServer(state.value.pageSize);
});
</script>

<template>
    <EmployeeList :employees="state.employees" :page-size="state.pageSize" @update-page-size="updatePageSize" @navigate="handleNavigation">
    </EmployeeList>
</template>
