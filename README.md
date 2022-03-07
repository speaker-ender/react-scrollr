# React Scrollr
#### Scroll Based Animation Tools for React.js
#### [DEMO]()

## Components  
  
### ScrollContextProvider
This component is used for handling the scroll state of the window.
You can use the hook, useScrollContext to get the current scroll position from any child component of ScrollContextProvider.

Currently it is throttling using a sample rate of 10ms.

### ObserverContextProvider
This component is used for handling window observer states.

### InViewComponent
This component is used for wrapping the elements that you would like to animate into view.
You can choose from 3 pre-styled transitions, or select `none` to style yourself using the provided classes.

`transitionStyle` can be set to 'fade-in', 'fade-up', 'fade-side', 'none'.
