1)
a) Are there any problems or code smells in the app? 
- When ever as the app is used the observable, as it always needs to unsubscribe to it, other ways there may be a chances of happening memory leaks in the application, by that performance can reduce. inorder to avoid that we have to always unsubscribe to it when we have created our own observable.

b) Are there other improvements you would make to the app? 

 As it is using the latest version of angular, the Template type checking needs to be added in the tsConfig.json, So that it can be applicable throught the application. By that it strictly validates the template type checking. 
- Images tag needs to have the alternate text on it. So, that when the image does'nt load or if it is having any error, the alternate text will be present on the UI. So, that it can be easily recognizable.  

2) Accessibility ?
- Accessibility is already handled by Angular Material in this code. So there is no additional changes required for the accessibility. Except the detailed description of the aria-label. 