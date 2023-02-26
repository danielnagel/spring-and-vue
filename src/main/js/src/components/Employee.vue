<script setup lang="ts">
const props = defineProps<{employee: Employee;}>();
</script>

<template>
    <tr>
        <td class="border border-zinc-600 py-1 px-3">{{employee.firstName}}</td>
        <td class="border border-zinc-600 py-1 px-3">{{employee.lastName}}</td>
        <td class="border border-zinc-600 py-1 px-3">{{employee.description}}</td>
    </tr>
</template>