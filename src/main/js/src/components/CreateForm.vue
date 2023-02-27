<script setup lang="ts">
const props = defineProps<{ attributes: string[] }>();
const emit = defineEmits<{
    (e: "submit", newEmployee: Employee): void
}>();

const handleSubmit = (event: Event) => {
    event.preventDefault();
    if(!(event instanceof SubmitEvent)) return;
    if(!(event.target instanceof HTMLFormElement)) return;
    const newEmployee: Employee = { firstName: "", lastName: "", description: "" };
    for(const attr of props.attributes) {
        const foundElement = event.target.children.namedItem(attr);
        if(!(foundElement instanceof HTMLInputElement)) continue;
        // add input value to object
        newEmployee[attr] = foundElement.value.trim();
        // clear input
        foundElement.value = "";
    }
    emit("submit", newEmployee);
}
</script>

<template>
    <div class=" text-zinc-100 flex flex-col justify-center">
        <h2 class="font-bold">Create new employee!</h2>
        <form @submit="handleSubmit" class="w-full flex flex-col">
            <input v-for="(a, index) of attributes" :key="index" type="text" :placeholder="a" :name="a" class="p-1 m-1 bg-zinc-500 border-zinc-700 text-zinc-200" />
            <button type="submit" class="bg-zinc-500 hover:bg-zinc-700 text-zinc-200 p-1 m-1">Create</button>
        </form>
    </div>
</template>