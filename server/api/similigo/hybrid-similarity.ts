export default defineEventHandler(async event => {
    const body = await readBody(event)
    console.log("body", body)
    return {
        matches: [
            {
                text: "Bonjour le monde",
                score: 1
            },
            {
                text: "Bonjour le monde",
                score: 1
            },
            {
                text: "Salut tout le monde",
                score: 0.4861234
            }
        ]
    }
})