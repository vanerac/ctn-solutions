import {defineConfig} from 'orval'

export default defineConfig({
    danae: {
        input: {
            target: './swagger.json',
            validation: false
        },
        output: {
            workspace: 'libs/http/src/lib',
            target: 'sdk.ts',
            mode: 'single',
            prettier: true,
            headers: true,
            client: 'swr',
            // override: {
            //     useDeprecatedOperations: true,
            //     useDates: true,
            //     mutator: {
            //         path: 'fetch.ts',
            //         name: 'fetch'
            //     }
            // }
        }
    }
})
