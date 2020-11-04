# Car-drifting

About:
This is a 2d car drifting simulation using p5.js. Check current website for more info.

Code details:
This was a nightmare to code. 
Using p5.js as a library wasa helpful in 2 different ways. 
First, easy to draw and show the results.
Second, has a built in Vector system.

Having a car drift was easy. A car consists of: velocity, acceleration, and position. 
 Changing:
    1) Acceleration from users input. 
    2) Velocity from acceleration plus adding a friction force
    3) Position from velocity.

Detection collision with a car and a wall. I don't know why but the boundries of a car was weird(maybe a bug of some sort). 
Because of that I had to have weird manipulation of boundries, in collision function so that it worked.

Bugs:
  !) Fix collision with a car and a wall. Find out why does the boundries are weird and try to fix it.
  !!) Future bugs may arrive from updating code.
