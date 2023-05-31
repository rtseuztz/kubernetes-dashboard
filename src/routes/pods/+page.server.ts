import { pods } from './data';

export const load = ({ depends }) => {
    depends('pods');
    console.log("reloading pods")
    return { pods };
};
