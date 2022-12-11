import {defineConfig} from 'orval'

export default defineConfig({
    danae: {
        input: {
            target: './swagger.json',
            validation: false
        },
        output: {
            workspace: 'libs/SDK',
            target: 'core.ts',
            mode: 'tags-split',
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
