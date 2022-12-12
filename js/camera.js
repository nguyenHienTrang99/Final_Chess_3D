function moveCamera() {
    if (keyIsDown(190)) scaleSize += 0.05;
    if (keyIsDown(188)) scaleSize -= 0.05;
    if (scaleSize <= 0.5) scaleSize = 0.5;
    if (scaleSize >= 3.5) scaleSize = 3.5;
    if (keyIsDown(68)) rvel.add(0, camspeed, 0);
    if (keyIsDown(65)) rvel.add(0, -camspeed, 0);
    if (keyIsDown(87)) rvel.add(camspeed, 0, 0);
    if (keyIsDown(83)) rvel.add(-camspeed, 0, 0);
}

function rotateEverything() {
    rotation.add(rvel);
    rvel.mult(0.9, 0.9, 0.9)
    rotateX(rotation.x);
    rotateY(rotation.y);
    rotateZ(rotation.z);
}
