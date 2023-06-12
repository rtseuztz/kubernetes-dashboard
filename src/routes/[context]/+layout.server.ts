import { execSync } from 'node:child_process';

export const load = async ({ params, depends }) => {
    execSync(`kubectl config use-context ${params.context}`)
};
