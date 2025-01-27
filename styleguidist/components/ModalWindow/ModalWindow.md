### Default state

```jsx {"file": "./examples/ModalWindow_0_default.jsx"}
```

### Loading state

```jsx {"file": "./examples/ModalWindow_1_loading_state.jsx"}
```

### With TopOverlay

```jsx {"file": "./examples/ModalWindow_2_with_TopOverlay.jsx"}
```

### With scroll

```jsx {"file": "./examples/ModalWindow_3_with_scroll.jsx"}
```

### Disabled focus trap

```jsx {"file": "./examples/ModalWindow_4_disabled_focus_trap.jsx"}
```

### Size SM

```jsx {"file": "./examples/ModalWindow_5_size_SM.jsx"}
```

### Size LG

```jsx {"file": "./examples/ModalWindow_6_size_LG.jsx"}
```

### Custom positioning

ModalWindow может позиционироваться не только относительно экрана устройства, но и относительно некоторого DOM элемента.
При позиционировании относительно DOM элемента, ModalWindow рассчитает левую координату и ширину элемента, и отрендерит себя в этих границах. Верхний отступ ModalWindow от границ экрана будет равен высоте DOM элемента, если отступ не нужен высота элемента должна быть равна 0. При изменении ширины/высоты DOM элемента ModalWindow будет осуществлять re-render.

В примере, если установить флажок Split mode модальное окно будет занимать 70% экрана. Этот флажок также влияет на другие примеры модальных окон.

```jsx {"file": "./examples/ModalWindow_7_custom_positioning.jsx"}
```
