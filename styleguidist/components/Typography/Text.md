```jsx
import {ETextSize, EFontType, EFontWeight, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';

const [type, setType] = React.useState(EFontType.GENERAL);
const [weight, setWeight] = React.useState(EFontWeight.REGULAR);
const [line, setLine] = React.useState(ELineType.NORMAL);
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
        <ComponentControlPanel.Select
            value={line}
            setValue={setLine}
            options={Object.values(ELineType)}
        >
            Line type
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
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Text size={ETextSize.B1} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B1 Шаблонный текст
        </Text>
        <Text size={ETextSize.B2} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B2 Шаблонный текст
        </Text>
        <Text size={ETextSize.B3} type={type} weight={weight} line={line} underline={underline} strikethrough={strikethrough}>
            B3 Шаблонный текст
        </Text>
    </div>
</>
```
