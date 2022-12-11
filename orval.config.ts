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
            mode: 'split',
            prettier: true,
            headers: true,
            client: 'swr',
            override: {
                mutator: {
                    path: './custom-instance.ts',
                    name: 'customInstance',
                },
                useDeprecatedOperations: true,
                useDates: true,
            },
        }
    }
})
