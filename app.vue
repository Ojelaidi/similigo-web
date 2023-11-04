<script setup>
import VueJsonPretty from 'vue-json-pretty'
import HybridCalculatorForm from "~/components/forms/HybridCalculatorForm.vue";
</script>

<template>
    <main>
        <header>
            <h1 class="text-3xl font-bold">Similigo Web</h1>
        </header>
        <div class="container">
            <div class="left-column">
                <HybridCalculatorForm />
            </div>
            <div class="right-column">
                <div>
                    <vue-json-pretty :data="{ key: 'value' }" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    padding: 20px;
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.left-column {
    background-color: #f0f0f0;
    padding: 20px;
}

.right-column {
    border: 1px solid #e0e0e0;
    padding: 20px;
}

@media screen and (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>
