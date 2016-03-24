# Dynamic Bootstrap Modal
This small library helps to create dynamic bootstrap modal at run time
#How to use
```
var modal = new BsModal("Dynamic Modal")
modal.show();
```
#Size
For different type of modal size use bootstrap size (xs,md,lg)
```
var modal = new BsModal("Dynamic Modal",'lg')
modal.show();
```
#Set Body Content
```
var modal = new BsModal("Dynamic Modal",'lg')
modal.show();
$("#"+modal.BodyID).html('Hello World');
```
#Set Dynamic Body Content
From remote url
```
var modal = new BsModal("Dynamic Modal",'lg')
modal.show();
$("#"+modal.BodyID).load('http://www.google.com');
```
#Modal Close Call Back
```
var modal = new BsModal("Dynamic Modal",'lg')
modal.show();
$("#"+modal.BodyID).load('http://www.google.com');
modal.OnClose=function(){
  //do the work
}
```

Happy Coding!
