```jsx
import React, {useState} from 'react';
import {StepperExtended} from '@sberbusiness/triplex/components/Stepper/StepperExtended';
import {EStepperStepIconType} from '@sberbusiness/triplex/components/Stepper/StepperStepIcon';
import {CarouselExtended} from '@sberbusiness/triplex/components/CarouselExtended/CarouselExtended';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import './styles.less';

const [selectedStepId, setSelectedStepId] = useState();

const stepPrev = 200;
const stepNext = 200;

const steps = Array.from({length: 10}, (value, index) => (
    {
        id: `stepper-extended-step-${index}`,
        label: 'Completed',
        icon: <StepperExtended.Step.Icon type={EStepperStepIconType.FILLED} />,
    }
));

const renderPrevButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-prev" {...rest} aria-label="Прокрутить назад">
            <TabfoldercarouselleftSrvxIcon32 className="button-prev-icon" />
        </ButtonIcon>
    );

const renderNextButton = ({hidden, ...rest}) =>
    hidden ? null : (
        <ButtonIcon className="button-next" {...rest} aria-label="Прокрутить вперёд">
            <TabfoldercarouselrightSrvxIcon32 className="button-next-icon" />
        </ButtonIcon>
    );

<StepperExtended.Wrapper>
    <CarouselExtended
        className="stepper-extended-carousel"
        buttonPrev={renderPrevButton}
        buttonNext={renderNextButton}
        stepPrev={stepPrev}
        stepNext={stepNext}
    >
            <StepperExtended
                className="stepper-extended"
                selectedStepId={selectedStepId}
                onSelectStep={setSelectedStepId}
            >
                {steps.map(({id, label, icon}) => (
                    <StepperExtended.Step key={id} id={id} icon={icon}>
                        {label}
                    </StepperExtended.Step>
                ))}
            </StepperExtended>
    </CarouselExtended>
    <StepperExtended.Progress value={100} />
</StepperExtended.Wrapper>
```
