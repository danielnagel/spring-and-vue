<script setup lang="ts">
const props = defineProps<{employee: Employee;}>();
</script>

<template>
    <tr>
        <td>{{employee.firstName}}</td>
        <td>{{employee.lastName}}</td>
        <td>{{employee.description}}</td>
    </tr>
</template>