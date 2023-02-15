<script setup lang="ts">
const props = defineProps<{employee: Employee;}>();
</script>

<template>
    <tr>
        <td class="border border-zinc-600">{{employee.firstName}}</td>
        <td class="border border-zinc-600">{{employee.lastName}}</td>
        <td class="border border-zinc-600">{{employee.description}}</td>
    </tr>
</template>