<template>
    <div class="app-container">
        <header>
                <h1 class="text-3xl font-bold text-color-secondary">Similigo Web</h1>
        </header>
        <NuxtPage/>
        <footer>
            <a class="text-color-secondary no-underline" href="https://github.com/Ojelaidi/similigo" target="_blank">similigo</a>
        </footer>
    </div>
</template>

<style scoped>
.app-container {
    padding: 40px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f0f0f0;
}

header {
    padding-left: 20px;
}


footer {
    margin-top: auto;
    text-align: center;
}
</style>
<script setup>
</script>