<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Employee from './Employee.vue';
const props = defineProps<{employees: Array<Employee>; pageSize: number}>();
const emit = defineEmits<{
	(e: "updatePageSize", pageSize: number): void,
	(e: "navigate", location: string): void
}>()

const pageSizeRef = ref("");

const handleInput = (event: Event) => {
	event.preventDefault();
	if(!(event instanceof InputEvent) || event.data === null) return;

	if(/^[0-9]+$/.test(event.data)) {
		try {
			pageSizeRef.value = event.data;
			const pageSize = parseInt(event.data);
			emit("updatePageSize", pageSize);
		} catch ( e: unknown ) {
			if(e instanceof Error)
				console.error(`Could not update page size. Original message: ${e.message}`);
			console.log(e);
		}
	}
}

onMounted(() => {
	pageSizeRef.value = props.pageSize.toString();
})
</script>

<template>
	<input :value="pageSizeRef" @input="handleInput">
	<table class="table-auto border-collapse border border-zinc-400">
		<thead class="bg-zinc-700">
			<tr>
				<th class="border border-zinc-500 px-6 py-3">First Name</th>
				<th class="border border-zinc-500 px-6 py-3">Last Name</th>
				<th class="border border-zinc-500 px-6 py-3">Description</th>
			</tr>
		</thead>
		<tbody class="bg-zinc-800">
			<Employee v-for="(e, index) of props.employees" :key="index" :employee="e"></Employee>
		</tbody>
	</table>
	<div class="p-2 flex space-x-4 justify-center">
		<button class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 px-3" @click="e => emit('navigate', 'first')">&lt;&lt;</button>
		<button class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 px-3" @click="e => emit('navigate', 'prev')">&lt;</button>
		<button class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 px-3" @click="e => emit('navigate', 'next')">&gt;</button>
		<button class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 px-3" @click="e => emit('navigate', 'last')">&gt;&gt;</button>
	</div>
</template>