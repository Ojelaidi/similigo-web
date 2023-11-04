<script setup>
import VueJsonPretty from 'vue-json-pretty'
import HybridCalculatorForm from "~/components/HybridCalculatorForm.vue";

const isLoading = ref(false);
const apiData = ref(null)
const handleHybridFormSubmission = async (formData) => {
    isLoading.value = true;
    const {data} = await useFetch('/api/similigo/hybrid-similarity', {
        method: 'POST', body: formData
    })
    apiData.value = data.value
    isLoading.value = false
};


const copyToClipboard = () => {
    const jsonContent = JSON.stringify(apiData.value, null, 2);
    const textarea = document.createElement('textarea');
    textarea.value = jsonContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log("here", jsonContent)
}

</script>

<template>
    <div class="container">
        <div class="left-column">
            <HybridCalculatorForm @form-submitted="handleHybridFormSubmission"/>
        </div>
        <div class="right-column">
            <div>
                <ProgressSpinner
                        v-if="isLoading"
                        style="width: 50px; height: 50px"
                        strokeWidth="8"
                        fill="var(--surface-ground)"
                        animationDuration=".5s"
                        aria-label="fetching data"
                />
                <div v-else>
                    <vue-json-pretty :data="apiData ? apiData : 'Waiting for your demand..'"/>
                    <div class="actions">
                        <i class="pi pi-copy" v-tooltip="'Copier contenu'" style="font-size: 1.8rem"
                           @click="copyToClipboard"></i>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.left-column {
    background-color: #f0f0f0;
}

.right-column {
    border: 1px solid #e0e0e0;
    padding: 20px;
    background: whitesmoke;
    position: relative;
}

.right-column .actions {
    position: absolute;
    right: 10px;
    top: 10px;
}

.right-column .actions:hover {
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }

    .right-column {
        margin-top: 30px;
    }
}
</style>
