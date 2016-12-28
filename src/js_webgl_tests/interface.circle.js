var Interface = Interface || {};

Interface.Circle = function(radius,segments,coord,color,lineWidth,opacity,thetaStart,thetaLength) {

    var material = new THREE.LineBasicMaterial({
        color: color,
        linewidth:lineWidth,
        opacity:opacity,
        transparent:true
    });

    var geometry = new THREE.CircleGeometry(radius,segments);

    if(undefined != thetaStart && undefined != thetaLength) {
        geometry = new THREE.CircleGeometry(radius,segments,thetaStart,thetaLength);
    }

    geometry.vertices.shift();

    var line = new THREE.Line(geometry,material);
    line.position.x = coord[0];
    line.position.y = coord[1];
    line.position.z = coord[2];

    return line;

};