<script setup lang="ts">
import {onMounted, ref, Ref} from "vue";
import {getApi} from "./utils/api";
import EmployeeList from "./components/EmployeeList.vue";

const state: Ref<{employees: Array<Employee>}> = ref({employees: []});

onMounted(async () => {
    try {
        const result = await getApi("/api/employees")
        state.value.employees = result._embedded.employees;
    } catch (e: unknown) {
        if(e instanceof Error) {
            console.error(`Could not GET /api/employees, original message: ${e.message}`)
        } else {
            console.log(e);
        }
    }
});
</script>

<template>
  <EmployeeList :employees="state.employees"></EmployeeList>
</template>
