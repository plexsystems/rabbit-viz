import { IClusterDefinition, createDefaultClusterDefinition } from './ClusterDefinition';

describe('createDefaultClusterDefinition', () => {
    test('should return correct default cluster definition', () => {
        const expected: IClusterDefinition = {
            definition: {
                bindings: [],
                exchanges: [],      
                parameters: [],
                policies: [],
                queues: [],
                vhosts: [],
            },
            isValid: true,
            validate: (editor: any, data: any, value: string) => null
        };

        const actual = createDefaultClusterDefinition();
        
        expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
    });
});
