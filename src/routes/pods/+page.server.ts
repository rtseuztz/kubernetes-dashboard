import { pods } from './data';

export const load = ({ depends }) => {
    depends('pods');
    return { pods };
};
