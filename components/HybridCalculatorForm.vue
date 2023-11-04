<script setup lang="ts">

const DefaultNgramSize = 2
const DefaultWordWeight = 0.5
const DefaultNgramWeight = 0.3
const DefaultContainmentWeight = 0.2

const text = ref('')
const textToCompare = ref('')
const nGramSize = ref(DefaultNgramSize)
const nGramWeight = ref(DefaultNgramWeight)
const wordWeight = ref(DefaultWordWeight)
const containmentWeight = ref(DefaultContainmentWeight)

const emit = defineEmits({})


const handleSubmit = () => {
    const formData = {
        string1: text.value,
        string2: textToCompare.value,
        ngramSize: nGramSize.value,
        ngramSimWeight: nGramWeight.value,
        wordSimWeight: wordWeight.value,
        containmentSimWeight: containmentWeight.value,
    }
    emit('form-submitted', formData);

};
</script>

<template>
    <div>
        <form>
            <div class="form-group">
                <div class="field-input max-w-24rem">
                    <label>Your Text</label>
                    <InputText type="text" v-model="text"/>
                </div>
            </div>

            <div class="form-group">
                <div class="field-input max-w-24rem">
                    <label>Compare with</label>
                    <InputText type="text" v-model="textToCompare"/>
                </div>
            </div>
            <div class="form-group">
                <div class="field-input max-w-10rem">
                    <label>NGram Size</label>
                    <InputNumber v-model="nGramSize" inputId="integeronly" showButtons :step="1"/>
                </div>
                <div class="field-input max-w-10rem">
                    <label>NGram Weight</label>
                    <InputNumber v-model="nGramWeight" inputId="integeronly" showButtons :step="0.1"/>
                </div>
                <div class="field-input max-w-10rem">
                    <label>Word Weight</label>
                    <InputNumber v-model="wordWeight" inputId="integeronly" showButtons :step="0.1"/>
                </div>
                <div class="field-input max-w-10rem">
                    <label>Containment Weight</label>
                    <InputNumber v-model="containmentWeight" inputId="integeronly" showButtons :step="0.1"/>
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

.field-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 10px;
}

</style>