<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue';

const props = defineProps<{show: boolean}>();
const emit = defineEmits<{
    (e: "close"): void
}>();

const dialog: Ref<HTMLDivElement | null> = ref(null);

const showDialog = () => {
    if (dialog.value === null) return;
    dialog.value.classList.remove("hidden")
}

const hideDialog = () => {
    if (dialog.value === null) return;
    dialog.value.classList.add("hidden")
    emit("close")
}

watch(() => props.show, () => {
    if(props.show) {
        showDialog();
    } else {
        hideDialog();
    }
});

onMounted(() => {
    // The modal will close when the user clicks anywhere outside the modal
    window.onclick = (event) => {
        if (dialog.value === null || event.target !== dialog.value) return;
        hideDialog();
    }
});

</script>

<template>
    <!--Overlay Effect-->
    <div class="fixed inset-0 hidden bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full" ref="dialog">

        <!--modal content-->
        <div class="relative top-20 mx-auto p-5 border border-zinc-500 w-96 shadow-lg bg-zinc-900">
            <slot></slot>
        </div>
    </div>
</template>