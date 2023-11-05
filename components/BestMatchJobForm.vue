<script setup lang="ts">

const DefaultNBestMatch = 2 // Number of best matches to find

const text = ref('')
const n = ref(DefaultNBestMatch)

const emit = defineEmits({})

const handleSubmit = () => {
    const formData = {
        offerTitle: text.value,
        n: n.value,
    }
    emit('form-submitted', formData);

};
</script>

<template>
    <div>
        <form>
            <span class="font-medium text-md text-color-secondary">Find best seo match for a job offer title.</span>
            <div class="form-group">
                <div class="field-input">
                    <label>Job Offer Title</label>
                    <InputText type="text" v-model="text"/>
                </div>
            </div>

            <div class="form-group">
                <div class="field-input">
                    <label>Number of best matches to find</label>
                    <InputNumber v-model="n" inputId="integeronly" showButtons :step="1"/>
                </div>
            </div>

            <div class="form-group">
                <Button @click="handleSubmit">Calculer</Button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.form-group {
    margin-top: 20px;
}

.form-group-row {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    max-width: 60%
}

.field-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 10px;
    max-width: 34rem
}

@media screen and (max-width: 1024px) {
    form {
        padding: 10px
    }

    .form-group-row {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        max-width: 100%;
    }

    .field-input {
        width: 100%;
    }
}
</style>