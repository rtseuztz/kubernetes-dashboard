import { contexts, namespaces, pods, services } from './data';
export const load = ({ depends }) => {
    depends('contexts', 'namespaces', 'pods', 'services');
    return { contexts, namespaces, pods, services };
};
