<template>
    <div class="flex items-center align-items-center w-full">
        <FileUpload
            mode="basic"
            name="json-file"
            accept="application/json"
            :maxFileSize="1000000"
            custom-upload
            @uploader="onUpload"
            :disabled="uploadedFile"
        />
        <div v-if="uploadedFile" class="ml-2 w-full bg-white uploaded-card">
            <div class="flex flex-row justify-between items-center px-2">
                <p class="font-medium flex-1">{{ uploadedFile.name }}</p>
                <Button class="text-sm" text @click="removeUploadedFile" severity="danger">remove</Button>
            </div>
        </div>
    </div>


  <!-- Multiple files -->
  <!--    <FileUpload class="file-uploader" name="json-file" custom-upload @uploader="onUpload($event)" :multiple="true" :maxFileSize="1000000">-->
  <!--        <template #empty>-->
  <!--            <p>Drag and drop files to here to upload.</p>-->
  <!--        </template>-->
  <!--    </FileUpload>-->
</template>

<script setup>
import FileUpload from 'primevue/fileupload';
import {ref} from 'vue';

const jsonData = ref(null);
const emit = defineEmits({})
const uploadedFile = ref(null)

const onUpload = (event) => {
    const loadedFile = event.files[0]
    uploadedFile.value = loadedFile

    if (loadedFile && loadedFile.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                jsonData.value = JSON.parse(e.target.result);
                console.log(jsonData.value)
                //TODO: convert json data to list but how ?
                emit('json-loaded', jsonData.value);
            } catch (error) {
                console.error('parsing JSON file:', error);
            }
        };

        reader.readAsText(loadedFile);
    } else {
        console.error('Please upload a valid JSON file.');
    }
};
const removeUploadedFile = () => {
    uploadedFile.value = null
}

</script>

<style scoped>

.uploaded-card {
    border-radius: 10px;
}

</style>
