```jsx noeditor
import {ButtonIcon, EButtonIconShape} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {LikeStsIcon32} from '@sberbusiness/icons/LikeStsIcon32';
import ComponentOptions from '../../../common/components/ComponentOptions/ComponentOptions';
import ComponentPreview from '../../../common/components/ComponentPreview/ComponentPreview';

const [focused, setFocused] = React.useState(false);
const [shape, setShape] = React.useState(EButtonIconShape.SQUIRCLE);
const [active, setActive] = React.useState(false);
const ref = React.useRef(null);

React.useEffect(() => {
    if (focused) {
        ref.current.focus();
    }
}, [focused]);

const checkboxOptions = [
    {
        id: 'focused',
        label: 'Focused',
        checked: focused,
        onChange: setFocused,
    },
    {
        id: 'active',
        label: 'Active',
        checked: active,
        onChange: setActive,
    },
];

const inputOptions = [
    {
        id: 'shape',
        value: shape,
        onChange: setShape,
        hidden: true,
    },
];

const style = {
    ...(focused) && {padding: '2px'},
};

<>
    <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
    <ComponentPreview style={style}>
        <ButtonIcon active={active} shape={shape} ref={ref}>
            <LikeStsIcon32/>
        </ButtonIcon>
    </ComponentPreview>
</>
```
