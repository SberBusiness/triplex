```jsx
<Spoiler labelExpand="Развернуть" labelCollapse="Свернуть">
    Content
</Spoiler>
```

### Spoiler Controlled

```jsx
import {ComponentControlPanel} from '../../common/components/ComponentControlPanel/ComponentControlPanel';

const [expanded, setExpanded] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Checkbox checked={expanded} setChecked={setExpanded}>
            Expanded
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" expanded={expanded} toggle={setExpanded}>
        Content
    </Spoiler>
</>
```
