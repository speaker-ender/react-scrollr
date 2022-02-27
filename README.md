# React Scrollr
#### Scroll Based Animation Tools for React.js
#### [DEMO]()
  
  
## Basic Usage
Wrap your page components with `ScrollContextProvider` and `ObserverContextProvider`  
  
Example:  
````
<Layout>
    <ScrollContextProvider>
        <ObserverContextProvider>
            <PageContent>
                {children}
            </PageContent>
        </ObserverContextProvider>
    </ScrollContextProvider>
</Layout>
````

Now you can wrap components with `InViewComponent` and it will animate into view the first time it scrolls into view

Example:
````
    <InViewComponent>
        <ExampleComponent />
    </InViewComponent>
````

## Components  
  
### ScrollContextProvider
This component is used for handling the scroll state of the window.
You can use the hook, useScrollContext to get the current scroll position from any child component of ScrollContextProvider.

Currently it is throggling using a sample rate of 50ms and I plan on making this configurable in future releases

### ObserverContextProvider
This component is used for handling window observer states.
Currently the root margin is hard-coded but I plan on making this configurable in a future release.


### InViewComponent
This component is used for wrapping the elements that you would like to animate into view.
You can choose from 3 pre-styled transitions, or select `none` to style yourself using the provided classes.

`transitionStyle` can be set to 'fade-in', 'fade-up', 'fade-side', 'none'.

When this component is rendered, it is given the class `in-view` by the Observer.
When the component is intersecting with the observer margin, it adds the class `in-view--visible` and then no longer becomes tracked.
