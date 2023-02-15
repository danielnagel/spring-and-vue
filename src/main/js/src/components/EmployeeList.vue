<script setup lang="ts">
import Employee from './Employee.vue';
const props = defineProps<{employees: Array<Employee>;}>();
</script>

<template>
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
</template>