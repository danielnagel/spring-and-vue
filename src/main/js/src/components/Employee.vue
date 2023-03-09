<script setup lang="ts">
defineProps<{ employee: Employee; }>();
const emit = defineEmits<{
    (e: "deleteEmployee", payload: Employee): void
}>();
</script>

<template>
    <tr>
        <td class="border border-zinc-600 py-1 px-3">{{ employee.firstName }}</td>
        <td class="border border-zinc-600 py-1 px-3">{{ employee.lastName }}</td>
        <td class="border border-zinc-600 py-1 px-3">{{ employee.description }}</td>
        <td class="border border-zinc-600 py-1 px-3">
            <button
                class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 px-1"
                @click="emit('deleteEmployee', employee)"
            >
                Delete
            </button>
        </td>
    </tr>
</template>