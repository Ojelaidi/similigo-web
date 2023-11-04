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
const excludeWordsInput = ref('');
let excludeWords = [];

const updateExcludeWordsArray = () => {
    excludeWords = excludeWordsInput.value.split(',').map(word => word.trim());
};

const emit = defineEmits({})


const handleSubmit = () => {
    const formData = {
        string1: text.value,
        string2: textToCompare.value,
        ngramSize: nGramSize.value,
        ngramSimWeight: nGramWeight.value,
        wordSimWeight: wordWeight.value,
        containmentSimWeight: containmentWeight.value,
        stopWords: excludeWords,
    }
    emit('form-submitted', formData);

};
</script>

<template>
    <div>
        <form>
            <span class="font-medium text-md text-color-secondary">Calculate similarity between two strings</span>
            <div class="form-group">
                <div class="field-input">
                    <label>Your Text</label>
                    <InputText type="text" v-model="text"/>
                </div>
            </div>

            <div class="form-group">
                <div class="field-input">
                    <label>Compare with</label>
                    <InputText type="text" v-model="textToCompare"/>
                </div>
            </div>
            <div class="form-group">
                <div class="form-group-row">
                    <div class="field-input">
                        <label>NGram Size</label>
                        <InputNumber v-model="nGramSize" inputId="integeronly" showButtons :step="1"/>
                    </div>
                    <div class="field-input">
                        <label>NGram Weight</label>
                        <InputNumber v-model="nGramWeight" inputId="integeronly" showButtons :step="0.1"/>
                    </div>
                </div>

                <div class="form-group-row">
                    <div class="field-input">
                        <label>Word Weight</label>
                        <InputNumber v-model="wordWeight" inputId="integeronly" showButtons :step="0.1"/>
                    </div>
                    <div class="field-input">
                        <label>Containment Weight</label>
                        <InputNumber v-model="containmentWeight" inputId="integeronly" showButtons :step="0.1"/>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="field-input">
                    <label>Words to Exclude</label>
                    <Textarea v-model="excludeWordsInput" placeholder="to,with,into" autoResize rows="5" cols="30" @input="updateExcludeWordsArray" />
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