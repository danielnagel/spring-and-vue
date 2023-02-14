<script setup lang="ts">
import Employee from './Employee.vue';
const props = defineProps<{employees: Array<Employee>;}>();
</script>

<template>
	<table>
		<tbody>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Description</th>
			</tr>
			<Employee v-for="(e, index) of props.employees" :key="index" :employee="e"></Employee>
		</tbody>
	</table>
</template>