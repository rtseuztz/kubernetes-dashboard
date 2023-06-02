import { pods } from './data';

export async function load({ depends }) {
    depends('pods');
    return { pods };
};
