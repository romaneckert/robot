var Interface = Interface || {};

Interface.Line = function(coords,color,lineWidth,opacity) {

    var material = new THREE.LineBasicMaterial({
        color: color,
        linewidth:lineWidth,
        opacity:opacity,
        transparent:true,
        linejoin:'butt',
    });

    var geometry = new THREE.Geometry();

    $.each(coords,function(c,coord) {
        geometry.vertices.push(new THREE.Vector3(coord[0],coord[1],coord[2]));
    });

    return new THREE.Line(geometry,material);
};