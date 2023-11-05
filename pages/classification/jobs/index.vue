<script setup>
import VueJsonPretty from 'vue-json-pretty'
import BestMatchJobForm from "~/components/BestMatchJobForm.vue";

const isLoading = ref(false);
const apiData = ref(null)

const handleBestMatchJobSubmit = async (formData) => {
    isLoading.value = true;
    const {data} = await useFetch('/api/similigo/best-job-matches', {
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
            <BestMatchJobForm @form-submitted="handleBestMatchJobSubmit"/>
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
                    <div v-if="apiData" class="actions text-color-secondary ">
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
    right: 40px;
    top: 20px;
}

.right-column .vjs-tree {
    max-height: 70vh;
    overflow-y: scroll;
}

/* width */
.right-column .vjs-tree::-webkit-scrollbar {
    width: 5px;
}

/* Track */
.right-column .vjs-tree::-webkit-scrollbar-track {
    background: none;
    border-radius: 10px;
}

/* Handle */
.right-column .vjs-tree::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
}

/* Handle on hover */
.right-column .vjs-tree::-webkit-scrollbar-thumb:hover {
    background: var(--text-color-secondary);
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
