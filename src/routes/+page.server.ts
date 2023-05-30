import { namespaces } from './data';

export const load = ({ depends }) => {
    depends('namespaces');
    return { namespaces };
};
