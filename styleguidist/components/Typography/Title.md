```jsx
import {ETitleSize, EFontType, EFontWeight} from '@sberbusiness/triplex/components/Typography/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [type, setType] = React.useState(EFontType.GENERAL);
const [weight, setWeight] = React.useState(EFontWeight.SEMIBOLD);
const [underline, setUnderline] = React.useState(false);
const [strikethrough, setStrikethrough] = React.useState(false);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={type}
            setValue={setType}
            options={Object.values(EFontType)}
        >
            Font type
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Select
            value={weight}
            setValue={setWeight}
            options={Object.values(EFontWeight)}
        >
            Font weight
        </ComponentControlPanel.Select>
        <ComponentControlPanel.Checkbox checked={underline} setChecked={setUnderline}>
            Underline
        </ComponentControlPanel.Checkbox>
        <ComponentControlPanel.Checkbox checked={strikethrough} setChecked={setStrikethrough}>
            Strikethrough
        </ComponentControlPanel.Checkbox>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <Title size={ETitleSize.H1} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H1 Sample Text
    </Title>
    <Title size={ETitleSize.H2} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H2 Sample Text
    </Title>
    <Title size={ETitleSize.H3} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H3 Sample Text
    </Title>
    <Title size={ETitleSize.H4} type={type} weight={weight} underline={underline} strikethrough={strikethrough}>
        H4 Sample Text
    </Title>
</>
```
