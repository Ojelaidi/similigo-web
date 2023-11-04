<script setup>
import VueJsonPretty from 'vue-json-pretty'
import HybridCalculatorForm from "~/components/HybridCalculatorForm.vue";
import BestMatchForm from "~/components/BestMatchForm.vue";

const isLoading = ref(false);
const apiData = ref(null)
const selectedForm = ref('Hybrid');
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
}

</script>

<template>
    <div class="container">
        <div class="left-column">
            <div class="tab flex justify-start gap-5">
                <p  class="tab-btn text-xl text-left text-color-secondary" @click="selectedForm = 'Hybrid'" :class="{ active: selectedForm === 'Hybrid' }">Hybrid</p>
                <p  class="tab-btn text-xl text-color-secondary" @click="selectedForm = 'Best Match'" :class="{ active: selectedForm === 'Best Match' }">Best Match</p>
            </div>
            <div v-if="selectedForm === 'Hybrid'">
                <HybridCalculatorForm @form-submitted="handleHybridFormSubmission" />
            </div>

            <div v-if="selectedForm === 'Best Match'">
                <BestMatchForm @form-submitted="handleBestMatchFormSubmission" />
            </div>
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
                    <div class="actions text-color-secondary ">
                        <i class="pi pi-copy" v-tooltip="'Copy Content'" style="font-size: 1.8rem"
                           @click="copyToClipboard"></i>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.container {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.tab {
}

.tab-btn:focus {
    outline: none;
    border:none;
    box-shadow: none;
}

.tab-btn.active {
  border-bottom: 4px solid var(--primary-color);
}

.tab-btn.active:hover {
    border-bottom: 4px solid var(--primary-color);
}

.tab-btn:hover {
    cursor: pointer;
    border-bottom: 4px solid var(--text-color-secondary);
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

@media screen and (max-width: 992px) {
    .container {
        grid-template-columns: 1fr;
    }

    .right-column {
        margin-top: 30px;
    }
}
</style>
