import React, {useState} from 'react';
import {mount} from 'enzyme';
import {TreeView} from '@sberbusiness/triplex/components/TreeView/TreeView';
import {TreeViewNode} from '@sberbusiness/triplex/components/TreeView/components/TreeViewNode';

describe('TreeViewNode', () => {
    beforeEach(() => {
        allure.feature('TreeViewNode');
    });

    it('correct calculate lastNode', () => {
        const TestTree: React.FC = () => {
            const [ids, setIds] = useState(['1', '2']);

            return (
                <div>
                    <TreeView>
                        {ids.map((id, index) => (
                            <TreeViewNode key={id} id={id} prevNodeId={ids[index - 1]} nextNodeId={ids[index + 1]} data-test-id={id}>
                                {({isLastNode}) => <div>{isLastNode ? 'lastNode' : 'notLastNode'}</div>}
                            </TreeViewNode>
                        ))}
                    </TreeView>
                    <button onClick={() => setIds(['0', ...ids, '3'])}>Обновить дерево</button>
                </div>
            );
        };
        const tree = mount(<TestTree />);

        expect(tree.find('li[data-test-id="1"]').text()).toBe('notLastNode');
        expect(tree.find('li[data-test-id="2"]').text()).toBe('lastNode');

        // Обновление дерева.
        tree.find('button').simulate('click');
        // Rerender.
        tree.setProps({});

        expect(tree.find('li[data-test-id="0"]').text()).toBe('notLastNode');
        expect(tree.find('li[data-test-id="1"]').text()).toBe('notLastNode');
        expect(tree.find('li[data-test-id="2"]').text()).toBe('notLastNode');
        expect(tree.find('li[data-test-id="3"]').text()).toBe('lastNode');
    });
});
